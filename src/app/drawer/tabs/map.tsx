import MapDropdown from "@/components/dropdown/map-region-dropdown";
import MapFilterDrawer from "@/components/filters/mapfilter-drawer";
import { provinceCoordinates } from "@/components/province-coordinates";
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { mapStyles } from "@/styles/map-styles";
import { font, useResponsive } from "@/styles/responsive";
import { Ionicons } from '@expo/vector-icons';
import { Camera, CameraRef, Map as MalibreMap } from "@maplibre/maplibre-react-native";
import * as Device from 'expo-device';
import React, { useMemo, useRef, useState } from 'react';
import { Animated, Linking, Platform, ScrollView, TouchableOpacity } from 'react-native';

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function Map() {

  const r = useResponsive();
  const styles = useMemo(() => mapStyles(r), [r]);

  const [selectedRegion, setSelectedRegion] = useState("Choose a Province");

const [selectedProvinceInfo, setSelectedProvinceInfo] = useState({
  name: "Choose a Province",
  lat: 0.0,
  lng: 0.0,
});
  
  const [filters, setFilters] = useState({
    heatmap: false,
    testingCenters: false,
    supportGroups: false,
    events: false,
    treatment: false,
  });

  const [open, setOpen] = useState(false);

  const slideAnim = useRef(new Animated.Value(500)).current;

  const toggleDrawer = () => {
    const toValue = open ? 500 : 0;

    Animated.timing(slideAnim, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();

    setOpen(!open);
  };

  const [showMapResource, setShowMapResource] =
    useState(false);

  const [showSubmitResource, setShowSubmitResource] =
    useState(false);

  const [region, setRegion] = useState({
    latitude: 14.5995,
    longitude: 120.9842,
    latitudeDelta: 0.15,
    longitudeDelta: 0.15,
  });

const resources = [
  {
    id: 1,
    title: "Manila Health Center",
    description: "Free HIV testing",
    latitude: 14.5995,
    longitude: 120.9842,
  },
  {
    id: 2,
    title: "Love Yourself Manila",
    description: "HIV Screening",
    latitude: 14.6043,
    longitude: 120.9828,
  },
];

const flyToProvince = (province: string) => {
  const location = provinceCoordinates[province];

  if (!location || !cameraRef.current) return;

  // Update the information card
  setSelectedProvinceInfo({
    name: province,
    lat: location.lat,
    lng: location.lng,
  });

  cameraRef.current.setStop({
    center: [location.lng, location.lat],
    zoom: location.zoom,
    easing: "fly",
    duration: 1500,
  });
};

const cameraRef = useRef<CameraRef>(null);

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
          

            {/* FILTER BUTTON */}
            <TouchableOpacity style={styles.filterBtn} onPress={toggleDrawer}>
              <Ionicons name="filter" size={22} color="white" />
            </TouchableOpacity>
          </ThemedView>


          {/* DRAWER COMPONENT */}
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
                  <ThemedView style={styles.legend}>
                    <ThemedView style={[styles.legendColor, {backgroundColor: "red"}]}/>
                    <ThemedText style={styles.legendLabel}>High</ThemedText>
                  </ThemedView>
                  <ThemedView style={styles.legend}>
                    <ThemedView style={[styles.legendColor, {backgroundColor: "#FFB633"}]}/>
                    <ThemedText style={styles.legendLabel}>Medium</ThemedText>
                  </ThemedView>
                  <ThemedView style={styles.legend}>
                    <ThemedView style={[styles.legendColor, {backgroundColor: "#3BB329"}]}/>
                    <ThemedText style={styles.legendLabel}>Low</ThemedText>
                  </ThemedView>
            </ThemedView>
            </ThemedView>
          </ThemedView>
          

          <ThemedView style={styles.contentContainer}>
            <ThemedView style={styles.contentBG}>
              <ThemedText style={{ alignSelf: "flex-end", lineHeight: font(12) }}>
                {`${Math.abs(selectedProvinceInfo.lat).toFixed(4)}° ${
                  selectedProvinceInfo.lat >= 0 ? "N" : "S"
                }, ${Math.abs(selectedProvinceInfo.lng).toFixed(4)}° ${
                  selectedProvinceInfo.lng >= 0 ? "E" : "W"
                }`}
              </ThemedText>
              <ThemedText style={styles.contentProvince}>
                {selectedProvinceInfo.name}
              </ThemedText>
                
              <ThemedView style={{flexDirection: "row", justifyContent: "space-between", backgroundColor: "transparent",}}>
                <ThemedText style={styles.otherContent}>
                Mentions: <ThemedText style={styles.moreContent}>1,458</ThemedText>
                </ThemedText>
                <ThemedText style={styles.otherContent}>
                Stigma Index: <ThemedText style={styles.moreContent}>14.2</ThemedText>
                </ThemedText>
              </ThemedView>
              
              <ThemedText style={styles.otherContent}>
                  Sentiment: <ThemedText style={styles.moreContent}>0.2% Neutral</ThemedText>
              </ThemedText>
              
              <ThemedText style={styles.otherContent}>
                Top Trending Topic: <ThemedText style={styles.moreContent}>#HIVAwareness</ThemedText>
              </ThemedText>
            </ThemedView>

          </ThemedView>

          <MalibreMap
          mapStyle={"https://maps.geo.ap-southeast-1.amazonaws.com/v2/styles/Standard/descriptor?key=v1.public.eyJqdGkiOiI1MTMwZWQ2NC1hN2ZlLTQzOTUtYWFhYy1mMTRmYjI0OTU3MmYifYep8xGWaQn8Hppl0oFB5xES3YDu_00GDUjeiVicmuUiLS6Jp6uKNgHMPckJszq9HFA-7HlkE6s6s2CuFLWINA-ENLetulRojWqQCE4nnoH8vk8MJrJP6iuEJOf1Mxoz7ug2-Djwp9Es8yOVe8Hf1jIX7bXrpEEkXEBekrHg0A_04GSV0A6i_vo1-TjnV9zvO4yOhuLp1iJwqjxV_ogrFiahsYDwfmIa3VVo0To3y_kdLMNalgOMvJRD3ipywt4YkhMDaqbMTXFAS74mZmkAcLO39AU10CHq9WBPOWGQLK1fqDN0OaU-0i8u4sO6ceInCxzryrsu73KvURdHqAFU1W0.MzRjYzZmZGUtZmY3NC00NDZiLWJiMTktNTc4YjUxYTFlOGZi"}>
            <Camera
              ref={cameraRef}
              initialViewState={{
                center: [121.744, 12.9],
                zoom: 5.5,
              }}
            />
          </MalibreMap>

          
          
        </ThemedView>

        <ThemedView style={styles.resourcesContainer}>
          <ThemedText style={styles.resourcesTitle}>
            Nearby Resources
          </ThemedText>

          <ThemedView style={styles.resourcesBG}>
            <ThemedView style={styles.resources}>
                <ThemedText style={styles.resourcePlace}>Manila Health Center</ThemedText>
                <ThemedView style={styles.resourceLabelBG}>
                  <ThemedText style={styles.resourceLabel}>Testing</ThemedText>
                </ThemedView>
            </ThemedView>

            <ThemedText style={styles.resourceDesc}>Free HIV testing and counseling services</ThemedText>

            <ThemedView style={styles.directionContainer}>
              <ThemedView style={styles.directionLocation}>
                <Ionicons name="location-outline" size={15} color="#777777"/>
                <ThemedText style={styles.locationText}>2.3 km away</ThemedText>
              </ThemedView>
              <TouchableOpacity
                onPress={() => Linking.openURL("https://www.google.com")}
              >
                <ThemedText style={styles.directionLink}>
                  Directions
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>

          {/* <TouchableOpacity style={styles.resourcesBG} onPress={() => setShowMapResource(true)} >
            <ThemedText style={styles.buttonText}>
              + Add New Resource
            </ThemedText>
          </TouchableOpacity>

          <MapResource
            visible={showMapResource}
            onClose={() => setShowMapResource(false)}
            onSubmit={() => setShowSubmitResource(true)}
          />

          <SubmitResource
            visible={showSubmitResource}
            onClose={() => setShowSubmitResource(false)}
          /> */}


        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   pageContainer: {
//     flex: 1,
//     backgroundColor: "white",
//     padding: 5
//   },
//   scrollContent: {
//     paddingBottom: 90,
//   },
//   headerContainer:{
//     flexDirection: 'row', 
//     justifyContent: "space-between",
//     padding: 10,
//     position: "relative"
//   },
//   summaryContainer: {
//     padding: 5,
//   },
//   mapContainer: {
//     height: 750,
//     borderBottomWidth: 2,
//     borderBottomColor: "#35408E",
//     overflow: "hidden",
//     position: "relative",
//   },
//   mapDropdown: {
//     position: "absolute",
//     width: "95%",
//     top: 10,
//     left: 10,
//     right: 60,
//     backgroundColor: "transparent",
//     zIndex: 999,
//   },
//   boxBG:{
//     backgroundColor: "white", 
//     width: "100%", 
//     padding: 15, 
//     borderRadius: 12,
//     marginBottom: 10,
//     borderColor: "#E0E4F0",
//     borderWidth: 1,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.15,
//     shadowRadius: 5,
//     elevation: 2
//   },
//   legendBox: {
//     position: "absolute",
//     top: 75,
//     left: 10,
//     right: 10,
//     backgroundColor: "transparent",
//     zIndex: 20,
//   },
//   legendContainer: {
//     justifyContent: "space-around",
//     backgroundColor: "transparent",
//     flexDirection: "row",
//   },
//   legend: {
//     flexDirection: "row", 
//     gap: 10, 
//     justifyContent: "flex-start", 
//     alignItems:"center", 
//     backgroundColor: "transparent"
//   },
//   legendLabel: {
//     fontSize: 14, 
//     fontWeight: "medium"
//   },
//   highColor: {
//     backgroundColor: "red", 
//     padding: 10, 
//     marginRight: 5,
//     borderRadius: 5
//   },
//   mediumColor: {
//     backgroundColor: "#FFB633", 
//     padding: 10, 
//     marginRight: 5,
//     borderRadius: 5
//   },
//   lowColor: {
//     backgroundColor: "#3BB329", 
//     padding: 10, 
//     marginRight: 5,
//     borderRadius: 5
//   },
//   filterBtn: {
//     position: "absolute",
//     top: 10,
//     right: 10,
//     backgroundColor: "#35408E",
//     padding: 12,
//     borderRadius: 30,
//     zIndex: 999,
//   },
//   contentContainer: {
//     position: "absolute",
//     bottom: 10,
//     left: 10,
//     right: 10,
//     backgroundColor: "transparent",
//     zIndex: 20,
//   },
//   contentBG:{
//     backgroundColor: "white", 
//     width: "100%", 
//     padding: 15, 
//     borderRadius: 12,
//     marginBottom: 10,
//     marginTop: "auto", 
//     borderColor: "#E0E4F0",
//     borderWidth: 1,
//         shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.10,
//     shadowRadius: 5,
//     elevation: 2
    
//   },
//   contentProvince: {
//     fontSize: 26, 
//     fontWeight: "bold", 
//     paddingVertical: 10,
//     paddingTop: 20,
//   },
//   otherContent: {
//     fontSize: 16, 
//     fontWeight: "400", 
//     paddingVertical: 3
//   },
//   moreContent: {
//     fontSize: 16, 
//     fontWeight: "bold"
//   },
//   resourcesContainer: {
//     paddingVertical: 20,
//     paddingHorizontal: 10
//   },
//    resourcesBG:{
//     backgroundColor: "white", 
//     width: "100%", 
//     padding: 15, 
//     borderRadius: 12,
//     marginBottom: 10,
//     elevation: 2,
//     borderWidth: 1,
//     borderColor: "#E4E8F0",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.12,
//     shadowRadius: 3,
//   },
//   resourcesTitle: {
//     paddingVertical: 10,
//     fontSize: 20,
//     fontWeight: "bold"
//   },
//   resources: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     gap: 5,
//     backgroundColor: "transparent",
//     marginTop: 10,
//   },
//   resourcePlace: {
//     fontSize: 22,
//     fontWeight: "bold",
//     paddingVertical: 5,
//   },
//   resourceLabelBG: {
//     backgroundColor: "pink", 
//     width: "auto", 
//     paddingHorizontal: 10,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#E20000",
//     justifyContent: "center"
//   },
//   resourceLabel: {
//     fontSize: 12,
//     fontWeight: "400",
//     color: "#E20000"
//   },
//   resourceDesc: {
//     fontSize: 14,
//     fontWeight: "500"
//   },
//   directionContainer: {
//     flexDirection: "row", 
//     justifyContent: "space-between",
//     backgroundColor: "transparent",
//     paddingVertical: 5
//   },
//   directionLocation: {
//     flexDirection: "row", 
//     gap: 5,
//     backgroundColor: "transparent",
//   },
//   locationText: {
//     color: "#777777",
//     fontSize: 11
//   },
//   directionLink: {
//     fontSize: 11,
//     fontWeight: "700",
//     color: "#3781C1"
//   },
//   // buttonText: {
//   //   fontSize: 20, 
//   //   fontWeight: "bold", 
//   //   textAlign: "center", 
//   //   padding: 10
//   // }

// });
