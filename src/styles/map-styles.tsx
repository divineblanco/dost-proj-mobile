import { StyleSheet } from "react-native";
import {
    font,
    isAndroidTablet,
    radius,
    ResponsiveValues,
    scale,
    spacing,
    verticalScale
} from "./responsive";

/* ============================================================
    MAP PAGE
============================================================ */

export function mapStyles(r: ResponsiveValues) {
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
        padding: scale(5)
    },
    scrollContent: {
        paddingBottom: verticalScale(110),
    },
    headerContainer:{
        flexDirection: 'row', 
        justifyContent: "space-between",
        padding: spacing(10),
        position: "relative"
    },
    summaryContainer: {
        padding: scale(5),
    },
    mapContainer: {
        height:
            isLargeIPadLandscape ? verticalScale(700) :
            isLargeIPadPortrait ? verticalScale(735) :

            isIPadLandscape ? verticalScale(700) :
            isIPadPortrait ? verticalScale(750) :

            isIPadMiniLandscape ? verticalScale(650) :
            isIPadMiniPortrait ? verticalScale(720) :

            isAndroidTabletLandscape ? verticalScale(700) :
            isAndroidTabletPortrait ? verticalScale(710) :

            isNormalFold ? verticalScale(1400) :

            isTallFold ? verticalScale(1200) :

            isCompactAndroid ? verticalScale(800) :

        verticalScale(750),
        borderBottomWidth: scale(2),
        borderBottomColor: "#35408E",
        overflow: "hidden",
        // position: "relative",
        flex: 1,
    },
    topControls: {
        position: "absolute",
        top: 10,
        left: 10,
        right: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: scale(5),
        backgroundColor: "transparent",
        zIndex: 1000,
    },
    filterBtn: {
        // position: "absolute",
        top: -5,
        backgroundColor: "#35408E",
        padding: 12,
        borderRadius: radius(30),
        zIndex: 999,
    },
    boxBG:{
        backgroundColor: "white", 
        width: "100%", 
        padding: scale(10), 
        borderRadius: radius(12),
        marginBottom: verticalScale(10),
        borderColor: "#E0E4F0",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 2
    },
    legendBox: {
        position: "absolute",
        top: 
            isIPadMini || isLargeIPad || isIPad
            ? verticalScale(60)
            : isAndroidTablet
            ? verticalScale(55)
            : isCompactAndroid || isTallFold
            ? verticalScale(80)
            : isNormalFold
            ? verticalScale(100)
            : verticalScale(65),
        left: 10,
        right: 10,
        backgroundColor: "transparent",
        zIndex: 20,
    },
    legendContainer: {
        justifyContent: "space-around",
        backgroundColor: "transparent",
        flexDirection: "row",
    },
    legend: {
        flexDirection: "row", 
        gap: scale(10), 
        justifyContent: "flex-start", 
        alignItems:"center", 
        backgroundColor: "transparent"
    },
    legendLabel: {
        fontSize: 
            isIPadMini || isLargeIPad || isIPad
            || isAndroidTablet || isCompactAndroid || isFold
            ? font(12)
            : font(14),
        lineHeight: font(14), 
        fontWeight: "medium"
    },
    legendColor: {
        padding: 
            isIPadMini || isIPad || isAndroidTablet
            ? scale(8)
            : isLargeIPad || isFold
            ? scale(6)
            : scale(10), 
        marginRight: scale(2),
        borderRadius: radius(5)
    },
    contentContainer: {
        position: "absolute",
        bottom: 10,
        left: 10,
        right: 10,
        backgroundColor: "transparent",
        zIndex: 20,
    },
    contentBG:{
        backgroundColor: "white", 
        width: "100%", 
        padding: scale(15), 
        borderRadius: radius(12),
        marginBottom: verticalScale(10),
        marginTop: "auto", 
        borderColor: "#E0E4F0",
        borderWidth: 1,
            shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 4,
        },
        shadowOpacity: 0.10,
        shadowRadius: 5,
        elevation: 2
        
    },
    contentProvince: {
        fontSize: 
            isIPadMini || isLargeIPad || isIPad
            || isAndroidTablet || isCompactAndroid || isFold
            ? font(20)
            : font(26), 
        lineHeight: 
            isIPadMini || isLargeIPad || isIPad
            || isAndroidTablet || isFold
            ? font(20)
            : font(26),
        fontWeight: "bold", 
        paddingVertical: 
            isAndroidTablet || isIPadMini || isLargeIPad || isIPad
            || isCompactAndroid || isFold
            ? verticalScale(5)
            : verticalScale(10),
        paddingTop: verticalScale(20),
    },
    otherContent: {
        fontSize: 
            isIPadMini || isLargeIPad || isIPad
            || isAndroidTablet || isFold
            ? font(15)
            : font(16),
        lineHeight: font(16), 
        fontWeight: "400", 
        paddingVertical: verticalScale(3)
    },
    moreContent: {
        fontSize: 
            isIPadMini || isLargeIPad || isIPad
            || isAndroidTablet || isFold
            ? font(15)
            : font(16),
        lineHeight: font(16), 
        fontWeight: "bold"
    },
    // resourcesContainer: {
    //     paddingVertical: verticalScale(20),
    //     paddingHorizontal: scale(10)
    // },
    // resourcesBG:{
    //     backgroundColor: "white", 
    //     width: "100%", 
    //     padding: scale(15), 
    //     borderRadius: radius(12),
    //     marginBottom: verticalScale(10),
    //     elevation: 2,
    //     borderWidth: 1,
    //     borderColor: "#E4E8F0",
    //     shadowColor: "#000",
    //     shadowOffset: {
    //     width: 0,
    //     height: 2,
    //     },
    //     shadowOpacity: 0.12,
    //     shadowRadius: 3,
    // },
    // resourcesTitle: {
    //     paddingVertical: verticalScale(10),
    //     fontSize: font(20),
    //     lineHeight: font(20),
    //     fontWeight: "bold"
    // },
    // resources: {
    //     flexDirection: "row",
    //     // justifyContent: "space-between",
    //     // gap: scale(5),
    //     // backgroundColor: "transparent",
    //     paddingVertical: verticalScale(5),
    // },
    // resourcePlace: {
    //     fontSize: 
    //         isFold
    //         ? font(18)
    //         : font(22),
    //     lineHeight: font(25),
    //     fontWeight: "bold",
    //     paddingVertical: verticalScale(5),
    // },
    // resourceLabelBG: {
    //     backgroundColor: "pink", 
    //     width: "auto", 
    //     paddingHorizontal: 
    //         isFold
    //         ? scale(8)
    //         : scale(10),
    //     borderRadius: radius(12),
    //     borderWidth: 1,
    //     borderColor: "#E20000",
    //     justifyContent: "center"
    // },
    // resourceLabel: {
    //     fontSize:   
    //         isFold
    //         ? font(8)
    //         : font(12),
    //     lineHeight: font(12),
    //     fontWeight: "400",
    //     color: "#E20000"
    // },
    // resourceDesc: {
    //     fontSize: 
    //         isFold
    //         ? font(13)
    //         : font(14),
    //     lineHeight: font(14),
    //     fontWeight: "500"
    // },
    // directionContainer: {
    //     flexDirection: "row", 
    //     justifyContent: "space-between",
    //     backgroundColor: "transparent",
    //     paddingVertical: verticalScale(5),
    //     alignItems: "center"
    // },
    // directionLocation: {
    //     flexDirection: "row", 
    //     gap: scale(5),
    //     backgroundColor: "transparent",
    //     alignItems: "center"
    // },
    // locationText: {
    //     color: "#777777",
    //     fontSize: 
    //         isFold
    //         ? font(10)
    //         : font(11),
    //     lineHeight: font(11)
    // },
    // // directionLink: {
    // //     fontSize: 
    // //         isFold
    // //         ? font(10)
    // //         : font(11),
    // //     lineHeight: font(11),
    // //     fontWeight: "700",
    // //     color: "#3781C1"
    // // },
    // buttonBG: {
    //     backgroundColor: "#d7d3d3",
    //     padding: scale(5),
    //     borderRadius: radius(5)
    // },
    // linkContainer: {
    //     flexDirection: "row",
    //     alignItems: "center",
    //     gap: scale(5)
    // }
    // // buttonText: {
    // //   fontSize: 20, 
    // //   fontWeight: "bold", 
    // //   textAlign: "center", 
    // //   padding: 10
    // // }

    resourcesContainer: {
        paddingVertical: verticalScale(20),
        paddingHorizontal: scale(12),
        gap: scale(10),
    },
    
    resourcesBG: {
        backgroundColor: "#FFFFFF",
        width: "100%",
        borderRadius: radius(14),
        borderWidth: scale(1.5),
        borderColor: "#E0E4F0",
        overflow: "hidden",           // clips the accent bar to the card's radius
        marginBottom: verticalScale(10),
        elevation: 3,
        shadowColor: "#1A1F5E",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 8,
    },
    
    resourcesTitle: {
        fontSize: font(20),
        lineHeight: font(20),
        fontWeight: "700",
    },
    
    resources: {
        flexDirection: "row",
        paddingVertical: verticalScale(4),
        backgroundColor: "transparent",
    },
    
    resourcePlace: {
        fontSize: font(15),
        lineHeight: font(20),
        fontWeight: "700",
    },
    
    directionContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor: "transparent",
        alignItems: "center",
    },
    
    locationPhone: {
        flexDirection: "row",
        gap: scale(8),
        backgroundColor: "transparent",
        alignItems: "center",
    },
    
    locPhoneText: {
        color: "#6B7280",
        fontSize: 
            isFold
            ? font(11)
            : font(12),
        lineHeight: font(17),
        flex: 1,
    },
    
    buttonBG: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(5),
        backgroundColor: "#F8F9FD",
        paddingVertical: verticalScale(7),
        paddingHorizontal: scale(12),
        borderRadius: radius(8),
        borderWidth: scale(1.5),
        borderColor: "#D1D5E8",
    },
    
    linkContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(8),
    },
    
    // ── New keys (additive only) ──
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(8),
        backgroundColor: "transparent",
    },
    
    sectionIconBubble: {
        width: scale(32),
        height: verticalScale(32),
        borderRadius: radius(8),
        backgroundColor: "#EEF0FA",
        justifyContent: "center",
        alignItems: "center",
    },
    
    accentBar: {
        height: verticalScale(4),
        backgroundColor: "#35408E",
        width: "100%",
    },
    
    cardInner: {
        padding: scale(14),
        gap: scale(10),
        backgroundColor: "transparent",
    },
    
    infoIconBubble: {
        width: scale(26),
        height: verticalScale(26),
        borderRadius: radius(6),
        backgroundColor: "#EEF0FA",
        justifyContent: "center",
        alignItems: "center",
    },
    
    rowDivider: {
        height: verticalScale(1),
        backgroundColor: "#F0F2F8",
    },
    
    buttonLabel: {
        fontSize: font(12),
        lineHeight: font(12),
        fontWeight: "600",
        color: "#35408E",
    },

})};

export function mapDropdownStyles(r: ResponsiveValues) {
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

/* ============================================================
    MAP DROPDOWN
============================================================ */
    
container: {
    width: 
        isLargeIPadPortrait || isIPadPortrait ? "94%" :
        isAndroidTabletLandscape || isIPadLandscape
        || isIPadMiniLandscape || isLargeIPadLandscape ? "95%" :

        isIPadMiniPortrait || isAndroidTabletPortrait ? "93%" :
        
        isFold ? "94%"
        
        : "88%",
    backgroundColor: "transparent",
    zIndex: 100,
    marginBottom: verticalScale(10)
  },

  dropdownButton: {
    backgroundColor: "white",
    padding: 
        isIPadMini || isLargeIPad || isIPad
        || isAndroidTablet || isFold
        ? scale(10)
        : scale(15),
    borderRadius: radius(12),
    borderColor: "#E0E4F0",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },

  dropdownContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    alignItems: "center",
  },

  dropdownText: {
    fontSize: font(13),
    lineHeight: font(13)
  },

  dropdownMenu: {
    backgroundColor: "white",
    borderRadius: radius(12),
    marginTop: verticalScale(5),
    position: "absolute",
    left: 0,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,

    elevation: 5,
  },

  dropdownItem: {
    padding: 
        isIPadMini || isLargeIPad || isIPad
        || isAndroidTablet || isFold
        ? scale(10)
        : scale(15),
    borderBottomWidth: 1,
    borderBottomColor: "#D3D7E0",
    backgroundColor: "transparent",
  },
  regionLabel: {
    backgroundColor: "#35408E",
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(15),
  },

  regionLabelText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 
        isLargeIPad || isIPadMini || isIPad
        || isAndroidTablet || isCompactAndroid || isFold
        ? font(13)
        : font(15),
    lineHeight: font(15)
  },

  provinceText: {
    paddingLeft: scale(15),
    fontSize: 
        isLargeIPad || isIPadMini || isIPad
        || isAndroidTablet || isCompactAndroid || isTallFold
        ? font(12)
        : font(13),
    lineHeight: font(13)
  },
})};

export function mapFilterDrawerStyles(r: ResponsiveValues) {
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

/* ============================================================
    MAP FILTER DRAWER
============================================================ */
  
    drawer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: radius(22),
    borderTopRightRadius: radius(22),

    padding: scale(18),
    paddingBottom: verticalScale(28),

    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 10,

    elevation: 12,
    zIndex: 999,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: font(20),
    lineHeight: font(20),
    fontWeight: "700",
    color: "#1A1F5E",
    paddingVertical: verticalScale(5)
  },

  subtitle: {
    fontSize: font(12),
    lineHeight: font(12),
    color: "#6B7280",
    marginBottom: verticalScale(14),
  },

  closeBtn: {
    padding: scale(6),
    borderRadius: radius(20),
    backgroundColor: "#EEF1FA",
  },

  section: {
    marginTop: verticalScale(10),
    paddingTop: verticalScale(10),
    borderTopWidth: 1,
    borderTopColor: "#F0F2F8",
  },

  sectionTitle: {
    fontSize: font(13),
    lineHeight: font(13),
    fontWeight: "600",
    color: "#35408E",
    marginBottom: verticalScale(10),
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
    paddingVertical: verticalScale(10),
  },

  label: {
    fontSize: font(15),
    lineHeight: font(15),
    fontWeight: "500",
    color: "#35408E",
  },
})};