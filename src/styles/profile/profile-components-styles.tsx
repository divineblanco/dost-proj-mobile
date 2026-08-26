import { StyleSheet } from "react-native";
import { ResponsiveValues, font, isAndroidTablet, radius, scale, verticalScale } from "../responsive";
// import { font, radius, scale, spacing, verticalScale } from "../responsive";

export function viewResourceStyles (r: ResponsiveValues) {
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
    headerBlock: {
    marginBottom: verticalScale(12),
    gap: scale(8),
    padding: scale(10)
  },
  pageTitle: {
    fontSize: font(22),
    fontWeight: "700",
    lineHeight: font(22),
  },
  pageSubtitle: {
    fontSize: font(13),
    lineHeight: font(15),
  },

  // Filters
  filterSortRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(10),
    marginBottom: verticalScale(16),
    gap: scale(8),
  },
  filterRow: {
    flexDirection: "row",
    gap: scale(8),
    flexWrap: "wrap",
    flexShrink: 1,
  },
  filterChip: {
    paddingVertical: 
      isFold
      ? verticalScale(15)
      : isLargeIPad || isIPad || isIPadMini
      || isAndroidTablet
      ? verticalScale(10)
      : verticalScale(8),
    paddingHorizontal: 
      isLargeIPad || isIPad || isIPadMini
      ? scale(16)
      : scale(14),
    borderRadius: radius(20),
    backgroundColor: "#F1F3F9",
    borderWidth: scale(1),
    borderColor: "#E5E9F2",
  },
  filterChipActive: {
    backgroundColor: "#35408E",
    borderColor: "#35408E",
  },
  filterChipText: {
    fontSize: font(12.5),
    fontWeight: "600",
    color: "#6B7690",
    lineHeight: font(13)
  },
  filterChipTextActive: {
    color: "#FFFFFF",
  },

  // Sort
  sortBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
    paddingVertical: 
      isFold || isLargeIPad || isIPad
      || isIPadMini || isAndroidTablet
      ? verticalScale(10)
      : verticalScale(8),
    paddingHorizontal: scale(10),
    borderRadius: radius(20),
    backgroundColor: "#35408E",
    borderWidth: scale(1),
    borderColor: "#D6DCF3",
  },

  // List card
  listCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: radius(16),
    borderWidth: scale(1.5),
    borderColor: '#E0E4F0',
    paddingVertical: 
      isFold
      ? verticalScale(10)
      : verticalScale(6),
    paddingHorizontal: scale(15),
    marginHorizontal: scale(10),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: radius(10),
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingVertical: verticalScale(14),
    gap: scale(10),
  },
  rowDivider: {
    height: verticalScale(1),
    backgroundColor: "#EEF1F7",
  },

  contentContainer: {
    flexDirection: "row",
    flex: 1,
    gap: scale(10),
  },
  iconBubble: {
    width: 
      isCompactAndroid
      ? scale(40)
      : scale(38),
    height: 
      isCompactAndroid
      ? verticalScale(40)
      : isLargeIPad || isIPad || isIPadMini
      || isAndroidTablet
      ? verticalScale(50)
      : isFold
      ? verticalScale(80)
      : verticalScale(38),
    borderRadius: radius(12),
    alignItems: "center",
    justifyContent: "center",
  },
  iconBubbleEdu: {
    backgroundColor: "#FFF6E3",
  },
  iconBubbleReport: {
    backgroundColor: "#EAEDFA",
  },

  textCol: {
    flex: 1,
    gap: scale(3),
  },
  itemTitle: {
    fontSize: font(14),
    fontWeight: "700",
    color: "#1F2A50",
    lineHeight: font(14)
  },
  itemDesc: {
    fontSize: font(12.5),
    color: "#8892A8",
    lineHeight: font(17),
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
    marginTop: verticalScale(6),
    flexWrap: "wrap",
  },
  categoryPill: {
    backgroundColor: "#F1F3F9",
    borderRadius: radius(8),
    paddingVertical: 
      isCompactAndroid || isLargeIPad || isIPad
      || isIPadMini || isAndroidTablet
      ? verticalScale(5)
      : isFold
      ? verticalScale(8)
      : verticalScale(3),
    paddingHorizontal: scale(8),
  },
  categoryPillText: {
    fontSize: font(10.5),
    fontWeight: "600",
    color: "#5A6482",
    lineHeight: font(11)
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
  },
  itemDate: {
    fontSize: font(11),
    color: "#9BA8C0",
    lineHeight: font(11)
  },
  fileType: {
    fontSize: font(10.5),
    fontWeight: "700",
    color: "#B7C0D6",
    lineHeight: font(11)
  },

  downloadBtn: {
    width: scale(30),
    height: 
      isCompactAndroid || isAndroidTablet
      ? verticalScale(35)
      : isLargeIPad || isIPad || isIPadMini
      ? verticalScale(40)
      : isNormalFold
      ? verticalScale(60)
      : isTallFold 
      ? verticalScale(50)
      : verticalScale(30),
    borderRadius: radius(6),
    borderWidth: scale(1.5),
    borderColor: "#D1D5E8",
    backgroundColor: "#F8F9FD",
    justifyContent: "center",
    alignItems: "center",
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(40),
    gap: scale(10),
  },
  emptyText: {
    fontSize: font(13),
    color: "#9BA8C0",
    lineHeight: font(13)
  },
})};

export function viewDiscussionStyles(r: ResponsiveValues) {
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
headerBlock: {
    marginBottom: verticalScale(12),
    gap: scale(8),
    padding: scale(10),
  },
  pageTitle: {
    fontSize: font(22),
    fontWeight: "700",
    lineHeight: font(22),
  },
  pageSubtitle: {
    fontSize: font(13),
    lineHeight: font(15),
  },

  // Filters
filter: {
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "space-between",
  paddingHorizontal: scale(10),
  paddingBottom: verticalScale(15),
  gap: scale(10),
  overflow: "visible"
},

filterRow: {
  flexDirection: "row",
  alignItems: "center",
  gap: scale(8),
  flexWrap: "wrap",
  paddingHorizontal: scale(10),
  flex: 1,
},

filterStatus: {
  width: scale(35),
  height: 
    isCompactAndroid
    ? verticalScale(40)
    : isFold
    ? verticalScale(56)
    : isLargeIPad || isIPad || isIPadMini
    || isAndroidTablet
    ? verticalScale(39)
    : verticalScale(35),
  backgroundColor: "#35408E",
  borderRadius: radius(10),
  alignItems: "center",
  justifyContent: "center",
},

filterStatusActive: {
  backgroundColor: "#232C6B",
},

filterStatusDot: {
  position: "absolute",
  top: 
    isFold || isLargeIPad || isIPad
    || isIPadMini || isAndroidTablet
    ? -6
    : -3,
  right: -3,
  width: scale(9),
  height: 
    isFold
    ? verticalScale(20)
    : isLargeIPad
    ? verticalScale(15)
    : isIPad || isIPadMini || isAndroidTablet
    ? verticalScale(13)
    : verticalScale(9),
  borderRadius: radius(5),
  backgroundColor: "#FFB633",
  borderWidth: scale(1.5),
  borderColor: "#FFFFFF",
},
  filterChip: {
    paddingVertical: 
      isFold
      ? verticalScale(15)
      : isLargeIPad || isIPad || isIPadMini
      || isAndroidTablet
      ? verticalScale(10)
      : verticalScale(8),
    paddingHorizontal: 
      isLargeIPad || isIPad || isIPadMini
      || isAndroidTablet
      ? scale(16)
      : scale(14),
    borderRadius: radius(20),
    backgroundColor: "#F1F3F9",
    borderWidth: scale(1),
    borderColor: "#E5E9F2",
  },
  filterChipActive: {
    backgroundColor: "#35408E",
    borderColor: "#35408E",
  },
  filterChipText: {
    fontSize: font(12.5),
    fontWeight: "600",
    color: "#6B7690",
    lineHeight: font(13)
  },
  filterChipTextActive: {
    color: "#FFFFFF",
  },

  // List card
  listCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: radius(16),
    borderWidth: scale(1.5),
    borderColor: "#E0E4F0",
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(15),
    marginHorizontal: scale(10),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingVertical: verticalScale(14),
  },
  rowDivider: {
    height: verticalScale(1),
    backgroundColor: "#EEF1F7",
  },

  contentContainer: {
    flexDirection: "row",
    flex: 1,
    gap: scale(10),
  },
  iconBubble: {
    width: 
      isCompactAndroid
      ? scale(40)
      : scale(38),
    height: 
      isCompactAndroid
      ? verticalScale(40)
      : isLargeIPad || isIPad || isIPadMini
      || isAndroidTablet
      ? verticalScale(50)
      : isFold
      ? verticalScale(80)
      : verticalScale(38),
    borderRadius: radius(12),
    alignItems: "center",
    justifyContent: "center",
  },
  iconBubbleContrib: {
    backgroundColor: "#EAEDFA",
  },
  iconBubbleMis: {
    backgroundColor: "#FDEAEA",
  },

  textCol: {
    flex: 1,
    gap: scale(3),
  },
  itemTitle: {
    fontSize: font(14),
    fontWeight: "700",
    color: "#1F2A50",
    lineHeight: 
      isFold
      ? font(16)
      : font(14)
  },
  itemDesc: {
    fontSize: font(12.5),
    color: "#8892A8",
    lineHeight: font(17),
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
    marginTop: verticalScale(6),
    flexWrap: "wrap",
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
    borderRadius: radius(8),
    paddingVertical: 
      isFold 
      ? verticalScale(8)
      : isLargeIPad || isIPad || isIPadMini
      || isAndroidTablet
      ? verticalScale(6)
      : verticalScale(3),
    paddingHorizontal: scale(8),
  },
  statusPillText: {
    fontSize: font(10.5),
    fontWeight: "700",
    lineHeight: font(11)
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
  },
  itemDate: {
    fontSize: font(11),
    color: "#9BA8C0",
    lineHeight: font(11)
  },

  thumbnail: {
    width: scale(44),
    height: 
      isFold
      ? verticalScale(80)
      : isLargeIPad || isIPad || isIPadMini
      || isAndroidTablet
      ? verticalScale(55)
      : verticalScale(44),
    borderRadius: radius(10),
    marginTop: verticalScale(2),
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(40),
    gap: scale(10),
  },
  emptyText: {
    fontSize: font(13),
    color: "#9BA8C0",
    lineHeight: font(13)
  },
})};

export function DropdownStyles (r: ResponsiveValues) {
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

  modalContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },

  dropdown: {
    backgroundColor: "#FFFFFF",
    borderRadius: radius(12),
    paddingVertical: verticalScale(6),
    borderWidth: scale(1.5),
    borderColor: "#E5E9F2",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 10,

    zIndex: 9999,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 
      isFold
      ? verticalScale(15)
      : verticalScale(10),
    paddingHorizontal: scale(12),
  },

  optionActive: {
    backgroundColor: "#F1F3F9",
  },

  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),

    backgroundColor: "transparent",
  },

  dot: {
    width:  
      isFold || isLargeIPad || isIPad
      ? scale(5)
      : isIPadMini || isAndroidTablet
      ? scale(5.5)
      : scale(8),
    height: 
      isCompactAndroid
      ? verticalScale(10)
      : isNormalFold
      ? verticalScale(13)
      : isTallFold
      ? verticalScale(11)
      : verticalScale(8),
    borderRadius: radius(4),
  },

  optionText: {
    fontSize: font(13),
    lineHeight: font(13),
    fontWeight: "500",
    color: "#3D4560",
  },

  optionTextActive: {
    fontWeight: "700",
    color: "#1F2A50",
  },
})};