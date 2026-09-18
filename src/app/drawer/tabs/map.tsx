import MapDropdown from "@/components/dropdown/map-region-dropdown";
import MapFilterDrawer from "@/components/filters/mapfilter-drawer";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { API_KEY_VALUE, API_URL } from "@/lib/services/api";
import { mapStyles } from "@/styles/map-styles";
import { font, icon, scale, useResponsive, verticalScale } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import type { FilterSpecification } from "@maplibre/maplibre-react-native";
import {
  Camera,
  CameraRef,
  GeoJSONSource,
  Layer,
  Map as MapLibreMap,
} from "@maplibre/maplibre-react-native";
import type {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Geometry,
} from "geojson";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Linking,
  ScrollView,
  TouchableOpacity,
  View
} from "react-native";

// const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "";
const MAP_STYLE_URL = process.env.EXPO_PUBLIC_AWS_MAP_STYLE_URL ?? "";

type GeoFeature = Feature<Geometry, GeoJsonProperties>;
type GeoCollection = FeatureCollection<Geometry, GeoJsonProperties>;
type Province = { code: string; name: string; bounds?: any };
type Region = { region_code: string; region_name: string; bounds?: any; provinces?: Province[] };
type GeoData = {
  regions: GeoCollection;
  provinces: GeoCollection;
  municipalities: GeoCollection;
  barangays: GeoCollection;
};

const EMPTY: GeoCollection = { type: "FeatureCollection", features: [] };

function coords(g: Geometry | null): number[][] {
  if (!g) return [];
  switch (g.type) {
    case "Point": return [g.coordinates];
    case "MultiPoint": return g.coordinates;
    case "LineString": return g.coordinates;
    case "MultiLineString": return g.coordinates.flat();
    case "Polygon": return g.coordinates.flat();
    case "MultiPolygon": return g.coordinates.flat(2);
    case "GeometryCollection": return g.geometries.flatMap(coords);
    default: return [];
  }
}

function center(g: Geometry | null): [number, number] | null {
  const c = coords(g).filter(x => Number.isFinite(+x[0]) && Number.isFinite(+x[1]));
  if (!c.length) return null;
  const lng = c.map(x => +x[0]), lat = c.map(x => +x[1]);
  return [(Math.min(...lng) + Math.max(...lng)) / 2, (Math.min(...lat) + Math.max(...lat)) / 2];
}

function bounds(g: Geometry | null): [number, number, number, number] | null {
  const c = coords(g).filter(x => Number.isFinite(+x[0]) && Number.isFinite(+x[1]));
  if (!c.length) return null;
  const lng = c.map(x => +x[0]), lat = c.map(x => +x[1]);
  return [Math.min(...lng), Math.min(...lat), Math.max(...lng), Math.max(...lat)];
}

function nameOf(f: GeoFeature): string {
  const p = f.properties ?? {};
  return String(
    p.name ??
    p.province_name ??
    p.municipality_name ??
    p.mun_name ??
    p.barangay_name ??
    p.region_name ??
    p.NAME_1 ??
    p.NAME_2 ??
    p.NAME_3 ??
    p.NAME ??
    ""
  );
}

function collection(v: any): GeoCollection {
  return v?.type === "FeatureCollection" && Array.isArray(v.features) ? v : EMPTY;
}

function normalize(v: any): GeoData {
  const d = v?.data ?? v;
  return {
    regions: collection(d?.regions),
    provinces: collection(d?.provinces),
    municipalities: collection(d?.municipalities),
    barangays: collection(d?.barangays),
  };
}

function labelCollection(data: GeoCollection): GeoCollection {
  return {
    type: "FeatureCollection",
    features: data.features.flatMap(f => {
      if (!f.geometry) return [];
      const c = center(f.geometry);
      const n = nameOf(f);
      if (!c || !n) return [];
      return [{
        type: "Feature",
        properties: { label: n },
        geometry: { type: "Point", coordinates: c },
      } as GeoFeature];
    }),
  };
}

export default function Map() {
  console.log("[MAP] MAP_STYLE_URL:", MAP_STYLE_URL);
console.log("[MAP] API_URL:", API_URL);

  const responsive = useResponsive();
  const styles = useMemo(() => mapStyles(responsive), [responsive]);
  const cameraRef = useRef<CameraRef>(null);

  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState("Choose a Province");
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string | null>(null);
  const [selectedMunicipalityCode, setSelectedMunicipalityCode] = useState<string | null>(null);
  const [selectedProvinceInfo, setSelectedProvinceInfo] = useState({ name: "Choose a Province", lat: 0, lng: 0 });

  const [filters, setFilters] = useState({
    heatmap: false,
    treatment: false,
  });

  const [open, setOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(500)).current;

  const toggleDrawer = useCallback(() => {
    Animated.timing(slideAnim, {
      toValue: open ? 500 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
    setOpen(v => !v);
  }, [open, slideAnim]);

  const regionLabels = useMemo(() => labelCollection(geoData?.regions ?? EMPTY), [geoData]);
  const provinceLabels = useMemo(() => labelCollection(geoData?.provinces ?? EMPTY), [geoData]);
  const municipalityLabels = useMemo(() => labelCollection(geoData?.municipalities ?? EMPTY), [geoData]);
  const barangayLabels = useMemo(() => labelCollection(geoData?.barangays ?? EMPTY), [geoData]);

  const provinceFilter = useMemo<FilterSpecification>(
    () => selectedProvinceCode
      ? ["==", ["get", "code"], selectedProvinceCode]
      : ["==", ["get", "code"], "__none__"],
    [selectedProvinceCode]
  );

  const municipalityFilter = useMemo<FilterSpecification>(
    () => selectedMunicipalityCode
      ? ["==", ["get", "code"], selectedMunicipalityCode]
      : ["==", ["get", "code"], "__none__"],
    [selectedMunicipalityCode]
  );

useEffect(() => {
  let mounted = true;

  async function load() {
    try {
      setLoading(true);
      setError(null);

      console.log("[MOBILE MAP] Loading geospatial data...");

      const headers = {
        "Content-Type": "application/json",
        "x-api-key": API_KEY_VALUE,
      };

      const [geometryResponse, hierarchyResponse] = await Promise.all([
        fetch(`${API_URL}/maintenance/geospatial/geom`, {
          method: "GET",
          headers,
        }),

        fetch(`${API_URL}/maintenance/geospatial/hierarchy`, {
          method: "GET",
          headers,
        }),
      ]);

      if (!geometryResponse.ok) {
        throw new Error(
          `Geometry request failed: ${geometryResponse.status} ${geometryResponse.statusText}`
        );
      }

      if (!hierarchyResponse.ok) {
        throw new Error(
          `Hierarchy request failed: ${hierarchyResponse.status} ${hierarchyResponse.statusText}`
        );
      }

      const geometryJson = await geometryResponse.json();
      const hierarchyJson = await hierarchyResponse.json();

      console.log(
        "[MOBILE MAP] Geometry response:",
        JSON.stringify(geometryJson, null, 2)
      );

      console.log(
        "[MOBILE MAP] Hierarchy response:",
        JSON.stringify(hierarchyJson, null, 2)
      );

      if (!mounted) {
        return;
      }

      const normalized = normalize(geometryJson);

      console.log(
        "[MOBILE MAP] Regions:",
        normalized.regions.features.length
      );

      console.log(
        "[MOBILE MAP] Provinces:",
        normalized.provinces.features.length
      );

      console.log(
        "[MOBILE MAP] Municipalities:",
        normalized.municipalities.features.length
      );

      console.log(
        "[MOBILE MAP] Barangays:",
        normalized.barangays.features.length
      );

      setGeoData(normalized);
    } catch (e) {
      console.error("[MOBILE MAP] MAP ERROR:", e);

      if (mounted) {
        setError(
          e instanceof Error
            ? e.message
            : "Failed to load map data."
        );
      }
    } finally {
      if (mounted) {
        setLoading(false);
      }
    }
  }

  load();

  return () => {
    mounted = false;
  };
}, []);



  const findProvince = useCallback((n: string) => {
    const s = n.trim().toLowerCase();
    return geoData?.provinces.features.find(f => nameOf(f).trim().toLowerCase() === s) ?? null;
  }, [geoData]);

  const flyToProvince = useCallback((n: string) => {
    const f = findProvince(n);
    if (!f?.geometry) return;
    const c = center(f.geometry);
    const b = bounds(f.geometry);
    if (!c || !b) return;

    const code = f.properties?.code != null ? String(f.properties.code) : null;
    setSelectedRegion(n);
    setSelectedProvinceCode(code);
    setSelectedMunicipalityCode(null);
    setSelectedProvinceInfo({ name: n, lat: c[1], lng: c[0] });
    cameraRef.current?.fitBounds(b);
  }, [findProvince]);

  const handleProvincePress = useCallback((event: any) => {
    const f = event?.nativeEvent?.features?.[0] as GeoFeature | undefined;
    if (!f?.geometry) return;

    const c = center(f.geometry);
    const b = bounds(f.geometry);
    if (!c || !b) return;

    const n = nameOf(f) || "Unknown Province";
    const code = f.properties?.code != null ? String(f.properties.code) : null;

    setSelectedRegion(n);
    setSelectedProvinceCode(code);
    setSelectedMunicipalityCode(null);
    setSelectedProvinceInfo({ name: n, lat: c[1], lng: c[0] });
    cameraRef.current?.fitBounds(b);
  }, []);

  const handleMunicipalityPress = useCallback((event: any) => {
    const f = event?.nativeEvent?.features?.[0] as GeoFeature | undefined;
    if (!f?.geometry) return;

    const b = bounds(f.geometry);
    if (!b) return;

    const code = f.properties?.code != null ? String(f.properties.code) : null;
    setSelectedMunicipalityCode(code);
    cameraRef.current?.fitBounds(b);
  }, []);

  if (loading) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#35408E" />
        <ThemedText style={{ marginTop: verticalScale(10) }}>Loading map...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: scale(30) }}>
        <Ionicons name="alert-circle-outline" size={icon(48)} color="#D32F2F" />
        <ThemedText style={{ marginTop: verticalScale(12) }}>Failed to load map</ThemedText>
        <ThemedText style={{ marginTop: verticalScale(8), color: "#777", textAlign: "center" }}>{error}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.pageContainer} contentContainerStyle={styles.scrollContent}>
      <ThemedView>
        <ThemedView style={styles.mapContainer}>

          <ThemedView style={styles.topControls}>
            <MapDropdown
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              onProvinceSelect={flyToProvince}
            />
            <TouchableOpacity style={styles.filterBtn} onPress={toggleDrawer}>
              <Ionicons name="filter" size={icon(22)} color="white" />
            </TouchableOpacity>
          </ThemedView>

          <MapFilterDrawer
            visible={open}
            filters={filters}
            setFilters={setFilters}
            slideAnim={slideAnim}
            onClose={toggleDrawer}
          />

          <ThemedView style={styles.legendBox}>
            <ThemedView style={styles.boxBG}>
              <ThemedView style={styles.legendContainer}>
                {[
                  ["red", "High"],
                  ["#FFB633", "Medium"],
                  ["#3BB329", "Low"],
                ].map(([color, label]) => (
                  <ThemedView style={styles.legend} key={label}>
                    <ThemedView style={[styles.legendColor, { backgroundColor: color }]} />
                    <ThemedText style={styles.legendLabel}>{label}</ThemedText>
                  </ThemedView>
                ))}
              </ThemedView>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.contentContainer}>
            <ThemedView style={styles.contentBG}>
              <ThemedText style={{ alignSelf: "flex-end", lineHeight: font(12) }}>
                {selectedProvinceInfo.name === "Choose a Province"
                  ? "--"
                  : `${Math.abs(selectedProvinceInfo.lat).toFixed(4)}° ${selectedProvinceInfo.lat >= 0 ? "N" : "S"}, ${Math.abs(selectedProvinceInfo.lng).toFixed(4)}° ${selectedProvinceInfo.lng >= 0 ? "E" : "W"}`}
              </ThemedText>
              <ThemedText style={styles.contentProvince}>{selectedProvinceInfo.name}</ThemedText>
              <ThemedView style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "transparent" }}>
                <ThemedText style={styles.otherContent}>Mentions: <ThemedText style={styles.moreContent}>1,458</ThemedText></ThemedText>
                <ThemedText style={styles.otherContent}>Stigma Index: <ThemedText style={styles.moreContent}>14.2</ThemedText></ThemedText>
              </ThemedView>
              <ThemedText style={styles.otherContent}>Sentiment: <ThemedText style={styles.moreContent}>0.2% Neutral</ThemedText></ThemedText>
              <ThemedText style={styles.otherContent}>Top Trending Topic: <ThemedText style={styles.moreContent}>#HIVAwareness</ThemedText></ThemedText>
            </ThemedView>
          </ThemedView>

          <MapLibreMap style={{ flex: 1 }} mapStyle={MAP_STYLE_URL}>

            <Camera ref={cameraRef} initialViewState={{ center: [121.774, 12.9], zoom: 5.5 }} />

            {/* REGIONS */}
            <GeoJSONSource id="regions" data={geoData?.regions ?? EMPTY}>
              <Layer id="regions-fill" type="fill" source="regions" paint={{ "fill-color": "#3b82f6", "fill-opacity": 0.01 }} />
              <Layer id="regions-line" type="line" source="regions" paint={{ "line-color": "#1e293b", "line-width": 1, "line-opacity": 0.9 }} />
            </GeoJSONSource>

            {/* PROVINCES */}
            <GeoJSONSource id="provinces" data={geoData?.provinces ?? EMPTY} onPress={handleProvincePress}>
              <Layer id="provinces-fill" type="fill" source="provinces" paint={{ "fill-color": "#e5e7eb", "fill-opacity": 0.15 }} />
              <Layer id="provinces-line" type="line" source="provinces" paint={{ "line-color": "#334155", "line-width": 1.2, "line-opacity": 0.95 }} />
              <Layer id="province-highlight" type="fill" source="provinces" filter={provinceFilter} paint={{ "fill-color": "#35408E", "fill-opacity": 0.35 }} />
            </GeoJSONSource>

            {/* MUNICIPALITIES */}
            <GeoJSONSource id="municipalities" data={geoData?.municipalities ?? EMPTY} onPress={handleMunicipalityPress}>
              <Layer id="municipalities-fill" type="fill" source="municipalities" minzoom={4.5} paint={{ "fill-color": "#000000", "fill-opacity": 0 }} />
              <Layer id="municipalities-glow" type="line" source="municipalities" minzoom={4.5} paint={{ "line-color": "#64748b", "line-width": 1, "line-opacity": 0.25 }} />
              <Layer id="municipalities-base" type="line" source="municipalities" minzoom={4.5} paint={{ "line-color": "#475569", "line-width": 1, "line-opacity": 0.8 }} />
              <Layer id="municipality-highlight" type="line" source="municipalities" minzoom={4.5} filter={municipalityFilter} paint={{ "line-color": "#F59E0B", "line-width": 3, "line-opacity": 1 }} />
            </GeoJSONSource>

            {/* BARANGAYS */}
            <GeoJSONSource id="barangays" data={geoData?.barangays ?? EMPTY}>
              <Layer id="barangays-fill" type="fill" source="barangays" minzoom={9} paint={{ "fill-color": "#94A3B8", "fill-opacity": 0.05 }} />
              <Layer id="barangays-line" type="line" source="barangays" minzoom={8} paint={{ "line-color": "#94A3B8", "line-width": 0.5, "line-opacity": 0.65 }} />
            </GeoJSONSource>

            {/* REGION LABELS */}
            <GeoJSONSource id="region-labels" data={regionLabels}>
              <Layer
                id="region-label-layer"
                type="symbol"
                source="region-labels"
                minzoom={4}
                layout={{
                  "text-field": ["get", "label"],
                  "text-size": 11,
                  "text-anchor": "center",
                  "text-allow-overlap": false,
                  "text-ignore-placement": false,
                }}
                paint={{ "text-color": "#1e293b", "text-halo-color": "#fff", "text-halo-width": 2 }}
              />
            </GeoJSONSource>

            {/* PROVINCE LABELS */}
            <GeoJSONSource id="province-labels" data={provinceLabels}>
              <Layer
                id="province-label-layer"
                type="symbol"
                source="province-labels"
                minzoom={4.5}
                layout={{
                  "text-field": ["get", "label"],
                  "text-size": 9,
                  "text-anchor": "center",
                  "text-allow-overlap": false,
                  "text-ignore-placement": false,
                }}
                paint={{ "text-color": "#35408E", "text-halo-color": "#fff", "text-halo-width": 2 }}
              />
            </GeoJSONSource>

            {/* MUNICIPALITY LABELS */}
            <GeoJSONSource id="municipality-labels" data={municipalityLabels}>
              <Layer
                id="municipality-label-layer"
                type="symbol"
                source="municipality-labels"
                minzoom={5}
                layout={{
                  "text-field": ["get", "label"],
                  "text-size": 8,
                  "text-anchor": "center",
                  "text-allow-overlap": false,
                  "text-ignore-placement": false,
                }}
                paint={{ "text-color": "#1e293b", "text-halo-color": "#fff", "text-halo-width": 2 }}
              />
            </GeoJSONSource>

            {/* BARANGAY LABELS */}
            <GeoJSONSource id="barangay-labels" data={barangayLabels}>
              <Layer
                id="barangay-label-layer"
                type="symbol"
                source="barangay-labels"
                minzoom={9}
                layout={{
                  "text-field": ["get", "label"],
                  "text-size": 7,
                  "text-anchor": "center",
                  "text-allow-overlap": false,
                  "text-ignore-placement": false,
                }}
                paint={{ "text-color": "#475569", "text-halo-color": "#fff", "text-halo-width": 1 }}
              />
            </GeoJSONSource>

          </MapLibreMap>
        </ThemedView>

        <ThemedView style={styles.resourcesContainer}>
          {/* Section header */}
          <ThemedView style={styles.sectionHeader}>
            <ThemedView style={styles.sectionIconBubble}>
              <Ionicons name="medkit-outline" size={icon(16)} color="#35408E" />
            </ThemedView>
            <ThemedText style={styles.resourcesTitle}>Treatment Hubs</ThemedText>
          </ThemedView>

          {/* Card */}
          <ThemedView style={styles.resourcesBG}>
            {/* Accent bar */}
            <View style={styles.accentBar} />

            <ThemedView style={styles.cardInner}>
              {/* Hub name */}
              <ThemedView style={styles.resources}>
                <ThemedText style={styles.resourcePlace}>Ospital ng Biñan (ONB HIV Treatment Hub)</ThemedText>
              </ThemedView>

              <View style={styles.rowDivider} />

              {/* Address */}
              <ThemedView style={styles.locationPhone}>
                <ThemedView style={styles.infoIconBubble}>
                  <Ionicons name="location-outline" size={icon(14)} color="#35408E" />
                </ThemedView>
                <ThemedText style={styles.locPhoneText}>Canlalay Bridge, Biñan, Laguna</ThemedText>
              </ThemedView>

              {/* Phone */}
              <ThemedView style={styles.locationPhone}>
                <ThemedView style={styles.infoIconBubble}>
                  <Ionicons name="call-outline" size={icon(14)} color="#35408E" />
                </ThemedView>
                <ThemedText style={styles.locPhoneText}>(049) 511-4119</ThemedText>
              </ThemedView>

              <View style={styles.rowDivider} />

              {/* Action buttons */}
              <ThemedView style={styles.directionContainer}>
                <ThemedView style={styles.linkContainer}>
                  <TouchableOpacity
                    style={styles.buttonBG}
                    onPress={() => Linking.openURL("mailto:onb@example.gov.ph")}
                    activeOpacity={0.75}
                  >
                    <Ionicons name="mail-outline" size={icon(14)} color="#35408E" />
                    <ThemedText style={styles.buttonLabel}>Email</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonBG}
                    onPress={() => Linking.openURL("https://www.google.com/maps/search/?api=1&query=14.5995,120.9842")}
                    activeOpacity={0.75}
                  >
                    <Ionicons name="globe-outline" size={icon(14)} color="#35408E" />
                    <ThemedText style={styles.buttonLabel}>Webiste/Social Media</ThemedText>
                  </TouchableOpacity>
                </ThemedView>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}
