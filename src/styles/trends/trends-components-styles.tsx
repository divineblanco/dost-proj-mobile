import { StyleSheet } from 'react-native';
import {
  font,
  isAndroidTablet,
  radius,
  ResponsiveValues,
  scale,
  verticalScale
} from '../responsive';
import { colors } from './trends-colors';


const capScale = (size: number, max: number) => Math.min(scale(size), max);

/* ============================================================
    TRENDING TOPICS BOX
============================================================ */

export function trendingTopicsStyles (r: ResponsiveValues) {
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

  summaryContainer2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: "center",
    padding: scale(10),
    gap: 
      isAndroidTabletPortrait
      ? scale(7)
      : isAndroidTabletLandscape
      ? scale(10)
      : scale(10),
  },

  trendsBox: {
    // was a flat scale(170) — grows with device width, but so does
    // its wrapping container, so the ratio (and therefore column
    // count) barely changed between a phone and a tablet. A
    // percentage width actually adds columns as the screen widens:
    // 1-up on small phones, 2-up on phones, 3-up on folds, 4-up on
    // tablets — matching the same scheme used for the Home
    // dashboard's stat boxes.
    width: 
        isSmallPhone 
        ? '100%'
        : isAndroidTablet
        ? "49%"  
        : isFold 
        ? '48%' 
        : '48%',
    minHeight: 
        isNormalFold
        ? verticalScale(170)
        : isTallFold
        ? verticalScale(150)
        : isAndroidTabletPortrait || isLargeIPadPortrait || isIPadPortrait
        || isIPadMiniPortrait
        ? verticalScale(85)
        : isAndroidTabletLandscape || isLargeIPadLandscape || isIPadLandscape
        || isIPadMiniLandscape
        ? verticalScale(100)
        : isShortScreen 
        ? verticalScale(90)
        : verticalScale(80),
    padding: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgGray,
    borderRadius: radius(7),
    flexDirection: 'row',
    position: 'relative',
    overflow: 'hidden',
  },

  box: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    zIndex: 2,
    gap: 
      isAndroidTabletPortrait
      ? scale(3)
      : isAndroidTabletLandscape || isLargeIPadLandscape || isIPadLandscape
      || isIPadMiniLandscape
      ? scale(2)
      : scale(5),
  },

  boxInfo: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    textAlign: 'center',
    flex: 1,
    flexShrink: 1,
  },

  boxTitle: {
    flexWrap: 'wrap',
    fontSize: 
        isFold || isAndroidTabletLandscape || isLargeIPadLandscape
        || isIPadLandscape || isIPadMiniLandscape
        ? font(18)
        : isAndroidTabletPortrait || isLargeIPadPortrait || isIPadPortrait
        || isIPadMiniPortrait
        ? font(15)
        : font(13)
  },

  boxMore: {
    fontSize: 
        isFold || isAndroidTabletLandscape || isLargeIPadLandscape
        || isIPadLandscape || isIPadMiniLandscape
        ? font(15)
        : isAndroidTabletPortrait || isLargeIPadPortrait || isIPadPortrait
        || isIPadMiniPortrait
        ? font(13)
        : font(12),
    // was the number 400 — React Native's fontWeight type only
    // accepts 'normal'/'bold' or a numeric *string* ('100'-'900')
    fontWeight: '400',
    fontStyle: 'italic',
    color: colors.primary,
    textAlign: 'center',
    lineHeight: font(15)
  },

  iconBG: {
    width: 
        isFold || isAndroidTablet || isIPadPortrait
        || isIPadMini
        ? capScale(50, 62)
        : isLargeIPad || isIPadLandscape
        ? capScale(60, 70)
        : capScale(40, 52),
    height: 
        isFold || isAndroidTablet || isLargeIPadPortrait
        || isIPadPortrait || isIPadMini 
        ? capScale(50, 62)
        : isLargeIPadLandscape || isIPadLandscape
        ? capScale(60, 70)
        : capScale(40, 52),
    borderRadius: radius(10),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  trendRise: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    flexShrink: 0,
    justifyContent: 'center',
    marginTop: 
        isFold || isAndroidTabletPortrait
        ? verticalScale(5)
        : verticalScale(2),
  },
})};

/* ============================================================
    RECENT TABLE
============================================================ */

export function recentTableStyles (r: ResponsiveValues) {
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

  container: {
    backgroundColor: colors.white,
    borderRadius: radius(10),
    padding: scale(5),
    elevation: 5,
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    maxHeight: 
        isFold
        ? verticalScale(500)
        : verticalScale(300)
  },

  headerRow: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: 
        isFold
        ? verticalScale(20)
        : verticalScale(10),
    borderRadius: radius(6),
    marginBottom: 
        isFold
        ? verticalScale(3)
        : verticalScale(5),
  },

  headerCell: {
    flex: 1,
    color: colors.white,
    fontSize: 
        isFold
        ? font(15)
        : font(12),
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: font(15)
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: isTallScreen || isExtraTallScreen ? verticalScale(65) : verticalScale(55),
    backgroundColor: colors.bgGray,
    borderBottomWidth: scale(1),
    borderBottomColor: colors.rowBorder,
  },

  contentCellContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(6),
    backgroundColor: 'transparent',
  },

  cellContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(4),
    backgroundColor: 'transparent',
  },

  cell: {
    width: '100%',
    textAlign: 'center',
    fontSize: 
        isFold
        ? font(14)
        : font(12),
    lineHeight: font(14),
    paddingVertical: 
        isFold
        ? verticalScale(45) 
        : undefined
  },

  colorText: {
    color: 'white',
    fontWeight: '600',
  },

  sentimentBadge: {
    paddingHorizontal: scale(10),
    paddingVertical: 
        isFold
        ? verticalScale(15)
        : isAndroidTablet || isLargeIPad || isIPad
        || isIPadMini
        ? verticalScale(7)
        : verticalScale(4),
    borderRadius: radius(12),
    minWidth: scale(70),
    alignItems: 'center',
    justifyContent: 'center',
  },

  positiveBadge: {
    backgroundColor: colors.positive,
  },

  neutralBadge: {
    backgroundColor: colors.neutral,
  },

  negativeBadge: {
    backgroundColor: colors.negative,
  },

  sentimentText: {
    fontSize: 
        isFold
        ? font(13)
        : isAndroidTabletPortrait
        ? font(12)
        : font(11),
    fontWeight: '700',
    lineHeight: font(13)
  },
})};

/* ============================================================
    TRENDS FILTER
============================================================ */

export function trendsFilterStyles (r: ResponsiveValues) {
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

  closeButton: {
    position: 'absolute',
    top: verticalScale(8),
    right: scale(12),
    zIndex: 1,
  },

  filterDropdown: {
    position: 'absolute',
    top: 
        isTallFold
        ? verticalScale(100)
        : isNormalFold
        ? verticalScale(120)
        : verticalScale(60),
    marginHorizontal: scale(10),
    width: 
      isAndroidTabletLandscape || isIPadLandscape || isLargeIPadLandscape
      || isIPadMiniLandscape
      ? "80%"
      : 'auto',
    alignSelf: "center",
    backgroundColor: colors.primary,
    borderRadius: radius(10),
    padding: scale(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 999,
  },

  filterContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: 'transparent',
    padding: scale(15),
  },

  filterOptionContainer: {
    backgroundColor: 'transparent',
    marginTop: verticalScale(10),
    padding: scale(15),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    rowGap: verticalScale(16),
  },

  // one grid cell: label + its dropdown box. Fixed at ~47% so two
  // always sit side by side with a small gutter between them.
  filterOptionContent: {
    backgroundColor: 'transparent',
    width: '47%',
    gap: scale(8),
  },

  // opt-in override: apply alongside filterOptionContent to stack
  // a field into the full row instead of the 2-up grid — used on
  // the last of Trends' 3 fields (Platform) so it doesn't sit
  // alone at half width.
  filterOptionContentFull: {
    width: '100%',
  },

  filterOptionBG: {
    backgroundColor: colors.white,
    padding: scale(10),
    width: '100%',
    borderRadius: radius(8),
  },

  filterOptionChoices: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },

  filterButtonApply: {
    backgroundColor: colors.accentYellow,
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 
        isFold
        ? verticalScale(90)
        : verticalScale(50),
    borderRadius: radius(13),
    elevation: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: '#000',
  },

  filterDropdownList: {
    position: 'absolute',
    top: '100%',
    left: scale(0),
    right: scale(0),
    marginTop: 
        isNormalFold
        ? verticalScale(55)
        : isTallFold
        ? verticalScale(45)
        : isLargeIPad 
        ? verticalScale(40)
        : isIPadPortrait || isIPadMiniPortrait || isIPadLandscape
        || isIPadMiniLandscape
        ? verticalScale(35)
        : isAndroidTablet 
        ? verticalScale(30)
        : verticalScale(25),
    backgroundColor: '#FFF',
    borderRadius: radius(8),
    paddingVertical: scale(8),
    paddingLeft: scale(7),
    maxHeight: 
      isAndroidTablet || isLargeIPad || isIPad
      || isIPadMini
      ? verticalScale(160)
      : isTallScreen || isExtraTallScreen 
      ? verticalScale(260) 
      : verticalScale(200),
    elevation: 5,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  filterDropdownItem: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(5),
  },

  filterDropdownChoice: {
    paddingHorizontal: scale(1),
  },

  filterDropdownAnchor: {
    // left: scale(102),
  },

  filterScrollContent: {
    paddingBottom: verticalScale(20),
  },

  filterScroller: {
    position: 'relative',
  },

  filterCalendar: {
    backgroundColor: colors.white,
    borderRadius: radius(8),
    padding: scale(5),
    marginTop: verticalScale(60),
    width: '100%',
    zIndex: 999,
    position: 'absolute',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: '#000',
    maxHeight: 
      isTallScreen || isExtraTallScreen 
      ? verticalScale(260) 
      : verticalScale(200),
  },
})};

/* ============================================================
    LANGUAGE FILTER
============================================================ */

export function languageFilterStyles (r: ResponsiveValues) {
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

  iconBtn: {
    width: 
      isLargeIPad || isIPad || isIPadMini
      || isAndroidTablet
      ? scale(25)
      : scale(38),
    height: 
      isFold
      ? verticalScale(65)
      : verticalScale(38),
    borderRadius: radius(8),
    borderWidth: scale(1.5),
    borderColor: "#E0E4F0",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(5),
    position: "relative",
  },

  iconBtnActive: {
    borderColor: "#C5CAE9",
    backgroundColor: "#EEF0FA",
  },

  activeDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 
      isLargeIPad
      ? scale(6)
      : scale(7),
    height: 
      isLargeIPad
      ? scale(6)
      : scale(7),
    borderRadius: radius(4),
    backgroundColor: "#35408E",
    borderWidth: scale(1.5),
    borderColor: "#FFFFFF",
  },

  modalOverlay: {
    flex: 1,
  },

  // dropdown: {
  //   position: "absolute",
  //   top: "100%",
  //   width: scale(150),
  //   backgroundColor: "#FFFFFF",
  //   borderRadius: radius(12),
  //   borderWidth: scale(1.5),
  //   borderColor: "#E0E4F0",
  //   paddingVertical: verticalScale(4),
  //   shadowColor: "#1A1F5E",
  //   shadowOffset: { width: 0, height: 6 },
  //   shadowOpacity: 0.12,
  //   shadowRadius: 12,
  //   elevation: 10,
  //   maxHeight: verticalScale(180)
  // },

  dropdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(6),
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(8),
  },

  dropdownTitle: {
    fontSize: font(12),
    lineHeight: font(15),
    fontWeight: "700",
    color: "#35408E",
    letterSpacing: 0.2,
  },

  clearTxt: {
    fontSize: font(11),
    lineHeight: font(11),
    fontWeight: "600",
    color: "#C62828",
    textDecorationLine: "underline",
  },

  divider: {
    height: verticalScale(1),
    backgroundColor: "#F0F2F8",
    marginHorizontal: scale(10),
    marginBottom: verticalScale(4),
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(14),
    marginHorizontal: scale(4),
    borderRadius: radius(8),
  },

  itemActive: {
    backgroundColor: "#EEF0FA",
  },

  itemText: {
    fontSize: font(13),
    lineHeight: font(15),
    color: "#374151",
    flex: 1,
  },

  itemTextActive: {
    color: "#35408E",
    fontWeight: "700",
  },

  dropdown: {
  position: "absolute",
  backgroundColor: "#FFFFFF",
  borderRadius: radius(12),

  paddingVertical: verticalScale(6),

  elevation: 5,

  shadowOffset: {
    width: 0,
    height: 2,
  },

  shadowOpacity: 0.15,
  shadowRadius: 5,

  maxHeight: 
    isFold
    ? verticalScale(250)
    : verticalScale(180),
},

option: {
  minHeight: 
    isFold
    ? verticalScale(70)
    : verticalScale(35),

  paddingHorizontal: scale(14),

  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},

optionSelected: {
  backgroundColor: "#F1F3FA",
},

optionText: {
  fontSize: scale(11),
  lineHeight: font(15)
},

optionTextSelected: {
  color: "#35408E",
  fontWeight: "600",
},
})};