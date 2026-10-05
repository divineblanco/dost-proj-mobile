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

export function deleteAccountStyles(r: ResponsiveValues) {
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

   overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: scale(24),
  },
  modal: {
    width: "100%",
    maxWidth: scale(420),
    backgroundColor: "#fff",
    borderRadius: radius(16),
    padding: scale(24),
  },
  header: {
    alignItems: "center",
    backgroundColor: "transparent",
  },
  iconContainer: {
    width: scale(52),
    height: verticalScale(52),
    borderRadius: radius(26),
    backgroundColor: "#FDE8E8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(14),
  },
  title: {
    fontSize: font(20),
    lineHeight: font(21),
    fontWeight: "700",
    color: "#35408E",
    textAlign: "center",
    marginBottom: verticalScale(10),
  },
  description: {
    fontSize: font(14),
    lineHeight: font(21),
    color: "#666",
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    gap: scale(10),
    marginTop: verticalScale(24),
    backgroundColor: "transparent",
  },
  cancelButton: {
    flex: 1,
    height: verticalScale(46),
    borderRadius: radius(8),
    borderWidth: scale(1),
    borderColor: "#D0D0D0",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    flex: 1,
    height: verticalScale(46),
    borderRadius: radius(8),
    backgroundColor: "#E20000",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    color: "#35408E",
    fontWeight: "600",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "600",
  },
})};


