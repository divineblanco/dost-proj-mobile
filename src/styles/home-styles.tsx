import { StyleSheet } from "react-native";
import {
  font,
  radius,
  ResponsiveValues,
  scale,
  spacing,
  verticalScale
} from "./responsive";

/* ============================================================
    HOME PAGE
============================================================ */

export function homeStyles(r: ResponsiveValues) {
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
  },

  pageInner: {
    width: "100%",
    maxWidth: 
      isTablet 
      ? 900 
      : isFold 
      ? 760 
      : undefined,
    alignSelf: "center",
  },

  scrollContent: {
    paddingBottom: isShortScreen
      ? verticalScale(140)
      : isExtraTallScreen
      ? verticalScale(110)
      : verticalScale(95),
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 
      isIPadPortrait || isIPadMiniPortrait
      ? scale(12)
      : isLargeIPadLandscape
      ? scale(8)
      : isIPadLandscape
      ? scale(12)
      : isAndroidTabletLandscape || isAndroidTabletPortrait 
      ? scale(10)
      : scale(15),
    position: "relative",
    alignItems: "center",
  },

  filterBtn: {
    zIndex: 1000,
    borderWidth: 1,
    borderColor: "#35408E",
    borderRadius: radius(5),
    padding: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape
      ? scale(7)
      : isAndroidTabletLandscape 
      ? scale(10)
      : isAndroidTabletPortrait
      ? scale(7)
      : scale(5),
  },

  summaryContainer: {
    backgroundColor: "#E4E8F0",
    width: "100%",
    padding: scale(5),
  },

  graphBG: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    padding: scale(10),
    height: 
      isLargeIPadLandscape 
      ? verticalScale(400)
      : isAndroidTabletLandscape || isIPadLandscape || isIPadMiniLandscape
      ? verticalScale(300)
      : isAndroidTabletPortrait || isIPadMiniPortrait
      ? verticalScale(200)
      : isShortScreen
      ? verticalScale(200)
      : isTallFold
      ? verticalScale(300)
      : isNormalFold
      ? verticalScale(500)
      : isTallScreen && isIPhone
      ? verticalScale(180)
      : verticalScale(150),
    gap: scale(10),
    backgroundColor: "#E4E8F0",
    borderRadius: radius(12),
  },

  titleContainer: {
    padding: scale(15),
  },

  title: {
    marginBottom: verticalScale(10),
  },

  titleTxt: {
    fontSize: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape
      ? font(18)
      : isAndroidTabletLandscape
      ? font(20)
      :isLargeIPadPortrait 
      ? font(17)
      : font(16),
    fontWeight: 800,
    lineHeight:
      isAndroidTabletLandscape || isIPadMiniLandscape || isLargeIPadLandscape
      ? font(20)
      : isLargeIPadPortrait
      ? font(17)
      : font(16)
  },

  viewCol: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  viewTxt: {
    fontSize: font(11),
    fontWeight: "600",
    color: "#6a9cff"
  },

  default: {
    fontSize: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape
      ? font(13)
      : isAndroidTabletLandscape
      ? font(14)
      : isLargeIPadPortrait
      ? font(11.5)
      : font(12),
    lineHeight:
      isAndroidTabletLandscape || isIPadMiniLandscape
      ? font(20)
      : isLargeIPadPortrait
      ? font(14)
      : font(17),
    fontWeight: 400,
  },

  titleLine: {
    backgroundColor: "#35408E",
    padding: scale(0.5),
    marginTop: 
      isLargeIPadPortrait
      ? verticalScale(8)
      : isLargeIPadLandscape
      ? verticalScale(10)
      : isAndroidTabletPortrait || isIPadLandscape
      ? verticalScale(10)
      : isAndroidTabletLandscape
      ? verticalScale(5)
      : verticalScale(8),
  },
})};

/* ============================================================
    DASHBOARD CARD
============================================================ */

export function dashboardCardStyles (r: ResponsiveValues) {
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
      isIPad,
      isLargeIPad,
      isIPadMini,
      isTallScreen,
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

  summaryContainer2: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: scale(10),
    gap: scale(10),
    backgroundColor: "#E4E8F0",
    borderRadius: radius(12),
  },

  dashboardCard: {
    width: isSmallPhone
      ? "100%"
      : isTablet
      ? "48%"
      : isFold
      ? "48%"
      : "48%",

    height: 
       isLargeIPadPortrait || isIPadPortrait || isIPadMiniPortrait
      ? verticalScale(120)
      : isLargeIPadLandscape
      ? verticalScale(180)
      : isAndroidTabletPortrait
      ? verticalScale(115)
      : isAndroidTabletLandscape || isIPadLandscape 
      ? verticalScale(170)
      : isShortScreen
      ? verticalScale(115)
      : isIPadMiniLandscape
      ? verticalScale(175)
      : isNormalFold 
      ? verticalScale(200)
      : isTallFold 
      ? verticalScale(150)
      : isTallScreen && isIPhone 
      ? verticalScale(100)
      : verticalScale(95),

    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: radius(7),
    flexDirection: "row",
    position: "relative",
    overflow: "hidden",
    paddingLeft: 
      isLargeIPadLandscape 
      ? scale(10)
      : isAndroidTabletLandscape || isIPadLandscape || isIPadMiniLandscape
      ? scale(15)
      : scale(10),
  },

  mentionsBox: {
    backgroundColor: "#4A7CA8",
  },

  sentimentBox: {
    backgroundColor: "#3BB329",
  },

  trendBox: {
    backgroundColor: "#FDBA2B",
  },

  misinfoBox: {
    backgroundColor: "#E20000",
  },

  box: {
    flexDirection: "column",
    backgroundColor: "transparent",
    zIndex: 2,
    justifyContent: "center",
  },

  boxTitle: {
    color: "white",
    fontSize: 
      isLargeIPadPortrait || isIPadPortrait || isIPadMiniPortrait 
      ? font(16)
      : isLargeIPadLandscape  
      ? font(20)
      : isIPadLandscape || isIPadMiniLandscape
      ? font(25)
      : isAndroidTabletLandscape  
      ? font(28)
      : isAndroidTabletPortrait 
      ? font(18)
      : font(13),
    fontWeight: "bold",
    lineHeight:
      isLargeIPadPortrait || isIPadPortrait || isIPadMiniPortrait
      ? font(17)
      : isLargeIPadLandscape 
      ? font(20)
      : isAndroidTabletLandscape || isIPadLandscape || isIPadMiniLandscape
      ? font(28)
      : isAndroidTabletPortrait
      ? font(18)
      : font(13)
  },

  boxInfo: {
    color: "white",
    fontSize: 
      isLargeIPadPortrait || isIPadPortrait || isIPadMiniPortrait
      ? font(28)
      : isLargeIPadLandscape 
      ? font(40)
      : isAndroidTabletLandscape || isIPadLandscape || isIPadMiniLandscape
      ? font(35)
      : isAndroidTabletPortrait
      ? font(28)
      : font(24),
    fontWeight: "900",
    lineHeight: 
      isIPadLandscape || isIPadMiniLandscape
      ? spacing(38)
      : isLargeIPadLandscape
      ? spacing(44)
      : spacing(35),
  },

  trendboxInfo: {
    color: "white",
    fontSize: 
      isLargeIPadPortrait || isIPadPortrait ||isIPadMiniPortrait
      ? font(24)
      : isLargeIPadLandscape 
      ? font(33)
      : isAndroidTabletLandscape || isIPadLandscape || isIPadMiniLandscape
      ? font(35)
      : isAndroidTabletPortrait
      ? font(25)
      : font(16),
    fontWeight: "900",
    lineHeight: spacing(25),
    paddingTop: 
      isAndroidTabletPortrait
      ? verticalScale(3)
      : isIPadMiniPortrait
      ? verticalScale(4)
      : isIPadLandscape || isIPadMiniLandscape
      ? verticalScale(15)
      : verticalScale(2),
  },

  boxMore: {
    color: "white",
    fontSize: 
      isLargeIPadPortrait || isIPadPortrait || isIPadMiniPortrait
      ? font(12)
      : isLargeIPadLandscape 
      ? font(18)
      : isIPadLandscape || isIPadMiniLandscape
      ? font(16)
      : isAndroidTabletLandscape
      ? font(20)
      : isAndroidTabletPortrait
      ? font(12)
      : font(10),
    fontWeight: "bold",
    fontStyle: "italic",
    lineHeight: 
      isLargeIPadPortrait || isIPadPortrait || isIPadMiniPortrait
      ? font(14)
      : isLargeIPadLandscape
      ? font(18)
      : isIPadLandscape || isIPadMiniLandscape
      ? font(20)
      : isAndroidTabletLandscape
      ? font(25)
      : isAndroidTabletPortrait
      ? font(13)
      : font(10)
  },

  mentionsImg: {
    width: 
      isTallFold || isIPadLandscape || isIPadMiniLandscape
      ? scale(200) 
      : isNormalFold
      ? scale(250) 
      : isLargeIPadPortrait || isIPadPortrait || isIPadMiniPortrait
      ? scale(125)
      : isLargeIPadLandscape
      ? scale(220)
      : isAndroidTabletLandscape
      ? scale(250)
      : isAndroidTabletPortrait
      ? scale(110)
      : scale(90),
    height: 
      isTallFold || isIPadLandscape || isIPadMiniLandscape
      ? verticalScale(200)
      : isNormalFold
      ? verticalScale(250)
      : isLargeIPadPortrait || isIPadPortrait || isIPadMiniPortrait
      ? verticalScale(125)
      : isLargeIPadLandscape 
      ? verticalScale(220)
      : isAndroidTabletLandscape
      ? verticalScale(250)
      : isAndroidTabletPortrait
      ? verticalScale(110)
      : verticalScale(90),
    opacity: 0.5,
    right: 
      isTallFold
      ? scale(45)  
      : isIPadMiniLandscape
      ? scale(30)
      : isNormalFold
      ? scale(70)
      : isLargeIPadPortrait || isIPadPortrait || isIPadMiniPortrait
      ? scale(10)
      : isLargeIPadLandscape
      ? scale(40)
      : isAndroidTabletLandscape || isIPadLandscape 
      ? scale(35)
      : isAndroidTabletPortrait
      ? scale(15)
      : scale(0),
    bottom: verticalScale(-4),
  },

  sentimentImg: {
    width: 
      isTallFold 
      ? scale(200) 
      : isIPadMiniLandscape
      ? scale(220)
      : isNormalFold
      ? scale(250)
      : isLargeIPadPortrait || isIPadPortrait
      ? scale(150)
      : isLargeIPadLandscape
      ? scale(250)
      : isIPadMiniPortrait
      ? scale(140)
      : isAndroidTabletLandscape || isIPadLandscape 
      ? scale(220)
      : isAndroidTabletPortrait
      ? scale(120)
      : scale(95),
    height: 
      isTallFold
      ? verticalScale(200) 
      : isIPadMiniLandscape
      ? verticalScale(220)
      : isNormalFold
      ? verticalScale(250)
      : isLargeIPadPortrait || isIPadPortrait
      ? verticalScale(150)
      : isLargeIPadLandscape
      ? verticalScale(250)
      : isIPadMiniPortrait
      ? verticalScale(140)
      : isAndroidTabletLandscape || isIPadLandscape
      ? verticalScale(220)
      : isAndroidTabletPortrait 
      ? verticalScale(120) 
      : verticalScale(95),
    opacity: 0.5,
    right: 
      isTallFold 
      ? scale(35) 
      : isIPadMiniLandscape
      ? scale(30)
      : isNormalFold
      ? scale(60)
      : isLargeIPadPortrait || isIPadMiniPortrait
      ? scale(20)
      : isLargeIPadLandscape 
      ? scale(45)
      : isIPadLandscape
      ? scale(32)
      : isIPadPortrait 
      ? scale(24)
      : isAndroidTabletLandscape 
      ? scale(23)
      : isAndroidTabletPortrait
      ? scale(10)
      : scale(-2),
    bottom: 
      isTallFold
      ? verticalScale(-30) 
      : isNormalFold || isIPadMiniLandscape
      ? verticalScale(-30)
      : isLargeIPadPortrait
      ? verticalScale(-30)
      : isIPadPortrait || isIPadMiniPortrait
      ? verticalScale(-25)
      : isAndroidTabletLandscape || isLargeIPadLandscape || isIPadLandscape
      ? verticalScale(-35)
      : verticalScale(-12),
  },

  trendsImg: {
    width: 
      isTallFold
      ? scale(160) 
      : isNormalFold || isIPadLandscape || isIPadMiniLandscape
      ? scale(200) 
      : isLargeIPadPortrait || isIPadPortrait || isIPadMiniPortrait
      ? scale(125)
      : isLargeIPadLandscape
      ? scale(220)
      : isAndroidTabletLandscape
      ? scale(250)
      : isAndroidTabletPortrait
      ? scale(115)
      : scale(90),
    height: 
      isTallFold
      ? verticalScale(160) 
      : isNormalFold || isIPadLandscape || isIPadMiniLandscape
      ? verticalScale(200)
      : isLargeIPadPortrait || isIPadPortrait || isIPadMiniPortrait
      ? verticalScale(125)
      : isLargeIPadLandscape
      ? verticalScale(220)
      : isAndroidTabletLandscape
      ? verticalScale(250)
      : isAndroidTabletPortrait
      ? verticalScale(115)
      : verticalScale(90),
    opacity: 0.5,
    right: 
      isTallFold
      ? scale(45)
      : isIPadMiniLandscape
      ? scale(120)
      : isLargeIPadPortrait || isIPadPortrait
      ? scale(75)
      : isLargeIPadLandscape
      ? scale(120)
      : isNormalFold
      ? scale(65) 
      : isIPadMiniPortrait
      ? scale(90)
      : isAndroidTabletLandscape || isIPadLandscape
      ? scale(125)
      : isAndroidTabletPortrait
      ? scale(70)
      : scale(45),
    bottom: 
      isNormalFold || isTallFold 
      ? verticalScale(0) 
      : isLargeIPadPortrait || isIPadPortrait || isIPadMiniPortrait || isIPadMiniLandscape
      ? verticalScale(0)
      : verticalScale(-5),
   
  },

  misinfoImg: {
    width: 
      isTallFold
      ? scale(170) 
      : isNormalFold || isIPadMiniLandscape
      ? scale(200)
      : isLargeIPadPortrait || isIPadPortrait || isIPadMiniPortrait
      ? scale(135)
      : isLargeIPadLandscape || isIPadLandscape
      ? scale(250)
      : isAndroidTabletLandscape
      ? scale(250)
      : isAndroidTabletPortrait
      ? scale(130)
      : scale(95),
    height: 
      isTallFold
      ? verticalScale(170) 
      : isNormalFold || isIPadMiniLandscape
      ? verticalScale(200)
      : isLargeIPadPortrait || isIPadPortrait || isIPadMiniPortrait
      ? verticalScale(135)
      : isLargeIPadLandscape || isIPadLandscape
      ? verticalScale(250)
      : isAndroidTabletLandscape
      ? verticalScale(250)
      : isAndroidTabletPortrait
      ? verticalScale(130)
      : verticalScale(95),
    opacity: 0.5,
    right: 
      isTallFold
      ? scale(25)
      : isIPadMiniLandscape
      ? scale(20)
      : isNormalFold
      ? scale(40) 
      : isLargeIPadPortrait || isIPadPortrait || isIPadMiniPortrait
      ? scale(15)
      : isLargeIPadLandscape 
      ? scale(45)
      : isAndroidTabletLandscape || isIPadLandscape
      ? scale(40)
      : isAndroidTabletPortrait
      ? scale(15)
      : scale(10),
    bottom: 
      isNormalFold || isTallFold
      ? verticalScale(0)
      : isLargeIPadLandscape
      ? verticalScale(0) 
      :isAndroidTabletPortrait
      ? verticalScale(-2)
      : verticalScale(-10),
  },
})};

/* ============================================================
    TRENDS CARD
============================================================ */

export function trendsCardStyles (r: ResponsiveValues) {
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
      isIPad,
      isLargeIPad,
      isIPadMini,
      isTallScreen,
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

  trendsBG: {
    flexDirection: "row",
    alignItems: "center",
    padding: scale(10),
    width: "100%",
    // readable, centered column on wide screens instead of a
    // single row stretching edge to edge
    maxWidth: 
      isTablet 
      ? "100%" 
      : undefined,
    alignSelf: 
      isTablet 
      ? "center" 
      : "stretch",
    backgroundColor: "#E4E8F0",
    borderRadius: radius(12),
  },

  trendsContainer: {
    flexDirection: "column",
    gap: scale(10),
  },

  trendCircle: {
    top: 
      isLargeIPadPortrait || isIPadPortrait || isIPadMiniPortrait
      ? verticalScale(-5)
      : isIPadLandscape
      ? verticalScale(-8)
      : isAndroidTabletPortrait
      ? verticalScale(-5)
      : isAndroidTabletLandscape
      ? verticalScale(-5)
      : verticalScale(-8),
    width: 
      isIPadMiniPortrait 
      ? scale(7)
      : isLargeIPadLandscape  || isIPadMiniLandscape
      ? scale(5)
      : isNormalFold || isTallFold 
      ? scale(5)
      : isCompactAndroid 
      ? scale(8) 
      : isLargeIPadPortrait || isIPadPortrait || isIPadLandscape
      ? scale(7)
      : isAndroidTabletLandscape
      ? scale(8)
      : isAndroidTabletPortrait
      ? scale(8)
      : scale(10),
    height: 
      isLargeIPadLandscape 
      ? verticalScale(8)
      : isAndroidTabletLandscape || isIPadLandscape 
      ? verticalScale(11)
      : isIPadMiniPortrait 
      ? verticalScale(10)
      : isIPadMiniLandscape
      ? verticalScale(8)
      : isNormalFold || isTallFold 
      ? verticalScale(13)
      : isLargeIPadPortrait || isIPadPortrait 
      ? scale(7)
      : verticalScale(10),
    borderRadius: radius(999),
    backgroundColor: "red",
    marginRight: scale(8),
  },

  trendsInfo: {
    backgroundColor: "transparent",
    flex: 1,
    flexShrink: 1,
    paddingRight: scale(10),

  },

  desc: {
    fontWeight: 400,
    fontSize: 
      isLargeIPadLandscape
      ? font(11)
      : font(10),
    lineHeight: font(14)
  },

  trendRise: {
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "center",
    flexShrink: 0,
  },
})};

/* ============================================================
    MISINFORMATION CARD
============================================================ */

export function misinformationCardStyles (r: ResponsiveValues) {
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
      isIPad,
      isLargeIPad,
      isIPadMini,
      isTallScreen,
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

  misinfoBG: {
    flexDirection: "row",
    backgroundColor: "#E4E8F0",
    borderRadius: radius(16),
    overflow: "hidden",
    width: "100%",
    maxWidth: 
      isTablet 
      ? "100%" 
      : undefined,
    alignSelf: isTablet ? "center" : "stretch",
  },

  redLine: {
    width: 
      isLargeIPadPortrait || isIPadPortrait || isIPadMiniPortrait
      ? scale(20)
      : scale(25),
    backgroundColor: "#FF2A2A",
    // borderRadius: 
    //   isLargeIPadPortrait
    //   ? radius(0)
    //   : radius(5),
  },

  misinfoContainer: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 
      isLargeIPadLandscape
      ? verticalScale(30)
      : isAndroidTabletLandscape || isIPadLandscape || isIPadMiniLandscape
      ? verticalScale(28)
      : isIPadMiniPortrait
      ? verticalScale(25)
      : isFold
      ? verticalScale(40) 
      : verticalScale(25),
    paddingHorizontal: scale(8),
    alignItems: "flex-start",
    backgroundColor: "transparent",
  },

  misinfoTitle: {
    fontSize: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape
      ? font(17)
      : isAndroidTabletLandscape
      ? font(20)
      : isLargeIPadPortrait || isIPadPortrait || isIPadMiniPortrait
      ? font(16)
      : font(15),
    fontWeight: 600,
    lineHeight:
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape
      ? font(18)
      : isAndroidTabletLandscape
      ? font(20)
      : font(15)
  },

  misinfoDesc: {
    fontSize: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape
      ? font(13)
      : isAndroidTabletLandscape
      ? font(15)
      : isLargeIPadPortrait || isIPadPortrait || isIPadMiniPortrait
      ? font(12)
      : font(10),
    lineHeight: 
      isLargeIPadPortrait || isIPadPortrait || isIPadMiniPortrait
      ? font(13)
      : isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape
      ? font(14)
      : font(17),
    fontWeight: 400,
  },

  misinfoInfo: {
    flex: 1,
    paddingRight: scale(10),
    backgroundColor: "transparent",
    gap: scale(5)
  },

  warningIcon: {
    marginTop: 
      isIPadLandscape || isIPadMiniLandscape || isLargeIPadLandscape
      ? verticalScale(-2)
      : isAndroidTabletLandscape
      ? verticalScale(0)
      : isLargeIPadPortrait || isIPadPortrait || isIPadMiniPortrait
      ? verticalScale(-5)
      : verticalScale(2),
    marginRight: scale(10),
  },

  priorityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(5),
    backgroundColor: "transparent",
  },

  priorityText: {
    color: "#E20000",
    fontWeight: "700",
    fontSize: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape
      ? font(14)
      : isAndroidTabletLandscape
      ? font(16)
      : font(12),
    lineHeight: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape
      ? font(15)
      : isAndroidTabletLandscape
      ? font(17)
      : font(13)
  },

  separator: {
    marginHorizontal: scale(12),
    color: "#35408E",
  },

  locationText: {
    color: "#35408E",
    fontWeight: "700",
    fontSize: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape
      ? font(14)
      : isAndroidTabletLandscape
      ? font(16)
      : font(12),
    lineHeight: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape
      ? font(15)
      : isAndroidTabletLandscape
      ? font(17)
      : font(13)
  },
  })};

/* ============================================================
    HOME FILTER
============================================================ */

export function homeFilterStyles (r: ResponsiveValues) {
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
      isIPad,
      isLargeIPad,
      isIPadMini,
      isTallScreen,
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

  closeButton: {
    position: "absolute",
    top: verticalScale(8),
    right: scale(12),
    zIndex: 1,
  },

  filterDropdown: {
    position: "absolute",
    top: 
      isIPadMiniLandscape
      ? verticalScale(80)
      : isNormalFold || isTallFold
      ? verticalScale(100) 
      : isLargeIPadLandscape
      ? verticalScale(90)
      : isAndroidTabletLandscape
      ? verticalScale(70)
      : verticalScale(60),
    // marginHorizontal: 
    //   isAndroidTabletLandscape
    //   ? scale(210)
    //   : scale(10),

    alignSelf: "center",
    width: 
      isAndroidTabletLandscape
      ? "100%" 
      : isAndroidTabletPortrait
      ? "100%"
      : isFold 
      ? "100%" 
      : "95%",
    // keeps the panel from getting absurdly wide on very large
    // tablets even though the percentage above still adapts
    maxWidth: 
      isLargeIPadPortrait || isIPadPortrait || isIPadMiniPortrait
      ? "90%"
      : isAndroidTabletLandscape || isIPadLandscape || isIPadMiniLandscape || isLargeIPadLandscape
      ? "85%"
      : isAndroidTabletPortrait
      ? "95%"
      : isFold 
      ? 800 
      : undefined,
    backgroundColor: "#35408E",
    borderRadius: radius(10),
    padding: scale(8),

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 5,
    zIndex: 999,
  },

  filterContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "transparent",
    padding: scale(15),
  },

  optionContainer: {
    backgroundColor: "transparent",
    marginTop: verticalScale(10),
    padding: scale(15),
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-between",
    rowGap: verticalScale(16),
  },

  // stays at 47% (a clean 2x2 grid) regardless of device — Home
  // has 4 fields, which divides evenly by 2 but not by 3, so a
  // wider fold/tablet panel gets more comfortable column width
  // instead of an odd 3-column layout with a lone 4th item
  optionContent: {
    backgroundColor: "transparent",
    gap: scale(8),
    width: "47%",
  },

  optionBG: {
    backgroundColor: "white",
    padding: 
      isIPadLandscape 
      ? scale(12)
      : isLargeIPadLandscape
      ? scale(10)
      : isAndroidTabletLandscape
      ? scale(15)
      : scale(10),
    width: "100%",
    borderRadius: radius(8),
  },

  optionChoices: {
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-between",
  },

  buttonApply: {
    backgroundColor: "#FFB633",
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
    height: 
      isIPadLandscape || isIPadMiniLandscape 
      ? verticalScale(60)
      : isLargeIPadLandscape
      ? verticalScale(70)
      : isNormalFold || isTallFold
      ? verticalScale(90) 
      : isAndroidTabletLandscape
      ? verticalScale(55)
      : verticalScale(50),
    borderRadius: radius(13),
    elevation: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: "#000",
  },

  dropdownList: {
    position: "absolute",
    top: "100%",
    left: scale(0),
    right: scale(0),
    marginTop: 
      isIPadMiniLandscape
      ? verticalScale(35)
      : isNormalFold || isTallFold
      ? verticalScale(55) 
      : isLargeIPadPortrait || isIPadPortrait || isIPadMiniPortrait
      ? verticalScale(35)
      : isIPadLandscape || isLargeIPadLandscape
      ? verticalScale(40)
      : isAndroidTabletLandscape 
      ? verticalScale(45)
      : isAndroidTabletPortrait
      ? verticalScale(30)
      : verticalScale(25),
    paddingLeft: scale(4),
    backgroundColor: "#FFF",
    borderRadius: radius(8),
    paddingVertical: scale(8),
    // more room to show options on taller screens instead of a
    // flat cap that wastes available space
    maxHeight:
      isTallScreen || isExtraTallScreen
        ? verticalScale(260)
        : isAndroidTabletLandscape
        ? verticalScale(220)
        : verticalScale(200),
    elevation: 5,
    zIndex: 999,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  dropdownItem: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(8),
  },

  dropdownChoice: {
    paddingHorizontal: scale(1),
  },

  dropdown: {
    // left: 102,
  },

  filterScrollContent: {
    paddingBottom: verticalScale(20),
  },

  scroller: {
    position: "relative",
  },

  calendar: {
    backgroundColor: "white",
    borderRadius: radius(8),
    padding: scale(5),
    marginTop: 
      isIPadMiniPortrait || isIPadMiniLandscape
      ? verticalScale(75)
      : isIPadPortrait 
      ? verticalScale(80)
      : isIPadLandscape || isLargeIPadPortrait || isLargeIPadLandscape
      ? verticalScale(85)
      : verticalScale(60),
    width: "100%",
    zIndex: 999,
    position: "absolute",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: "#000",
    maxHeight:
      isTallScreen || isExtraTallScreen
        ? verticalScale(260)
        : verticalScale(200),
  },
})};