import { ThemedText } from "@/components/themed-text";
import { icon, radius, scale, verticalScale } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Image,
    Modal,
    TouchableOpacity,
    View,
} from "react-native";

type CataloguePage = {
  file_url: string;
  order_index?: number | null;
};

type CatalogueFullscreenViewerProps = {
  visible: boolean;
  pages: CataloguePage[];
  currentPage: number;
  onClose: () => void;
  onPageChange: (page: number) => void;
};

export default function CatalogueFullscreenViewer({
  visible,
  pages,
  currentPage,
  onClose,
  onPageChange,
}: CatalogueFullscreenViewerProps) {
  if (!pages.length || !pages[currentPage]) {
    return null;
  }

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === pages.length - 1;
  const currentAttachment = pages[currentPage];

  const goToPreviousPage = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Image
          source={{ uri: currentAttachment.file_url }}
          style={styles.image}
          resizeMode="contain"
        />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onClose}
          style={styles.closeButton}
        >
          <Ionicons
            name="close"
            size={icon(28)}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <View style={styles.pageIndicator}>
          <ThemedText style={styles.pageText}>
            {currentPage + 1} / {pages.length}
          </ThemedText>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={isFirstPage}
            onPress={goToPreviousPage}
            style={[
              styles.controlButton,
              isFirstPage && styles.disabledButton,
            ]}
          >
            <Ionicons
              name="chevron-back"
              size={icon(30)}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            disabled={isLastPage}
            onPress={goToNextPage}
            style={[
              styles.controlButton,
              isLastPage && styles.disabledButton,
            ]}
          >
            <Ionicons
              name="chevron-forward"
              size={icon(30)}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },

  image: {
    width: "100%" as const,
    height: "100%" as const,
  },

  closeButton: {
    position: "absolute" as const,
    top: verticalScale(45),
    right: scale(18),
    zIndex: 10,
    width: scale(44),
    height: scale(44),
    borderRadius: radius(22),
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },

  pageIndicator: {
    position: "absolute" as const,
    bottom: verticalScale(28),
    alignItems: "center" as const,
  },

  pageText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600" as const,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(7),
    borderRadius: radius(20),
  },

  controls: {
    position: "absolute" as const,
    left: scale(15),
    right: scale(15),
    top: "50%" as const,
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
  },

  controlButton: {
    width: scale(46),
    height: scale(46),
    borderRadius: radius(23),
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },

  disabledButton: {
    opacity: 0.3,
  },
};
