import { ThemedText } from "@/components/themed-text";
import React from "react";
import {
    Modal,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

type Props = {
  visible: boolean;
  onClose: () => void;
  selectedLocation: {
    latitude: number;
    longitude: number;
  } | null;
  onSelectLocation: (location: {
    latitude: number;
    longitude: number;
  }) => void;
};

export default function LocationPicker({
  visible,
  onClose,
  selectedLocation,
  onSelectLocation,
}: Props) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
    >
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 14.5995,
            longitude: 120.9842,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          onPress={(e) =>
            onSelectLocation(e.nativeEvent.coordinate)
          }
        >
          {selectedLocation && (
            <Marker coordinate={selectedLocation} />
          )}
        </MapView>

        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={onClose}
          >
            <ThemedText style={styles.confirmText}>
              Confirm Location
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },

  bottom: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
  },

  confirmButton: {
    backgroundColor: "#35408E",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  confirmText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
});