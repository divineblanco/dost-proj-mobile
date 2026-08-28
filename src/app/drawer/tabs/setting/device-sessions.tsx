import TerminateSession from "@/components/modals/terminate-session";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { icon, useResponsive } from "@/styles/responsive";
import { settingsStyles } from "@/styles/settings/settings-styles";
import { Ionicons, Octicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  TouchableOpacity
} from "react-native";

export default function DeviceSessions() {
  const [showTerminateModal, setShowTerminateModal] = useState(false);

      const r = useResponsive();
            
      const styles = useMemo(() => settingsStyles(r), [r]);

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <ThemedView>
        <ThemedView style={styles.headerContainer}>
          <ThemedText style={styles.headerTxt}>
            View the different devices link to your account. 
            You may terminate other sessions from other devices.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.dividerLine}></ThemedView>

        <ThemedView style={styles.deviceContainer}>
            <ThemedView style={styles.boxBG}>
              <ThemedText style={styles.deviceTitle}>
                This Device
              </ThemedText>
              <ThemedView style={styles.deviceRow}>
                <ThemedView style={styles.icon}>
                  <Octicons name="device-mobile" size={icon(20)} color="#35408E"/>
                </ThemedView>
                <ThemedView style={styles.deviceInfo}>
                  <ThemedText style={styles.device}>Samsung Galaxy S26</ThemedText>
                  <ThemedText style={styles.location}>Manila City, Philippines</ThemedText>
                </ThemedView>
              </ThemedView>
              <ThemedView style={styles.row2}>
                <Ionicons name="hand-right-sharp" size={icon(20)} color="red"/>
                <TouchableOpacity>
                  <ThemedText style={styles.terminateTxt}>Terminate All Other Sessions</ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
            <ThemedText style={styles.instruction}>Logs out all devices except for this one.</ThemedText>

            <ThemedView style={styles.boxBG}>
              <ThemedText style={styles.title}>
                Active Sessions
              </ThemedText>
              <TouchableOpacity style={styles.row2}
                onPress={() => setShowTerminateModal(true)}>
                <ThemedView style={styles.icon}>
                  <Octicons name="device-mobile" size={icon(20)} color="#35408E"/>
                </ThemedView>
                <ThemedView style={styles.deviceInfo}>
                  <ThemedText style={styles.device}>iPhone 17</ThemedText>
                  <ThemedText style={styles.location}>Makati City, Philippines</ThemedText>
                </ThemedView>
              </TouchableOpacity>
              <TerminateSession visible={showTerminateModal} 
                deviceName="iPhone 17" 
                location="Makati City, Philippines" 
                onClose={() => setShowTerminateModal(false)} 
                onTerminate={() => { 
                  // TODO: terminate session logic 
                  setShowTerminateModal(false); }} />
            </ThemedView>
            <ThemedText style={styles.instruction}>The official AdvocAID PH app is available for Android and iPhone.</ThemedText>
        </ThemedView>

        
        
        

      </ThemedView>
    </ScrollView>
  );
}