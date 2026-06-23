import { ThemedView } from "@/components/themed-view";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Linking, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../themed-text";

type ResourceItem = {
  iconColor: string;
  iconBox: string;
  title: string;
  description: string;
  url: string;
};

export function ExternalResources() {
  const resourcesData: ResourceItem[] = [
    {
      iconColor: "#FFB633",
      iconBox: "#ffb8332f",
      title: "World Health Organization",
      description: "Official WHO resources on HIV/AIDS prevention and treatment.",
      url: "https://www.who.int/health-topics/hiv-aids#tab=tab_1",
    },
    {
      iconColor: "#FF3333",
      iconBox: "#ff333321",
      title: "Department of Health Philippines",
      description: "DOH HIV/AIDS resources and testing locations in the Philippines.",
      url: "https://doh.gov.ph/news-clippings/hiv-aids-cases-rising-in-ph-doh-discloses/",
    },
    {
      iconColor: "#7DB9EE",
      iconBox: "#7db9ee2f",
      title: "UNAIDS",
      description: "The Joint United Nations Programme on HIV/AIDS resources and data.",
      url: "https://www.unaids.org/en",
    },
  ];

  const handlePress = async (url: string) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.warn("Can't open URL:", url);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ gap: 5, padding: 5 }}>
      {resourcesData.map((item, index) => (
        <TouchableOpacity 
            key={index}
            style={styles.card} 
            onPress={() => handlePress(item.url)}>
                <ThemedView style={styles.row}>
                    <ThemedView style={[styles.iconBox, { backgroundColor: item.iconBox }]}>
                        <Feather name="external-link" size={35} color={item.iconColor} />
                    </ThemedView>

                    <ThemedView style={styles.textContainer}>
                        <ThemedText style={styles.sourceTitle}>
                            {item.title}
                        </ThemedText>

                        <ThemedText style={styles.description}>
                            {item.description}
                        </ThemedText>
                    </ThemedView>

                </ThemedView>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 15,
    marginTop: 10,
    borderRadius: 7,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 4,
    },
    shadowOpacity: 0.20,
    shadowRadius: 5,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },

  iconBox: {
    padding: 10,
    borderRadius: 10,
  },

  textContainer: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "transparent"
  },

  sourceTitle: {
    fontSize: 17,
    fontWeight: "600",
  },

  description: {
    fontSize: 11.5,
    fontWeight: "400",
    marginTop: 3,
  },
});