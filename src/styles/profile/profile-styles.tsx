import { StyleSheet } from "react-native";
import { font, radius, scale, spacing, verticalScale } from "../responsive";

export const profileStyles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: scale(5),
  },
  scrollContent: {
    paddingBottom: verticalScale(95),
  },

  headerContainer: {
    padding: scale(10),
  },

  settings: {
    alignSelf: "flex-end"
  },

  profileContainer: {
    flexDirection: "row", 
    justifyContent: "center",
    gap: scale(20),
    alignItems: "center"
  },

  profileImg: {
    width: scale(100),
    height: verticalScale(100),
    borderRadius: radius(999),
  },

  imageShadow: {
    elevation: 3,
    shadowColor: '#1A1F5E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    borderRadius: radius(999)
  },

  profileInfo: {
    flexDirection: "column",
    gap: scale(5),
    padding: scale(10),
    backgroundColor: "transparent",
  },

  nameRow: {
    flexDirection: "row",
    gap: scale(10),
    alignItems: "center",
    backgroundColor: "transparent",
  },

  userName: {
    fontSize: font(20),
    fontWeight: "bold",
    lineHeight: spacing(25),
  },

  levelBadge: {
    backgroundColor: "#FFB633",
    paddingVertical: verticalScale(2),
    paddingHorizontal: scale(5),
    width: scale(80),
    borderRadius: radius(15),
    elevation: 3,
    shadowColor: '#1A1F5E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    marginTop: 5
  },

  levelText: {
    fontSize: font(10),
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },

  role: {
    fontSize: font(15),
    fontWeight: "600",
  },

  infoRow: {
    flexDirection: "row",
    gap: scale(5),
    alignItems: "center",
    backgroundColor: "transparent",
  },

  infoText: {
    fontSize: font(12),
    fontWeight: "500",
    color: "#6a6a6dd6",  
  },

  moreContainer: {
    padding: scale(10),
    gap: scale(10)
  },

  logoutBtn: {
    backgroundColor: "#c91010c6",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(20),
    width: "40%",
    borderRadius: radius(8),
    alignSelf: "center",
    marginVertical: verticalScale(10),
    flexDirection: "row",
    justifyContent: "center",
    gap: scale(8),
    elevation: 8,

    // iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },

  logoutTxt: {
    fontSize: font(18),
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    lineHeight: spacing(25),
  },

  //SURVEY
  surveyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: radius(14),
    borderWidth: scale(1.5),
    borderColor: "#E0E4F0",
    padding: scale(16),
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(2),
    backgroundColor: "transparent",
  },

  sectionTitle: {
    fontSize: font(18),
    fontWeight: "bold",
    lineHeight: spacing(20)
  },

  divider: {
    height: verticalScale(1),
    backgroundColor: "#F0F2F8",
    marginBottom: verticalScale(12),
  },

  desc: {
    fontSize: font(11),
    color: "#6B7280",
    lineHeight: spacing(15),
    marginBottom: verticalScale(14),
  },

  list: {
    backgroundColor: "transparent",
  },

  surveyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
    paddingVertical: verticalScale(10),
  },

  iconBubble: {
    width: scale(42),
    height: verticalScale(42),
    borderRadius: radius(10),
    justifyContent: "center",
    alignItems: "center",
  },

  textCol: {
    flex: 1,
    gap: scale(2),
    backgroundColor: "transparent",
  },

  surveyTitle: {
    fontSize: font(14),
    fontWeight: "700",
  },

  surveyDesc: {
    fontSize: font(11),
    color: "#6B7280",
    lineHeight: spacing(16),
  },

  chevronBtn: {
    width: scale(28),
    height: verticalScale(28),
    borderRadius: radius(8),
    backgroundColor: "#F8F9FD",
    borderWidth: scale(1),
    borderColor: "#E8EAF0",
    justifyContent: "center",
    alignItems: "center",
  },

  rowDivider: {
    height: verticalScale(1),
    backgroundColor: "#F0F2F8",
  },

  //MY DISCUSSIONS
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: radius(14),
    borderWidth: scale(1.5),
    borderColor: "#E0E4F0",
    padding: scale(16),
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },

  discussionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(12),
    backgroundColor: "transparent",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  discSectionTitle: {
    fontSize: font(18),
    fontWeight: "700",
    lineHeight: spacing(25),
  },

  viewAll: {
    fontSize: font(12),
    fontWeight: "600",
  },

  discDivider: {
    height: verticalScale(1),
    backgroundColor: "#F0F2F8",
    marginBottom: verticalScale(12),
  },

  discList: {
    backgroundColor: "transparent",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(10),
    backgroundColor: "transparent",
    gap: scale(10)
  },

  contentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    gap: scale(10)
  },

  discIconBubble: {
    width: scale(44),
    height: verticalScale(44),
    borderRadius: radius(10),
    backgroundColor: "#87868631",
    justifyContent: "center",
    alignItems: "center",
  },

  discTextCol: {
    flex: 1,
    flexShrink: 1,
    backgroundColor: "transparent",
  },

  itemTitle: {
    fontSize: font(15),
    fontWeight: "700",
  },

  itemDesc: {
    fontSize: font(11),
    color: "#6B7280",
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
    backgroundColor: "transparent",
  },

  itemDate: {
    fontSize: font(11),
    color: "#9BA8C0",
  },

  image: {
    width: scale(44),
    height: verticalScale(44),
    borderRadius: radius(10)
  },

  discRowDivider: {
    height: verticalScale(1),
    backgroundColor: "#F0F2F8",
  },

  //DOWNLOADED RESOURCES
  drCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: radius(14),
    borderWidth: scale(1.5),
    borderColor: "#E0E4F0",
    padding: scale(16),
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },

  drHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(12),
    backgroundColor: "transparent",
  },

  drHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  drSectionTitle: {
    fontSize: font(18),
    fontWeight: "600",
    lineHeight: spacing(25),
  },

  drViewAll: {
    fontSize: font(12),
    fontWeight: "600",
  },

  drDivider: {
    height: verticalScale(1),
    backgroundColor: "#F0F2F8",
    marginBottom: verticalScale(12),
  },

  drList: {
    backgroundColor: "transparent",
  },

  drRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(10),
    backgroundColor: "transparent",
    gap: scale(10)
  },

  drContentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    gap: scale(10),
  },

  drIconBubble: {
    width: scale(44),
    height: verticalScale(44),
    borderRadius: radius(10),
    backgroundColor: "#FFF4EC",
    justifyContent: "center",
    alignItems: "center",
  },

  drTextCol: {
    flex: 1,
    flexShrink: 1,
    backgroundColor: "transparent",
  },

  drItemTitle: {
    fontSize: font(15),
    fontWeight: "700",
  },

  drItemDesc: {
    fontSize: font(11),
    color: "#6B7280",
  },

  drDateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
    backgroundColor: "transparent",
  },

  drItemDate: {
    fontSize: font(11),
    color: "#9BA8C0",
  },

  downloadBtn: {
    width: scale(34),
    minWidth: scale(34),
    height: verticalScale(34),
    borderRadius: radius(8),
    borderWidth: scale(1.5),
    borderColor: "#D1D5E8",
    backgroundColor: "#F8F9FD",
    justifyContent: "center",
    alignItems: "center",
  },

  drRowDivider: {
    height: verticalScale(1),
    backgroundColor: "#F0F2F8",
  },
});