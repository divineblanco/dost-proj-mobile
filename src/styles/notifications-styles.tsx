import { StyleSheet } from "react-native";
import { font, radius, scale, spacing, verticalScale } from "./responsive";

export const notificationStyles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "white"
  },

  // Tab bar
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
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
    paddingVertical: verticalScale(8),
    borderRadius: radius(8),
  },

  tabLabel: {
    fontSize: font(11),
    fontWeight: '500',
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
  },

  sectionTitle: {
    fontSize: font(16),
    fontWeight: '700',
    color: '#35408E',
  },

  unreadBadge: {
    backgroundColor: '#EEF0FA',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(2),
    borderRadius: radius(20),
  },

  unreadBadgeText: {
    fontSize: font(11),
    fontWeight: '600',
    color: '#35408E',
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
    paddingBottom: verticalScale(100),
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
    left: scale(7),
    top: '50%',
    marginTop: verticalScale(-10),
    width: scale(8),
    height: verticalScale(8),
    zIndex: 999,
    borderRadius: radius(4),
    backgroundColor: '#35408E',
  },

  notifIcon: {
    width: scale(44),
    height: verticalScale(44),
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
});