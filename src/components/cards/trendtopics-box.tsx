import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';


export function TrendingTopics() {

  return (
    <ThemedView style={styles.summaryContainer2}>
      <ThemedView style={styles.trendsBox}>
        <ThemedView style={styles.box}>
            <ThemedView style={styles.iconBG}>
                <Ionicons name='trending-up' size={25} color="red"/>
            </ThemedView>
            <ThemedView style={styles.boxInfo}>
                <ThemedText type='trendCard' style={styles.boxTitle}>
                    #HIVAwareness
                </ThemedText>
                <ThemedView style={styles.trendRise}>
                    <Ionicons name='arrow-up' size={15} color="#35408E"/>
                    <ThemedText style={styles.boxMore}>+143%</ThemedText>
                </ThemedView>
            </ThemedView>
        </ThemedView>
      </ThemedView>

        <ThemedView style={styles.trendsBox}>
        <ThemedView style={styles.box}>
            <ThemedView style={styles.iconBG}>
                <Ionicons name='trending-up' size={25} color="red"/>
            </ThemedView>
            <ThemedView style={styles.boxInfo}>
                <ThemedText type='trendCard' style={styles.boxTitle}>
                    HIV Treatment Access
                </ThemedText>
                <ThemedView style={styles.trendRise}>
                    <Ionicons name='arrow-up' size={15} color="#35408E"/>
                    <ThemedText style={styles.boxMore}>+88%</ThemedText>
                </ThemedView>
            </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.trendsBox}>
        <ThemedView style={styles.box}>
            <ThemedView style={styles.iconBG}>
                <Ionicons name='trending-up' size={25} color="red"/>
            </ThemedView>
            <ThemedView style={styles.boxInfo}>
                <ThemedText type='trendCard' style={styles.boxTitle}>
                    Testing Centers
                </ThemedText>
                <ThemedView style={styles.trendRise}>
                    <Ionicons name='arrow-up' size={15} color="#35408E"/>
                    <ThemedText style={styles.boxMore}>+62%</ThemedText>
                </ThemedView>
            </ThemedView>
        </ThemedView>
      </ThemedView>
      
      <ThemedView style={styles.trendsBox}>
        <ThemedView style={styles.box}>
            <ThemedView style={styles.iconBG}>
                <Ionicons name='trending-up' size={25} color="red"/>
            </ThemedView>
            <ThemedView style={styles.boxInfo}>
                <ThemedText type='trendCard' style={styles.boxTitle}>
                    Prevention Methods
                </ThemedText>
                <ThemedView style={styles.trendRise}>
                    <Ionicons name='arrow-up' size={15} color="#35408E"/>
                    <ThemedText style={styles.boxMore}>+47%</ThemedText>
                </ThemedView>
            </ThemedView>
        </ThemedView>
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
  },
  trendsBox: {
    width: '48%',         
    minHeight: 70,
    padding: 10,          
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E4E8F0',
    borderRadius: 7,
    flexDirection: 'row',
    position: "relative",
    overflow: "hidden",
  },
  box: {
    flexDirection: 'row',
    backgroundColor: "transparent",
    zIndex: 2,
    gap: 10
  },
  boxInfo: {
    flexDirection: "column", 
    backgroundColor: "transparent", 
    justifyContent: "center",
    textAlign: "center",
    flex: 1,
    flexShrink: 1,
  },
  boxTitle: {
    flexWrap: "wrap"
  },
  boxMore: {
    fontSize: 12,
    fontWeight: 400,
    fontStyle: "italic",
    color: "#35408E",
    textAlign: "center"
  },
  iconBG: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  trendRise: {
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "center",
    flexShrink: 0,
    justifyContent: "center",
    marginTop: 2
  }
});
