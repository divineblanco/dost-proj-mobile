import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import { StyleSheet } from 'react-native';


export function TrendsCard() {

  return (
    <ThemedView style={styles.trendsContainer}>
            <ThemedView style={styles.trendsBG}>
              <ThemedView style={styles.trendCircle}></ThemedView>
              <ThemedView style={styles.trendsInfo}>
                <ThemedText type='subtitleLight'>#HIVAwareness</ThemedText>
                <ThemedText type='small'>World AIDS Day campaign hashtag gaining traction</ThemedText>
              </ThemedView>
              <ThemedView style={styles.trendRise}>
                <Ionicons name='arrow-up' size={20} color="#35408E"/>
                <ThemedText type='subtitleItalic'>+143%</ThemedText>
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.trendsBG}>
              <ThemedView style={styles.trendCircle}></ThemedView>
              <ThemedView style={styles.trendsInfo}>
                <ThemedText type='subtitleLight'>HIV Treatment Access</ThemedText>
                <ThemedText type='small' numberOfLines={1} ellipsizeMode='tail'>
                  Discussions about accessibility of antiretroviral theraphy
                </ThemedText>
              </ThemedView>
              <ThemedView style={styles.trendRise}>
                <Ionicons name='arrow-up' size={20} color="#35408E"/>
                <ThemedText type='subtitleItalic'>+88%</ThemedText>
              </ThemedView>
            </ThemedView>
          
            <ThemedView style={styles.trendsBG}>
              <ThemedView style={styles.trendCircle}></ThemedView>
              <ThemedView style={styles.trendsInfo}>
                <ThemedText type='subtitleLight'>Testing Centers</ThemedText>
                <ThemedText type='small' numberOfLines={1} ellipsizeMode='tail'>
                  Inquiries about HIV testing locations and procedures
                </ThemedText>
              </ThemedView>
              <ThemedView style={styles.trendRise}>
                <Ionicons name='arrow-up' size={20} color="#35408E"/>
                <ThemedText type='subtitleItalic'>+62%</ThemedText>
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.trendsBG}>
              <ThemedView style={styles.trendCircle}></ThemedView>
              <ThemedView style={styles.trendsInfo}>
                <ThemedText type='subtitleLight'>HIV Treatment Access</ThemedText>
                <ThemedText type='small' numberOfLines={1} ellipsizeMode='tail'>
                  Information about PrEP and safe sex practices
                </ThemedText>
              </ThemedView>
              <ThemedView style={styles.trendRise}>
                <Ionicons name='arrow-up' size={20} color="#35408E"/>
                <ThemedText type='subtitleItalic'>+47%</ThemedText>
              </ThemedView>
            </ThemedView>

          </ThemedView>
  );
}

const styles = StyleSheet.create({
  trendsBG:{
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "100%",
    backgroundColor: "#E4E8F0",
    borderRadius: 12,
  },
  trendsContainer: {
    flexDirection: "column",
    gap: 10
  },
  trendCircle:{
    top: -9,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
    marginRight: 8,
  },
  trendsInfo:{
    backgroundColor: "transparent",
    flex: 1,
    flexShrink: 1,
    paddingRight: 10,
  },
  trendRise: {
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "center",
    flexShrink: 0,
  }
});
