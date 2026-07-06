import TerminateSession from "@/components/modals/terminate-session";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons, Octicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";

export default function DeviceSessions() {
  const [showTerminateModal, setShowTerminateModal] = useState(false);
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

        <ThemedView style={styles.line}></ThemedView>

        <ThemedView style={styles.deviceContainer}>
            <ThemedView style={styles.boxBG}>
              <ThemedText style={styles.title}>
                This Device
              </ThemedText>
              <ThemedView style={styles.row}>
                <ThemedView style={styles.icon}>
                  <Octicons name="device-mobile" size={20} color="#35408E"/>
                </ThemedView>
                <ThemedView style={styles.deviceInfo}>
                  <ThemedText style={styles.device}>Samsung Galaxy S26</ThemedText>
                  <ThemedText style={styles.location}>Manila City, Philippines</ThemedText>
                </ThemedView>
              </ThemedView>
              <ThemedView style={styles.row2}>
                <Ionicons name="hand-right-sharp" size={20} color="red"/>
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
              <TouchableOpacity style={styles.row}
                onPress={() => setShowTerminateModal(true)}>
                <ThemedView style={styles.icon}>
                  <Octicons name="device-mobile" size={20} color="#35408E"/>
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

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
  },
  scrollContent: {
    paddingBottom: 95,
  },

  headerContainer: {
    padding: 20,
  },

  headerTxt: {
    fontSize: 12, 
    fontWeight: "400",
    textAlign: "center"
  },

  line: {
    backgroundColor: "#c7c7c7",
    padding: 0.5,
    width: "85%",
    alignSelf: "center",
    marginBottom: 15
  },

  row: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 15,
    alignItems: "center"
  },

  row2: {
    flexDirection: "row",
    paddingHorizontal: 35,
    paddingVertical: 5,
    gap: 15,
    alignItems: "center"
  },

  boxBG: {
    backgroundColor: "white",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E0E4F0",
    padding: 15,
    elevation: 2,
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
  },

  title: {
    fontSize: 15,
    fontWeight: "bold",
    paddingBlockStart: 10,
  },

  icon: {
    backgroundColor: "#353f8e2d",
    padding: 20,
    borderRadius: 999
  },

  deviceInfo: {
    flexDirection: "column",
    gap: 5
  },

  device: {
    fontSize: 15,
    fontWeight: "600",
  },

  location: {
    fontSize: 12,
    fontWeight: "400"
  },
  
  deviceContainer: {
    padding: 15,
  },

  terminateTxt: {
    color: "red",
    fontSize: 12,
    fontWeight: "bold"
  },

  instruction: {
    fontSize: 12,
    fontWeight: "400",
    padding: 10
  }
});