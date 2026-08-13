import { StyleSheet } from "react-native";
// import { font, radius, scale, spacing, verticalScale } from "../responsive";

export const viewResourceStyles = StyleSheet.create({
    headerBlock: {
    marginBottom: 12,
    gap: 8,
    padding: 10
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 22,
  },
  pageSubtitle: {
    fontSize: 13,
    lineHeight: 15,
  },

  // Filters
  filterSortRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 16,
    gap: 8,
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    flexShrink: 1,
  },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#F1F3F9",
    borderWidth: 1,
    borderColor: "#E5E9F2",
  },
  filterChipActive: {
    backgroundColor: "#35408E",
    borderColor: "#35408E",
  },
  filterChipText: {
    fontSize: 12.5,
    fontWeight: "600",
    color: "#6B7690",
  },
  filterChipTextActive: {
    color: "#FFFFFF",
  },

  // Sort
  sortBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#35408E",
    borderWidth: 1,
    borderColor: "#D6DCF3",
  },

  // List card
  listCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E0E4F0',
    paddingVertical: 6,
    paddingHorizontal: 15,
    marginHorizontal: 10,
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
    paddingVertical: 14,
    gap: 10,
  },
  rowDivider: {
    height: 1,
    backgroundColor: "#EEF1F7",
  },

  contentContainer: {
    flexDirection: "row",
    flex: 1,
    gap: 10,
  },
  iconBubble: {
    width: 38,
    height: 38,
    borderRadius: 12,
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
    gap: 3,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2A50",
  },
  itemDesc: {
    fontSize: 12.5,
    color: "#8892A8",
    lineHeight: 17,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
    flexWrap: "wrap",
  },
  categoryPill: {
    backgroundColor: "#F1F3F9",
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  categoryPillText: {
    fontSize: 10.5,
    fontWeight: "600",
    color: "#5A6482",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  itemDate: {
    fontSize: 11,
    color: "#9BA8C0",
  },
  fileType: {
    fontSize: 10.5,
    fontWeight: "700",
    color: "#B7C0D6",
  },

  downloadBtn: {
    width: 30,
        height: 30,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: "#D1D5E8",
        backgroundColor: "#F8F9FD",
        justifyContent: "center",
        alignItems: "center",
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    gap: 10,
  },
  emptyText: {
    fontSize: 13,
    color: "#9BA8C0",
  },
});

export const viewDiscussionStyles = StyleSheet.create({
headerBlock: {
    marginBottom: 12,
    gap: 8,
    padding: 10,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 22,
  },
  pageSubtitle: {
    fontSize: 13,
    lineHeight: 15,
  },

  // Filters
filter: {
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "space-between",
  paddingHorizontal: 10,
  paddingBottom: 15,
  gap: 10,
},

filterRow: {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  flexWrap: "wrap",
  paddingHorizontal: 10,
  flex: 1,
},

filterStatus: {
  width: 35,
  height: 35,
  backgroundColor: "#35408E",
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
},

filterStatusActive: {
  backgroundColor: "#232C6B",
},

filterStatusDot: {
  position: "absolute",
  top: -3,
  right: -3,
  width: 9,
  height: 9,
  borderRadius: 5,
  backgroundColor: "#FFB633",
  borderWidth: 1.5,
  borderColor: "#FFFFFF",
},
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#F1F3F9",
    borderWidth: 1,
    borderColor: "#E5E9F2",
  },
  filterChipActive: {
    backgroundColor: "#35408E",
    borderColor: "#35408E",
  },
  filterChipText: {
    fontSize: 12.5,
    fontWeight: "600",
    color: "#6B7690",
  },
  filterChipTextActive: {
    color: "#FFFFFF",
  },

  // List card
  listCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#E0E4F0",
    paddingVertical: 6,
    paddingHorizontal: 15,
    marginHorizontal: 10,
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
    paddingVertical: 14,
    gap: 10,
  },
  rowDivider: {
    height: 1,
    backgroundColor: "#EEF1F7",
  },

  contentContainer: {
    flexDirection: "row",
    flex: 1,
    gap: 10,
  },
  iconBubble: {
    width: 38,
    height: 38,
    borderRadius: 12,
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
    gap: 3,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2A50",
  },
  itemDesc: {
    fontSize: 12.5,
    color: "#8892A8",
    lineHeight: 17,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
    flexWrap: "wrap",
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  statusPillText: {
    fontSize: 10.5,
    fontWeight: "700",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  itemDate: {
    fontSize: 11,
    color: "#9BA8C0",
  },

  thumbnail: {
    width: 44,
    height: 44,
    borderRadius: 10,
    marginTop: 2,
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    gap: 10,
  },
  emptyText: {
    fontSize: 13,
    color: "#9BA8C0",
  },
});

export const DropdownStyles = StyleSheet.create({
    modalContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },

  dropdown: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 6,

    borderWidth: 1,
    borderColor: "#E5E9F2",

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 8,

    zIndex: 9999,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  optionActive: {
    backgroundColor: "#F1F3F9",
  },

  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,

    backgroundColor: "transparent",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  optionText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#3D4560",
  },

  optionTextActive: {
    fontWeight: "700",
    color: "#1F2A50",
  },
});