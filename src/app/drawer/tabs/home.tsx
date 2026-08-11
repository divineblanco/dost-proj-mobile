import { DasboardCard } from '@/components/cards/dashboardcard';
import { MisinformationCard } from '@/components/cards/misinformation-card';
import { TrendsCard } from '@/components/cards/trends-card';
import { HomeFilter } from '@/components/filters/home-filter';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { homeStyles } from '@/styles/home-styles';
import { useResponsive } from '@/styles/responsive';
import { Ionicons } from "@expo/vector-icons";
import * as Device from 'expo-device';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
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

export default function Home() {

  const router = useRouter();
  const [showFilter, setShowFilter] = useState(false);
  const r = useResponsive();

  const styles = useMemo(
      () => homeStyles(r),[r]
  );
  // const r = useResponsive();

  // useEffect(() => {
  //   console.log({
  //     width: r.SCREEN_WIDTH,
  //     height: r.SCREEN_HEIGHT,

  //     isPortrait: r.isPortrait,
  //     isLandscape: r.isLandscape,

  //     isTablet: r.isTablet,
  //     isTabletPortrait: r.isTablet && r.isPortrait,
  //     isTabletLandscape: r.isTablet && r.isLandscape,

  //     isShortScreen: r.isShortScreen,
  //     isNormalScreen: r.isNormalScreen,
  //     isTallScreen: r.isTallScreen,
  //     isExtraTallScreen: r.isExtraTallScreen,
  //   });
  // }, [r]);

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
            <ThemedText style={styles.titleTxt}>
              HIV Discussion Thread
            </ThemedText>
            <ThemedText style={styles.default}>
              Daily mentions across all monitored social media platforms
            </ThemedText>
          </ThemedView>
      
          <ThemedView style={styles.graphBG}>
              <ThemedText style={{textAlign: "center"}}>Add Graph Here</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.titleContainer}>
          <ThemedView style={styles.title}>
            <ThemedText style={styles.titleTxt}>
              Sentiment Distribution
            </ThemedText>
            <ThemedText style={styles.default}>
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
            <ThemedText style={styles.titleTxt}>
              Top Trending Topics
            </ThemedText>
            <ThemedText style={styles.default}>
              Most discussed HIV-related topics this week
            </ThemedText>
            <ThemedView style={styles.titleLine}/>
          </ThemedView>
          <TrendsCard/>
        </ThemedView>

        <ThemedView style={styles.titleLine}/>

        <ThemedView style={styles.titleContainer}>
          <ThemedView style={styles.title}>
            <ThemedView style={styles.viewCol}>
              <ThemedText style={styles.titleTxt}>
                Misinformation Alerts
              </ThemedText>
              <ThemedText style={styles.viewTxt} 
                onPress={()=> router.push({
                  pathname: "/drawer/tabs/contributions/contribute",
                  params: {
                    tab: "Misinformation",
                  },
                })}
                >
                View All
              </ThemedText>
            </ThemedView>
            <ThemedText style={styles.default}>
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