import { TrendingTopics } from '@/components/cards/trendtopics-box';
import { TrendsFilter } from '@/components/filters/trends-filter';
import { RecentTable } from '@/components/table/recent-table';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { icon, scale } from '@/styles/responsive';
import { trendsPageStyles as styles } from '@/styles/trends/trends-styles';
import { Ionicons } from "@expo/vector-icons";
import * as Device from 'expo-device';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Platform, ScrollView, TouchableOpacity } from 'react-native';

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
      <ThemedView style={styles.pageInner}>
        <ThemedView style={styles.headerContainer}>
          <ThemedText type='title'>
            Trending Topics
          </ThemedText>
          <TouchableOpacity onPress={() => {
              console.log("Filter clicked");
              setShowFilter(!showFilter);
            }} style={styles.filterBtn}>
            <Ionicons name="options-outline" size={icon(24)} color="#35408E" />
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
                    <ThemedView style={[styles.legendColor, {backgroundColor: "#3BB329"}]}/>
                    <ThemedText style={styles.legendLabel}>
                      Prevention
                    </ThemedText>
                  </ThemedView>

                  <ThemedView style={styles.legend}>
                    <ThemedView style={[styles.legendColor, {backgroundColor: "#FFA400"}]}>
                    </ThemedView>
                    <ThemedText style={styles.legendLabel}>
                      Misinformation
                    </ThemedText>
                  </ThemedView>

                  <ThemedView style={styles.legend}>
                    <ThemedView style={[styles.legendColor, {backgroundColor: "red"}]}>
                    </ThemedView>
                    <ThemedText style={styles.legendLabel}>
                      Stigma
                    </ThemedText>
                  </ThemedView>
                </ThemedView>

              </ThemedView>

              <ThemedView style={{backgroundColor: "transparent", padding: scale(50)}}>
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