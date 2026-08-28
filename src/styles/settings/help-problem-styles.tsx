import { StyleSheet } from "react-native";
import { font, isAndroidTablet, radius, ResponsiveValues, scale, verticalScale } from "../responsive";

export function helpProblemStyles(r: ResponsiveValues) {
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
    backgroundColor: "#F8F9FD",
  },

  scrollContent: {
    paddingBottom: verticalScale(100),
  },

  inner: {
    padding: scale(20),
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
    color: "#1A1F5E",
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
    backgroundColor: "#E20000",
    borderRadius: radius(2),
  },

  // Form card
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: radius(14),
    borderWidth: scale(1.5),
    borderColor: "#E0E4F0",
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(6),
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },

  field: {
    paddingVertical: verticalScale(14),
    gap: scale(8),
  },

  fieldDivider: {
    height: verticalScale(1),
    backgroundColor: "#F0F2F8",
  },

  fieldLabel: {
    fontSize: font(15),
    fontWeight: "600",
    lineHeight: font(15),
    color: "#35408E",
    letterSpacing: 0.2,
  },

  optional: {
    fontSize: font(11),
    lineHeight: font(11),
    fontWeight: "400",
    color: "#9BA8C0",
  },

  // Text area
  textArea: {
    backgroundColor: "#F8F9FD",
    borderRadius: radius(10),
    borderWidth: scale(1.5),
    borderColor: "#E8EAF0",
    padding: scale(12),
    height: 
        isFold
        ? verticalScale(200)
        : verticalScale(130),
    fontSize: font(13),
    color: "#1A1F5E",
    lineHeight: font(20),
  },

  charCount: {
    fontSize: font(11),
    lineHeight: font(11),
    color: "#9BA8C0",
    textAlign: "right",
  },

  // File button
  fileBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
    backgroundColor: "#35408E",
    borderRadius: radius(10),
    borderWidth: scale(1.5),
    borderColor: "#E0E4F0",
    padding: scale(12),
  },

  fileIconBubble: {
    width: scale(34),
    height: verticalScale(34),
    borderRadius: radius(8),
    backgroundColor: "#EEF0FA",
    justifyContent: "center",
    alignItems: "center",
  },

  fileBtnTxt: {
    flex: 1,
    fontSize: font(13),
    lineHeight: font(13),
    color: "white",
    fontWeight: "500",
  },

  // Notice
  noticeCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: scale(8),
    backgroundColor: "#EEF0FA",
    borderRadius: radius(10),
    borderWidth: scale(1),
    borderColor: "#D1D5E8",
    padding: scale(12),
  },

  noticeTxt: {
    flex: 1,
    fontSize: font(12),
    color: "#4B5563",
    lineHeight: font(18),
  },

  // Submit button
  reportBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(8),
    backgroundColor: "#C62828",
    paddingVertical: 
        isFold
        ? verticalScale(25)
        : verticalScale(14),
    borderRadius: 10,
    shadowColor: "#C62828",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  reportBtnDisabled: {
    backgroundColor: "#E0E4F0",
    shadowOpacity: 0,
    elevation: 0,
  },

  reportBtnTxt: {
    color: "#FFFFFF",
    fontSize: font(14),
    lineHeight: font(14),
    fontWeight: "700",
  },

  reportBtnTxtDisabled: {
    color: "#9BA8C0",
  },
})};

export function problemDropdownStyles(r: ResponsiveValues) {
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
      width: "100%",
      position: "relative",
      zIndex: 999,
    },

   dropdown: {
    backgroundColor: "#F0F3FA",
    borderWidth: scale(1.5),
    borderColor: "#E8EAF0",
    borderRadius: radius(10),
    padding: scale(12),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  selectedText: {
    fontSize: font(14),
    lineHeight: font(15),
    color: "#374151",
  },

  menu: {
    top: "100%",
    left: 0,
    right: 0,
    marginTop: verticalScale(4),
    maxHeight: verticalScale(240),
    width: "100%",
    borderWidth: scale(1),
    borderColor: "#E8EAF0",
    borderRadius: radius(10),
    backgroundColor: "#FFF",
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    position: "absolute",
    zIndex: 999,
  },

  item: {
    paddingHorizontal: scale(15),
    paddingVertical: 
        isFold
        ? verticalScale(20)
        : verticalScale(14),
    borderBottomWidth: scale(1),
    borderBottomColor: "#F1F3F5",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  itemText: {
    fontSize: font(14),
    lineHeight: font(15)
  },
})};

export function terminateModalStyles(r: ResponsiveValues) {
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

    overlay: {
    flex: 1,
    backgroundColor: "rgba(15,20,60,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: 
        isLargeIPadPortrait || isIPadPortrait || isIPadMiniPortrait
        || isTallFold || isAndroidTabletPortrait
        ? "70%"
        : isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape
        || isAndroidTabletLandscape
        ? "50%"
        : isNormalFold
        ? "60%"
        : "82%",
    backgroundColor: "#FFFFFF",
    borderRadius: radius(20),
    paddingTop: verticalScale(32),
    paddingBottom: verticalScale(24),
    paddingHorizontal: scale(24),
    alignItems: "center",
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 12,
  },

  // Warning icon badge
  iconRing: {
    width: 
        isLargeIPad || isIPad || isIPadMini
        || isFold 
        ? scale(48)
        : isCompactAndroid 
        ? scale(60)
        : isAndroidTablet
        ? scale(58)
        : scale(72),
    height: 
        isTallFold
        ? verticalScale(90)
        : isNormalFold
        ? verticalScale(110)
        : verticalScale(72),
    borderRadius: radius(36),
    backgroundColor: "#f0f0ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(16),
  },

  iconInner: {
    width: 
        isLargeIPad || isIPad || isIPadMini
        || isFold 
        ? scale(35)
        : isCompactAndroid 
        ? scale(45)
        : isAndroidTablet
        ? scale(40)
        : scale(52),
    height: 
        isTallFold
        ? verticalScale(70)
        : isNormalFold
        ? verticalScale(85)
        : verticalScale(52),
    borderRadius: radius(26),
    backgroundColor: "#35408E",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  title: {
    fontSize: font(17),
    fontWeight: "700",
    color: "#1A1F5E",
    textAlign: "center",
    marginBottom: verticalScale(6),
    lineHeight: font(17)
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
    marginBottom: verticalScale(16),
  },

  location: {
    fontSize: font(12),
    color: "#9BA8C0",
    fontWeight: "500",
    lineHeight: font(12)
  },

  divider: {
    width: "100%",
    height: verticalScale(1),
    backgroundColor: "#F0F2F8",
    marginBottom: verticalScale(16),
  },

  description: {
    fontSize: font(13),
    color: "#6B7280",
    textAlign: "center",
    lineHeight: font(20),
    marginBottom: verticalScale(22),
  },

  terminateBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(7),
    width: "100%",
    backgroundColor: "#C62828",
    paddingVertical: verticalScale(13),
    borderRadius: radius(10),
    shadowColor: "#C62828",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: verticalScale(10),
  },

  terminateTxt: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: font(14),
    lineHeight: font(14)
  },

  cancelBtn: {
    width: "100%",
    paddingVertical: verticalScale(11),
    borderRadius: radius(10),
    borderWidth: scale(1.5),
    borderColor: "#D1D5E8",
    backgroundColor: "#F8F9FD",
    alignItems: "center",
  },

  cancelTxt: {
    color: "#35408E",
    fontWeight: "600",
    fontSize: font(14),
    lineHeight: font(14)
  },
})};


