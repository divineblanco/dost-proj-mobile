import { StyleSheet } from "react-native";

import { MaxContentWidth } from "@/constants/theme";
import * as staticResponsive from "./responsive";
import { ResponsiveValues } from "./responsive";

export function createAuthStyles(r: ResponsiveValues) {
  const {
    font, hp, isCompactAndroid, isFold, isIPhone, isIPad, isLargeIPad,
    isIOS, isIPadMini, isLandscape, isPortrait, isLargePhone,
    isNormalScreen, isExtraTallScreen, isTablet, isTallScreen,
    radius, scale, spacing, verticalScale, wp,
  } = r;

  // ── Device + orientation combos ───────────────────────────────
  const isTallFold             = r.isFold && r.isTallScreen;
  const isNormalFold           = r.isFold && r.isNormalScreen;
  const isAndroidTabletPortrait  = r.isAndroidTablet && r.isPortrait;
  const isAndroidTabletLandscape = r.isAndroidTablet && r.isLandscape;
  const isIPadPortrait         = r.isIPad && r.isPortrait;
  const isIPadLandscape        = r.isIPad && r.isLandscape;
  const isLargeIPadPortrait    = r.isLargeIPad && r.isPortrait;
  const isLargeIPadLandscape   = r.isLargeIPad && r.isLandscape;
  const isIPadMiniPortrait     = r.isIPadMini && r.isPortrait;
  const isIPadMiniLandscape    = r.isIPadMini && r.isLandscape;

  // Shorthand groups used repeatedly below
  const isAnyTabletLandscape =
    isAndroidTabletLandscape || isIPadLandscape || isIPadMiniLandscape || isLargeIPadLandscape;
  const isAnyTabletLandscapeOrFold = isAnyTabletLandscape || isFold;
  const isAnyIPadPortrait =
    isIPadPortrait || isIPadMiniPortrait || isLargeIPadPortrait;
  const isAnyTabletPortrait =
    isAndroidTabletPortrait || isAnyIPadPortrait;

  // ── Derived widths ────────────────────────────────────────────
  const cardWidth =
    isAndroidTabletLandscape || isAndroidTabletPortrait || isLargeIPad ||
    isIPadLandscape || isIPadPortrait || isFold || isCompactAndroid
      ? "100%"
      : isLargePhone ? "90%"
      : isIPhone     ? "94%"
      : "100%";

  const modalWidth =
    isLargeIPad              ? "70%"
    : isIPadMini || isIPad   ? "65%"
    : isTablet               ? "65%"
    : isFold                 ? "70%"
    : isLargePhone           ? "88%"
    : isIPhone               ? "90%"
    : isCompactAndroid       ? "80%"
    : "92%";

  // ── Layout values per device/orientation ─────────────────────
  const layout =
    isLargeIPadLandscape   ? { logo: hp(25), heroFlex: 1,    defaultTxt: 20, cardPadding: scale(10), horizontalPadding: wp(1),  inputHeight: 75, buttonHeight: 80, otpSize: 85, otpGap: 15, tcPadding: 36, termsFont: 18 }
  : isLargeIPadPortrait    ? { logo: hp(20), heroFlex: 0.9,  defaultTxt: 25, cardPadding: scale(30), horizontalPadding: wp(5),  inputHeight: 70, buttonHeight: 75, otpSize: 90, otpGap: 15, tcPadding: 36, termsFont: 20 }
  : isIPadLandscape        ? { logo: hp(25), heroFlex: 0.9,  defaultTxt: 16, cardPadding: scale(22), horizontalPadding: wp(4),  inputHeight: 70, buttonHeight: 70, otpSize: 65, otpGap: 10, tcPadding: 36, termsFont: 15 }
  : isIPadPortrait         ? { logo: hp(18), heroFlex: 0.9,  defaultTxt: 20, cardPadding: 30,        horizontalPadding: wp(5),  inputHeight: 70, buttonHeight: 75, otpSize: 75, otpGap: 10, tcPadding: 36, termsFont: 20 }
  : isAndroidTabletLandscape ? { logo: hp(24), heroFlex: 0.45, defaultTxt: 17, cardPadding: 50,      horizontalPadding: 0,      inputHeight: 60, buttonHeight: 68, otpSize: 75, otpGap: 10, tcPadding: 60, termsFont: 15 }
  : isTallFold             ? { logo: hp(18), heroFlex: 1,    defaultTxt: 15, cardPadding: 22,        horizontalPadding: wp(9),  inputHeight: 58, buttonHeight: 70, otpSize: 70, otpGap: 10, tcPadding: 36, termsFont: 15 }
  : isAndroidTabletPortrait? { logo: hp(18), heroFlex: 0.9,  defaultTxt: 20, cardPadding: 40,        horizontalPadding: 0,      inputHeight: 62, buttonHeight: 64, otpSize: 70, otpGap: 14, tcPadding: 45, termsFont: 18 }
  : isIPadMiniPortrait     ? { logo: hp(18), heroFlex: 0.9,  defaultTxt: 18, cardPadding: 22,        horizontalPadding: wp(10), inputHeight: 58, buttonHeight: 70, otpSize: 75, otpGap: 10, tcPadding: 36, termsFont: 17 }
  : isIPadMiniLandscape    ? { logo: hp(25), heroFlex: 1,    defaultTxt: 16, cardPadding: 22,        horizontalPadding: wp(0),  inputHeight: 55, buttonHeight: 60, otpSize: 65, otpGap: 10, tcPadding: 36, termsFont: 14 }
  : isNormalFold           ? { logo: hp(18), heroFlex: 1,    defaultTxt: 14, cardPadding: 22,        horizontalPadding: wp(10), inputHeight: 50, buttonHeight: 55, otpSize: 60, otpGap: 10, tcPadding: 36, termsFont: 13 }
  : isLargePhone           ? { logo: hp(17), heroFlex: 0.8,  defaultTxt: 13, cardPadding: 22,        horizontalPadding: wp(0),  inputHeight: 56, buttonHeight: 58, otpSize: 48, otpGap: 6,  tcPadding: 24, termsFont: 12 }
  : isIPhone               ? { logo: hp(16), heroFlex: 0.85, defaultTxt: 12, cardPadding: 20,        horizontalPadding: wp(2),  inputHeight: 52, buttonHeight: 54, otpSize: 45, otpGap: 6,  tcPadding: 22, termsFont: 10 }
  : isCompactAndroid       ? { logo: hp(20), heroFlex: 1,    defaultTxt: 12, cardPadding: 18,        horizontalPadding: wp(4),  inputHeight: 50, buttonHeight: 52, otpSize: 43, otpGap: 5,  tcPadding: 20, termsFont: 10 }
  :                          { logo: hp(13), heroFlex: 0.38, defaultTxt: 11, cardPadding: 18,        horizontalPadding: wp(5),  inputHeight: 48, buttonHeight: 50, otpSize: 44, otpGap: 4,  tcPadding: 18, termsFont: 10 };

  const logo = layout.logo;

  return StyleSheet.create({

    /* ── Main layout ──────────────────────────────────────────── */

    container: {
      flex: 1,
      width: "100%",
      backgroundColor: "#35408E",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal:
        isAndroidTabletLandscape || isAndroidTabletPortrait ? 0 : scale(10),
    },

    safeArea: {
      flex: 1,
      width: "100%",
      alignSelf: "center",
      maxWidth:
        isAndroidTabletLandscape || isIPadLandscape ||
        isIPadMiniLandscape || isLargeIPadLandscape
          ? "100%"
          : MaxContentWidth,
      justifyContent: "space-evenly",
      paddingHorizontal:
        isAndroidTabletLandscape       ? wp(2)
        : isAnyTabletLandscape         ? wp(0)
        : layout.horizontalPadding,
      paddingTop: hp(0),
      paddingBottom: hp(2),
      gap: isFold ? scale(10) : scale(5),
    },

    heroSection: {
      flex: isAndroidTabletLandscape ? 1 : layout.heroFlex,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent",
      paddingVertical: isAndroidTabletLandscape ? verticalScale(20) : undefined,
    },

    heroLandscape: {
      flex: 0.8,
      alignItems: "center",
      backgroundColor: "transparent",
      justifyContent: "space-evenly",
      paddingVertical: verticalScale(10),
      paddingHorizontal:
        isIPadLandscape || isIPadMiniLandscape ? r.wp(4) : r.wp(2),
    },

    heroTagline: {
      paddingHorizontal: r.wp(0),
      paddingVertical: verticalScale(10),
      backgroundColor: "transparent",
    },

    heroTaglineText: {
      fontSize: font(11),
      color: "#f3e6cf",
      textAlign: "center",
      lineHeight: font(14),
      fontStyle: "italic",
    },

    authContainer: {
      flex: 1,
      backgroundColor: "transparent",
    },

    authContainerLandscape: {
      flex: 1,
      flexDirection: "row",
      alignItems: "stretch",
      paddingHorizontal:
        isIPadLandscape || isIPadMiniLandscape ? r.wp(0) : r.wp(2),
      paddingVertical: r.hp(2),
      gap: 0,
    },

    landscapeDivider: {
      width: 1.5,
      alignSelf: "stretch",
      backgroundColor: "#acb1c0",
      marginHorizontal: r.spacing(20),
      borderRadius: 1,
    },

    default: {
      fontSize: layout.defaultTxt,
      lineHeight: isAnyTabletLandscape ? font(14) : font(17),
      fontWeight: "400",
    },

    emailTitle: {
      fontSize: isAnyTabletLandscapeOrFold ? font(13) : font(16),
      fontWeight: "800",
      lineHeight: isAnyTabletLandscapeOrFold ? font(13) : font(16),
    },

    /* ── Card ─────────────────────────────────────────────────── */

    card: {
      width:
        isIPadMiniLandscape                            ? "90%"
        : isAndroidTabletLandscape || isFold           ? "80%"
        : cardWidth,
      maxWidth:
        isIPadMiniLandscape                            ? "90%"
        : isLargeIPad || isIPadLandscape               ? "100%"
        : isAndroidTabletLandscape                     ? "80%"
        : 560,
      minHeight: verticalScale(250),
      justifyContent: "center",
      alignSelf: "center",
      paddingHorizontal:
        isIPadMiniLandscape || isLargeIPadPortrait || isIPadLandscape ? scale(15)
        : isIPadMiniPortrait || isNormalFold                           ? scale(20)
        : isAndroidTabletLandscape                                     ? scale(15)
        : layout.cardPadding,
      paddingVertical:
        isIPadMiniLandscape || isLargeIPadPortrait || isIPadLandscape  ? verticalScale(30)
        : isIPadPortrait                                                ? verticalScale(25)
        : isNormalFold                                                  ? verticalScale(15)
        : isAndroidTabletLandscape                                      ? verticalScale(35)
        : layout.cardPadding,
      borderRadius: radius(18),
      gap:
        isNormalFold                                       ? spacing(8)
        : isLargePhone                                     ? spacing(20)
        : isAnyTabletLandscape || isTallFold               ? spacing(10)
        : spacing(15),
      shadowColor: "black",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 2,
    },

    cardLandscape: {
      flex: 1,
      maxWidth:
        isAndroidTabletLandscape || isIPadMiniLandscape || isLargeIPadLandscape
          ? scale(200)
          : scale(180),
      alignSelf: "center",
      width: "100%",
      backgroundColor: "#FFFFFF",
      borderRadius: 20,
      borderWidth: 1.5,
      borderColor: "#E0E4F0",
      padding: scale(24),
      shadowColor: "#1A1F5E",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 4,
    },

    /* ── Login ────────────────────────────────────────────────── */

    emailContainer: {
      backgroundColor: "white",
      borderRadius: isAndroidTabletLandscape ? radius(8) : radius(13),
      height: layout.inputHeight,
      justifyContent: "center",
    },

    input: {
      width: "100%",
      height: "100%",
      paddingHorizontal: scale(12),
      borderRadius: isAnyTabletLandscape ? radius(8) : radius(13),
      borderWidth: 1,
      borderColor: "#a0a0a0",
      color: "#35408E",
      fontSize: isAnyTabletLandscapeOrFold ? font(12) : font(15),
      backgroundColor: "#f3f3f3",
    },

    button: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFB633",
      height: layout.buttonHeight,
      borderRadius: isAnyTabletLandscape ? radius(8) : radius(13),
      elevation: 6,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },

    checkbox: {
      padding:
        isAndroidTabletLandscape || isIPadLandscape || isLargeIPadLandscape
          ? scale(4)
          : scale(5),
      borderRadius: radius(3),
    },

    terms: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "transparent",
    },

    termsText: {
      flex: 1,
      paddingLeft: scale(10),
      fontSize: layout.termsFont,
      lineHeight:
        isAndroidTabletLandscape || isIPadMiniLandscape || isLargeIPadLandscape ? font(10)
        : isIPadLandscape || isNormalFold                                        ? font(12)
        : font(16),
    },

    termsLink: {
      textDecorationLine: "underline",
      fontSize: layout.termsFont,
      fontWeight: "700",
      color: "#FFB633",
    },

    divider: {
      height: 1,
      backgroundColor: "#dad9d9",
    },

    accountQst: {
      alignItems: "center",
      backgroundColor: "transparent",
    },

    question: {
      fontSize: layout.termsFont,
      textAlign: "center",
      fontWeight: "600",
      lineHeight: isAndroidTabletLandscape ? font(8) : font(15),
      marginBottom: isAndroidTabletLandscape ? verticalScale(5) : undefined,
    },

    registerLink: {
      fontSize: layout.termsFont,
      fontWeight: "700",
      color: "#FFB633",
    },

    /* ── OTP ──────────────────────────────────────────────────── */

    otpRow: {
      flexDirection: "row",
      justifyContent: "center",
      backgroundColor: "transparent",
      gap: layout.otpGap,
    },

    OTPContainer: {
      width: layout.otpSize,
      height:
        isLargeIPadLandscape || isIPadMiniLandscape ? verticalScale(85)
        : isLargePhone                               ? verticalScale(50)
        : isAndroidTabletLandscape                   ? verticalScale(90)
        : isIPadLandscape                            ? verticalScale(75)
        : layout.otpSize,
      borderRadius:
        isIPadLandscape || isIPadMiniLandscape || isLargeIPadLandscape
          ? radius(10)
          : radius(13),
      backgroundColor: "#f3f3f3",
    },

    otpInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: "#8d8d8d",
      borderRadius:
        isIPadLandscape || isIPadMiniLandscape || isLargeIPadLandscape
          ? radius(10)
          : radius(13),
      textAlign: "center",
      fontFamily: "Poppins-Medium",
      fontSize: font(18),
      color: "#35408E",
    },

    otpInfoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "transparent",
    },

    otpTitle: {
      lineHeight:
        isLargeIPadLandscape || isIPadMiniLandscape || isIPadMiniPortrait ||
        isIPadPortrait || isIPadLandscape || isAndroidTabletLandscape ? 45
        : isLargeIPadPortrait                                         ? 50
        : isAndroidTabletPortrait                                     ? 35
        : 25,
      fontSize:
        isLargePhone                                              ? font(25)
        : isIPadMiniPortrait || isAndroidTabletPortrait           ? font(28)
        : isAnyTabletLandscape                                    ? font(18)
        : font(20),
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      paddingVertical: isAnyTabletLandscape ? verticalScale(0) : verticalScale(15),
    },

    resend: {
      fontWeight: "700",
      fontSize:
        isIPadPortrait                  ? font(11)
        : isIPadMiniPortrait || isLargeIPadPortrait ? font(12)
        : isAnyTabletLandscape          ? font(8)
        : isAndroidTabletPortrait       ? font(13)
        : undefined,
      lineHeight: isLargeIPadLandscape ? font(14) : undefined,
    },

    changeLink: {
      textDecorationLine: "underline",
      fontSize: layout.defaultTxt,
      fontWeight: "700",
      color: "#FFB633",
    },

    /* ── Logo ─────────────────────────────────────────────────── */

    iconContainer: {
      justifyContent: "center",
      alignItems: "center",
      width: logo,
      height: logo,
    },

    imageContainer: {
      justifyContent: "center",
      alignItems: "center",
    },

    image: {
      position: "absolute",
      width: logo * 2,
      height: logo * 1.9,
    },

    background: {
      width: logo * 2,
      height: logo * 2,
      borderRadius: 999,
      backgroundColor: "#FFFFFF",
      position: "absolute",
      elevation: 6,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },

    glow: {
      width: logo * 1.5,
      height: logo * 1.5,
      position: "absolute",
      backgroundColor: "transparent",
    },

    /* ── Terms modal ──────────────────────────────────────────── */

    termsTitle: {
      marginTop: verticalScale(22),
      marginBottom: verticalScale(15),
    },

    termsInfo: {
      fontSize: font(11),
      lineHeight: spacing(20),
      textAlign: "justify",
      fontFamily: "Poppins-Regular",
      color: "#35408E",
    },

    /* ── Auth modals (login success, resend code) ─────────────── */

    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(15,20,60,0.55)",
      justifyContent: "center",
      alignItems: "center",
    },

    modalContainer: {
      width: isAndroidTabletLandscape ? "100%" : modalWidth,
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

    modalIconRing: {
      width: isAndroidTabletLandscape ? scale(60) : scale(80),
      height: isAndroidTabletLandscape ? scale(60) : scale(80),
      borderRadius: scale(40),
      backgroundColor: "#353f8e1c",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: verticalScale(18),
    },

    modalIconInner: {
      width: isAndroidTabletLandscape ? scale(50) : scale(58),
      height: isAndroidTabletLandscape ? scale(50) : scale(58),
      borderRadius: scale(29),
      backgroundColor: "#35408E",
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#1A1F5E",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },

    modalTitle: {
      fontSize: font(18),
      fontWeight: "700",
      color: "#1A1F5E",
      marginBottom: verticalScale(8),
      textAlign: "center",
      lineHeight:
        isLargeIPadPortrait || isLargeIPadLandscape ? 40
        : isIPadMiniPortrait                        ? 30
        : isAndroidTabletLandscape || isFold        ? 35
        : 30,
    },

    modalDescription: {
      fontSize: font(13),
      color: "#6B7280",
      textAlign: "center",
      lineHeight: font(20),
    },

    modalDivider: {
      width: "100%",
      height: 1,
      backgroundColor: "#F0F2F8",
      marginVertical: verticalScale(22),
    },

    modalButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: scale(7),
      backgroundColor: "#35408E",
      width: "100%",
      paddingVertical:
        isFold                    ? verticalScale(25)
        : isAndroidTabletLandscape ? verticalScale(30)
        : verticalScale(13),
      borderRadius: radius(10),
      shadowColor: "#1A1F5E",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.28,
      shadowRadius: 8,
      elevation: 5,
    },

    modalButtonText: {
      color: "#FFFFFF",
      fontSize: font(14),
      fontWeight: "700",
      lineHeight: isAndroidTabletLandscape || isLargeIPad ? 35 : 25,
    },

    modalCloseBtn: {
      position: "absolute",
      top: verticalScale(14),
      right: scale(14),
      width: scale(30),
      height: scale(30),
      borderRadius: scale(15),
      backgroundColor: "#F3F4F6",
      justifyContent: "center",
      alignItems: "center",
    },

    /* ── Terms & Conditions full-page modal ───────────────────── */

    tcScreen: {
      flex: 1,
      backgroundColor: "#F8F9FD",
    },

    tcHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: scale(20),
      paddingTop:
        isIPadMiniPortrait ? verticalScale(50)
        : isIOS || isLargePhone ? verticalScale(60)
        : isCompactAndroid  ? verticalScale(40)
        : verticalScale(15),
      paddingBottom: verticalScale(16),
      backgroundColor: "#FFFFFF",
    },

    tcHeaderLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: scale(10),
    },

    tcHeaderTitle: {
      fontSize: font(20),
      fontWeight: "700",
      color: "#1A1F5E",
      lineHeight: font(25),
    },

    tcCloseBtn: {
      width: scale(32),
      height: scale(32),
      borderRadius: scale(16),
      backgroundColor: "#F3F4F6",
      justifyContent: "center",
      alignItems: "center",
    },

    tcHeaderDivider: {
      height: verticalScale(3),
      backgroundColor: "#35408E",
      marginHorizontal: scale(20),
      borderRadius: radius(2),
    },

    tcScroll: { flex: 1 },

    tcScrollContent: {
      paddingHorizontal: layout.tcPadding,
      paddingVertical: spacing(20),
      gap: scale(4),
    },

    tcIntro: {
      fontSize: font(13),
      color: "#35408E",
      lineHeight: font(20),
      marginBottom: verticalScale(16),
    },

    tcSection: {
      backgroundColor: "#FFFFFF",
      borderRadius: radius(12),
      padding: scale(16),
      marginBottom: verticalScale(10),
      borderWidth: 1,
      borderColor: "#F0F2F8",
      gap: scale(8),
    },

    tcSectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: scale(10),
    },

    tcSectionNumber: {
      width: scale(24),
      height: scale(24),
      borderRadius: scale(12),
      opacity: 0.55,
      backgroundColor: "#35408E",
      justifyContent: "center",
      alignItems: "center",
    },

    tcSectionNumberText: {
      fontSize: font(11),
      fontWeight: "700",
      color: "white",
    },

    tcSectionHeading: {
      fontSize: font(13),
      fontWeight: "700",
      color: "#35408E",
      flex: 1,
      lineHeight: font(13),
    },

    tcSectionBody: {
      fontSize: font(12),
      color: "#4B5563",
      lineHeight: font(19),
    },

    tcBottomPad: { height: verticalScale(8) },

    tcFooter: {
      paddingHorizontal: scale(20),
      paddingVertical: verticalScale(16),
      backgroundColor: "#FFFFFF",
      borderTopWidth: 1,
      borderTopColor: "#F0F2F8",
    },

    /* ── Register ─────────────────────────────────────────────── */

    required: {
      color: "#E53935",
      fontWeight: "700",
    },

    validationError: {
      color: "#E53935",
      fontSize: font(11),
      marginTop: verticalScale(4),
      marginLeft: scale(2),
    },

    inputError: {
      borderWidth: 1,
      borderColor: "#E53935",
    },

    cardReg: {
      width:
        isIPadMiniLandscape || isLargeIPadLandscape ? "90%"
        : isIPadLandscape || isAndroidTabletLandscape ? "80%"
        : cardWidth,
      maxWidth:
        isIPadMiniLandscape          ? "90%"
        : isLargeIPad || isIPadLandscape ? "100%"
        : isAndroidTabletLandscape   ? 1200
        : 560,
      minHeight: verticalScale(250),
      justifyContent: "center",
      alignSelf: "center",
      paddingHorizontal:
        isIPadMiniLandscape || isLargeIPadPortrait || isIPadLandscape ? scale(15)
        : isIPadMiniPortrait || isNormalFold                           ? scale(20)
        : isAndroidTabletLandscape                                     ? scale(20)
        : layout.cardPadding,
      paddingVertical:
        isIPadMiniLandscape                           ? verticalScale(25)
        : isLargeIPadPortrait || isIPadLandscape      ? verticalScale(30)
        : isIPadPortrait                              ? verticalScale(25)
        : isNormalFold                                ? verticalScale(15)
        : isAndroidTabletLandscape                    ? verticalScale(25)
        : layout.cardPadding,
      borderRadius: radius(18),
      gap:
        isNormalFold || isAndroidTabletLandscape              ? spacing(5)
        : isLargePhone                                        ? spacing(20)
        : isLargeIPadLandscape || isIPadMiniLandscape ||
          isIPadLandscape || isTallFold                       ? spacing(10)
        : spacing(15),
      shadowColor: "black",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 2,
    },

    stepTxt: {
      textAlign: "center",
      fontSize:
        isAnyIPadPortrait || isAndroidTabletPortrait ? font(20)
        : isNormalFold                               ? font(11)
        : isTallFold || isLargePhone                 ? font(18)
        : font(16),
      fontWeight: "800",
      lineHeight:
        isAnyIPadPortrait || isAndroidTabletPortrait ? font(20)
        : isNormalFold                               ? font(10)
        : isTallFold || isLargePhone                 ? font(18)
        : font(16),
      color: "white",
      paddingVertical:
        isAndroidTabletPortrait || isLargePhone        ? verticalScale(40)
        : isIPadPortrait || isLargeIPadLandscape ||
          isIPadMiniLandscape                          ? verticalScale(30)
        : isLargeIPadPortrait                          ? verticalScale(35)
        : verticalScale(25),
    },

    submitBtn: {
      backgroundColor: "transparent",
      marginTop:
        isCompactAndroid || isAndroidTabletLandscape || isAnyIPadPortrait ||
        isIPadLandscape                                ? verticalScale(20)
        : isIPadMiniLandscape                         ? verticalScale(5)
        : verticalScale(2),
    },

    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: isAndroidTabletLandscape ? spacing(7) : spacing(10),
      backgroundColor: "transparent",
    },

    box: {
      width: "100%",
      maxWidth:
        isAnyIPadPortrait || isAndroidTabletPortrait        ? "48%"
        : isAndroidTabletLandscape || isLargeIPadLandscape ||
          isIPadMiniLandscape                               ? "30%"
        : isIPadLandscape                                   ? "25%"
        : isFold || isCompactAndroid                        ? "31%"
        : "48%",
      alignItems: "center",
      gap:
        isAnyIPadPortrait || isNormalFold || isCompactAndroid ||
        isAnyTabletLandscape                                ? spacing(5)
        : spacing(10),
      paddingHorizontal: scale(11),
      paddingVertical:
        isNormalFold || isTallFold || isIPadMiniLandscape ||
        isAndroidTabletPortrait || isAndroidTabletLandscape  ? verticalScale(25)
        : isAnyIPadPortrait                                  ? verticalScale(10)
        : isIPadLandscape || isCompactAndroid                ? verticalScale(15)
        : isLargeIPadLandscape                               ? verticalScale(20)
        : verticalScale(12),
      backgroundColor: "#FFFFFF",
      borderRadius: radius(10),
      borderWidth: scale(1.5),
      borderColor: "#E8EAF0",
      shadowColor: "#1A1F5E",
      shadowOffset: { width: 0, height: verticalScale(1) },
      shadowOpacity: 0.06,
      shadowRadius: radius(4),
      elevation: 2,
    },

    boxSelected: {
      borderColor: "#35408E",
      backgroundColor: "#F4F5FB",
    },

    iconBubble: {
      width:
        isIPadMiniLandscape || isAndroidTabletLandscape      ? scale(30)
        : isCompactAndroid                                    ? scale(40)
        : isNormalFold                                        ? scale(25)
        : isTallFold || isIPadLandscape || isLargeIPadLandscape ? scale(30)
        : isAnyIPadPortrait || isAndroidTabletPortrait        ? scale(35)
        : scale(38),
      height:
        isLargeIPadLandscape                                  ? verticalScale(65)
        : isIPadLandscape || isAndroidTabletLandscape ||
          isIPadMiniLandscape                                 ? verticalScale(70)
        : isAnyIPadPortrait || isTallFold || isCompactAndroid ? verticalScale(50)
        : isNormalFold                                        ? verticalScale(65)
        : isAndroidTabletPortrait                             ? verticalScale(40)
        : verticalScale(38),
      borderRadius: radius(10),
      justifyContent: "center",
      alignItems: "center",
    },

    boxTitle: {
      fontSize:
        isAnyIPadPortrait || isAndroidTabletPortrait           ? font(13)
        : isFold || isAndroidTabletLandscape || isIPadLandscape ? font(9)
        : isCompactAndroid || isLargeIPadLandscape ||
          isIPadMiniLandscape                                  ? font(10)
        : font(11.9),
      lineHeight: font(16),
      fontWeight: "600",
      color: "#4B5563",
    },

    boxTitleSelected: { color: "#35408E" },

    check: {
      width:
        isLargeIPadPortrait                                   ? scale(10)
        : isIPadPortrait || isLargeIPadLandscape              ? scale(11)
        : isIPadMiniPortrait || isAndroidTabletPortrait       ? scale(13)
        : isNormalFold                                        ? scale(10)
        : isTallFold || isAndroidTabletLandscape ||
          isIPadMiniLandscape                                 ? scale(9)
        : isIPadLandscape                                     ? scale(8)
        : scale(18),
      height:
        isLargeIPadLandscape || isAndroidTabletLandscape      ? verticalScale(32)
        : isLargeIPadPortrait                                 ? verticalScale(16)
        : isIPadMiniLandscape                                 ? verticalScale(30)
        : isIPadPortrait || isAndroidTabletPortrait           ? verticalScale(17)
        : isNormalFold || isIPadLandscape                     ? verticalScale(25)
        : isTallFold                                          ? verticalScale(19)
        : isCompactAndroid                                    ? verticalScale(20)
        : verticalScale(18),
      borderRadius: radius(9),
      borderWidth: scale(1.5),
      borderColor: "#D1D5E8",
      backgroundColor: "#F8F9FD",
      justifyContent: "center",
      alignItems: "center",
    },

    checkSelected: {
      backgroundColor: "#35408E",
      borderColor: "#35408E",
    },

    /* ── Register step 2 ──────────────────────────────────────── */

    step2Scroll: {
      maxHeight:
        isNormalFold          ? verticalScale(550)
        : isIPadPortrait      ? verticalScale(570)
        : isIPadMiniPortrait  ? verticalScale(565)
        : isLargeIPadPortrait || isAndroidTabletPortrait ? verticalScale(580)
        : verticalScale(555),
    },

    headerBck: {
      flexDirection: "row",
      alignItems: "center",
    },

    btnDisabled: { opacity: 0.4 },

    backBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: scale(2),
      alignSelf: "flex-start",
      marginBottom: verticalScale(4),
      paddingVertical: verticalScale(4),
      paddingRight: scale(8),
    },

    roleBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: scale(6),
      alignSelf: "flex-start",
      backgroundColor: "#EEF0FA",
      paddingHorizontal: scale(10),
      paddingVertical:
        isFold || isLargeIPadLandscape || isIPadMiniLandscape
          ? verticalScale(8)
          : verticalScale(5),
      borderRadius: radius(20),
      marginVertical: verticalScale(5),
    },

    roleBadgeTxt: {
      fontSize:
        isFold || isAndroidTabletLandscape || isIPadLandscape ||
        isIPadMiniLandscape
          ? font(10)
          : font(12),
      fontWeight: "600",
      color: "#35408E",
      lineHeight: font(14),
    },

    fields: {
      gap:
        isFold || isAndroidTabletLandscape || isIPadLandscape
          ? scale(8)
          : scale(12),
      backgroundColor: "transparent",
    },

    fieldGroup: {
      gap:
        isFold || isAndroidTabletLandscape ? scale(2) : scale(5),
      backgroundColor: "transparent",
    },

    fieldLabel: {
      fontSize:
        isFold || isAndroidTabletLandscape ? font(10) : font(12),
      fontWeight: "600",
      color: "#35408E",
      letterSpacing: 0.2,
      lineHeight: font(13),
    },

    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: scale(8),
      borderWidth: 1.5,
      borderRadius: radius(9),
      borderColor: "#E0E4F0",
      backgroundColor: "#F8F9FD",
      paddingHorizontal: scale(12),
      paddingVertical:
        isCompactAndroid                                          ? verticalScale(2)
        : isLargePhone || isAndroidTabletPortrait ||
          isAndroidTabletLandscape                               ? verticalScale(5)
        : isAnyIPadPortrait                                      ? verticalScale(10)
        : isFold                                                 ? verticalScale(0)
        : verticalScale(15),
    },

    inputFilled: {
      borderColor: "#C5CAE9",
      backgroundColor: "#FFFFFF",
    },

    inputReg: {
      flex: 1,
      fontSize:
        isFold || isAndroidTabletLandscape || isIPadLandscape
          ? font(10)
          : font(13),
      color: "#1A1F5E",
      fontWeight: "500",
    },

    orgTrigger: {
      flexDirection: "row",
      alignItems: "center",
      gap: scale(8),
      borderWidth: 1.5,
      borderRadius: radius(9),
      borderColor: "#E0E4F0",
      backgroundColor: "#F8F9FD",
      paddingHorizontal: scale(12),
      paddingVertical:
        isAnyIPadPortrait || isTallFold ? verticalScale(10)
        : isIPadLandscape               ? verticalScale(20)
        : verticalScale(15),
    },

    orgTriggerFilled: {
      borderColor: "#C5CAE9",
      backgroundColor: "#FFFFFF",
    },

    orgTriggerText: {
      flex: 1,
      fontSize:
        isFold || isAndroidTabletLandscape || isIPadLandscape
          ? font(10)
          : font(13),
      color: "#9BA8C0",
      fontWeight: "500",
      lineHeight: font(14),
    },

    orgTriggerTextActive: {
      color: "#1A1F5E",
      fontWeight: "600",
    },

    orgDropdown: {
      position: "absolute",
      backgroundColor: "#FFFFFF",
      maxHeight:
        isNormalFold                                  ? verticalScale(200)
        : isAndroidTabletLandscape || isIPadLandscape ||
          isLargeIPadLandscape || isIPadMiniLandscape ? verticalScale(170)
        : verticalScale(150),
      borderRadius: radius(12),
      borderWidth: 1.5,
      borderColor: "#E0E4F0",
      paddingVertical:
        isFold || isAnyTabletLandscape ? verticalScale(10) : verticalScale(4),
      shadowColor: "#1A1F5E",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 10,
    },

    orgItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: verticalScale(11),
      paddingHorizontal: scale(14),
      marginHorizontal: verticalScale(4),
      borderRadius: radius(8),
    },

    orgItemActive: { backgroundColor: "#EEF0FA" },

    orgItemText: {
      fontSize:
        isFold || isAndroidTabletLandscape || isIPadLandscape
          ? font(10)
          : font(13),
      color: "#374151",
      flex: 1,
      lineHeight: font(14),
    },

    orgItemTextActive: {
      color: "#35408E",
      fontWeight: "700",
    },

    modalOverlay1: { flex: 1 },

  });
}

export const authStyles = createAuthStyles(
  staticResponsive as unknown as ResponsiveValues
);