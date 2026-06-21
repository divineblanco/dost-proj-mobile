import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

type MapDropdownProps = {
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
};

export default function MapDropdown({
  selectedRegion,
  setSelectedRegion,
}: MapDropdownProps) {
  const [showRegions, setShowRegions] = useState(false);

  const regions = [
  {
    region: "Region I (Ilocos Region)",
    provinces: [
      "Ilocos Norte",
      "Ilocos Sur",
      "La Union",
      "Pangasinan",
    ],
  },
  {
    region: "Region II (Cagayan Valley)",
    provinces: [
      "Batanes",
      "Cagayan",
      "Isabela",
      "Nueva Vizcaya",
      "Quirino",
    ],
  },
  {
    region: "Region III (Central Luzon)",
    provinces: [
      "Bataan",
      "Bulacan",
      "Nueva Ecija",
      "Pampanga",
      "Tarlac",
      "Zambales",
      "Aurora",
    ],
  },
  {
    region: "Region IV-A (CALABARZON)",
    provinces: [
      "Batangas",
      "Cavite",
      "Laguna",
      "Quezon",
      "Rizal",
    ],
  },
  {
    region: "Region IV-B (MIMAROPA Region)",
    provinces: [
      "Marinduque",
      "Occidental Mindoro",
      "Oriental Mindoro",
      "Palawan",
      "Romblon",
    ],
  },
  {
    region: "Region V (Bicol Region)",
    provinces: [
      "Camarines Norte",
      "Camarines Sur",
      "Catanduanes",
      "Masbate",
      "Albay",
      "Sorsogon",
    ],
  },
  {
    region: "Region VI (Western Visayas)",
    provinces: [
      "Aklan",
      "Antique",
      "Capiz",
      "Guimaras",
      "Iloilo",
    ],
  },
  {
    region: "Region VII (Central Visayas)",
    provinces: [
      "Bohol",
      "Cebu",
    ],
  },
  {
    region: "Region VIII (Eastern Visayas)",
    provinces: [
      "Biliran",
      "Eastern Samar",
      "Leyte",
      "Northern Samar",
      "Samar",
      "Southern Leyte",
    ],
  },
  {
    region: "Region IX (Zamboanga Peninsula)",
    provinces: [
      "Zamboanga del Norte",
      "Zamboanga del Sur",
      "Zamboanga Sibugay",
    ],
  },
  {
    region: "Region X (Northern Mindanao)",
    provinces: [
      "Bukidnon",
      "Camiguin",
      "Lanao del Norte",
      "Misamis Occidental",
      "Misamis Oriental",
    ],
  },
  {
    region: "Region XI (Davao Region)",
    provinces: [
      "Davao de Norte",
      "Davao de Sur",
      "Davao Oriental",
      "Agusan del Sur",
      "Compostela Valley",
    ],
  },
  {
    region: "Region XII (SOCCSKSARGEN)",
    provinces: [
      "North Cotabato",
      "Sarangani",
      "South Cotabato",
      "Sultan Kudarat",
    ],
  },
  {
    region: "National Capital Region (NCR)",
    provinces: [
      "Metropolitan Manila",
    ],
  },
  {
    region: "Cordillera Administrative Region (CAR)",
    provinces: [
      "Abra",
      "Apayao",
      "Benguet",
      "Ifugao",
      "Kalinga",
      "Mountain Province",
    ],
  },
  {
    region: "Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)",
    provinces: [
      "Basilan",
      "Lanao del Sur",
      "Maguindanao",
      "Sulu",
      "Tawi-Tawi",
    ],
  },
  {
    region: "Region XIII (Caraga)",
    provinces: [
      "Dinagat Islands",
      "Surigao del Norte",
      "Surigao del Sur",
    ],
  },
  {
    region: "Negros Island Region (NIR)",
    provinces: [
      "Negros Occidental",
      "Negros Oriental",
      "Siquijor",
    ],
  },
];

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setShowRegions(!showRegions)}
      >
        <ThemedView style={styles.dropdownContent}>
          <ThemedText style={styles.dropdownText}>{selectedRegion}</ThemedText>

          <Ionicons
            name={
              showRegions
                ? "chevron-up-outline"
                : "chevron-down-outline"
            }
            size={16}
            color="#35408E"
          />
        </ThemedView>
      </TouchableOpacity>

        {showRegions && (
    <ThemedView style={styles.dropdownMenu}>
        <ScrollView nestedScrollEnabled style={{ maxHeight: 300 }}>
        {regions.map((item) => (
            <ThemedView
            key={item.region}
            style={{ backgroundColor: "transparent" }}
            >
            {/* REGION LABEL */}
            <ThemedView style={styles.regionLabel}>
                <ThemedText style={styles.regionLabelText}>
                {item.region}
                </ThemedText>
            </ThemedView>

            {/* PROVINCES */}
            {item.provinces.map((province) => (
                <TouchableOpacity
                key={province}
                style={styles.dropdownItem}
                onPress={() => {
                    setSelectedRegion(province);
                    setShowRegions(false);
                }}
                >
                <ThemedText style={styles.provinceText}>
                    {province}
                </ThemedText>
                </TouchableOpacity>
            ))}
            </ThemedView>
        ))}
        </ScrollView>
    </ThemedView>
    )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "85%",
    backgroundColor: "transparent",
    zIndex: 100,
    marginBottom: 10
  },

  dropdownButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
  },

  dropdownContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    alignItems: "center",
  },

  dropdownText: {
    fontSize: 13
  },

  dropdownMenu: {
    backgroundColor: "white",
    borderRadius: 12,
    marginTop: 5,
    position: "absolute",
    top: 45,
    width: "100%",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,

    elevation: 5,
  },

  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D3D7E0",
    backgroundColor: "transparent",
  },

  regionLabel: {
  backgroundColor: "#35408E",
  paddingVertical: 10,
  paddingHorizontal: 15,
},

regionLabelText: {
  color: "#FFFFFF",
  fontWeight: "bold",
  fontSize: 15,
},

provinceText: {
  paddingLeft: 15,
  fontSize: 13
},
});