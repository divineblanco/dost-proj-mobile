import { StyleSheet } from "react-native";
import { font, isAndroidTablet, radius, ResponsiveValues, scale, verticalScale } from "../responsive";

export function faqStyles(r: ResponsiveValues) {
    const {
      isCompactAndroid,
      isFold,
      isIPhone,
      isLandscape,
      isPortrait,
      isLargePhone,
      isNormalScreen,
      isShortScreen,
      isSmallPhone,
      isExtraTallScreen,
      isTablet,
      isTallScreen,
      isIPad,
      isIPadMini,
      isLargeIPad,
  } = r;

    const isTallFold = r.isFold && r.isTallScreen;
    const isNormalFold = r.isFold && r.isNormalScreen;

    const isAndroidTabletPortrait = r.isAndroidTablet && r.isPortrait;

    const isAndroidTabletLandscape = r.isAndroidTablet && r.isLandscape;

    const isIPadPortrait = r.isIPad && r.isPortrait;
    const isIPadLandscape = r.isIPad && r.isLandscape;
  
    const isLargeIPadPortrait = r.isLargeIPad && r.isPortrait;
    const isLargeIPadLandscape = r.isLargeIPad && r.isLandscape;
  
    const isIPadMiniPortrait = r.isIPadMini && r.isPortrait;
    const isIPadMiniLandscape = r.isIPadMini && r.isLandscape;
    
  return StyleSheet.create({

   box: {
    backgroundColor: "white",
    borderRadius: radius(14),
    borderWidth: 1.5,
    borderColor: "#E0E4F0",
    padding: scale(5),
    elevation: 2,
    shadowColor: "#1A1F5E",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 8,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
  },

  questionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(15),
    flex: 1,
  },

  question: {
    flex: 1,
    fontSize: font(13),
    lineHeight: font(13),
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginHorizontal: scale(20),
    marginBottom: verticalScale(15),
  },

  answer: {
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(20),
    fontSize: font(13),
    lineHeight: font(22),
    color: "#555",
  },

  iconBG: {
    width: 
        isLargeIPad || isIPad || isIPadMini
        || isAndroidTablet || isFold
        ? scale(30)
        : scale(40),
    height: 
        isLargeIPad || isIPad || isIPadMini
        || isAndroidTablet || isFold
        ? scale(30)
        : scale(40),
    borderRadius: radius(10),
    backgroundColor: "#f0f0ff",
    justifyContent: "center",
    alignItems: "center",
  },
})};


