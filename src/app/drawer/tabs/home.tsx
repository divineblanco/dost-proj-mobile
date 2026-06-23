import { DasboardCard } from '@/components/dashboardcard';
import { HomeFilter } from '@/components/home-filter';
import { MisinformationCard } from '@/components/misinformation-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TrendsCard } from '@/components/trends-card';
import { Ionicons } from "@expo/vector-icons";
import * as Device from 'expo-device';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

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

export default function Home() {

  const router = useRouter();
  const [showFilter, setShowFilter] = useState(false);

  return (
    <ScrollView style={styles.pageContainer} contentContainerStyle={styles.scrollContent}>
      <ThemedView>
        <ThemedView style={styles.headerContainer}>
          <ThemedText type='title'>
            Daily Overview
          </ThemedText>
          <TouchableOpacity onPress={() => {
              console.log("Filter clicked");
              setShowFilter(!showFilter);
            }} style={styles.filterBtn}>
            <Ionicons name="options-outline" size={20} color="#35408E" />
          </TouchableOpacity>
        </ThemedView>
        {showFilter && (
            <HomeFilter onClose={() => setShowFilter(false)} />
          )}

        <ThemedView style={styles.summaryContainer}>
          <DasboardCard/>
        </ThemedView>

        <ThemedView style={styles.titleContainer}>
          <ThemedView style={styles.title}>
            <ThemedText type='subtitle'>
              HIV Discussion Thread
            </ThemedText>
            <ThemedText type='default'>
              Daily mentions across all monitored social media platforms
            </ThemedText>
          </ThemedView>
      
          <ThemedView style={styles.graphBG}>
              <ThemedText style={{textAlign: "center"}}>Add Graph Here</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.titleContainer}>
          <ThemedView style={styles.title}>
            <ThemedText type='subtitle'>
              Sentiment Distribution
            </ThemedText>
            <ThemedText type='default'>
              Breakdown of positive, negative, and neutral sentiment
            </ThemedText>
          </ThemedView>
      
          <ThemedView style={styles.graphBG}>
              <ThemedText style={{textAlign: "center"}}>Add Graph Here</ThemedText>
          </ThemedView>
        </ThemedView>

        {/* <ThemedView style={styles.titleContainer}>
          <ThemedView style={styles.title}>
            <ThemedText type='subtitle'>
              Demographics
            </ThemedText>
            <ThemedText type='default'>
              Age and gender breakdown of participants
            </ThemedText>
          </ThemedView>
      
          <ThemedView style={styles.graphBG}>
              <ThemedText style={{textAlign: "center"}}>Add Graph Here</ThemedText>
          </ThemedView>

          <ThemedView style={styles.legendContainer}>
            <ThemedView style={styles.legend}>
              <ThemedView style={styles.femaleColor}/>
              <ThemedText type='default'>Female</ThemedText>
            </ThemedView>
            <ThemedView style={styles.legend}>
              <ThemedView style={styles.otherColor}/>
              <ThemedText type='default'>Others</ThemedText>
            </ThemedView>
            <ThemedView style={styles.legend}>
              <ThemedView style={styles.maleColor}/>
              <ThemedText type='default'>Male</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView> */}

        <ThemedView style={styles.titleContainer}>
          <ThemedView style={styles.title}>
            <ThemedText type='subtitle'>
              Top Trending Topics
            </ThemedText>
            <ThemedText type='default'>
              Most discussed HIV-related topics this week
            </ThemedText>
            <ThemedView style={styles.titleLine}/>
          </ThemedView>
          <TrendsCard/>
        </ThemedView>

        <ThemedView style={styles.titleLine}/>

        <ThemedView style={styles.titleContainer}>
          <ThemedView style={styles.title}>
            <ThemedText type='subtitle'>
              Misinformation Alerts
            </ThemedText>
            <ThemedText type='default'>
              Recent identified misinformation requiring attention
            </ThemedText>
          </ThemedView>
          <MisinformationCard/>
        </ThemedView>

        {/* <ThemedView style={styles.titleLine}/>

        <ThemedView style={styles.titleContainer}>
          <ThemedView style={styles.title}>
            <ThemedText type='subtitle'>
              Predictive Analysis
            </ThemedText>
            <ThemedText type='default'>
              AI-powered projection of HIV discussion trends for the next 30 days
            </ThemedText>
          </ThemedView>
      
          <ThemedView style={styles.graphBG}>
              <ThemedText style={{textAlign: "center"}}>Add Graph Here</ThemedText>
          </ThemedView>

          <ThemedView style={styles.legendContainer}>
            <ThemedView style={styles.legend}>
              <ThemedView style={styles.ActualColor}/>
              <ThemedText type='default'>Actual Mentions</ThemedText>
            </ThemedView>
            <ThemedView style={styles.legend}>
              <ThemedView style={styles.PredictedColor}/>
              <ThemedText type='default'>Predicted Mentions</ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.morePredictionsBG}>
            <ThemedView style={styles.morePredictionsInfo}>
              <ThemedText type='subtitleLight'>
                Expected Topics
              </ThemedText>
              <ThemedText type='small'>
                World AIDS Day campaigns expected to grow significantly in the next 2 weeks
              </ThemedText>
            </ThemedView>
          </ThemedView>
           <ThemedView style={styles.morePredictionsBG}>
            <ThemedView style={styles.morePredictionsInfo}>
              <ThemedText type='subtitleLight'>
                Sentiment Prediction
              </ThemedText>
              <ThemedText type='small'>
                Positive sentiment projected to increase by 12% following new treatment campaign
              </ThemedText>
            </ThemedView>
          </ThemedView>
           <ThemedView style={styles.morePredictionsBG}>
            <ThemedView style={styles.morePredictionsInfo}>
              <ThemedText type='subtitleLight'>
                Potential Concerns
              </ThemedText>
              <ThemedText type='small'>
                Misinformation about treatment side effects may emerge in Northern regions
              </ThemedText>
            </ThemedView>
          </ThemedView>

        </ThemedView> */}

      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    paddingBottom: 90,
  },
  headerContainer:{
    flexDirection: 'row', 
    justifyContent: "space-between",
    padding: 15,
    position: "relative",
    alignItems: "center"
  },
  filterBtn: {
    zIndex: 1000, 
    borderWidth: 1, 
    borderColor: "#35408E", 
    borderRadius: 5, 
    padding: 5
  },
  summaryContainer: {
    backgroundColor: "#E4E8F0",
    width: "100%",
    padding: 5,
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
  legendContainer: {
    flexDirection: "row", 
    justifyContent: "space-evenly"
  },
  legend: {
    flexDirection: "row", 
    padding: 10
  },
  femaleColor: {
    backgroundColor: "red", 
    padding: 10, 
    marginRight: 10
  },
  otherColor: {
    backgroundColor: "#FFB633", 
    padding: 10, 
    marginRight: 10
  },
  maleColor: {
    backgroundColor: "#7DB9EE", 
    padding: 10, 
    marginRight: 10
  },
  titleContainer: {
    padding: 15,
  },
  title:{
    marginBottom: 10
  },
  titleLine: {
    backgroundColor: "#35408E", 
    padding: 0.5, 
    marginTop: 8
  },
  ActualColor: {
    borderColor: "#3781C1", 
    borderWidth: 2,
    width: 20,
    height: 20,
    marginRight: 10
  },
  PredictedColor: {
    borderColor: "#E20000", 
    borderWidth: 2,
    borderStyle: "dashed",
    width: 20,
    height: 20, 
    marginRight: 10
  },
  morePredictionsBG:{
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    padding: 10,
    height: "auto",
    gap: 10,
    backgroundColor: '#E4E8F0',
    borderRadius: 12,  
  },
  morePredictionsInfo: {
    padding: 5,
    backgroundColor: "transparent"
  },
});
