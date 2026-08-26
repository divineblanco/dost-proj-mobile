import { StyleSheet } from "react-native";
import { font, isAndroidTablet, radius, ResponsiveValues, scale, spacing, verticalScale } from "./responsive";

export function notificationStyles(r: ResponsiveValues) {
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
    backgroundColor: "white"
  },

  // Tab bar
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: scale(20),
    paddingVertical: 
      isLargeIPad || isIPad || isIPadMini
      || isAndroidTablet
      ? verticalScale(15)
      : isFold
      ? verticalScale(20)
      : verticalScale(10),
    gap: scale(6),
    borderBottomWidth: scale(1),
    borderBottomColor: '#F0F2F8',
  },

  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(5),
    paddingVertical: 
      isLargeIPad || isIPad || isIPadMini
      || isAndroidTablet
      ? verticalScale(10)
      : isFold
      ? verticalScale(15)
      : verticalScale(8),
    borderRadius: radius(8),
  },

  tabLabel: {
    fontSize: font(11),
    fontWeight: '500',
    lineHeight: font(11)
  },

  tabLabelActive: {
    fontWeight: '700',
  },

  // Section heading
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(8),
  },

  sectionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
    flexShrink: 1,
  },

  markAllText: {
    color: "#3781C1",
    fontWeight: "600",
    fontSize: font(12),
    lineHeight: font(12)
  },

  sectionTitle: {
    fontSize: font(16),
    fontWeight: '700',
    color: '#35408E',
    lineHeight: font(16)
  },

  unreadBadge: {
    backgroundColor: '#EEF0FA',
    paddingHorizontal: scale(8),
    paddingVertical: 
      isLargeIPad || isIPad || isIPadMini
      || isFold || isAndroidTablet
      ? verticalScale(5)
      : verticalScale(2),
    borderRadius: radius(20),
  },

  unreadBadgeText: {
    fontSize: font(11),
    fontWeight: '600',
    color: '#35408E',
    lineHeight: font(11)
  },

  sectionDivider: {
    height: verticalScale(1),
    backgroundColor: '#F0F2F8',
    marginHorizontal: scale(16),
  },

  // Scroll
  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    paddingBottom: 
      isFold || isCompactAndroid
      ? verticalScale(150)
      : verticalScale(100),
    gap: scale(10)
  },

  // Notification rows
  notifRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(10),
    position: 'relative',
  },

  notifRowUnread: {
    // Subtle left highlight handled via unreadDot
  },

  notifBG: {
    borderRadius: radius(10),
    padding: scale(5),
    borderWidth: scale(0.5),
  },

  unreadDot: {
    position: 'absolute',
    left: 
      isFold || isAndroidTablet
      ? scale(9)
      : scale(7),
    top: 
      isFold
      ? "40%"
      : '50%',
    marginTop: verticalScale(-10),
    width: 
      isLargeIPad || isIPad || isIPadMini
      ? scale(5)
      : isAndroidTablet
      ? scale(6)
      : isFold
      ? scale(4)
      : scale(8),
    height: 
      isFold
      ? verticalScale(10)
      : verticalScale(8),
    zIndex: 999,
    borderRadius: radius(4),
    backgroundColor: '#35408E',
  },

  notifIcon: {
    width: 
      isLargeIPad || isIPad || isIPadMini
      || isFold 
      ? scale(30)
      : isAndroidTablet
      ? scale(35)
      : scale(44),
    height: 
      isFold
      ? verticalScale(60)
      : verticalScale(44),
    borderRadius: radius(10),
    justifyContent: 'center',
    alignItems: 'center',
  },

  notifText: {
    flex: 1,
    gap: scale(2),
  },

  notifTitle: {
    fontSize: font(13),
    fontWeight: '700',
    color: '#35408E',
    lineHeight: font(13)
  },

  notifDesc: {
    fontSize: font(12),
    color: '#52565d',
    lineHeight: spacing(17),
  },

  notifTime: {
    fontSize: font(11),
    color: '#61646a',
    marginTop: verticalScale(2),
    lineHeight: font(11)
  },

  rowDivider: {
    height: verticalScale(1),
    marginTop: verticalScale(10),
    backgroundColor: '#F0F2F8',
  },

  // Empty state
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(60),
    gap: scale(12),
  },

  emptyText: {
    fontSize: font(13),
    color: '#9BA8C0',
    fontWeight: '500',
  },
})};