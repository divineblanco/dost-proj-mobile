import { StyleSheet } from "react-native";
import { font, radius, ResponsiveValues, scale, verticalScale } from "./responsive";

export function drawerStyles (r: ResponsiveValues) {
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
      isAndroidTablet,
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
  drawerContainer: {
    flex: 1,
    paddingHorizontal: verticalScale(20),
    paddingVertical: 
      isNormalFold
      ? verticalScale(50)
      : isAndroidTabletLandscape 
      ? verticalScale(25)
      : isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape
      ? verticalScale(30)
      : verticalScale(70),
    backgroundColor: "#35408E",
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 
      isLargeIPad || isIPad || isIPadMini
      ? scale(6)
      : scale(10),
    backgroundColor: "transparent"
  },

  logoBG: {
    width: 
      isAndroidTabletPortrait 
      ? scale(40)
      : isFold || isAndroidTabletLandscape || isLargeIPadPortrait
      || isIPadLandscape 
      ? scale(30)
      : isIPadMiniLandscape
      ? scale(32)
      : isIPadPortrait || isIPadMiniPortrait 
      ? scale(35)
      : isLargeIPadLandscape 
      ? scale(25)
      : scale(50),
    height: 
      isAndroidTabletPortrait 
      ? verticalScale(55)
      : isLargeIPadPortrait || isIPadPortrait
      ? verticalScale(50)
      : isAndroidTabletLandscape || isLargeIPadLandscape
      ? verticalScale(40)
      : isIPadLandscape || isIPadMiniLandscape
      ? verticalScale(45)
      : isNormalFold
      ? verticalScale(75)
      : isTallFold 
      ? verticalScale(60)
      : isCompactAndroid 
      ? verticalScale(58)
      : verticalScale(50),
    borderRadius: radius(999),
    backgroundColor: "white",
  },

  logo: {
    width: 
      isAndroidTabletPortrait 
      ? scale(40)
      : isFold  || isAndroidTabletLandscape || isLargeIPadPortrait
      || isIPadLandscape
      ? scale(30)
      : isIPadMiniLandscape
      ? scale(32)
      : isIPadPortrait || isIPadMiniPortrait
      ? scale(35)
      : isLargeIPadLandscape 
      ? scale(25)
      : scale(50), 
    height: 
      isAndroidTabletPortrait  
      ? verticalScale(55)
      : isLargeIPadPortrait || isIPadPortrait
      ? verticalScale(50)
      : isAndroidTabletLandscape || isLargeIPadLandscape 
      ? verticalScale(40)
      : isIPadLandscape || isIPadMiniLandscape
      ? verticalScale(45)
      : isNormalFold 
      ? verticalScale(75)
      :isTallFold
      ? verticalScale(60)
      : isCompactAndroid 
      ? verticalScale(58)
      : verticalScale(50), 
    borderRadius: radius(15),
  },

  headerTitle: {
    fontSize:  
      isTallFold
      ? font(18)
      : isNormalFold || isAndroidTablet || isLargeIPad
      || isIPad || isIPadMini
      ? font(16)
      : font(20),
    lineHeight: font(18),
    fontWeight: "bold",
    color: "white",
    paddingVertical: verticalScale(20),
  },

  line: {
    width: "100%",
    alignSelf: "center",
    borderWidth: 
      isFold || isAndroidTablet || isLargeIPad
      || isIPad || isIPadMini
      ? scale(0.5)
      : scale(1),
    borderColor: "white",
    marginVertical: 
      isAndroidTabletLandscape || isLargeIPadLandscape || isIPadLandscape
      || isIPadMiniLandscape
      ? verticalScale(10)
      : verticalScale(20),
  },

  tabsContainer: {
    gap: scale(5),
    backgroundColor: "transparent"
  },

  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 
      isAndroidTablet || isLargeIPad || isIPad
      || isIPadMini
      ? scale(10)
      : isFold
      ? scale(15)
      : scale(25),
    paddingHorizontal: scale(18),
    paddingVertical: 
      isTallFold 
      ? verticalScale(10)
      : isNormalFold || isAndroidTabletPortrait || isLargeIPadPortrait
      || isIPadPortrait || isIPadMiniPortrait
      ? verticalScale(8)
      : isAndroidTabletLandscape || isLargeIPadLandscape || isIPadLandscape
      ? verticalScale(4)
      : isIPadMiniLandscape
      ? verticalScale(3)
      : verticalScale(12),
    borderRadius: radius(12),
  },

  activeDrawerItem: {
    backgroundColor: "white",
    borderRadius: radius(15),
  },

  logoutItem: {
    backgroundColor: "#c91010c6",
    borderRadius: radius(15)
  },

  label: {
    fontSize: 
      isTallFold 
      ? font(15)
      : isNormalFold || isAndroidTablet || isLargeIPad
      ? font(12)
      : isIPad || isIPadMini
      ? font(13)
      : font(18),
    fontWeight: "bold",
    lineHeight: 
      isFold
      ? font(20)
      : font(28),
    color: "white"
  },

  activeLabel: {
    color: "#35408E",
  },

  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 
      isFold || isAndroidTablet || isLargeIPad
      || isIPad || isIPadMini
      ? scale(5)
      : scale(15),
    marginTop: "auto",
    backgroundColor: "transparent"
  },

  profile: {
    width: 
      isAndroidTabletPortrait || isIPadPortrait 
      ? scale(35)
      : isIPadMiniPortrait
      ? scale(36)
      : isFold || isAndroidTabletLandscape || isLargeIPadPortrait
      || isIPadLandscape || isIPadMiniLandscape
      ? scale(29)
      : isLargeIPadLandscape 
      ? scale(26)
      : scale(50), 
    height: 
      isAndroidTabletPortrait || isLargeIPadPortrait || isIPadLandscape
      ? verticalScale(45)
      : isAndroidTabletLandscape || isLargeIPadLandscape || isIPadMiniLandscape
      ? verticalScale(40)
      : isTallFold
      ? verticalScale(60)
      : isNormalFold
      ? verticalScale(75)
      : isCompactAndroid
      ? verticalScale(58)
      : verticalScale(50), 
    borderRadius: radius(999)
  },

  userInfo: {
    flex: 1,
    backgroundColor: "transparent"
  },

  username: {
    color: "white",
    fontWeight: "bold",
    fontSize: 
      isAndroidTablet || isIPadMini
      ? font(15)
      : isFold || isLargeIPad || isIPad 
      ? font(12)
      : font(18),
    lineHeight: font(18)
  },

  userEmail: {
    color: "white",
    fontSize: 
      isAndroidTablet || isIPadMini
      ? font(10)
      : isFold || isLargeIPad || isIPad 
      ? font(9)
      : font(13),
    lineHeight: font(13)
  },
})};

export function profileDropdownStyles (r: ResponsiveValues) {
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
      isAndroidTablet,
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
    dropdownMenu: {
      position: "absolute",
      // top: "100%",
      // right: 0,
      backgroundColor: "white",
      padding: scale(5),
      borderRadius: radius(8),
      elevation: 5,
      width: 
        isAndroidTablet || isFold || isLargeIPad
        || isIPad || isIPadMini
        ? scale(120)
        : scale(160),
      zIndex: 999,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      shadowColor: "#000",
      maxHeight: 
        isNormalFold
        ? verticalScale(240)
        : isTallFold
        ? verticalScale(195)
        : verticalScale(200),
      // marginTop: 
      //   isIPad || isIPadMini || isCompactAndroid
      //   || isAndroidTablet || isLargeIPad
      //   ? verticalScale(-10)
      //   : verticalScale(0)
    },

    modalOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "transparent",
    },

    dropdown: {
      width: "100%",
    },

    dropdownItem: {
      flexDirection: "row",
      alignItems: "center",

      paddingHorizontal: scale(14),
      paddingVertical: verticalScale(10),

      gap: scale(10),

      backgroundColor: "#FFFFFF",
    },

    dropdownLabel: {
      color: "#35408E",
      fontSize: font(14),
      lineHeight: font(14),
      fontWeight: "600"
    },


})};