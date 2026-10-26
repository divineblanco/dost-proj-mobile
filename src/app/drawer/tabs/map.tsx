
// import MapDropdown from "@/components/dropdown/map-region-dropdown";
// import MapFilterDrawer from "@/components/filters/mapfilter-drawer";
// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { API_KEY_VALUE, API_URL } from "@/lib/services/api";
// import { mapStyles } from "@/styles/map-styles";
// import {
//   font,
//   icon,
//   scale,
//   useResponsive,
//   verticalScale,
// } from "@/styles/responsive";

// import { Ionicons } from "@expo/vector-icons";
// import type {
//   Feature,
//   FeatureCollection,
//   GeoJsonProperties,
//   Geometry,
// } from "geojson";
// import type { MapShape } from "react-native-leaflet-view";
// import { LeafletView, MapShapeType } from "react-native-leaflet-view";

// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";

// import {
//   ActivityIndicator,
//   Animated,
//   Linking,
//   ScrollView,
//   TouchableOpacity,
//   View,
// } from "react-native";

// type GeoFeature = Feature<Geometry, GeoJsonProperties>;
// type GeoCollection = FeatureCollection<Geometry, GeoJsonProperties>;

// type GeoData = {
//   regions: GeoCollection;
//   provinces: GeoCollection;
//   municipalities: GeoCollection;
//   barangays: GeoCollection;
// };

// type ProvinceInfo = {
//   name: string;
//   lat: number;
//   lng: number;
// };

// const EMPTY: GeoCollection = {
//   type: "FeatureCollection",
//   features: [],
// };

// const DEFAULT_CENTER = {
//   lat: 12.8797,
//   lng: 121.774,
// };

// const DEFAULT_ZOOM = 5.5;

// const MAP_LAYERS = [
//   {
//     attribution:
//       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     baseLayerIsChecked: true,
//     baseLayerName: "OpenStreetMap.Mapnik",
//     url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
//   },
// ];

// function coords(geometry: Geometry | null): number[][] {
//   if (!geometry) return [];

//   switch (geometry.type) {
//     case "Point":
//       return [geometry.coordinates];

//     case "MultiPoint":
//     case "LineString":
//       return geometry.coordinates;

//     case "MultiLineString":
//     case "Polygon":
//       return geometry.coordinates.flat();

//     case "MultiPolygon":
//       return geometry.coordinates.flat(2);

//     case "GeometryCollection":
//       return geometry.geometries.flatMap((item) => coords(item));

//     default:
//       return [];
//   }
// }

// function center(
//   geometry: Geometry | null,
// ): [number, number] | null {
//   const coordinates = coords(geometry).filter(
//     (coordinate) =>
//       Number.isFinite(coordinate[0]) &&
//       Number.isFinite(coordinate[1]),
//   );

//   if (coordinates.length === 0) return null;

//   const longitudes = coordinates.map((coordinate) => coordinate[0]);
//   const latitudes = coordinates.map((coordinate) => coordinate[1]);

//   return [
//     (Math.min(...longitudes) + Math.max(...longitudes)) / 2,
//     (Math.min(...latitudes) + Math.max(...latitudes)) / 2,
//   ];
// }

// function nameOf(feature: GeoFeature): string {
//   const properties = feature.properties ?? {};

//   return String(
//     properties.name ??
//       properties.province_name ??
//       properties.municipality_name ??
//       properties.mun_name ??
//       properties.barangay_name ??
//       properties.region_name ??
//       properties.NAME_1 ??
//       properties.NAME_2 ??
//       properties.NAME_3 ??
//       properties.NAME ??
//       "",
//   );
// }

// function collection(value: unknown): GeoCollection {
//   if (
//     typeof value === "object" &&
//     value !== null &&
//     "type" in value &&
//     value.type === "FeatureCollection" &&
//     "features" in value &&
//     Array.isArray(value.features)
//   ) {
//     return value as GeoCollection;
//   }

//   return EMPTY;
// }

// function normalize(value: unknown): GeoData {
//   const response = value as {
//     data?: Record<string, unknown>;
//     regions?: unknown;
//     provinces?: unknown;
//     municipalities?: unknown;
//     barangays?: unknown;
//   };

//   const data = response?.data ?? response;

//   return {
//     regions: collection(data?.regions),
//     provinces: collection(data?.provinces),
//     municipalities: collection(data?.municipalities),
//     barangays: collection(data?.barangays),
//   };
// }

// function toLeafletShapes(
//   data: GeoCollection,
//   color: string,
//   idPrefix: string,
// ): MapShape[] {
//   const shapes: MapShape[] = [];

//   data.features.forEach((feature, featureIndex) => {
//     const geometry = feature.geometry;

//     if (!geometry) return;

//     const polygons =
//       geometry.type === "Polygon"
//         ? [geometry.coordinates]
//         : geometry.type === "MultiPolygon"
//           ? geometry.coordinates
//           : [];

//     polygons.forEach((polygon, polygonIndex) => {
//       const outerRing = polygon[0];

//       if (!outerRing || outerRing.length < 3) return;

//       shapes.push({
//         id: `${idPrefix}-${feature.id ?? featureIndex}-${polygonIndex}`,
//         shapeType: MapShapeType.POLYGON,
//         color,
//         positions: outerRing.map(([lng, lat]) => ({
//           lat,
//           lng,
//         })),
//       });
//     });
//   });

//   return shapes;
// }

// export default function Map() {
//   const responsive = useResponsive();

//   const styles = useMemo(
//     () => mapStyles(responsive),
//     [responsive],
//   );

//   const [geoData, setGeoData] = useState<GeoData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [selectedRegion, setSelectedRegion] =
//     useState("Choose a Province");

//   const [selectedProvinceCode, setSelectedProvinceCode] =
//     useState<string | null>(null);

//   const [selectedMunicipalityCode, setSelectedMunicipalityCode] =
//     useState<string | null>(null);

//   const [selectedProvinceInfo, setSelectedProvinceInfo] =
//     useState<ProvinceInfo>({
//       name: "Choose a Province",
//       lat: 0,
//       lng: 0,
//     });

//   const [mapCenterPosition, setMapCenterPosition] =
//     useState(DEFAULT_CENTER);

//   const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM);

//   const [filters, setFilters] = useState({
//     heatmap: false,
//     treatment: false,
//   });

//   const [open, setOpen] = useState(false);
//   const slideAnim = useRef(new Animated.Value(500)).current;

//   const toggleDrawer = useCallback(() => {
//     const nextOpen = !open;

//     Animated.timing(slideAnim, {
//       toValue: nextOpen ? 0 : 500,
//       duration: 250,
//       useNativeDriver: true,
//     }).start();

//     setOpen(nextOpen);
//   }, [open, slideAnim]);

//   useEffect(() => {
//     let mounted = true;

//     async function loadGeospatialData() {
//       try {
//         setLoading(true);
//         setError(null);

//         const baseUrl = API_URL.replace(/\/+$/, "");

//         const headers = {
//           "Content-Type": "application/json",
//           "x-api-key": API_KEY_VALUE,
//         };

//         const [geometryResponse, hierarchyResponse] =
//           await Promise.all([
//             fetch(
//               `${baseUrl}/maintenance/geospatial/geom`,
//               {
//                 method: "GET",
//                 headers,
//               },
//             ),
//             fetch(
//               `${baseUrl}/maintenance/geospatial/hierarchy`,
//               {
//                 method: "GET",
//                 headers,
//               },
//             ),
//           ]);

//         if (!geometryResponse.ok) {
//           throw new Error(
//             `Geometry request failed: ${geometryResponse.status} ${geometryResponse.statusText}`,
//           );
//         }

//         if (!hierarchyResponse.ok) {
//           throw new Error(
//             `Hierarchy request failed: ${hierarchyResponse.status} ${hierarchyResponse.statusText}`,
//           );
//         }

//         const geometryJson = await geometryResponse.json();

//         // Validate that the hierarchy endpoint is reachable.
//         await hierarchyResponse.json();

//         if (!mounted) return;

//         const normalized = normalize(geometryJson);

//         setGeoData(normalized);

//         console.log("[MAP] Regions:", normalized.regions.features.length);
//         console.log("[MAP] Provinces:", normalized.provinces.features.length);
//         console.log(
//           "[MAP] Municipalities:",
//           normalized.municipalities.features.length,
//         );
//         console.log(
//           "[MAP] Barangays:",
//           normalized.barangays.features.length,
//         );
//       } catch (caughtError) {
//         console.error("[MAP] Failed to load geospatial data:", caughtError);

//         if (mounted) {
//           setError(
//             caughtError instanceof Error
//               ? caughtError.message
//               : "Failed to load map data.",
//           );
//         }
//       } finally {
//         if (mounted) {
//           setLoading(false);
//         }
//       }
//     }

//     loadGeospatialData();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   const leafletShapes = useMemo<MapShape[]>(() => {
//     if (!geoData) return [];

//     return [
//       ...toLeafletShapes(
//         geoData.regions,
//         "#1e293b",
//         "region",
//       ),
//       ...toLeafletShapes(
//         geoData.provinces,
//         "#334155",
//         "province",
//       ),
//       ...toLeafletShapes(
//         geoData.municipalities,
//         "#475569",
//         "municipality",
//       ),
//       ...toLeafletShapes(
//         geoData.barangays,
//         "#94a3b8",
//         "barangay",
//       ),
//     ];
//   }, [geoData]);


// const flyToProvince = useCallback(
//   (provinceName: string) => {
//     const feature = geoData?.provinces.features.find(
//       (item) =>
//         nameOf(item).trim().toLowerCase() ===
//         provinceName.trim().toLowerCase()
//     );

//     if (!feature?.geometry) {
//       console.warn("[MAP] Province not found:", provinceName);
//       return;
//     }

//     const provinceCenter = center(feature.geometry);

//     if (!provinceCenter) return;

//     const code =
//       feature.properties?.code != null
//         ? String(feature.properties.code)
//         : null;

//     setSelectedRegion(provinceName);
//     setSelectedProvinceCode(code);
//     setSelectedMunicipalityCode(null);

//     setSelectedProvinceInfo({
//       name: provinceName,
//       lat: provinceCenter[1],
//       lng: provinceCenter[0],
//     });

//     setMapCenterPosition({
//       lat: provinceCenter[1],
//       lng: provinceCenter[0],
//     });

//     setMapZoom(8);
//   },
//   [geoData]
// );


//   if (loading) {
//     return (
//       <ThemedView
//         style={{
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <ActivityIndicator size="large" color="#35408E" />
//         <ThemedText style={{ marginTop: verticalScale(10) }}>
//           Loading map...
//         </ThemedText>
//       </ThemedView>
//     );
//   }

//   if (error) {
//     return (
//       <ThemedView
//         style={{
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//           padding: scale(30),
//         }}
//       >
//         <Ionicons
//           name="alert-circle-outline"
//           size={icon(48)}
//           color="#D32F2F"
//         />

//         <ThemedText style={{ marginTop: verticalScale(12) }}>
//           Failed to load map
//         </ThemedText>

//         <ThemedText
//           style={{
//             marginTop: verticalScale(8),
//             color: "#777",
//             textAlign: "center",
//           }}
//         >
//           {error}
//         </ThemedText>

//         <TouchableOpacity
//           onPress={() => {
//             setLoading(true);
//             setError(null);
//             // The screen can be reloaded using your existing
//             // Expo Router navigation if desired.
//           }}
//           style={{ marginTop: verticalScale(16) }}
//         >
//           <ThemedText style={{ color: "#35408E" }}>
//             Please reload the screen to try again.
//           </ThemedText>
//         </TouchableOpacity>
//       </ThemedView>
//     );
//   }

//   return (
//     <ScrollView
//       style={styles.pageContainer}
//       contentContainerStyle={styles.scrollContent}
//     >
//       <ThemedView>
//         <ThemedView style={styles.mapContainer}>
//           <ThemedView style={styles.topControls}>
//             <MapDropdown
//               selectedRegion={selectedRegion}
//               setSelectedRegion={setSelectedRegion}
//               onProvinceSelect={flyToProvince}
//             />

//             <TouchableOpacity
//               style={styles.filterBtn}
//               onPress={toggleDrawer}
//               activeOpacity={0.75}
//             >
//               <Ionicons
//                 name="filter"
//                 size={icon(22)}
//                 color="white"
//               />
//             </TouchableOpacity>
//           </ThemedView>

//           <MapFilterDrawer
//             visible={open}
//             filters={filters}
//             setFilters={setFilters}
//             slideAnim={slideAnim}
//             onClose={toggleDrawer}
//           />

//           <ThemedView style={styles.legendBox}>
//             <ThemedView style={styles.boxBG}>
//               <ThemedView style={styles.legendContainer}>
//                 {[
//                   ["red", "High"],
//                   ["#FFB633", "Medium"],
//                   ["#3BB329", "Low"],
//                 ].map(([color, label]) => (
//                   <ThemedView
//                     style={styles.legend}
//                     key={label}
//                   >
//                     <ThemedView
//                       style={[
//                         styles.legendColor,
//                         { backgroundColor: color },
//                       ]}
//                     />
//                     <ThemedText style={styles.legendLabel}>
//                       {label}
//                     </ThemedText>
//                   </ThemedView>
//                 ))}
//               </ThemedView>
//             </ThemedView>
//           </ThemedView>

                

// <View style={{ height: "100%", width: "100%", overflow: "hidden" }}>
//   <LeafletView
//     mapCenterPosition={mapCenterPosition}
//     zoom={mapZoom}
//     mapLayers={MAP_LAYERS}
//     onMessageReceived={(message) => {
//       console.log("[LEAFLET MESSAGE]", message);

//       // A custom HTML map can send the selected feature
//       // through the WebView message bridge.
//       const payload = (message as any)?.payload;

//       if (
//         payload?.type === "FEATURE_SELECTED" &&
//         typeof payload?.name === "string"
//       ) {
//         const featureName = payload.name;
//         const featureLevel = payload.level;

//         if (featureLevel === "province") {
//           flyToProvince(featureName);
//         } else if (featureLevel === "region") {
//           const region = geoData?.regions.features.find(
//             (feature) =>
//               nameOf(feature).trim().toLowerCase() ===
//               featureName.trim().toLowerCase()
//           );

//           if (region?.geometry) {
//             const regionCenter = center(region.geometry);

//             if (regionCenter) {
//               setSelectedRegion(featureName);
//               setSelectedProvinceCode(null);
//               setSelectedMunicipalityCode(null);

//               setSelectedProvinceInfo({
//                 name: featureName,
//                 lat: regionCenter[1],
//                 lng: regionCenter[0],
//               });

//               setMapCenterPosition({
//                 lat: regionCenter[1],
//                 lng: regionCenter[0],
//               });

//               setMapZoom(6);
//             }
//           }
//         }
//       }
//     }}
//     onError={(event) => {
//       console.error(
//         "[LEAFLET WEBVIEW ERROR]",
//         event.nativeEvent
//       );
//     }}
//     onLoadEnd={() => {
//       console.log("[LEAFLET] WebView loaded");
//     }}
//     doDebug
//   />
// </View>



//           <ThemedView style={styles.contentContainer}>
//             <ThemedView style={styles.contentBG}>
//               <ThemedText
//                 style={{
//                   alignSelf: "flex-end",
//                   lineHeight: font(12),
//                 }}
//               >
//                 {selectedProvinceInfo.name === "Choose a Province"
//                   ? "--"
//                   : `${Math.abs(selectedProvinceInfo.lat).toFixed(4)}° ${
//                       selectedProvinceInfo.lat >= 0 ? "N" : "S"
//                     }, ${Math.abs(selectedProvinceInfo.lng).toFixed(4)}° ${
//                       selectedProvinceInfo.lng >= 0 ? "E" : "W"
//                     }`}
//               </ThemedText>

//               <ThemedText style={styles.contentProvince}>
//                 {selectedProvinceInfo.name}
//               </ThemedText>

//               <ThemedView
//                 style={{
//                   flexDirection: "row",
//                   justifyContent: "space-between",
//                   backgroundColor: "transparent",
//                 }}
//               >
//                 <ThemedText style={styles.otherContent}>
//                   Mentions:{" "}
//                   <ThemedText style={styles.moreContent}>
//                     1,458
//                   </ThemedText>
//                 </ThemedText>

//                 <ThemedText style={styles.otherContent}>
//                   Stigma Index:{" "}
//                   <ThemedText style={styles.moreContent}>
//                     14.2
//                   </ThemedText>
//                 </ThemedText>
//               </ThemedView>

//               <ThemedText style={styles.otherContent}>
//                 Sentiment:{" "}
//                 <ThemedText style={styles.moreContent}>
//                   0.2% Neutral
//                 </ThemedText>
//               </ThemedText>

//               <ThemedText style={styles.otherContent}>
//                 Top Trending Topic:{" "}
//                 <ThemedText style={styles.moreContent}>
//                   #HIVAwareness
//                 </ThemedText>
//               </ThemedText>
//             </ThemedView>
//           </ThemedView>
//         </ThemedView>

//         <ThemedView style={styles.resourcesContainer}>
//           <ThemedView style={styles.sectionHeader}>
//             <ThemedView style={styles.sectionIconBubble}>
//               <Ionicons
//                 name="medkit-outline"
//                 size={icon(16)}
//                 color="#35408E"
//               />
//             </ThemedView>

//             <ThemedText style={styles.resourcesTitle}>
//               Treatment Hubs
//             </ThemedText>
//           </ThemedView>

//           <ThemedView style={styles.resourcesBG}>
//             <View style={styles.accentBar} />

//             <ThemedView style={styles.cardInner}>
//               <ThemedView style={styles.resources}>
//                 <ThemedText style={styles.resourcePlace}>
//                   Ospital ng Biñan (ONB HIV Treatment Hub)
//                 </ThemedText>
//               </ThemedView>

//               <View style={styles.rowDivider} />

//               <ThemedView style={styles.locationPhone}>
//                 <ThemedView style={styles.infoIconBubble}>
//                   <Ionicons
//                     name="location-outline"
//                     size={icon(14)}
//                     color="#35408E"
//                   />
//                 </ThemedView>

//                 <ThemedText style={styles.locPhoneText}>
//                   Canlalay Bridge, Biñan, Laguna
//                 </ThemedText>
//               </ThemedView>

//               <ThemedView style={styles.locationPhone}>
//                 <ThemedView style={styles.infoIconBubble}>
//                   <Ionicons
//                     name="call-outline"
//                     size={icon(14)}
//                     color="#35408E"
//                   />
//                 </ThemedView>

//                 <ThemedText style={styles.locPhoneText}>
//                   (049) 511-4119
//                 </ThemedText>
//               </ThemedView>

//               <View style={styles.rowDivider} />
//               <ThemedView style={styles.directionContainer}>
//                 <ThemedView style={styles.linkContainer}>
//                   <TouchableOpacity
//                     style={styles.buttonBG}
//                     onPress={() =>
//                       Linking.openURL("mailto:onb@example.gov.ph")
//                     }
//                     activeOpacity={0.75}
//                   >
//                     <Ionicons
//                       name="mail-outline"
//                       size={icon(14)}
//                       color="#35408E"
//                     />

//                     <ThemedText style={styles.buttonLabel}>
//                       Email
//                     </ThemedText>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     style={styles.buttonBG}
//                     onPress={() =>
//                       Linking.openURL(
//                         "https://www.google.com/maps/search/?api=1&query=Ospital+ng+Binan+HIV+Treatment+Hub",
//                       )
//                     }
//                     activeOpacity={0.75}
//                   >
//                     <Ionicons
//                       name="globe-outline"
//                       size={icon(14)}
//                       color="#35408E"
//                     />

//                     <ThemedText style={styles.buttonLabel}>
//                       Website/Social Media
//                     </ThemedText>
//                   </TouchableOpacity>
//                 </ThemedView>
//               </ThemedView>
//             </ThemedView>
//           </ThemedView>
//         </ThemedView>
//       </ThemedView>
//     </ScrollView>
//   );
// }

import MapDropdown from "@/components/dropdown/map-region-dropdown";
import MapFilterDrawer from "@/components/filters/mapfilter-drawer";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import TreatmentHubList from "@/components/treatment-hubs/TreatmentHubList";
import TreatmentHubMapMarkers from "@/components/treatment-hubs/TreatmentHubMapMarkers";
import useFormQuery from "@/lib/hooks/useFormQuery";
import { API_KEY_VALUE, API_URL } from "@/lib/services/api";
import type { TreatmentHub, TreatmentHubApiResponse } from "@/lib/types/treatment-hub";
import { mapStyles } from "@/styles/map-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import type { Feature, FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Animated, ScrollView, TouchableOpacity, View } from "react-native";
import type { MapMarker, MapShape } from "react-native-leaflet-view";
import { LeafletView, MapShapeType } from "react-native-leaflet-view";

type GeoFeature = Feature<Geometry, GeoJsonProperties>;
type GeoCollection = FeatureCollection<Geometry, GeoJsonProperties>;
type GeoData = { regions: GeoCollection; provinces: GeoCollection; municipalities: GeoCollection; barangays: GeoCollection };
type ProvinceInfo = { name: string; lat: number; lng: number };

const EMPTY: GeoCollection = { type: "FeatureCollection", features: [] };
const DEFAULT_CENTER = { lat: 12.8797, lng: 121.774 };
const DEFAULT_ZOOM = 5.5;
const MAP_LAYERS = [{ attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', baseLayerIsChecked: true, baseLayerName: "OpenStreetMap.Mapnik", url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }];

function coords(geometry: Geometry | null): number[][] {
  if (!geometry) return [];
  switch (geometry.type) {
    case "Point": return [geometry.coordinates];
    case "MultiPoint":
    case "LineString": return geometry.coordinates;
    case "MultiLineString":
    case "Polygon": return geometry.coordinates.flat();
    case "MultiPolygon": return geometry.coordinates.flat(2);
    case "GeometryCollection": return geometry.geometries.flatMap(item => coords(item));
    default: return [];
  }
}

function center(geometry: Geometry | null): [number, number] | null {
  const points = coords(geometry).filter(p => Number.isFinite(p[0]) && Number.isFinite(p[1]));
  if (!points.length) return null;
  const lngs = points.map(p => p[0]);
  const lats = points.map(p => p[1]);
  return [(Math.min(...lngs) + Math.max(...lngs)) / 2, (Math.min(...lats) + Math.max(...lats)) / 2];
}

function nameOf(feature: GeoFeature): string {
  const p = feature.properties ?? {};
  return String(p.name ?? p.province_name ?? p.municipality_name ?? p.mun_name ?? p.barangay_name ?? p.region_name ?? p.NAME_1 ?? p.NAME_2 ?? p.NAME_3 ?? p.NAME ?? "");
}

function collection(value: unknown): GeoCollection {
  if (typeof value === "object" && value !== null && "type" in value && value.type === "FeatureCollection" && "features" in value && Array.isArray(value.features)) return value as GeoCollection;
  return EMPTY;
}

function normalize(value: unknown): GeoData {
  const response = value as { data?: Record<string, unknown>; regions?: unknown; provinces?: unknown; municipalities?: unknown; barangays?: unknown };
  const data = response?.data ?? response;
  return { regions: collection(data?.regions), provinces: collection(data?.provinces), municipalities: collection(data?.municipalities), barangays: collection(data?.barangays) };
}

function toLeafletShapes(data: GeoCollection, prefix: string, selectedName: string): MapShape[] {
  const shapes: MapShape[] = [];
  data.features.forEach((feature, i) => {
    const geometry = feature.geometry;
    if (!geometry) return;
    const isSelected = prefix === "province" && normalizeName(nameOf(feature)) === normalizeName(selectedName);
    const polygons = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.type === "MultiPolygon" ? geometry.coordinates : [];
    polygons.forEach((polygon, j) => {
      const ring = polygon[0];
      if (!ring || ring.length < 3) return;
      shapes.push({
        id: `${prefix}-${feature.id ?? i}-${j}`,
        shapeType: MapShapeType.POLYGON,
        color: isSelected ? "#35408E" : "transparent",
        positions: ring.map(([lng, lat]) => ({ lat, lng })),
      });
    });
  });
  return shapes;
}

function unwrapHubs(response?: TreatmentHubApiResponse): TreatmentHub[] {
  return (response?.data?.edges ?? []).map(edge => edge.node).filter(hub => Boolean(hub?.treatment_hub_id) && Boolean(hub?.name));
}

function provinceNameOf(hub: TreatmentHub): string {
  const p = hub.provinces;
  return String(hub.province_name ?? p?.province_name ?? p?.name ?? p?.name_1 ?? "").trim();
}

function normalizeName(value?: string | null): string {
  return (value ?? "").trim().toLowerCase().replace(/\s+/g, " ");
}

export default function Map() {
  const responsive = useResponsive();
  const styles = useMemo(() => mapStyles(responsive), [responsive]);
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState("Choose a Province");
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string | null>(null);
  const [selectedMunicipalityCode, setSelectedMunicipalityCode] = useState<string | null>(null);
  const [selectedProvinceInfo, setSelectedProvinceInfo] = useState<ProvinceInfo>({ name: "Choose a Province", lat: 0, lng: 0 });
  const [mapCenterPosition, setMapCenterPosition] = useState(DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM);
  const [filters, setFilters] = useState({ heatmap: false, treatment: true });
  const [open, setOpen] = useState(false);
  const [selectedHubId, setSelectedHubId] = useState<string | null>(null);
  const slideAnim = useRef(new Animated.Value(500)).current;

  const { data: hubResponse, isLoading: hubsLoading, isError: hubsIsError, error: hubsQueryError } = useFormQuery<TreatmentHubApiResponse>({
    key: ["treatment-hubs"],
    url: "/maintenance/treatment-hub",
    headers: { "x-api-key": API_KEY_VALUE, "x-api-version": "2026-02-26", "Content-Type": "application/json" },
    params: { limit: 100, orderBy: "name", sortBy: "asc" },
  });

  const allHubs = useMemo(() => unwrapHubs(hubResponse), [hubResponse]);
  const filteredHubs = useMemo(() => {
    if (selectedRegion === "Choose a Province") return [];
    return allHubs.filter(hub => normalizeName(provinceNameOf(hub)) === normalizeName(selectedRegion) && hub.is_deleted !== true);
  }, [allHubs, selectedRegion]);
  const hubMarkers = useMemo(() => TreatmentHubMapMarkers({ hubs: filters.treatment ? filteredHubs : [] }), [filters.treatment, filteredHubs]);

  const toggleDrawer = useCallback(() => {
    const next = !open;
    Animated.timing(slideAnim, { toValue: next ? 0 : 500, duration: 250, useNativeDriver: true }).start();
    setOpen(next);
  }, [open, slideAnim]);

  useEffect(() => {
    let mounted = true;
    async function loadGeospatialData() {
      try {
        setLoading(true);
        setError(null);
        const baseUrl = API_URL.replace(/\/+$/, "");
        const headers = { "Content-Type": "application/json", "x-api-key": API_KEY_VALUE };
        const [geometryResponse, hierarchyResponse] = await Promise.all([
          fetch(`${baseUrl}/maintenance/geospatial/geom`, { method: "GET", headers }),
          fetch(`${baseUrl}/maintenance/geospatial/hierarchy`, { method: "GET", headers }),
        ]);
        if (!geometryResponse.ok) throw new Error(`Geometry request failed: ${geometryResponse.status} ${geometryResponse.statusText}`);
        if (!hierarchyResponse.ok) throw new Error(`Hierarchy request failed: ${hierarchyResponse.status} ${hierarchyResponse.statusText}`);
        const geometryJson = await geometryResponse.json();
        await hierarchyResponse.json();
        if (mounted) setGeoData(normalize(geometryJson));
      } catch (e) {
        if (mounted) setError(e instanceof Error ? e.message : "Failed to load map data.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadGeospatialData();
    return () => { mounted = false; };
  }, []);

  const leafletShapes = useMemo<MapShape[]>(() => {
    if (!geoData) return [];

    return [
      ...toLeafletShapes(geoData.provinces, "province", selectedRegion),
    ];
  }, [geoData, selectedRegion]);

  const flyToProvince = useCallback((provinceName: string) => {
    const feature = geoData?.provinces.features.find(item => normalizeName(nameOf(item)) === normalizeName(provinceName));
    if (!feature?.geometry) {
      console.warn("[MAP] Province not found:", provinceName);
      return;
    }
    const c = center(feature.geometry);
    if (!c) return;
    const code = feature.properties?.code != null ? String(feature.properties.code) : null;
    setSelectedRegion(provinceName);
    setSelectedProvinceCode(code);
    setSelectedMunicipalityCode(null);
    setSelectedHubId(null);
    setSelectedProvinceInfo({ name: provinceName, lat: c[1], lng: c[0] });
    setMapCenterPosition({ lat: c[1], lng: c[0] });
    setMapZoom(8);
  }, [geoData]);

  const selectHub = useCallback((hub: TreatmentHub) => {
    setSelectedHubId(hub.treatment_hub_id);
    const lat = Number(hub.latitude);
    const lng = Number(hub.longitude);
    if (hub.latitude != null && hub.longitude != null && Number.isFinite(lat) && Number.isFinite(lng)) {
      setMapCenterPosition({ lat, lng });
      setMapZoom(13);
    }
  }, []);

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#35408E" />
        <ThemedText style={styles.loadingText}>Loading map...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={icon(48)} color="#D32F2F" />
        <ThemedText style={styles.errorTitle}>Failed to load map</ThemedText>
        <ThemedText style={styles.errorMessage}>{error}</ThemedText>
        <TouchableOpacity onPress={() => { setLoading(true); setError(null); }} style={styles.reloadButton}>
          <ThemedText style={styles.reloadText}>Please reload the screen to try again.</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.pageContainer} contentContainerStyle={styles.scrollContent}>
      <ThemedView>
        <ThemedView style={styles.mapContainer}>
          <ThemedView style={styles.topControls}>
            <MapDropdown selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} onProvinceSelect={flyToProvince} />
            <TouchableOpacity style={styles.filterBtn} onPress={toggleDrawer} activeOpacity={0.75}>
              <Ionicons name="filter" size={icon(22)} color="white" />
            </TouchableOpacity>
          </ThemedView>

          <MapFilterDrawer visible={open} filters={filters} setFilters={setFilters} slideAnim={slideAnim} onClose={toggleDrawer} />

          <ThemedView style={styles.legendBox}>
            <ThemedView style={styles.boxBG}>
              <ThemedView style={styles.legendContainer}>
                {[
                  { label: "High", style: styles.legendHigh },
                  { label: "Medium", style: styles.legendMedium },
                  { label: "Low", style: styles.legendLow },
                ].map(({ label, style }) => (
                  <ThemedView style={styles.legend} key={label}>
                    <ThemedView style={[styles.legendColor, style]} />
                    <ThemedText style={styles.legendLabel}>{label}</ThemedText>
                  </ThemedView>
                ))}
              </ThemedView>
            </ThemedView>
          </ThemedView>

          <View style={styles.leafletContainer}>
            <LeafletView
              mapCenterPosition={mapCenterPosition}
              zoom={mapZoom}
              mapLayers={MAP_LAYERS}
              mapShapes={leafletShapes}
              mapMarkers={hubMarkers as MapMarker[]}
              onMessageReceived={(message: any) => {
                const payload = message?.payload;
                if (payload?.type !== "FEATURE_SELECTED" || typeof payload?.name !== "string") return;
                if (payload.level === "province") flyToProvince(payload.name);
                else if (payload.level === "region") {
                  const region = geoData?.regions.features.find(feature => normalizeName(nameOf(feature)) === normalizeName(payload.name));
                  const c = region?.geometry ? center(region.geometry) : null;
                  if (c) {
                    setSelectedRegion(payload.name);
                    setSelectedProvinceCode(null);
                    setSelectedMunicipalityCode(null);
                    setSelectedHubId(null);
                    setSelectedProvinceInfo({ name: payload.name, lat: c[1], lng: c[0] });
                    setMapCenterPosition({ lat: c[1], lng: c[0] });
                    setMapZoom(6);
                  }
                }
              }}
              onError={event => console.error("[LEAFLET ERROR]", event.nativeEvent)}
              onLoadEnd={() => console.log("[LEAFLET] WebView loaded")}
              doDebug
            />
          </View>

          <ThemedView style={styles.contentContainer}>
            <ThemedView style={styles.contentBG}>
              <ThemedText style={styles.coordinatesText}>
                {selectedProvinceInfo.name === "Choose a Province" ? "--" : `${Math.abs(selectedProvinceInfo.lat).toFixed(4)}° ${selectedProvinceInfo.lat >= 0 ? "N" : "S"}, ${Math.abs(selectedProvinceInfo.lng).toFixed(4)}° ${selectedProvinceInfo.lng >= 0 ? "E" : "W"}`}
              </ThemedText>
              <ThemedText style={styles.contentProvince}>{selectedProvinceInfo.name}</ThemedText>
              <ThemedView style={styles.contentStatsRow}>
                <ThemedText style={styles.otherContent}>Mentions: <ThemedText style={styles.moreContent}>1,458</ThemedText></ThemedText>
                <ThemedText style={styles.otherContent}>Stigma Index: <ThemedText style={styles.moreContent}>14.2</ThemedText></ThemedText>
              </ThemedView>
              <ThemedText style={styles.otherContent}>Sentiment: <ThemedText style={styles.moreContent}>0.2% Neutral</ThemedText></ThemedText>
              <ThemedText style={styles.otherContent}>Top Trending Topic: <ThemedText style={styles.moreContent}>#HIVAwareness</ThemedText></ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.resourcesContainer}>
          <ThemedView style={styles.sectionHeader}>
            <ThemedView style={styles.sectionIconBubble}>
              <Ionicons name="medkit-outline" size={icon(16)} color="#35408E" />
            </ThemedView>
            <ThemedText style={styles.resourcesTitle}>Treatment Hubs</ThemedText>
          </ThemedView>

          {selectedRegion === "Choose a Province" ? (
            <ThemedView style={styles.emptyStateContainer}>
              <Ionicons name="map-outline" size={36} style={styles.emptyStateIcon} />
              <ThemedText style={styles.emptyStateText}>Choose a province to view treatment hubs.</ThemedText>
            </ThemedView>
          ) : hubsLoading ? (
            <ActivityIndicator size="large" color="#35408E" style={styles.hubsLoading} />
          ) : hubsIsError ? (
            <ThemedText style={styles.hubsError}>
              {hubsQueryError instanceof Error ? hubsQueryError.message : "Failed to load treatment hubs."}
            </ThemedText>
          ) : filteredHubs.length === 0 ? (
            <ThemedView style={styles.emptyStateContainer}>
              <Ionicons name="medkit-outline" size={icon(32)} style={styles.emptyStateIcon} />
              <ThemedText style={styles.emptyStateText}>No treatment hubs found in {selectedRegion}.</ThemedText>
            </ThemedView>
          ) : (
            <TreatmentHubList hubs={filteredHubs} selectedHubId={selectedHubId} onSelectHub={selectHub} />
          )}
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

    