import { StyleSheet } from "react-native";
import { font, radius, scale, spacing, verticalScale } from "./responsive";

export const reportStyles = StyleSheet.create({
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
  },

  search: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E4E8F0",
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(10),
    borderRadius: radius(10),
    marginHorizontal: scale(10),
    gap: scale(10),
  },

  searchInput: {
    fontSize: font(12),
    color: "#868686",
    flex: 1,
  },

  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(10),
    marginTop: verticalScale(10),
  },

  calendarButton: {
    backgroundColor: "#35408E",
    width: scale(45),
    height: verticalScale(40),
    borderRadius: radius(10),
    alignItems: "center",
    justifyContent: "center",
  },

  dateText: {
    alignSelf: "flex-end",
    marginRight: scale(10),
    marginTop: verticalScale(10),
    fontSize: font(12),
    color: "#35408E",
    fontWeight: "600",
  },

  //REPORTS CARD
  shadowWrapper: {
    borderRadius: radius(12),

    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 3 },
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
    backgroundColor: "#35408E",
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
    width: scale(44),
    height: verticalScale(44),
    borderRadius: radius(10),
    backgroundColor: "#EEF4FB",
    justifyContent: "center",
    alignItems: "center",
  },

  labelPill: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(3),
    borderRadius: radius(20),
    backgroundColor: "#E8F3FD",
  },

  labelText: {
    fontSize: font(11),
    fontWeight: "600",
    color: "#3781C1",
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
    alignItems: "flex-start",
    gap: scale(8),
  },

  title: {
    flex: 1,
    fontSize: font(14),
    fontWeight: "700",
    color: "#35408E",
    lineHeight: spacing(20),
  },

  downloadBtn: {
    width: scale(30),
    height: scale(30),
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
    color: "#4A7CA8",
    fontWeight: "500",
  },

  horizontalDivider: {
    height: verticalScale(1),
    backgroundColor: "#F0F2F8",
  },

  description: {
    fontSize: font(12),
    color: "#6B7280",
    lineHeight: spacing(18),
  },

  //CATEGORIES DROPDOWN
  container: {
    width: "85%",
    backgroundColor: "transparent",
    zIndex: 100,
  },

  dropdownButton: {
    backgroundColor: "#E4E8F0",
    padding: scale(15),
    borderRadius: radius(10),
  },

  dropdownContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent"
  },

  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },

  dropdownText: {
    fontSize: font(13),
    color: "#35408E",
  },

  dropdownMenu: {
    backgroundColor: "#E4E8F0",
    borderRadius: radius(12),
    marginTop: verticalScale(55),
    position: "absolute",
    width: "100%",
    elevation: 5,
    zIndex: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
    padding: scale(15),
    borderBottomWidth: 1,
    borderBottomColor: "#D3D7E0",
  },

  itemText: {
    fontSize: font(13),
    color: "#35408E",
  },

  activeItem: {
    backgroundColor: "#35408E",
    borderRadius: radius(10),
  },

  activeText: {
    color: "white",
    fontWeight: "bold",
  },
});