import { Image } from "expo-image";
import { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { Easing, Keyframe } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

import { useResponsive } from "@/styles/responsive";

const INITIAL_SCALE_FACTOR = Dimensions.get("screen").height / 90;
const DURATION = 600;

/* ============================================================
    SPLASH OVERLAY
============================================================ */

export function AnimatedSplashOverlay() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const splashKeyframe = new Keyframe({
    0: {
      transform: [{ scale: INITIAL_SCALE_FACTOR }],
      opacity: 1,
    },
    20: {
      opacity: 1,
    },
    70: {
      opacity: 0,
      easing: Easing.elastic(0.7),
    },
    100: {
      opacity: 0,
      transform: [{ scale: 1 }],
      easing: Easing.elastic(0.7),
    },
  });

  return (
    <Animated.View
      entering={splashKeyframe.duration(DURATION).withCallback((finished) => {
        "worklet";

        if (finished) {
          scheduleOnRN(setVisible, false);
        }
      })}
      style={styles.backgroundSolidColor}
    />
  );
}

/* ============================================================
    ANIMATIONS
============================================================ */

const keyframe = new Keyframe({
  0: {
    transform: [{ scale: INITIAL_SCALE_FACTOR }],
  },
  100: {
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

const logoKeyframe = new Keyframe({
  0: {
    transform: [{ scale: 1.3 }],
    opacity: 0,
  },
  40: {
    transform: [{ scale: 1.3 }],
    opacity: 0,
    easing: Easing.elastic(0.7),
  },
  100: {
    opacity: 1,
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

const glowKeyframe = new Keyframe({
  0: {
    transform: [{ rotateZ: "0deg" }],
  },
  100: {
    transform: [{ rotateZ: "7200deg" }],
  },
});

/* ============================================================
    ICON
============================================================ */

export function AnimatedIcon() {
  const {
    hp,
    isCompactAndroid,
    isFold,
    isIPhone,
    isLargePhone,
    isTablet,
    isLandscape,
    isPortrait,
  } = useResponsive();

  const isTabletLandscape = isTablet && isLandscape;
  const isTabletPortrait = isTablet && isPortrait;

  /* ============================================================
      RESPONSIVE SIZES
  ============================================================ */

  const logo = isTabletLandscape
    ? hp(23) // <-- Landscape tablet
    : isTabletPortrait
    ? hp(18) // <-- Portrait tablet
    : isFold
    ? hp(18)
    : isLargePhone
    ? hp(15.5)
    : isIPhone
    ? hp(16)
    : isCompactAndroid
    ? hp(18)
    : hp(12);

  const backgroundSize = logo * 2.15;
  const imageWidth = logo * 2.15;
  const imageHeight = logo * 2.05;
  const glowSize = logo * 1.55;

  const styles = createStyles(
    logo,
    backgroundSize,
    imageWidth,
    imageHeight,
    glowSize
  );

  return (
    <View style={styles.iconContainer}>
      <Animated.View
        entering={glowKeyframe.duration(60 * 1000 * 4)}
        style={styles.glow}
      >
        <Image
          style={styles.glow}
          source={require("@/assets/images/logo-glow.png")}
        />
      </Animated.View>

      <Animated.View
        entering={keyframe.duration(DURATION)}
        style={styles.background}
      />

      <Animated.View
        entering={logoKeyframe.duration(DURATION)}
        style={styles.imageContainer}
      >
        <Image
          style={styles.image}
          source={require("@/assets/images/splash-icon.png")}
        />
      </Animated.View>
    </View>
  );
}

/* ============================================================
    STYLES
============================================================ */

const createStyles = (
  logo: number,
  backgroundSize: number,
  imageWidth: number,
  imageHeight: number,
  glowSize: number
) =>
  StyleSheet.create({
    imageContainer: {
      justifyContent: "center",
      alignItems: "center",
    },

    iconContainer: {
      justifyContent: "center",
      alignItems: "center",

      width: logo,
      height: logo,

      zIndex: 100,
    },

    glow: {
      width: glowSize,
      height: glowSize,

      position: "absolute",
    },

    image: {
      position: "absolute",

      width: imageWidth,
      height: imageHeight,
    },

    background: {
      width: backgroundSize,
      height: backgroundSize,

      borderRadius: 999,
      backgroundColor: "white",

      position: "absolute",

      elevation: 6,

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },

    backgroundSolidColor: {
      ...StyleSheet.absoluteFillObject,

      backgroundColor: "#208AEF",

      zIndex: 1000,
    },
  });

/* ============================================================
    STATIC STYLES
============================================================ */

const styles = StyleSheet.create({
  backgroundSolidColor: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor: "#208AEF",

    zIndex: 1000,
  },
});