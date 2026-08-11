import {
  Dimensions,
  PixelRatio,
  Platform,
  useWindowDimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

/* ============================================================
    BASE DESIGN
============================================================ */

const guidelineWidth = 390;
const guidelineHeight = 844;

/* ============================================================
    SCREEN
============================================================ */

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

/* ============================================================
    PLATFORM
============================================================ */

export const isIOS = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";

/* ============================================================
    DEVICE CATEGORIES
============================================================ */

const minDimension = Math.min(width, height);
const maxDimension = Math.max(width, height);
// const aspectRatio = maxDimension / minDimension;

/**
 * Small Phones
 *
 * Examples:
 * • iPhone SE
 * • Android 320dp devices
 */
export const isSmallPhone =
  minDimension < 360;

/**
 * Compact Android Phones
 *
 * Physical examples:
 * • 720×1280
 * • 720×1440
 * • 720×1520
 * • 720×1600
 *
 * Logical:
 * 360×640
 * 360×720
 * 360×760
 */
export const isCompactAndroid =
  isAndroid &&
  minDimension >= 360 &&
  minDimension < 390 &&
  maxDimension < 780;

/**
 * Modern iPhones
 *
 * Examples:
 * • iPhone 12
 * • iPhone 13
 * • iPhone 14
 * • iPhone 15
 * • iPhone 16
 */
export const isIPhone =
  isIOS &&
  minDimension >= 390 &&
  minDimension < 430;

/**
 * Large Phones
 *
 * Examples:
 * • Pro Max
 * • Plus
 * • Samsung Ultra
 * • Pixel XL
 */
export const isLargePhone =
  minDimension >= 411 &&
  minDimension < 600;

export const isFold =
  isAndroid &&
  minDimension >= 600 &&
  maxDimension < 1000;

export const isAndroidTablet =
  isAndroid &&
  maxDimension >= 1000;

export const isIPadMini =
  isIOS &&
  minDimension >= 744 &&
  minDimension < 768;

export const isIPad =
  isIOS &&
  minDimension >= 768 &&
  minDimension < 1024;

export const isLargeIPad =
  isIOS &&
  minDimension >= 1024;

export const isTablet =
  isAndroidTablet ||
  isIPadMini ||
  isIPad ||
  isLargeIPad;

export const isLandscape = width > height;

export const isPortrait = height >= width;

/* ============================================================
    HEIGHT
============================================================ */

export const isShortScreen =
  height < 700;

export const isNormalScreen =
  height >= 700 &&
  height < 850;

export const isTallScreen =
  height >= 850 &&
  height < 1000;

export const isExtraTallScreen =
  height >= 1000;

/* ============================================================
    WIDTH / HEIGHT HELPERS
============================================================ */

export const wp = (percentage: number) =>
  (width * percentage) / 100;

export const hp = (percentage: number) =>
  (height * percentage) / 100;

/* ============================================================
    SCALING
============================================================ */

export const scale = (size: number) =>
  (width / guidelineWidth) * size;

export const verticalScale = (size: number) =>
  (height / guidelineHeight) * size;

export const moderateScale = (
  size: number,
  factor = 0.5
) => size + (scale(size) - size) * factor;

/* ============================================================
    TYPOGRAPHY
============================================================ */

export const font = (size: number) =>
  PixelRatio.roundToNearestPixel(
    moderateScale(size)
  );

/* ============================================================
    SPACING
============================================================ */

export const spacing = (size: number) =>
  moderateScale(size);

export const radius = (size: number) =>
  moderateScale(size);

export const icon = (size: number) =>
  moderateScale(size);

/* ============================================================
    DEVICE TYPE
============================================================ */

export const deviceType =
  isTablet
    ? "tablet"
    : isFold
    ? "fold"
    : isLargePhone
    ? "large-phone"
    : isIPhone
    ? "iphone"
    : isCompactAndroid
    ? "compact-android"
    : isSmallPhone
    ? "small-phone"
    : "phone";

/* ============================================================
    LIVE / ROTATION-AWARE VERSION
============================================================ */

function computeResponsiveValues(liveWidth: number, liveHeight: number) {
  const liveMin = Math.min(liveWidth, liveHeight);
  const liveMax = Math.max(liveWidth, liveHeight);

  // const aspectRatio = liveMax / liveMin;

  const isSmallPhoneVal = liveMin < 360;

  const isCompactAndroidVal =
    isAndroid && liveMin >= 360 && liveMin < 390 && liveMax < 780;

  const isIPhoneVal = isIOS && liveMin >= 390 && liveMin < 430;

  const isLargePhoneVal = liveMin >= 411 && liveMin < 600;

const isFoldVal =
  isAndroid &&
  liveMin >= 600 &&
  liveMax < 1000;

const isAndroidTabletVal =
  isAndroid &&
  liveMax >= 1000;

const isIPadMiniVal =
  isIOS &&
  liveMin >= 744 &&
  liveMin < 768;

const isIPadVal =
  isIOS &&
  liveMin >= 768 &&
  liveMin < 1024;

const isLargeIPadVal =
  isIOS &&
  liveMin >= 1024;

const isTabletVal =
  isAndroidTabletVal ||
  isIPadMiniVal ||
  isIPadVal ||
  isLargeIPadVal;

const isLandscapeVal =
  liveWidth > liveHeight;

const isPortraitVal =
  liveHeight >= liveWidth;

  const isShortScreenVal = liveHeight < 700;
  const isNormalScreenVal = liveHeight >= 700 && liveHeight < 850;
  const isTallScreenVal = liveHeight >= 850 && liveHeight < 1000;
  const isExtraTallScreenVal = liveHeight >= 1000;

  const wpVal = (percentage: number) => (liveWidth * percentage) / 100;
  const hpVal = (percentage: number) => (liveHeight * percentage) / 100;

  const scaleVal = (size: number) => (liveWidth / guidelineWidth) * size;
  const verticalScaleVal = (size: number) => (liveHeight / guidelineHeight) * size;
  const moderateScaleVal = (size: number, factor = 0.5) =>
    size + (scaleVal(size) - size) * factor;

  const fontVal = (size: number) => PixelRatio.roundToNearestPixel(moderateScaleVal(size));
  const spacingVal = (size: number) => moderateScaleVal(size);
  const radiusVal = (size: number) => moderateScaleVal(size);
  const iconVal = (size: number) => moderateScaleVal(size);

  console.log({
  width: liveWidth,
  height: liveHeight,
  min: liveMin,
  max: liveMax,
  isFold: isFoldVal,
  isAndroidTablet: isAndroidTabletVal,
  isLargeIPad: isLargeIPadVal,
  isPortrait: isPortraitVal,
  isLandscape: isLandscapeVal,
  isIPad: isIPadVal,
  isIPadMini: isIPadMiniVal,
  isNormalScreen: isNormalScreenVal,
  isTallScreen: isTallScreenVal,
});

 const deviceType =
  isLargeIPadVal
    ? "ipad-pro"
    : isIPadVal
    ? "ipad"
    : isIPadMiniVal
    ? "ipad-mini"
    : isAndroidTabletVal
    ? "android-tablet"
    : isFoldVal
    ? "fold"
    : isLargePhoneVal
    ? "large-phone"
    : isIPhoneVal
    ? "iphone"
    : isCompactAndroidVal
    ? "compact-andsroid"
    : isSmallPhoneVal
    ? "small-phone"
    : "phone";

  return {
    SCREEN_WIDTH: liveWidth,
    SCREEN_HEIGHT: liveHeight,
    isIOS,
    isAndroid,
    isSmallPhone: isSmallPhoneVal,
    isCompactAndroid: isCompactAndroidVal,
    isIPhone: isIPhoneVal,
    isLargePhone: isLargePhoneVal,
    isFold: isFoldVal,
    isAndroidTablet: isAndroidTabletVal,
    isTablet: isTabletVal,
    isLandscape: isLandscapeVal,
    isPortrait: isPortraitVal,
    isIPadMini: isIPadMiniVal,
    isIPad: isIPadVal,
    isLargeIPad: isLargeIPadVal,
    isShortScreen: isShortScreenVal,
    isNormalScreen: isNormalScreenVal,
    isTallScreen: isTallScreenVal,
    isExtraTallScreen: isExtraTallScreenVal,
    wp: wpVal,
    hp: hpVal,
    scale: scaleVal,
    verticalScale: verticalScaleVal,
    moderateScale: moderateScaleVal,
    font: fontVal,
    spacing: spacingVal,
    radius: radiusVal,
    icon: iconVal,
    deviceType: deviceType,
  };
}

export type ResponsiveValues = ReturnType<typeof computeResponsiveValues>;

/**
 * Rotation-aware version of every export above.
 *
 * The static exports (SCREEN_WIDTH, isTablet, scale(), etc.) are
 * captured ONCE from Dimensions.get("window") when this module
 * first loads and never change again — including when the device
 * rotates. Any StyleSheet built from them directly is frozen at
 * whatever orientation was active when the JS bundle first loaded.
 *
 * useResponsive() uses React Native's useWindowDimensions(), which
 * DOES subscribe to live dimension-change events and re-renders
 * the calling component on rotation. Use it inside a component
 * (not at module scope), and recompute any styles that depend on
 * it — e.g. via useMemo keyed on its return value — so layout
 * correctly re-flows when the device rotates.
 *
 *   const r = useResponsive();
 *   const styles = useMemo(() => createAuthStyles(r), [r]);
 */
export function useResponsive(): ResponsiveValues {
  const { width: liveWidth, height: liveHeight } = useWindowDimensions();
  return computeResponsiveValues(liveWidth, liveHeight);
}