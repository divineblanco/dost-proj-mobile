import { StyleSheet } from "react-native";
import { font, isAndroidTablet, radius, ResponsiveValues, scale, spacing, verticalScale } from "../responsive";

export function profileStyles (r: ResponsiveValues) {
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
    backgroundColor: "white",
    padding: scale(5),
  },
  scrollContent: {
    paddingBottom: 
      isCompactAndroid
      ? verticalScale(135)
      : isFold
      ? verticalScale(150)
      : verticalScale(95),
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
    width: 
      isCompactAndroid
      ? scale(90)
      : isFold
      ? scale(80)
      : scale(100),
    height: 
      isCompactAndroid 
      ? verticalScale(105)
      : isLargeIPad 
      ? verticalScale(155)
      : isIPad 
      ? verticalScale(145)
      : isIPadMini
      ? verticalScale(140)
      : isAndroidTablet
      ? verticalScale(135)
      : isNormalFold
      ? verticalScale(200)
      : isTallFold 
      ? verticalScale(160)
      : verticalScale(100),
    borderRadius: radius(999),
  },

  imageShadow: {
    elevation: 5,
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
    paddingVertical: 
      isFold || isLargeIPad || isIPad
      || isIPadMini || isAndroidTablet
      ? verticalScale(10)
      : verticalScale(2),
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
    fontSize: 
      isFold || isLargeIPad || isIPad
      || isIPadMini || isAndroidTablet
      ? font(12)
      : font(10),
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: font(12)
  },

  role: {
    fontSize: font(15),
    fontWeight: "600",
    lineHeight: font(15)

  },

  infoRow: {
    flexDirection: "row",
    gap: scale(5),
    alignItems: "center",
    backgroundColor: "transparent",
  },

  infoText: {
    fontSize: font(12),
    lineHeight: 
      isFold
      ? font(13)
      : font(12),
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
    width: 
      isFold || isLargeIPad || isIPad
      || isIPadMini || isAndroidTablet
      ? scale(35)
      : scale(42),
    height: 
      isFold
      ? verticalScale(65)
      : isLargeIPad || isIPad || isIPadMini
      ? verticalScale(50)
      : verticalScale(42),
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
    lineHeight: 
      isFold
      ? font(16)
      : font(14)
  },

  surveyDesc: {
    fontSize: font(11),
    color: "#6B7280",
    lineHeight: spacing(16),
  },

  chevronBtn: {
    width: scale(28),
    height: 
      isFold
      ? verticalScale(45)
      : verticalScale(28),
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
    lineHeight: font(12)
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
    width: 
      isFold || isLargeIPad || isIPad
      || isIPadMini || isAndroidTablet
      ? scale(35)
      : scale(44),
    height: 
      isFold
      ? verticalScale(60)
      : isLargeIPad || isIPad || isIPadMini
      ? verticalScale(50)
      : verticalScale(44),
    borderRadius: radius(10),
    backgroundColor: "#87868631",
    justifyContent: "center",
    alignItems: "center",
  },

  discTextCol: {
    flex: 1,
    flexShrink: 1,
    backgroundColor: "transparent",
    gap: scale(2)
  },

  itemTitle: {
    fontSize: font(15),
    fontWeight: "700",
    lineHeight: 
      isFold
      ? font(18)
      : font(15)
  },

  itemDesc: {
    fontSize: font(11),
    color: "#6B7280",
    lineHeight: 
      isFold || isLargeIPad || isIPad
      || isIPadMini || isAndroidTablet
      ? font(15)
      : font(14)
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
    lineHeight: 
      isFold || isLargeIPad || isIPad
      || isIPadMini || isAndroidTablet
      ? font(15)
      : font(14)
  },

  image: {
    width: scale(44),
    height: 
      isFold
      ? verticalScale(80)
      : verticalScale(44),
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
    lineHeight: font(12)
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
    width: 
      isFold || isLargeIPad || isIPad
      || isIPadMini || isAndroidTablet
      ? scale(35)
      : scale(44),
    height: 
      isFold
      ? verticalScale(60)
      : isLargeIPad || isIPad || isIPadMini
      ? verticalScale(50)
      : verticalScale(44),
    borderRadius: radius(10),
    backgroundColor: "#FFF4EC",
    justifyContent: "center",
    alignItems: "center",
  },

  drTextCol: {
    flex: 1,
    flexShrink: 1,
    backgroundColor: "transparent",
    gap: scale(2)
  },

  drItemTitle: {
    fontSize: font(15),
    fontWeight: "700",
    lineHeight: 
      isFold
      ? font(18)
      : font(15)
  },

  drItemDesc: {
    fontSize: font(11),
    color: "#6B7280",
    lineHeight: 
      isFold || isLargeIPad || isIPad
      || isIPadMini || isAndroidTablet
      ? font(15)
      : font(12)
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
    lineHeight: 
      isFold || isLargeIPad || isIPad
      || isIPadMini || isAndroidTablet
      ? font(15)
      : font(14)
  },

  downloadBtn: {
    width: 
      isCompactAndroid
      ? scale(35)
      : isFold || isLargeIPad || isIPad
      || isIPadMini || isAndroidTablet
      ? scale(25)
      : scale(34),
    height: 
      isCompactAndroid
      ? verticalScale(40)
      : isNormalFold
      ? verticalScale(60)
      : isTallFold
      ? verticalScale(50)
      : verticalScale(34),
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

  declineRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: verticalScale(6),
    backgroundColor: "transparent",
  },

  statDateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(6),
    backgroundColor: "transparent",
    gap: scale(6),
  },

  noDisc: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(20),
    backgroundColor: "transparent",
  },

  discLoad: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(20),
    backgroundColor: "transparent",
  },
})};