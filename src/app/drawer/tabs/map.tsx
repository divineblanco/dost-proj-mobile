import MapDropdown from "@/components/dropdown/map-region-dropdown";
import MapFilterDrawer from "@/components/filters/mapfilter-drawer";
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import * as Device from 'expo-device';
import React, { useRef, useState } from 'react';
import { Animated, Linking, Platform, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

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

  const [selectedRegion, setSelectedRegion] = useState("Choose a Province");
  
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

  return (
    <ScrollView style={styles.pageContainer} contentContainerStyle={styles.scrollContent}>
      <ThemedView>
        <ThemedView style={styles.mapBG}>

          <MapDropdown
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
          />

            {/* FILTER BUTTON */}
          <TouchableOpacity style={styles.filterBtn} onPress={toggleDrawer}>
            <Ionicons name="filter" size={22} color="white" />
          </TouchableOpacity>

          {/* DRAWER COMPONENT */}
          <MapFilterDrawer
            visible={open}
            filters={filters}
            setFilters={setFilters}
            slideAnim={slideAnim}
            onClose={toggleDrawer}
          />

          <ThemedView style={styles.boxBG}>
            <ThemedView style={styles.legendContainer}>
                <ThemedView style={styles.legend}>
                  <ThemedView style={styles.highColor}/>
                  <ThemedText style={styles.legendLabel}>High</ThemedText>
                </ThemedView>
                <ThemedView style={styles.legend}>
                  <ThemedView style={styles.mediumColor}/>
                  <ThemedText style={styles.legendLabel}>Medium</ThemedText>
                </ThemedView>
                <ThemedView style={styles.legend}>
                  <ThemedView style={styles.lowColor}/>
                  <ThemedText style={styles.legendLabel}>Low</ThemedText>
                </ThemedView>
            </ThemedView>
          </ThemedView>

          
          <ThemedView style={styles.contentBG}>
            <ThemedText style={{alignSelf: "flex-end"}}>
              14.5995° N, 120.9842° E
            </ThemedText>
            <ThemedText style={styles.contentProvince}>
              Metro Manila
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

          <TouchableOpacity style={styles.resourcesBG}>
            <ThemedText style={styles.buttonText}>
              + Add New Resource
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 5
  },
  scrollContent: {
    paddingBottom: 90,
  },
  headerContainer:{
    flexDirection: 'row', 
    justifyContent: "space-between",
    padding: 10,
    position: "relative"
  },
  summaryContainer: {
    padding: 5,
  },
  mapBG: {
    padding: 10,
    height: 750,
    backgroundColor: '#7DB9EE',
    borderBottomColor: "#35408E",
    borderBottomWidth: 2
  },
  regionBG: {
    backgroundColor: "white", 
    width: "85%", 
    padding: 15, 
    borderRadius: 12,
    marginBottom: 10
  },
  regionsDropdown: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    backgroundColor: "transparent"
  },
  graphBG:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    padding: 10,
    height: 150,
    gap: 10,
    backgroundColor: '#E4E8F0',
    borderRadius: 12,  
  },
  boxBG:{
    backgroundColor: "white", 
    width: "100%", 
    padding: 15, 
    borderRadius: 12,
    marginBottom: 10,
  },
  legendContainer: {
    justifyContent: "space-around",
    backgroundColor: "transparent",
    flexDirection: "row"
  },
  legend: {
    flexDirection: "row", 
    gap: 10, 
    justifyContent: "flex-start", 
    alignItems:"center", 
    backgroundColor: "transparent"
  },
  legendLabel: {
    fontSize: 14, 
    fontWeight: "medium"
  },
  highColor: {
    backgroundColor: "red", 
    padding: 10, 
    marginRight: 5,
    borderRadius: 5
  },
  mediumColor: {
    backgroundColor: "#FFB633", 
    padding: 10, 
    marginRight: 5,
    borderRadius: 5
  },
  lowColor: {
    backgroundColor: "#3BB329", 
    padding: 10, 
    marginRight: 5,
    borderRadius: 5
  },
  checkboxBG: {
    backgroundColor: "#E4E8F0", 
    width: "50%", 
    padding: 20, 
    alignSelf: "flex-end", 
    borderRadius: 12,
    gap: 10
  },
  checkboxContent: {
    flexDirection: "row", 
    justifyContent: "flex-start", 
    backgroundColor: "transparent", 
    gap: 10
  },
  checkboxLabel: {
    fontSize: 12,
    fontWeight: "500"
  },
  filterBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#35408E",
    padding: 12,
    borderRadius: 30,
    zIndex: 10,
  },
  contentBG:{
    backgroundColor: "white", 
    width: "100%", 
    padding: 15, 
    borderRadius: 12,
    marginBottom: 10,
    marginTop: "auto", 
    
  },
  contentProvince: {
    fontSize: 26, 
    fontWeight: "bold", 
    paddingVertical: 10
  },
  otherContent: {
    fontSize: 16, 
    fontWeight: "400", 
    paddingVertical: 3
  },
  moreContent: {
    fontSize: 16, 
    fontWeight: "bold"
  },
  resourcesContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10
  },
   resourcesBG:{
    backgroundColor: "white", 
    width: "100%", 
    padding: 15, 
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E4E8F0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },
  resourcesTitle: {
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: "bold"
  },
  resources: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    backgroundColor: "transparent",
    marginTop: 10,
  },
  resourcePlace: {
    fontSize: 22,
    fontWeight: "bold",
    paddingVertical: 5,
  },
  resourceLabelBG: {
    backgroundColor: "pink", 
    width: "auto", 
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E20000",
    justifyContent: "center"
  },
  resourceLabel: {
    fontSize: 12,
    fontWeight: "400",
    color: "#E20000"
  },
  resourceDesc: {
    fontSize: 14,
    fontWeight: "500"
  },
  directionContainer: {
    flexDirection: "row", 
    justifyContent: "space-between",
    backgroundColor: "transparent",
    paddingVertical: 5
  },
  directionLocation: {
    flexDirection: "row", 
    gap: 5,
    backgroundColor: "transparent",
  },
  locationText: {
    color: "#777777",
    fontSize: 11
  },
  directionLink: {
    fontSize: 11,
    fontWeight: "700",
    color: "#3781C1"
  },
  buttonText: {
    fontSize: 20, 
    fontWeight: "bold", 
    textAlign: "center", 
    padding: 10
  }

});
