import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { misinformationCardStyles } from '@/styles/home-styles';
import { icon, useResponsive } from '@/styles/responsive';
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from 'react';


export function MisinformationCard() {

const r = useResponsive();

    const styles = useMemo(
        () => misinformationCardStyles(r),[r]
    );

  return (
    <ThemedView style={styles.misinfoBG}>
        <ThemedView style={styles.redLine}></ThemedView> 

        <ThemedView style={styles.misinfoContainer}>
            <Ionicons name='warning-outline' size={icon(20)} color="red" style={styles.warningIcon}/>
            <ThemedView style={styles.misinfoInfo}>
                <ThemedText style={styles.misinfoTitle}>
                Unverified COVID-HIV connection
                </ThemedText>
                <ThemedText style={[ styles.misinfoDesc, {flexShrink: 1}]}>
                Viral post claiming COVID-19 vaccine impacts HIV status – no scientific basis
                </ThemedText>
                <ThemedView style={styles.priorityRow}>
                <ThemedText style={styles.priorityText}>
                    High Priority
                </ThemedText>
                <ThemedText style={styles.separator}>
                    |
                </ThemedText>
                <ThemedText style={styles.locationText}>
                    Nationwide
                </ThemedText>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    </ThemedView>

  );
}