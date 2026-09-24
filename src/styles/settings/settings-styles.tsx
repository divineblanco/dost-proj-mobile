import { StyleSheet } from "react-native";
import { font, isAndroidTablet, radius, ResponsiveValues, scale, verticalScale } from "../responsive";

export function settingsStyles (r: ResponsiveValues) {
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
      
  pageContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: scale(5),
  },

  scrollContent: {
    paddingBottom: verticalScale(95),
  },

  container: {
    paddingVertical: verticalScale(10)
  },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 
      isIPad || isIPadMini || isLargeIPad
      || isAndroidTablet || isFold
      ? scale(15)
      : scale(20),
  },

  tab: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },

  tabText: {
    fontSize: font(15),
    fontWeight: "600",
    lineHeight: font(30),
  },

  tabLogout: {
    fontSize:font(15),
    fontWeight: "600",
    lineHeight: font(30),
    color: "#E20000",
  },

  tabIcon: {
    paddingRight: scale(10)
  },
  
  dividerLine: {
    backgroundColor: "#c7c7c7",
    padding: scale(0.5),
    width: "85%",
    alignSelf: "center",
    marginBottom: verticalScale(15)
  },
  
  boxBG: {
    backgroundColor: "white",
    borderRadius: radius(14),
    borderWidth: scale(1.5),
    borderColor: "#E0E4F0",
    padding: scale(15),
    elevation: 2,
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
  },


  //PROFILE SETTINGS
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: scale(15),
    padding: scale(20),
  },

  profileImg: {
    width: 
      isIPadMini || isAndroidTablet
      ? scale(110)
      : isIPad 
      ? scale(100)
      : isLargeIPad 
      ? scale(95)
      : isCompactAndroid 
      ? scale(125)
      : isTallFold
      ? scale(86)
      : isNormalFold
      ? scale(70)
      : scale(150),
    height: 
      isFold
      ? verticalScale(180)
      : verticalScale(150),
    borderRadius: radius(999),
  },

  imageShadow: {
    elevation: 3,
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    borderRadius: radius(999),
  },

  edit: {
    textDecorationLine: "underline",
    fontWeight: "400",
    lineHeight: font(12)
  },

  infoContainer: {
    padding: scale(15),
  },

  profileInfoBG: {
    backgroundColor: "white",
    padding: scale(20),
    borderRadius: radius(10),
    borderWidth: scale(2),
    borderColor: "#E0E4F0",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(15),
    backgroundColor: "transparent",
  },

  infoColumn: {
    flex: 1,
    backgroundColor: "transparent",
  },

  info: {
    fontSize: font(15),
    fontWeight: "800",
    flexShrink: 1,
    lineHeight: font(15)
  },

  label: {
    fontSize: font(14),
    fontWeight: "300",
    color: "#868686",
    marginTop: verticalScale(2),
    lineHeight: font(14)
  },

  line: {
    height: verticalScale(1),
    backgroundColor: "#E5E7EB",
    marginVertical: verticalScale(15),
  },

  //ACTIVITY LOG
  headerContainer: {
    padding: scale(20),
  },

  headerTxt: {
    fontSize: font(12), 
    fontWeight: "400",
    textAlign: "center",
    lineHeight: font(15)
  },

  row: {
    flexDirection: "row",
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
    gap: scale(15),
  },

  column: {
    flex: 1,
    gap: scale(2),
    backgroundColor: "transparent",
  },

  title: {
    fontSize: font(17),
    fontWeight: "800",
    lineHeight: font(17)
  },

  desc: {
    fontSize: font(11),
    fontWeight: "400",
    flexWrap: "wrap",
    paddingRight: scale(5),
    lineHeight: font(12)
  },

  date: {
    fontSize: font(12),
    fontWeight: "500",
    color: "#8d8c8c",
    lineHeight: font(12)
  },

  //DEVICE SESSIONS
  deviceRow: {
    flexDirection: "row",
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
    gap: scale(15),
    alignItems: "center"
  },

  row2: {
    flexDirection: "row",
    paddingHorizontal: scale(35),
    paddingVertical: verticalScale(15),
    gap: scale(15),
    alignItems: "center"
  },
  deviceTitle: {
    fontSize: font(15),
    fontWeight: "bold",
    paddingBlockStart: scale(10),
    lineHeight: font(15),
    marginBottom: verticalScale(5)
  },

  icon: {
    backgroundColor: "#353f8e2d",
    padding: scale(20),
    borderRadius: radius(999)
  },

  deviceInfo: {
    flexDirection: "column",
    gap: scale(5)
  },

  device: {
    fontSize: font(15),
    fontWeight: "600",
    lineHeight: font(15)
  },

  location: {
    fontSize: font(12),
    fontWeight: "400",
    lineHeight: font(12)
  },
  
  deviceContainer: {
    padding: scale(15),
  },

  terminateTxt: {
    color: "red",
    fontSize: font(12),
    fontWeight: "bold",
    lineHeight: font(12)
  },

  instruction: {
    fontSize: font(12),
    lineHeight: font(14),
    fontWeight: "400",
    padding: scale(10)
  },

  //LANGUAGE
  languageRow: {
    flexDirection: "row",
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15),
    gap: scale(20),
    alignItems: "center"
  },

  languageTitle: {
    fontSize: font(18),
    fontWeight: "bold",
    paddingBottom: verticalScale(15),
    lineHeight: font(25)
  },

  languageContainer: {
    padding: scale(15)
  },

  language: {
    fontSize: font(15),
    lineHeight: font(16),
    color: "#333",
  },

  languageSelected: {
    fontWeight: "700",
    color: "#35408E",
  },

  //APPEARANCE

  appearanceRow: {
    flexDirection: "row",
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    gap: scale(20),
    alignItems: "center"
  },

  appearanceTitle: {
    fontSize: font(18),
    fontWeight: "bold",
    paddingBottom: verticalScale(15),
    lineHeight: font(25)
  },

  appearanceContainer: {
    padding: scale(15),
    gap: scale(10)
  },

  mode: {
    fontSize: font(15),
    lineHeight: font(15),
    color: "#333",
  },

  modeSelected: {
    fontWeight: "700",
    color: "#35408E",
  },

  sliderRow: {
  flexDirection: "row",
  alignItems: "center",
  gap: scale(12),
},

  slider: {
    flex: 1,
  },

  smallA: {
    fontSize: font(14),
    lineHeight: font(14),
    fontWeight: "600",
    color: "#35408E",
  },

  largeA: {
    fontSize: font(28),
    fontWeight: "700",
    color: "#35408E",
    lineHeight: font(35)
  },

  previewText: {
    marginTop: verticalScale(18),
    textAlign: "center",
    color: "#35408E",
    fontWeight: "600",
    lineHeight: font(40)
  },

  //HELP
  reportContainer: {
    padding: scale(20)
  },

  reportBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#c91010c6",
    borderRadius: radius(12),
    borderWidth: scale(1.5),
    borderColor: "#FECACA",
    padding: scale(14),
    shadowColor: "#c91010c6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
 
  reportBannerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
    backgroundColor: "transparent",
    flex: 1,
  },
 
  reportIconBubble: {
    width: 
      isLargeIPad 
      ? scale(25)
      : isIPad || isIPadMini || isAndroidTablet
      || isFold
      ? scale(29)
      : scale(40),
    height: 
      isTallFold
      ? verticalScale(47)
      : isNormalFold
      ? verticalScale(60)
      : verticalScale(40),
    borderRadius: radius(10),
    backgroundColor: "#FFF0F0",
    justifyContent: "center",
    alignItems: "center",
  },
 
  reportTitle: {
    fontSize: font(14),
    lineHeight: font(14),
    fontWeight: "700",
    color: "white",
  },
 
  reportSubtitle: {
    fontSize: font(11),
    lineHeight: font(12),
    color: "white",
  },

  helpTitle: {
    fontSize: font(15),
    lineHeight: font(15),
    fontWeight: "bold",
    paddingBlockStart: scale(10),
  },
  
  questionContainer: {
    padding: scale(15),
    gap: scale(10)
  },

  questionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(15),
    flex: 1,
  },

  question: {
    flex: 1,
    fontSize: font(15),
    lineHeight: font(15),
    fontWeight: "600",
    flexWrap: "wrap",
  },

  //ABOUT
  aboutContainer: {
    paddingVertical: verticalScale(10),
  },

  versionTxt: {
    color: "grey",
    lineHeight: font(13),
  } ,

    rowDivider: {
    height: verticalScale(1),
    backgroundColor: "#F0F2F8",
    marginVertical: verticalScale(5)
  },
})};

export function deviceSessionsStyles (r: ResponsiveValues) {
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
      
  sessionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
    paddingVertical: verticalScale(14),
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: scale(6),
  },

  currentBadge: {
    paddingHorizontal: scale(7),
    paddingVertical: verticalScale(3),
    borderRadius: radius(10),
    backgroundColor: "#E6F6EC",
  },

  currentBadgeTxt: {
    fontSize: font(9),
    lineHeight: font(10),
    fontWeight: "700",
    color: "#1F9254",
  },

  typeLabel: {
    fontWeight: "600",
    color: "#35408E",
    marginTop: verticalScale(3),
  },

  terminateAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(8),
    width: "100%",
    marginTop: verticalScale(6),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(14),
    borderRadius: radius(8),
    backgroundColor: "#C62828",
    alignSelf: "flex-start",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
  },

  terminateAllTxt: {
    fontSize: font(13),
    lineHeight: font(13),
    fontWeight: "700",
    color: "#FECACA",
  },

  stateBox: {
    alignItems: "center",
    gap: scale(8),
    paddingVertical: verticalScale(24),
  },

  retryBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(6),
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(16),
    borderRadius: radius(8),
    borderWidth: scale(1.5),
    borderColor: "#D1D5E8",
    backgroundColor: "#F8F9FD",
    marginTop: verticalScale(4),
  },

  retryTxt: {
    fontSize: font(13),
    lineHeight: font(13),
    fontWeight: "600",
    color: "#35408E",
  },

  emptyState: {
    alignItems: "center",
    paddingVertical: verticalScale(20),
    gap: scale(6),
  },

  divider: {
    width: scale(2),
    alignSelf: "stretch",
    backgroundColor: "#F0F2F8",
  },

  row: {
    flexDirection: "row", 
    gap: scale(10)
  }
})};