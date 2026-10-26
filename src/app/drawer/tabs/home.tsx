// import { DasboardCard } from '@/components/cards/dashboardcard';
// import { MisinformationCard } from '@/components/cards/misinformation-card';
// import { TrendsCard } from '@/components/cards/trends-card';
// import { HomeFilter } from '@/components/filters/home-filter';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { homeStyles } from '@/styles/home-styles';
// import { useResponsive } from '@/styles/responsive';
// import { Ionicons } from "@expo/vector-icons";
// import * as Device from 'expo-device';
// import { useRouter } from 'expo-router';
// import React, { useMemo, useState } from 'react';
// import { Platform, ScrollView, TouchableOpacity } from 'react-native';

// function getDevMenuHint() {
//   if (Platform.OS === 'web') {
//     return <ThemedText type="small">use browser devtools</ThemedText>;
//   }
//   if (Device.isDevice) {
//     return (
//       <ThemedText type="small">
//         shake device or press <ThemedText type="code">m</ThemedText> in terminal
//       </ThemedText>
//     );
//   }
//   const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
//   return (
//     <ThemedText type="small">
//       press <ThemedText type="code">{shortcut}</ThemedText>
//     </ThemedText>
//   );
// }

// export default function Home() {

//   const router = useRouter();
//   const [showFilter, setShowFilter] = useState(false);
//   const r = useResponsive();

//   const styles = useMemo(
//       () => homeStyles(r),[r]
//   );
//   // const r = useResponsive();

//   // useEffect(() => {
//   //   console.log({
//   //     width: r.SCREEN_WIDTH,
//   //     height: r.SCREEN_HEIGHT,

//   //     isPortrait: r.isPortrait,
//   //     isLandscape: r.isLandscape,

//   //     isTablet: r.isTablet,
//   //     isTabletPortrait: r.isTablet && r.isPortrait,
//   //     isTabletLandscape: r.isTablet && r.isLandscape,

//   //     isShortScreen: r.isShortScreen,
//   //     isNormalScreen: r.isNormalScreen,
//   //     isTallScreen: r.isTallScreen,
//   //     isExtraTallScreen: r.isExtraTallScreen,
//   //   });
//   // }, [r]);

//   return (
//     <ScrollView style={styles.pageContainer} contentContainerStyle={styles.scrollContent}>
//       <ThemedView>
//         <ThemedView style={styles.headerContainer}>
//           <ThemedText type='title'>
//             Daily Overview
//           </ThemedText>
//           <TouchableOpacity onPress={() => {
//               console.log("Filter clicked");
//               setShowFilter(!showFilter);
//             }} style={styles.filterBtn}>
//             <Ionicons name="options-outline" size={20} color="#35408E" />
//           </TouchableOpacity>
//         </ThemedView>
//         {showFilter && (
//             <HomeFilter onClose={() => setShowFilter(false)} />
//           )}

//         <ThemedView style={styles.summaryContainer}>
//           <DasboardCard/>
//         </ThemedView>

//         <ThemedView style={styles.titleContainer}>
//           <ThemedView style={styles.title}>
//             <ThemedText style={styles.titleTxt}>
//               HIV Discussion Thread
//             </ThemedText>
//             <ThemedText style={styles.default}>
//               Daily mentions across all monitored social media platforms
//             </ThemedText>
//           </ThemedView>
      
//           <ThemedView style={styles.graphBG}>
//               <ThemedText style={{textAlign: "center"}}>Add Graph Here</ThemedText>
//           </ThemedView>
//         </ThemedView>

//         <ThemedView style={styles.titleContainer}>
//           <ThemedView style={styles.title}>
//             <ThemedText style={styles.titleTxt}>
//               Sentiment Distribution
//             </ThemedText>
//             <ThemedText style={styles.default}>
//               Breakdown of positive, negative, and neutral sentiment
//             </ThemedText>
//           </ThemedView>
      
//           <ThemedView style={styles.graphBG}>
//               <ThemedText style={{textAlign: "center"}}>Add Graph Here</ThemedText>
//           </ThemedView>
//         </ThemedView>

//         {/* <ThemedView style={styles.titleContainer}>
//           <ThemedView style={styles.title}>
//             <ThemedText type='subtitle'>
//               Demographics
//             </ThemedText>
//             <ThemedText type='default'>
//               Age and gender breakdown of participants
//             </ThemedText>
//           </ThemedView>
      
//           <ThemedView style={styles.graphBG}>
//               <ThemedText style={{textAlign: "center"}}>Add Graph Here</ThemedText>
//           </ThemedView>

//           <ThemedView style={styles.legendContainer}>
//             <ThemedView style={styles.legend}>
//               <ThemedView style={styles.femaleColor}/>
//               <ThemedText type='default'>Female</ThemedText>
//             </ThemedView>
//             <ThemedView style={styles.legend}>
//               <ThemedView style={styles.otherColor}/>
//               <ThemedText type='default'>Others</ThemedText>
//             </ThemedView>
//             <ThemedView style={styles.legend}>
//               <ThemedView style={styles.maleColor}/>
//               <ThemedText type='default'>Male</ThemedText>
//             </ThemedView>
//           </ThemedView>
//         </ThemedView> */}

//         <ThemedView style={styles.titleContainer}>
//           <ThemedView style={styles.title}>
//             <ThemedText style={styles.titleTxt}>
//               Top Trending Topics
//             </ThemedText>
//             <ThemedText style={styles.default}>
//               Most discussed HIV-related topics this week
//             </ThemedText>
//             <ThemedView style={styles.titleLine}/>
//           </ThemedView>
//           <TrendsCard/>
//         </ThemedView>

//         <ThemedView style={styles.titleLine}/>

//         <ThemedView style={styles.titleContainer}>
//           <ThemedView style={styles.title}>
//             <ThemedView style={styles.viewCol}>
//               <ThemedText style={styles.titleTxt}>
//                 Misinformation Alerts
//               </ThemedText>
//               <ThemedText style={styles.viewTxt} 
//                 onPress={() => {
//                   console.log('View All - Misinformation');

//                   router.push({
//                     pathname: '/drawer/tabs/contributions/contribute',
//                     params: {
//                       tab: 'Misinformation',
//                             refresh: Date.now().toString(),
//                     },
//                   });
//                 }}
//                 >
//                 View All
//               </ThemedText>
//             </ThemedView>
//             <ThemedText style={styles.default}>
//               Recent identified misinformation requiring attention
//             </ThemedText>
//           </ThemedView>
//           <MisinformationCard/>
//         </ThemedView>

//         {/* <ThemedView style={styles.titleLine}/>

//         <ThemedView style={styles.titleContainer}>
//           <ThemedView style={styles.title}>
//             <ThemedText type='subtitle'>
//               Predictive Analysis
//             </ThemedText>
//             <ThemedText type='default'>
//               AI-powered projection of HIV discussion trends for the next 30 days
//             </ThemedText>
//           </ThemedView>
      
//           <ThemedView style={styles.graphBG}>
//               <ThemedText style={{textAlign: "center"}}>Add Graph Here</ThemedText>
//           </ThemedView>

//           <ThemedView style={styles.legendContainer}>
//             <ThemedView style={styles.legend}>
//               <ThemedView style={styles.ActualColor}/>
//               <ThemedText type='default'>Actual Mentions</ThemedText>
//             </ThemedView>
//             <ThemedView style={styles.legend}>
//               <ThemedView style={styles.PredictedColor}/>
//               <ThemedText type='default'>Predicted Mentions</ThemedText>
//             </ThemedView>
//           </ThemedView>

//           <ThemedView style={styles.morePredictionsBG}>
//             <ThemedView style={styles.morePredictionsInfo}>
//               <ThemedText type='subtitleLight'>
//                 Expected Topics
//               </ThemedText>
//               <ThemedText type='small'>
//                 World AIDS Day campaigns expected to grow significantly in the next 2 weeks
//               </ThemedText>
//             </ThemedView>
//           </ThemedView>
//            <ThemedView style={styles.morePredictionsBG}>
//             <ThemedView style={styles.morePredictionsInfo}>
//               <ThemedText type='subtitleLight'>
//                 Sentiment Prediction
//               </ThemedText>
//               <ThemedText type='small'>
//                 Positive sentiment projected to increase by 12% following new treatment campaign
//               </ThemedText>
//             </ThemedView>
//           </ThemedView>
//            <ThemedView style={styles.morePredictionsBG}>
//             <ThemedView style={styles.morePredictionsInfo}>
//               <ThemedText type='subtitleLight'>
//                 Potential Concerns
//               </ThemedText>
//               <ThemedText type='small'>
//                 Misinformation about treatment side effects may emerge in Northern regions
//               </ThemedText>
//             </ThemedView>
//           </ThemedView>

//         </ThemedView> */}

//       </ThemedView>
//     </ScrollView>
//   );
// }
import { DasboardCard } from '@/components/cards/dashboardcard';
import { MisinformationCard } from '@/components/cards/misinformation-card';
import { TrendsCard } from '@/components/cards/trends-card';
import { HomeFilter } from '@/components/filters/home-filter';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { homeStyles } from '@/styles/home-styles';
import { useResponsive } from '@/styles/responsive';
import { Ionicons } from '@expo/vector-icons';
import * as Device from 'expo-device';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

// STATIC DUMMY DATA
const discussionData = [
  { day: 'Mon', value: 35 }, { day: 'Tue', value: 52 },
  { day: 'Wed', value: 42 }, { day: 'Thu', value: 75 },
  { day: 'Fri', value: 60 }, { day: 'Sat', value: 90 },
  { day: 'Sun', value: 68 },
];

const sentimentData = [
  { label: 'Positive', value: 68, color: '#22A06B' },
  { label: 'Neutral', value: 20, color: '#E5A000' },
  { label: 'Negative', value: 12, color: '#E05252' },
];

// GRAPH THEME
const BRAND = '#35408E';
const BRAND_SOFT = '#C5CAEA';
const GRID = '#E6E9F2';
const MUTED = '#64748B';

// Measures the space graphBG actually gives us (its height is fixed per device
// in home-styles) and hands the exact width/height to the graph so it always
// fits inside without clipping or overflowing.
function ChartFrame({ children }: { children: (w: number, h: number) => React.ReactNode }) {
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);

  return (
    <View
      style={{ width: '100%', height: '100%' }}
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        setBox((prev) =>
          prev && Math.abs(prev.w - width) < 1 && Math.abs(prev.h - height) < 1
            ? prev
            : { w: width, h: height }
        );
      }}
    >
      {box && box.w > 0 && box.h > 0 ? children(box.w, box.h) : null}
    </View>
  );
}

// HIV DISCUSSION BAR GRAPH
function DiscussionGraph() {
  return <ChartFrame>{(w, h) => <DiscussionBars width={w} height={h} />}</ChartFrame>;
}

function DiscussionBars({ width, height }: { width: number; height: number }) {
  const maxValue = 100;
  const peak = Math.max(...discussionData.map((d) => d.value));

  const axisWidth = 26;
  const xLabelHeight = 16;
  const captionHeight = 16;
  const topPad = 14; // room above the tallest bar for its value label
  const plotHeight = Math.max(height - xLabelHeight - captionHeight - 6, 60);
  const scaleHeight = plotHeight - topPad;
  const yTicks = plotHeight >= 110 ? [100, 75, 50, 25, 0] : [100, 50, 0];
  const yPos = (tick: number) => topPad + ((maxValue - tick) / maxValue) * scaleHeight;

  return (
    <View style={{ width, height, justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', height: plotHeight }}>
        {/* Y AXIS LABELS */}
        <View style={{ width: axisWidth, height: plotHeight }}>
          {yTicks.map((tick) => (
            <Text
              key={tick}
              style={{
                position: 'absolute', right: 6, top: yPos(tick) - 7,
                fontSize: 9, lineHeight: 14, color: MUTED,
              }}
            >
              {tick}
            </Text>
          ))}
        </View>

        {/* PLOT AREA */}
        <View style={{ flex: 1, height: plotHeight }}>
          {yTicks.map((tick) => (
            <View
              key={tick}
              style={{
                position: 'absolute', left: 0, right: 0, top: yPos(tick), height: 1,
                backgroundColor: tick === 0 ? '#CBD2E1' : GRID,
              }}
            />
          ))}

          <View style={{ flex: 1, flexDirection: 'row' }}>
            {discussionData.map((item) => {
              const isPeak = item.value === peak;
              return (
                <View
                  key={item.day}
                  style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                  <Text
                    style={{
                      fontSize: 10, lineHeight: 12,
                      fontWeight: isPeak ? '700' : '500',
                      color: isPeak ? BRAND : MUTED,
                      marginBottom: 2,
                    }}
                  >
                    {item.value}
                  </Text>
                  <View
                    style={{
                      width: '56%', maxWidth: 28,
                      height: Math.max((item.value / maxValue) * scaleHeight, 3),
                      backgroundColor: isPeak ? BRAND : BRAND_SOFT,
                      borderTopLeftRadius: 5, borderTopRightRadius: 5,
                    }}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </View>

      {/* X AXIS LABELS */}
      <View style={{ flexDirection: 'row', marginLeft: axisWidth, height: xLabelHeight, alignItems: 'flex-end' }}>
        {discussionData.map((item) => (
          <Text
            key={item.day}
            style={{
              flex: 1, textAlign: 'center', fontSize: 10,
              color: item.value === peak ? BRAND : MUTED,
              fontWeight: item.value === peak ? '700' : '400',
            }}
          >
            {item.day}
          </Text>
        ))}
      </View>

      <Text style={{ textAlign: 'center', color: MUTED, fontSize: 10, height: captionHeight, lineHeight: captionHeight }}>
        Daily mentions (sample data)
      </Text>
    </View>
  );
}

// SENTIMENT DONUT GRAPH
function SentimentGraph() {
  return <ChartFrame>{(w, h) => <SentimentDonut width={w} height={h} />}</ChartFrame>;
}

function SentimentDonut({ width, height }: { width: number; height: number }) {
  // donut on the left, legend on the right, both sized from the available box
  const size = Math.max(Math.min(height, width * 0.42, 190), 60);
  const center = size / 2;
  const strokeWidth = Math.max(size * 0.1, 8);
  const radius = (size - strokeWidth) / 2 - 1;
  const gap = 2;
  const circumference = 2 * Math.PI * radius;
  const total = sentimentData.reduce((sum, d) => sum + d.value, 0);
  const dominant = sentimentData.reduce((a, b) => (b.value > a.value ? b : a));

  let start = 0;
  const segments = sentimentData.map((item) => {
    const length = (item.value / total) * circumference;
    const segment = { ...item, length, start };
    start += length;
    return segment;
  });

  return (
    <View style={{ width, height, flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <G rotation={-90} origin={`${center}, ${center}`}>
            <Circle cx={center} cy={center} r={radius} stroke="#D5DAE8" strokeWidth={strokeWidth} fill="none" />
            {segments.map((seg) => {
              const visible = Math.max(seg.length - gap, 0);
              return (
                <Circle
                  key={seg.label}
                  cx={center} cy={center} r={radius}
                  stroke={seg.color} strokeWidth={strokeWidth} fill="none"
                  strokeDasharray={`${visible} ${circumference - visible}`}
                  strokeDashoffset={-seg.start}
                  strokeLinecap="butt"
                />
              );
            })}
          </G>
        </Svg>

        <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: Math.max(size * 0.17, 12), fontWeight: '700', color: BRAND }}>
            {Math.round((dominant.value / total) * 100)}%
          </Text>
          <Text style={{ fontSize: Math.max(size * 0.075, 8), color: dominant.color, fontWeight: '600' }}>
            {dominant.label}
          </Text>
        </View>
      </View>

      {/* LEGEND */}
      <View style={{ flex: 1, marginLeft: 14, justifyContent: 'center' }}>
        {sentimentData.map((item) => (
          <View key={item.label} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
            <View style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: item.color, marginRight: 6 }} />
            <Text style={{ width: 58, color: '#475569', fontSize: 12 }} numberOfLines={1}>
              {item.label}
            </Text>
            <View
              style={{
                flex: 1, height: 5, borderRadius: 3, backgroundColor: '#D5DAE8',
                marginHorizontal: 8, overflow: 'hidden',
              }}
            >
              <View
                style={{
                  width: `${(item.value / total) * 100}%`, height: '100%',
                  backgroundColor: item.color, borderRadius: 3,
                }}
              />
            </View>
            <Text style={{ width: 34, textAlign: 'right', color: '#1E293B', fontWeight: '600', fontSize: 12 }}>
              {item.value}%
            </Text>
          </View>
        ))}
        <Text style={{ color: MUTED, fontSize: 10, marginTop: 4 }}>Sentiment breakdown (sample data)</Text>
      </View>
    </View>
  );
}

// DEVELOPMENT MENU HELPER
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

// HOME PAGE
export default function Home() {
  const router = useRouter();
  const [showFilter, setShowFilter] = useState(false);
  const r = useResponsive();
  const styles = useMemo(() => homeStyles(r), [r]);

  return (
    <ScrollView style={styles.pageContainer} contentContainerStyle={styles.scrollContent}>
      <ThemedView>
        {/* PAGE HEADER */}
        <ThemedView style={styles.headerContainer}>
          <ThemedText type="title">Daily Overview</ThemedText>
          <TouchableOpacity onPress={() => setShowFilter(!showFilter)} style={styles.filterBtn}>
            <Ionicons name="options-outline" size={20} color="#35408E" />
          </TouchableOpacity>
        </ThemedView>

        {showFilter && <HomeFilter onClose={() => setShowFilter(false)} />}

        {/* SUMMARY CARDS */}
        <ThemedView style={styles.summaryContainer}>
          <DasboardCard />
        </ThemedView>

        {/* HIV DISCUSSION THREAD */}
        <ThemedView style={styles.titleContainer}>
          <ThemedView style={styles.title}>
            <ThemedText style={styles.titleTxt}>HIV Discussion Thread</ThemedText>
            <ThemedText style={styles.default}>
              Daily mentions across all monitored social media platforms
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.graphBG}>
            <DiscussionGraph />
          </ThemedView>
        </ThemedView>

        {/* SENTIMENT DISTRIBUTION */}
        <ThemedView style={styles.titleContainer}>
          <ThemedView style={styles.title}>
            <ThemedText style={styles.titleTxt}>Sentiment Distribution</ThemedText>
            <ThemedText style={styles.default}>
              Breakdown of positive, negative, and neutral sentiment
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.graphBG}>
            <SentimentGraph />
          </ThemedView>
        </ThemedView>

        {/* TOP TRENDING TOPICS */}
        <ThemedView style={styles.titleContainer}>
          <ThemedView style={styles.title}>
            <ThemedText style={styles.titleTxt}>Top Trending Topics</ThemedText>
            <ThemedText style={styles.default}>
              Most discussed HIV-related topics this week
            </ThemedText>
            <ThemedView style={styles.titleLine} />
          </ThemedView>
          <TrendsCard />
        </ThemedView>

        <ThemedView style={styles.titleLine} />

        {/* MISINFORMATION ALERTS */}
        <ThemedView style={styles.titleContainer}>
          <ThemedView style={styles.title}>
            <ThemedView style={styles.viewCol}>
              <ThemedText style={styles.titleTxt}>Misinformation Alerts</ThemedText>
              <ThemedText
                style={styles.viewTxt}
                onPress={() => router.push({
                  pathname: '/drawer/tabs/contributions/contribute',
                  params: { tab: 'Misinformation', refresh: Date.now().toString() },
                })}
              >
                View All
              </ThemedText>
            </ThemedView>
            <ThemedText style={styles.default}>
              Recent identified misinformation requiring attention
            </ThemedText>
          </ThemedView>
          <MisinformationCard />
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}