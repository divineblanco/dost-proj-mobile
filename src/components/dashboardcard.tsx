import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { Image, StyleSheet } from 'react-native';


export function DasboardCard() {

  return (
    <ThemedView style={styles.summaryContainer2}>
      <ThemedView style={styles.mentionsBox}>
        <ThemedView style={styles.box}>
          <ThemedText style={styles.boxTitle}>
            Total Mentions
          </ThemedText>
          <ThemedText style={styles.boxInfo}>
            12,540
          </ThemedText>
          <ThemedText style={styles.boxMore}>
            +14.6%
          </ThemedText>
        </ThemedView>
        <Image
          source={require('@/assets/images/mentions.png')}
          style={styles.mentionsImg}
          resizeMode="contain"
        />
      </ThemedView>

      <ThemedView style={styles.sentimentBox}>
        <ThemedView style={styles.box}>
          <ThemedText style={styles.boxTitle}>
            Sentiment
          </ThemedText>
          <ThemedText style={styles.boxInfo}>
            68%
          </ThemedText>
          <ThemedText style={styles.boxMore}>
            +7.2%
          </ThemedText>
        </ThemedView>
        <Image
          source={require('@/assets/images/sentiment.png')}
          style={styles.sentimentImg}
          resizeMode="contain"
        />
      </ThemedView>

      <ThemedView style={styles.trendBox}>
          <ThemedView style={styles.box}>
          <ThemedText style={styles.boxTitle}>
            Trending Topics
          </ThemedText>
          <ThemedText style={{
            color: 'white',
            fontSize: 16,
            fontWeight: "900",
            paddingTop: 10}}>
            #HIVAwareness
          </ThemedText>
          <ThemedText style={styles.boxMore}>
            +143%
          </ThemedText>
        </ThemedView>
        <Image
          source={require('@/assets/images/trends.png')}
          style={styles.trendsImg}
          resizeMode="contain"
        />
      </ThemedView>

      <ThemedView style={styles.misinfoBox}>
        <ThemedView style={styles.box}>
          <ThemedText style={styles.boxTitle}>
            Misinformation
          </ThemedText>
          <ThemedText style={styles.boxInfo}>
            16
          </ThemedText>
          <ThemedText style={styles.boxMore}>
            High Priority: 1
          </ThemedText>
        </ThemedView>
        <Image
          source={require('@/assets/images/misinformation.png')}
          style={styles.misinfoImg}
          resizeMode="contain"
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  summaryContainer2: {  
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    padding: 10,
    gap: 10,
    backgroundColor: '#E4E8F0',
    borderRadius: 12,  
  },
  mentionsBox: {
    width: '48%',         
    height: 95,          
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4A7CA8',
    borderRadius: 7,
    flexDirection: 'row',
    position: "relative",
    overflow: "hidden",
    paddingLeft: 35,
  },
  sentimentBox: {
    width: '48%',         
    height: 95,          
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3BB329',
    borderRadius: 7,
    flexDirection: 'row',
    position: "relative",
    overflow: "hidden",
    paddingLeft: 10,
  },
  trendBox: {
    width: '48%',         
    height: 95,          
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDBA2B',
    borderRadius: 7,
    flexDirection: 'row',
    position: "relative",
    overflow: "hidden",
    paddingRight: 20,
  },
  misinfoBox: {
    width: '48%',         
    height: 95,          
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E20000',
    borderRadius: 7,
    flexDirection: 'row',
    position: "relative",
    overflow: "hidden",
    paddingLeft: 50,
  },
  box: {
    flexDirection: 'column',
    backgroundColor: "transparent",
    zIndex: 2,
  },
  boxTitle: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold'
  },
  boxInfo: {
    color: 'white',
    fontSize: 24,
    fontWeight: "900",
    paddingTop: 15
  },
  boxMore: {
    color: 'white',
    fontSize: 10,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  mentionsImg: {
    width: 90,
    height: 90,
    opacity: 0.5,
    right: 0,
    bottom: -4,
  },
  sentimentImg: {
    width: 90,
    height: 90,
    opacity: 0.5,
    right: -4,
    bottom: -12,
  },
  trendsImg: {
    width: 90,
    height: 90,
    opacity: 0.5,
    right: 0,
    bottom: -5,
    position: "absolute"
  },
  misinfoImg: {
    width: 95,
    height: 95,
    opacity: 0.5,
    right: 8,
    bottom: -10,
  }
});
