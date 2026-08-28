import { StyleSheet } from "react-native";
import { font, isAndroidTablet, radius, ResponsiveValues, scale, verticalScale } from "../responsive";

export function editProfileStyles(r: ResponsiveValues) {
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
      paddingBottom: verticalScale(100),
    },

    inner: {
      padding: scale(20),
      gap: scale(14),
    },

    // =========================
    // HEADER
    // =========================

    header: {
      gap: scale(5),
      backgroundColor: "transparent",
    },

    title: {
      fontSize: font(22),
      fontWeight: "700",
      color: "#1A1F5E",
      lineHeight: font(25),
    },

    subtitle: {
      fontSize: font(13),
      color: "#6B7280",
      lineHeight: font(18),
    },

    sectionDivider: {
      height: verticalScale(3),
      backgroundColor: "#35408E",
      borderRadius: radius(2),
      width: "100%",
    },

    // =========================
    // CARD
    // =========================

    card: {
      backgroundColor: "#FFFFFF",
      borderRadius: radius(14),
      borderWidth: scale(1.5),
      borderColor: "#E0E4F0",
      padding: scale(16),
      gap: scale(10),
      elevation: 3,
      shadowColor: "#1A1F5E",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.07,
      shadowRadius: 8,
    },

    // =========================
    // LABEL
    // =========================

    label: {
      fontSize: font(15),
      fontWeight: "600",
      lineHeight: font(15),
      color: "#35408E",
      letterSpacing: 0.2,
    },

    // =========================
    // INPUT
    // =========================

    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: scale(8),
      borderWidth: scale(1.5),
      borderRadius: radius(10),
      borderColor: "#E0E4F0",
      backgroundColor: "#F8F9FD",
      paddingHorizontal: scale(12),
      paddingVertical: verticalScale(10),
    },

    inputHeight: {
        paddingVertical: 
            isFold
            ? verticalScale(10)
            : verticalScale(0),
    },

    input: {
      flex: 1,
      fontSize: font(14),
      color: "#1A1F5E",
      fontWeight: "500",
      lineHeight: 
        isCompactAndroid
        ? font(18)
        : font(16),
      minHeight: verticalScale(40),
      paddingTop: 
        isCompactAndroid
        ? verticalScale(14)
        : isFold 
        ? verticalScale(10)
        : isAndroidTablet
        ? verticalScale(5)
        : verticalScale(0),
    },

    inputDefault: {
      borderColor: "#E0E4F0",
      backgroundColor: "#F8F9FD",
    },

    inputValid: {
      borderColor: "#2E9E3A",
      backgroundColor: "#EAFBE7",
    },

    inputError: {
      borderColor: "#C62828",
      backgroundColor: "#FFF0F0",
    },

    // =========================
    // EMAIL
    // =========================

    atSign: {
      fontSize: font(15),
      fontWeight: "700",
      color: "#35408E",
      lineHeight: font(15)
    },

    // =========================
    // INPUT META
    // =========================

    inputMeta: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    validationHint: {
      fontSize: font(11),
      color: "#9BA8C0",
      flex: 1,
      lineHeight: font(11)
    },

    validationHintError: {
      color: "#C62828",
    },

    validationHintOk: {
      color: "#2E9E3A",
      fontWeight: "600",
    },

    charCount: {
      fontSize: font(11),
      color: "#9BA8C0",
      lineHeight: font(11)
    },

    // =========================
    // RULES
    // =========================

    rulesCard: {
      backgroundColor: "#EEF0FA",
      borderRadius: radius(12),
      borderWidth: scale(1),
      borderColor: "#D1D5E8",
      padding: scale(14),
      gap: scale(10),
    },

    rulesHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: scale(6),
      marginBottom: verticalScale(2),
      backgroundColor: "transparent",
    },

    rulesTitle: {
      fontSize: font(12),
      lineHeight: font(12),
      fontWeight: "700",
      color: "#35408E",
    },

    ruleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: scale(10),
    },

    ruleText: {
      fontSize: font(12),
      color: "#4B5563",
      flex: 1,
      lineHeight: font(12)
    },

    ruleTextValid: {
      color: "#2E9E3A",
      fontWeight: "600",
    },

    // =========================
    // SAVE BUTTON
    // =========================

    saveBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: scale(8),
      backgroundColor: "#FFB633",
      paddingVertical: 
        isLargeIPad || isIPad || isIPadMini
        || isAndroidTablet || isFold
        ? verticalScale(18)
        : verticalScale(14),
      borderRadius: radius(10),
      marginTop: verticalScale(8),
      shadowColor: "#1A1F5E",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.18,
      shadowRadius: 5,
      elevation: 5,
    },

    saveBtnDisabled: {
      backgroundColor: "#E0E4F0",
      shadowOpacity: 0,
      elevation: 0,
    },

    saveTxt: {
      color: "#FFFFFF",
      fontSize: font(14),
      lineHeight: font(14),
      fontWeight: "700",
    },

    saveTxtDisabled: {
      color: "#9BA8C0",
    },
  });
}

export function editSuccessStyles(r: ResponsiveValues) {
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
        backgroundColor: "rgba(15, 20, 60, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },

    container: {
        width: 
            isLargeIPadPortrait 
            ? "55%"
            : isIPadPortrait || isFold || isAndroidTabletPortrait
            ? "58%"
            : isIPadMiniPortrait 
            ? "64%"
            : isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape
            || isAndroidTabletLandscape
            ? "40%"
            : "82%",
        backgroundColor: "#FFFFFF",
        borderRadius: radius(20),
        paddingTop: verticalScale(36),
        paddingBottom: verticalScale(28),
        paddingHorizontal: scale(28),
        alignItems: "center",
        shadowColor: "#1A1F5E",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.18,
        shadowRadius: 20,
        elevation: 12,
    },

    // Outer soft ring + filled circle
    iconRing: {
        width: 
            isCompactAndroid 
            ? scale(78)
            : isLargeIPad 
            ? scale(55)
            : isIPad || isIPadMini
            ? scale(60)
            : isAndroidTablet
            ? scale(68)
            : isFold
            ? scale(48)
            : scale(88),
        height: 
            isTallFold
            ? verticalScale(95)
            : isNormalFold
            ? verticalScale(115)
            : verticalScale(88),
        borderRadius: radius(44),
        backgroundColor: "#e0e4ffaa",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: verticalScale(20),
    },

    iconInner: {
        width: 
            isCompactAndroid
            ? scale(54)
            : isLargeIPad
            ? scale(40)
            : isIPad || isIPadMini
            ? scale(45)
            : isAndroidTablet
            ? scale(50)
            : isFold
            ? scale(35)
            : scale(64),
        height: 
            isTallFold
            ? verticalScale(70)
            : isNormalFold
            ? verticalScale(90)
            : verticalScale(64),
        borderRadius: radius(32),
        backgroundColor: "#35408E",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#35408E",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },

    title: {
        fontSize: font(20),
        fontWeight: "700",
        color: "#1A1F5E",
        textAlign: "center",
        marginBottom: verticalScale(8),
        lineHeight: font(20),
    },

    message: {
        fontSize: font(13),
        color: "#6B7280",
        textAlign: "center",
        lineHeight: font(20),
    },

    divider: {
        width: "100%",
        height: verticalScale(1),
        backgroundColor: "#F0F2F8",
        marginVertical: verticalScale(22),
    },

    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: scale(8),
        backgroundColor: "#35408E",
        paddingHorizontal: scale(32),
        paddingVertical: 
            isFold
            ? verticalScale(18)
            : verticalScale(13),
        borderRadius: radius(10),
        width: "100%",
        shadowColor: "#35408E",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.28,
        shadowRadius: 8,
        elevation: 5,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: font(14),
        fontWeight: "700",
        lineHeight: font(14)
    },
  });
}
