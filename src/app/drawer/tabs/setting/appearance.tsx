import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fontisto } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const MODE = [
  "Light",
  "Dark",
  "System Default",
];

export default function Appearance() {
  const [selectedMode, setSelectedMode] = useState("Light");
  const [fontSize, setFontSize] = useState(16);

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <ThemedView>
        <ThemedView style={styles.headerContainer}>
          <ThemedText style={styles.headerTxt}>
            You can change the app’s appearance to your preference.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.line}></ThemedView>

        <ThemedView style={styles.container}>
          <ThemedView style={styles.boxBG}>
            <ThemedText style={styles.title}>
              Mode
            </ThemedText>

            {MODE.map((mode) => (
              <TouchableOpacity
                key={mode}
                style={styles.row}
                activeOpacity={0.7}
                onPress={() => setSelectedMode(mode)}
              >
                <Fontisto
                  name={
                    selectedMode === mode
                      ? "radio-btn-active"
                      : "radio-btn-passive"
                  }
                  size={16}
                  color={
                    selectedMode === mode
                      ? "#35408E"
                      : "#B0B7C3"
                  }
                />

                <ThemedText
                  style={[
                    styles.mode,
                    selectedMode === mode &&
                      styles.modeSelected,
                  ]}
                >
                  {mode}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>

          <ThemedView style={styles.boxBG}>
            <ThemedText style={styles.title}>
              Font Size
            </ThemedText>
            <ThemedView style={styles.sliderRow}>
              <ThemedText style={styles.smallA}>Aa</ThemedText>

              <Slider
                style={styles.slider}
                minimumValue={12}
                maximumValue={24}
                step={1}
                value={fontSize}
                onValueChange={setFontSize}
                minimumTrackTintColor="#35408E"
                maximumTrackTintColor="#D1D5DB"
                thumbTintColor="#35408E"
              />

              <ThemedText style={styles.largeA}>Aa</ThemedText>
            </ThemedView>

            <ThemedText
              style={[
                styles.previewText,
                {
                  fontSize,
                },
              ]}
            >
              Preview Text
            </ThemedText>
          </ThemedView>
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
    paddingVertical: 10,
    gap: 20,
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
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 15,
    lineHeight: 25
  },

  container: {
    padding: 15,
    gap: 10
  },

  mode: {
    fontSize: 15,
    color: "#333",
  },

  modeSelected: {
    fontWeight: "700",
    color: "#35408E",
  },

  sliderRow: {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
},

  slider: {
    flex: 1,
  },

  smallA: {
    fontSize: 14,
    fontWeight: "600",
    color: "#35408E",
  },

  largeA: {
    fontSize: 28,
    fontWeight: "700",
    color: "#35408E",
    lineHeight: 35
  },

  previewText: {
    marginTop: 18,
    textAlign: "center",
    color: "#35408E",
    fontWeight: "600",
    lineHeight: 40
  },
});