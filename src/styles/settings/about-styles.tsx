import { StyleSheet } from "react-native";
import { font, isAndroidTablet, radius, ResponsiveValues, scale, verticalScale } from "../responsive";

export function legalStyles(r: ResponsiveValues) {
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
    // =========================
    // PAGE
    // =========================

    pageContainer: {
      flex: 1,
      backgroundColor: "#F8F9FD",
    },

    scrollContent: {
      padding: scale(20),
      paddingBottom: verticalScale(100),
      gap: scale(12),
    },

    // =========================
    // HEADER
    // =========================

    header: {
      gap: scale(8),
      backgroundColor: "transparent",
    },

    headerLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: scale(10),
      backgroundColor: "transparent",
    },

    headerIcon: {
      width: scale(38),
      height: scale(38),
      borderRadius: radius(10),
      backgroundColor: "#EEF0FA",
      justifyContent: "center",
      alignItems: "center",
    },

    title: {
      fontSize: font(22),
      fontWeight: "700",
      color: "#35408E",
      lineHeight: font(30),
    },

    datePill: {
      flexDirection: "row",
      alignItems: "center",
      gap: scale(5),
      backgroundColor: "transparent",
    },

    dateText: {
      fontSize: font(12),
      lineHeight: font(12),
      color: "#9BA8C0",
      fontWeight: "500",
    },

    accentBar: {
      height: verticalScale(3),
      width: "100%",
      backgroundColor: "#35408E",
      borderRadius: radius(2),
    },

    // =========================
    // INTRO CARD
    // =========================

    introCard: {
      backgroundColor: "#FFFFFF",
      borderRadius: radius(12),
      borderWidth: scale(1.5),
      borderColor: "#E0E4F0",
      padding: scale(16),
      shadowColor: "#1A1F5E",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.06,
      shadowRadius: 6,
      elevation: 2,
    },

    introText: {
      fontSize: font(13),
      color: "#4B5563",
      lineHeight: font(20),
    },

    // =========================
    // SECTIONS
    // =========================

    sectionsContainer: {
      gap: scale(10),
      backgroundColor: "transparent",
    },

    sectionCard: {
      backgroundColor: "#FFFFFF",
      borderRadius: radius(12),
      borderWidth: scale(1),
      borderColor: "#F0F2F8",
      padding: scale(16),
      gap: scale(10),
      shadowColor: "#1A1F5E",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 1,
    },

    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: scale(10),
      backgroundColor: "transparent",
    },

    sectionNumber: {
      width: scale(26),
      height: verticalScale(26),
      borderRadius: radius(13),
      backgroundColor: "#35408E",
      justifyContent: "center",
      alignItems: "center",
    },

    sectionNumberText: {
      fontSize: font(12),
      lineHeight: font(12),
      fontWeight: "700",
      color: "#FFFFFF",
    },

    sectionHeading: {
      fontSize: font(14),
      lineHeight: font(14),
      fontWeight: "700",
      color: "#1A1F5E",
      flex: 1,
    },

    sectionBody: {
      fontSize: font(12),
      color: "#4B5563",
      lineHeight: font(19),
    },

    // =========================
    // SUBSECTIONS
    // =========================

    subsection: {
      backgroundColor: "#F8F9FD",
      borderRadius: radius(8),
      borderLeftWidth: scale(3),
      borderLeftColor: "#D1D5E8",
      padding: scale(10),
      gap: scale(4),
    },

    subsectionLabel: {
      fontSize: font(12),
      lineHeight: font(12),
      fontWeight: "700",
      color: "#35408E",
    },
  });
}

export function aboutStyles(r: ResponsiveValues) {
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
    // =========================
    // PAGE
    // =========================

    pageContainer: {
      flex: 1,
      backgroundColor: "#F8F9FD",
    },

    scrollContent: {
      padding: scale(20),
      paddingBottom: verticalScale(100),
      gap: scale(14),
    },

    // =========================
    // HERO CARD
    // =========================

    heroCard: {
      backgroundColor: "#35408E",
      borderRadius: radius(16),
      padding: scale(24),
      alignItems: "center",
      gap: scale(10),
      shadowColor: "#35408E",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
    },

    logoWrapper: {
      width: 
        isLargeIPad 
        ? scale(55)
        : isIPad 
        ? scale(60)
        : isIPadMini || isAndroidTablet
        ? scale(65)
        : isCompactAndroid
        ? scale(75)
        : isTallFold
        ? scale(52)
        : isNormalFold
        ? scale(42)
        : scale(90),
      height: 
        isFold
        ? verticalScale(110)
        : verticalScale(90),
      borderRadius: radius(999),
      backgroundColor: "#FFFFFF",
      overflow: "hidden",
      borderWidth: scale(2),
      borderColor: "rgba(255,255,255,0.4)",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
      alignItems: "center",
      justifyContent: "center"
    },

    logo: {
      width: 
        isLargeIPad 
        ? scale(55)
        : isIPad
        ? scale(60)
        : isIPadMini || isAndroidTablet
        ? scale(65)
        : isCompactAndroid
        ? scale(75)
        : isTallFold
        ? scale(50)
        : isNormalFold
        ? scale(40)
        : scale(90),
      height: 
        isFold
        ? verticalScale(100)
        : verticalScale(90),
      borderRadius: radius(999),
    },

    appTitle: {
      fontSize: font(22),
      fontWeight: "700",
      color: "#FFFFFF",
      marginTop: verticalScale(4),
      lineHeight: font(25),
    },

    appSubtitle: {
      fontSize: font(12),
      color: "rgba(255,255,255,0.75)",
      textAlign: "center",
      lineHeight: font(18),
    },

    poweredByPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: scale(6),
      backgroundColor: "rgba(255,255,255,0.15)",
      paddingHorizontal: scale(14),
      paddingVertical: verticalScale(6),
      borderRadius: radius(20),
      marginTop: verticalScale(4),
    },

    poweredByTxt: {
      fontSize: font(12),
      lineHeight: font(12),
      color: "#FFFFFF",
      fontWeight: "600",
    },

    // =========================
    // SECTION CARDS
    // =========================

    sectionCard: {
      backgroundColor: "#FFFFFF",
      borderRadius: radius(14),
      borderWidth: scale(1.5),
      borderColor: "#E0E4F0",
      padding: scale(16),
      gap: scale(12),
      shadowColor: "#1A1F5E",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.06,
      shadowRadius: 6,
      elevation: 2,
    },

    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: scale(8),
      backgroundColor: "transparent",
    },

    sectionIcon: {
      width: 
        isLargeIPad || isIPad || isIPadMini
        || isAndroidTablet
        ? scale(25)
        : isFold
        ? scale(20)
        : scale(32),
      height: 
        isFold
        ? verticalScale(40)
        : verticalScale(32),
      borderRadius: radius(8),
      backgroundColor: "#EEF0FA",
      justifyContent: "center",
      alignItems: "center",
    },

    sectionTitle: {
      fontSize: font(15),
      lineHeight: font(15),
      fontWeight: "700",
      color: "#1A1F5E",
    },

    sectionDivider: {
      height: verticalScale(1),
      backgroundColor: "#F0F2F8",
    },

    bodyText: {
      fontSize: font(13),
      color: "#4B5563",
      lineHeight: font(20),
      textAlign: "justify",
    },

    bold: {
      fontWeight: "700",
      color: "#1A1F5E",
    },

    // =========================
    // PARTNER LOGOS
    // =========================

    logosRow: {
      flexDirection: "row",
      justifyContent: "center",
      gap: scale(16),
      backgroundColor: "transparent",
    },

    logoCard: {
      backgroundColor: "#F8F9FD",
      borderRadius: radius(12),
      borderWidth: scale(1.5),
      borderColor: "#E0E4F0",
      padding: scale(12),
      alignItems: "center",
      justifyContent: "center",
    },

    partnerLogo: {
      width: scale(120),
      height: verticalScale(140),
    },
  });
}


