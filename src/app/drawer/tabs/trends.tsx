import { RecentTable } from '@/components/recent-table';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TrendsFilter } from '@/components/trends-filter';
import { TrendingTopics } from '@/components/trendtopics-box';
import { FontAwesome5 } from "@expo/vector-icons";
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

export default function Trends() {

  const router = useRouter();
  const [showFilter, setShowFilter] = useState(false);

  return (
    <ScrollView style={styles.pageContainer} contentContainerStyle={styles.scrollContent}>
      <ThemedView>
        <ThemedView style={styles.headerContainer}>
          <ThemedText type='title'>
            Trending Topics
          </ThemedText>
          <TouchableOpacity onPress={() => {
              console.log("Filter clicked");
              setShowFilter(!showFilter);
            }} style={{ zIndex: 1000 }}>
            <FontAwesome5 name="filter" size={24} color="#35408E" />
          </TouchableOpacity>
        </ThemedView>
        {showFilter && (
            <TrendsFilter onClose={() => setShowFilter(false)} />
          )}
        <ThemedView style={styles.titleLine}/>

        <ThemedView style={styles.summaryContainer}>
          <TrendingTopics/>
        </ThemedView>

        <ThemedView style={styles.titleContainer}>
          <ThemedView style={styles.title}>
            <ThemedText style={styles.titleText}>
              Mentions Timeline
            </ThemedText>
            <ThemedText type='default'>
              Daily count of HIV-related mentions across all platforms
            </ThemedText>
          </ThemedView>
      
          <ThemedView style={styles.graphBG}>
              <ThemedText style={{textAlign: "center"}}>Add Graph Here</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.titleContainer}>
          <ThemedView style={styles.title}>
            <ThemedText style={styles.titleText}>
              Distribution by Platform
            </ThemedText>
            <ThemedText type='default'>
              HIV-related mentions by social media platforms
            </ThemedText>
          </ThemedView>
      
          <ThemedView style={styles.graphBG}>
              <ThemedText style={{textAlign: "center"}}>Add Graph Here</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.breakdownBG}>
            <ThemedView style={styles.breakdownContent}>
              <ThemedView style={{backgroundColor: "transparent"}}>
                <ThemedText style={styles.titleText}>
                  Topic Breakdown
                </ThemedText>

                <ThemedView style={styles.legendContainer}>
                  <ThemedView style={styles.legend}>
                    <ThemedView style={{backgroundColor: "#3BB329", padding: 10}}/>
                    <ThemedText style={styles.legendLabel}>
                      Prevention
                    </ThemedText>
                  </ThemedView>

                  <ThemedView style={styles.legend}>
                    <ThemedView style={{backgroundColor: "#FFA400", padding: 10}}>
                    </ThemedView>
                    <ThemedText style={styles.legendLabel}>
                      Misinformation
                    </ThemedText>
                  </ThemedView>

                  <ThemedView style={styles.legend}>
                    <ThemedView style={{backgroundColor: "red", padding: 10}}>
                    </ThemedView>
                    <ThemedText style={styles.legendLabel}>
                      Stigma
                    </ThemedText>
                  </ThemedView>
                </ThemedView>

              </ThemedView>

              <ThemedView style={{backgroundColor: "transparent", padding: 50}}>
                  <ThemedText style={{textAlign: "center"}}>Add Graph Here</ThemedText>
              </ThemedView>

            </ThemedView>
        </ThemedView>

        <ThemedView style={styles.titleContainer}>
          <ThemedView style={styles.title}>
            <ThemedText style={styles.titleText}>
              Recent Mentions
            </ThemedText>
            <ThemedText type='default'>
              Latest HIV-related mentions from social media
            </ThemedText>
          </ThemedView>
      
           <RecentTable/> {/* Fix this */}
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
    marginHorizontal: 20, 
    marginTop: 10, 
    backgroundColor: "transparent"
  },
  legend: {
    flexDirection: "row", 
    gap: 10, 
    padding: 10, 
    justifyContent: "flex-start", 
    alignItems:"center", 
    backgroundColor: "transparent"
  },
  legendLabel: {
    fontSize: 12, 
    fontWeight: "medium"
  },
  titleContainer: {
    padding: 10,
    marginBottom: 5,
  },
  title:{
    marginBottom: 10,

  },
  titleLine: {
    backgroundColor: "#35408E", 
    padding: 0.5,
    marginHorizontal: 10, 
    marginTop: 1
  },
  titleText: {
    fontSize: 20,
    color: "#35408E",
    fontWeight: "bold",
    paddingVertical: 3
  },
  breakdownBG: {  
    backgroundColor: "#E4E8F0",
    width: "100%",
    padding: 5,
    marginBottom: 10
  },
  breakdownContent: {
    flexDirection: "row", 
    padding: 20, 
    justifyContent: "center", 
    gap: 5, 
    backgroundColor: "transparent",
    flexWrap: "nowrap"
  }
});
