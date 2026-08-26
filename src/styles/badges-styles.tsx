import { StyleSheet } from "react-native";
import { font, radius, ResponsiveValues, scale, verticalScale } from "./responsive";

export function viewBadgesStyles(r: ResponsiveValues) {
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
    
    pageContainer: {
    flex: 1,
    backgroundColor: "#F8F9FD",
  },

  scrollContent: {
    padding: scale(20),
    paddingBottom: 
        isCompactAndroid
        ? verticalScale(150)
        : isTallFold
        ? verticalScale(120)
        : isNormalFold
        ? verticalScale(140)
        : verticalScale(100),
    gap: scale(14),
  },

  // Header

  header: {
    gap: scale(4),
    backgroundColor: "transparent",
  },

  title: {
    fontSize: font(22),
    fontWeight: "700",
    color: "#35408E",
    lineHeight: font(28),
  },

  subtitle: {
    fontSize: font(13),
    color: "#6B7280",
    lineHeight: font(18),
  },

  accentBar: {
    height: verticalScale(3),
    width: "100%",
    backgroundColor: "#35408E",
    borderRadius: radius(2),
  },

  // Summary

  summaryRow: {
    backgroundColor: "transparent",
  },

  summaryPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(6),
    alignSelf: "flex-start",
    backgroundColor: "#FFF4E0",
    paddingHorizontal: scale(12),
    paddingVertical: 
        isCompactAndroid || isAndroidTablet || isLargeIPad
        || isIPad || isIPadMini
        ? verticalScale(7)
        : isFold
        ? verticalScale(10)
        : verticalScale(5),
    borderRadius: radius(20),
  },

  summaryTxt: {
    fontSize: font(12),
    fontWeight: "600",
    color: "#B36B00",
    lineHeight: 
        isFold || isAndroidTablet || isLargeIPad
        || isIPad || isIPadMini
        ? font(15)
        : font(12)
  },

  // Section

  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: radius(14),
    borderWidth: scale(1.5),
    borderColor: "#E0E4F0",
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(14),
    paddingBottom: verticalScale(8),

    shadowColor: "#1A1F5E",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 8,

    elevation: 3,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
    marginBottom: verticalScale(12),
    backgroundColor: "transparent",
  },

  sectionIconBubble: {
    width: 
        isNormalFold || isAndroidTablet || isLargeIPad
        || isIPad || isIPadMini
        ? scale(25)
        : scale(32),
    height: 
        isTallFold
        ? verticalScale(50)
        : isNormalFold
        ? verticalScale(60)
        : verticalScale(32),
    borderRadius: radius(8),
    backgroundColor: "#EAFBE7",
    justifyContent: "center",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: font(15),
    fontWeight: "700",
    color: "#1A1F5E",
    flex: 1,
    lineHeight: 
        isFold || isAndroidTablet || isLargeIPad
        || isIPad || isIPadMini
        ? font(18)
        : font(15)
  },

  countPill: {
    backgroundColor: "#EAFBE7",
    paddingHorizontal: scale(10),
    paddingVertical: 
        isFold 
        ? verticalScale(8)
        : isAndroidTablet || isLargeIPad || isIPad
        || isIPadMini
        ? verticalScale(7)
        : verticalScale(3),
    borderRadius: radius(20),
  },

  countTxt: {
    fontSize: font(11),
    fontWeight: "700",
    color: "#2E9E3A",
    lineHeight: font(11)
  },

  sectionDivider: {
    height: 
        isFold || isAndroidTablet || isLargeIPad
        || isIPad || isIPadMini
        ? verticalScale(2)
        : verticalScale(1),
    backgroundColor: "#F0F2F8",
    marginBottom: verticalScale(6),
  },

  rowDivider: {
    height: verticalScale(1),
    backgroundColor: "#F0F2F8",
  },

  // Badge row

  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
    paddingVertical: 
        isFold || isAndroidTablet || isLargeIPad
        || isIPad || isIPadMini
        ? verticalScale(18)
        : verticalScale(12),
  },

  badgeIconBubble: {
    width: 
        isTallFold || isAndroidTablet 
        ? scale(40)
        : isNormalFold || isLargeIPad || isIPad 
        || isIPadMini
        ? scale(35)
        : scale(48),
    height: 
        isCompactAndroid 
        ? verticalScale(55)
        : isTallFold
        ? verticalScale(65)
        : isNormalFold
        ? verticalScale(80)
        : verticalScale(48),
    borderRadius: radius(12),
    justifyContent: "center",
    alignItems: "center",
  },

  badgeTextCol: {
    flex: 1,
    gap: scale(2),
  },

  badgeTitle: {
    fontSize: font(13),
    fontWeight: "700",
    color: "#1A1F5E",
    lineHeight: 
        isFold || isAndroidTablet
        ? font(15)
        : font(13)
  },

  badgeDesc: {
    fontSize: font(12),
    color: "#6B7280",
    lineHeight: font(17),
  },

  // Earned date

  earnedDateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
    marginTop: verticalScale(2),
  },

  earnedDate: {
    fontSize: font(11),
    color: "#9BA8C0",
    lineHeight: 
        isLargeIPad || isIPad || isIPadMini
        ? font(13)
        : font(11)
  },

  // Status

  statusDot: {
    width: 
        isNormalFold || isLargeIPad || isIPad 
        ? scale(15)
        : isIPadMini
        ? scale(16)
        : isAndroidTablet 
        ? scale(17)
        : scale(22),
    height: 
        isCompactAndroid
        ? verticalScale(25)
        : isFold
        ? verticalScale(35)
        : verticalScale(22),
    borderRadius: radius(11),
    justifyContent: "center",
    alignItems: "center",
  },
  
})};