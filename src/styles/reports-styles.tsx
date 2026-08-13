import { StyleSheet } from "react-native";
import {
  font,
  isAndroidTablet,
  radius,
  ResponsiveValues,
  scale,
  verticalScale
} from "./responsive";

export function reportStyles (r: ResponsiveValues) {
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

  // =====================================================
  // PAGE
  // =====================================================

  pageContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: scale(5),
  },

  scrollContent: {
    paddingBottom: verticalScale(90),
  },

  headerContainer: {
    padding: scale(10),
    gap: 
      isLargeIPad || isIPad || isIPadMini || isAndroidTablet
      ? scale(5)
      : undefined
  },

  default: {
    lineHeight: font(12)
  },

  // =====================================================
  // SEARCH
  // =====================================================

  search: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E4E8F0",
    paddingHorizontal: scale(12),
    paddingVertical: 
      isLargeIPad || isIPad || isIPadMini 
      ? verticalScale(15)
      : verticalScale(10),
    borderRadius: radius(10),
    marginHorizontal: scale(10),
    gap: scale(10),
  },

  searchInput: {
    fontSize: font(12),
    lineHeight: font(12),
    color: "#35408E",
    flex: 1,
  },

  // =====================================================
  // FILTERS
  // =====================================================

  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(10),
    marginTop: verticalScale(10),
    gap: scale(10),
  },

  calendarWrapper: {
    position: "relative",
    zIndex: 9999,
  },

  calendarButton: {
    backgroundColor: "#35408E",
    width: isLargeIPadLandscape
      ? scale(40)
      : scale(45),

    height: isLargeIPad || isIPad || isIPadMini || isAndroidTablet
      ? verticalScale(54)
      : verticalScale(40),

    borderRadius: radius(10),
    alignItems: "center",
    justifyContent: "center",
  },

  calendarContainer: {
    position: "absolute",

    // Directly below the button
    top: "100%",

    // Align right edge with button
    right: 0,

    marginTop: verticalScale(5),

    zIndex: 9999,

    backgroundColor: "white",
    borderRadius: radius(10),
    borderWidth: scale(0.5),
    borderColor: "#E0E4F0",

    elevation: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },

  calendar: {
    marginVertical: verticalScale(10),
    alignSelf: "flex-end",
    marginHorizontal: verticalScale(10),
    borderRadius: radius(10),
    zIndex: 9999
  },

  selectedDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: scale(10),
    gap: scale(6),
    marginTop: verticalScale(10),
  },

  dateText: {
    fontSize: font(12),
    lineHeight: font(12),
    color: "#35408E",
    fontWeight: "600",
  },

  // =====================================================
  // RESULTS
  // =====================================================

  resultsContainer: {
    padding: scale(10),
    gap: scale(10),
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scale(40),
  },

  emptyText: {
    marginTop: scale(10),
    fontSize: font(13),
    lineHeight: font(13),
    color: "#9BA8C0",
    textAlign: "center",
  },

  emptySubText: {
    marginTop: scale(4),
    fontSize: font(12),
    lineHeight: font(12),
    color: "#B7C0D6",
    textAlign: "center",
  },

  clearFiltersButton: {
    marginTop: scale(14),
    backgroundColor: "#35408E",
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    borderRadius: radius(8),
  },

  clearFiltersText: {
    fontSize: font(12),
    lineHeight: font(12),
    fontWeight: "600",
    color: "#FFFFFF",
  },

  // =====================================================
  // REPORT CARD
  // =====================================================

  shadowWrapper: {
    borderRadius: radius(12),

    shadowColor: "#1A1F5E",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,

    elevation: 5,

    backgroundColor: "transparent",
  },

  card: {
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: "#FFFFFF",
    borderRadius: radius(12),
    overflow: "hidden",
    minHeight: verticalScale(130),
  },

  accentBar: {
    width: scale(7),
    alignSelf: "stretch",
  },

  leftCol: {
    alignItems: "center",
    justifyContent: "center",
    gap: scale(8),
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(16),
  },

  iconContainer: {
    width: 
      isLargeIPad || isIPad || isIPadMini || isAndroidTablet
      ? scale(40)
      : scale(44),
    height: 
      isLargeIPad || isIPad || isIPadMini || isAndroidTablet
      ? verticalScale(60)
      : verticalScale(44),
    borderRadius: radius(10),
    justifyContent: "center",
    alignItems: "center",
  },

  labelPill: {
    paddingHorizontal: scale(10),
    paddingVertical: 
      isLargeIPad || isIPad || isIPadMini || isAndroidTablet
      ? verticalScale(5)
      : verticalScale(3),
    borderRadius: radius(20),
  },

  labelText: {
    fontSize: font(11),
    lineHeight: font(11),
    fontWeight: "600",
  },

  verticalDivider: {
    width: scale(1),
    alignSelf: "stretch",
    backgroundColor: "#F0F2F8",
  },

  content: {
    flex: 1,
    padding: scale(14),
    gap: scale(6),
    justifyContent: "center",
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },

  title: {
    flex: 1,
    fontSize: 
      isLargeIPad || isIPad || isIPadMini || isAndroidTablet
      ? font(16)
      : font(14),
    fontWeight: "700",
    color: "#35408E",
    lineHeight: 
      isLargeIPad || isIPad || isIPadMini || isAndroidTablet
      ? font(16)
      : font(20),
  },

  downloadBtn: {
    width: 
      isLargeIPad || isIPad || isIPadMini || isAndroidTablet
      ? scale(20)
      : scale(30),
    height: 
      isLargeIPad || isIPad || isIPadMini || isAndroidTablet
      ? scale(20)
      : scale(30),
    borderRadius: radius(6),
    borderWidth: scale(1.5),
    borderColor: "#D1D5E8",
    backgroundColor: "#F8F9FD",
    justifyContent: "center",
    alignItems: "center",
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(5),
  },

  cardDateText: {
    fontSize: font(11),
    lineHeight: font(11),
    fontWeight: "500",
  },

  horizontalDivider: {
    height: verticalScale(1),
    backgroundColor: "#F0F2F8",
  },

  description: {
    fontSize: font(12),
    color: "#6B7280",
    lineHeight: font(18),
  },

  // =====================================================
  // CATEGORIES DROPDOWN
  // =====================================================

  container: {
    width: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape
      || isAndroidTabletLandscape
      ? "90%"
      : "85%",
    backgroundColor: "transparent",

    // This makes the container the positioning reference
    position: "relative",

    zIndex: 1000,
    elevation: 1000,
  },

  dropdownButton: {
    backgroundColor: "#E4E8F0",

    padding: isLargeIPad || isIPad
      ? scale(10)
      : isIPadMini || isAndroidTablet
      ? scale(13)
      : scale(15),

    borderRadius: radius(10),
  },

  dropdownContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),

    // Prevent text from pushing the arrow out
    flexShrink: 1,
  },

  dropdownText: {
    fontSize: font(13),
    lineHeight: font(13),
    fontWeight: "600",
  },

  dropdownMenu: {
    backgroundColor: "#E4E8F0",
    borderRadius: radius(12),

    position: "absolute",

    top: "100%",
    left: 0,
    right: 0,

    elevation: 10,
    zIndex: 1000,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,

    overflow: "hidden",
  },

  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),

    padding: 
      isLargeIPad || isIPad || isAndroidTablet
      ? scale(10)
      : scale(15),

    borderBottomWidth: 1,
    borderBottomColor: "#D3D7E0",
  },

  itemText: {
    fontSize: font(13),
    lineHeight: font(13),
    color: "#35408E",

    flexShrink: 1,
  },

  activeItem: {
    backgroundColor: "#35408E",
    borderRadius: radius(10),
  },

  activeText: {
    color: "white",
    fontWeight: "bold",
  },
})};