import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { dashboardCardStyles } from '@/styles/home-styles';
import { useResponsive } from '@/styles/responsive';
import React, { useMemo } from 'react';
import { Image } from 'react-native';


export function DasboardCard() {

  const r = useResponsive();
  
    const styles = useMemo(
        () => dashboardCardStyles(r),[r]
    );

  return (
    <ThemedView style={styles.summaryContainer2}>
      <ThemedView style={[styles.mentionsBox, styles.dashboardCard]}>
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

      <ThemedView style={[styles.sentimentBox, styles.dashboardCard]}>
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

      <ThemedView style={[styles.trendBox, styles.dashboardCard]}>
          <ThemedView style={styles.box}>
          <ThemedText style={styles.boxTitle}>
            Trending Topics
          </ThemedText>
          <ThemedText style={styles.trendboxInfo}>
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

      <ThemedView style={[styles.misinfoBox, styles.dashboardCard]}>
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