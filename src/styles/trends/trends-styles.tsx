import { StyleSheet } from 'react-native';
import {
  font,
  isAndroidTablet,
  radius,
  ResponsiveValues,
  scale,
  verticalScale
} from '../responsive';
import { colors } from './trends-colors';

/**
 * Styles for the Trends page itself (app/.../trends.tsx) — header,
 * graph placeholders, legend, and the topic-breakdown section.
 *
 * Sub-components have their own styles in
 * trends-components-styles.ts:
 *   trendingTopicsStyles -> components/cards/trendtopics-box.tsx
 *   recentTableStyles    -> components/table/recent-table.tsx
 *   trendsFilterStyles   -> components/filters/trends-filter.tsx
 */
export function trendsPageStyles (r: ResponsiveValues) {
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
    backgroundColor: colors.white,
    padding: scale(5),
  },

  // centers the page content into a readable column on wide
  // screens instead of letting graphs/tables stretch edge to edge;
  // no effect on phones
  pageInner: {
    width: '100%',
    maxWidth: 
      isTablet 
      ? "100%" 
      : isFold 
      ? "100%" 
      : undefined,
    alignSelf: 'center',
  },

  scrollContent: {
    paddingBottom: isShortScreen
      ? verticalScale(120)
      : isExtraTallScreen
      ? verticalScale(115)
      : verticalScale(100),
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(10),
    position: 'relative',
    alignItems: 'center',
  },

  filterBtn: {
    zIndex: 1000,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius(5),
    padding: scale(5),
  },

  summaryContainer: {
    padding: scale(5),
  },

  graphBG: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    padding: scale(10),
    height: isShortScreen 
      ? verticalScale(200)
      : isNormalFold || isAndroidTabletLandscape || isLargeIPadLandscape
      || isIPadLandscape || isIPadMiniLandscape
      ? verticalScale(350)
      : isTallFold
      ? verticalScale(300)
      : isExtraTallScreen
      ? verticalScale(210)
      : verticalScale(180),
    gap: scale(10),
    backgroundColor: colors.bgGray,
    borderRadius: radius(12),
  },

  legendContainer: {
    marginHorizontal: 
      scale(20),
    marginTop: 
      isFold
      ? verticalScale(20)
      : verticalScale(10),
    backgroundColor: 'transparent',
  },

  legend: {
    flexDirection: 'row',
    gap: scale(10),
    padding: scale(10),
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  legendColor: {
    padding: scale(10), 
    borderRadius: 
      isFold
      ? radius(8)
      : radius(5)
  },

  legendLabel: {
    fontSize: 
      isFold
      ? font(15)
      : font(12),
    fontWeight: '500',
    lineHeight: 
      isFold
      ? font(18)
      : font(15)
  },

  titleContainer: {
    padding: scale(10),
    marginBottom: verticalScale(5),
  },

  title: {
    marginBottom: 
      isFold
      ? verticalScale(20)
      : verticalScale(10),
    gap: 
      isFold
      ? scale(3)
      : scale(1)
  },

  titleLine: {
    backgroundColor: colors.primary,
    padding: scale(0.5),
    marginHorizontal: scale(10),
    marginTop: verticalScale(1),
  },

  titleText: {
    fontSize: 
      isFold
      ? font(25)
      : font(20),
    color: colors.primary,
    fontWeight: 'bold',
    paddingVertical: verticalScale(3),
    lineHeight: 
      isFold
      ? font(25)
      : font(20)
  },

  desc: {
    lineHeight: font(11)
  }, 

  breakdownBG: {
    backgroundColor: colors.bgGray,
    width: '100%',
    padding: scale(5),
    marginBottom: verticalScale(10),
  },

  breakdownContent: {
    flexDirection: 'row',
    padding: scale(20),
    justifyContent: 
      isAndroidTabletLandscape || isLargeIPadLandscape || isIPadLandscape
      || isIPadMiniLandscape
      ? "space-around"
      : 'center',
    gap: 
      isAndroidTabletLandscape || isLargeIPadLandscape || isIPadLandscape
      || isIPadMiniLandscape
      ? scale(0)
      : scale(5),
    backgroundColor: 'transparent',
    flexWrap: 'nowrap',
  },
})};

export function viewTrendsStyles (r: ResponsiveValues) {
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
    paddingTop: verticalScale(15),
  },

  // Topic hero
  topicHero: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: scale(12),
    backgroundColor: "#FFFFFF",
    marginHorizontal: scale(16),
    borderRadius: radius(12),
    borderWidth: scale(1.5),
    borderColor: "#E0E4F0",
    padding: scale(14),
    shadowColor: "#35408E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },

  topicLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
    backgroundColor: "transparent",
    flex: 1,
  },

  trendIconBubble: {
    width: 
      isAndroidTabletPortrait || isLargeIPadLandscape
      ? scale(35)
      : scale(42),
    height: 
      isAndroidTablet 
      ? verticalScale(45)
      : isCompactAndroid || isLargeIPad || isIPad
      || isIPadMini
      ? verticalScale(55)
      : isTallFold 
      ? verticalScale(70)
      : isNormalFold
      ? verticalScale(90)
      : verticalScale(42),
    borderRadius: radius(10),
    backgroundColor: "#FFF0F0",
    justifyContent: "center",
    alignItems: "center",
  },

  topicInfo: { 
    flex: 1, 
    gap: scale(2), 
    backgroundColor: "transparent" 
  },

  topicTitleRow: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between", 
    gap: scale(8),
    backgroundColor: "transparent",
  },
  topicTitle: { 
    fontSize: font(15), 
    fontWeight: "700",
    color: "#35408E", 
    flex: 1,
    lineHeight: font(15)
  },

  topicDescription: { 
    fontSize: font(11), 
    color: "#35408E", 
    lineHeight: font(17) 
  },

  trendRise: {
    flexDirection: "row", 
    alignItems: "center",
    gap: scale(3), 
    backgroundColor: "transparent",
  },

  trendPct: { 
    fontSize: font(11), 
    color: "#2E9E3A", 
    fontWeight: "600",
    fontStyle: "italic",
    lineHeight: font(11),
    width: scale(100)
  },

  postCountPill: {
    backgroundColor: "#EEF0FA", 
    paddingHorizontal: scale(10),
    paddingVertical: 
      isAndroidTablet || isLargeIPad|| isIPad
      || isIPadMini
      ? verticalScale(5)
      : isFold
      ? verticalScale(8)
      : verticalScale(3), 
    borderRadius: radius(20),
  },
  postCountTxt: { 
    fontSize: font(11), 
    fontWeight: "600", 
    color: "#35408E",
    lineHeight: font(11) 
  },


  // Filter bar
  filterBar: {
    marginTop: 
      isNormalFold || isAndroidTabletLandscape || isLargeIPadLandscape
      || isIPadLandscape || isIPadMiniLandscape
      ? verticalScale(17)
      : verticalScale(12),
    paddingLeft: scale(16),
  },

  filterScroll: {
    gap: scale(8),
    paddingRight: scale(16),
  },

  filterTab: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(5),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(7),
    borderRadius: radius(20),
    borderWidth: scale(1.5),
    borderColor: "#E0E4F0",
    backgroundColor: "#FFFFFF",
  },

  filterLabel: {
    fontSize: font(12),
    color: "#9BA8C0",
    fontWeight: "500",
    lineHeight: font(14)
  },

  // Posts
  scroll: {
    flex: 1,
    marginTop: 
      isNormalFold || isAndroidTabletLandscape || isLargeIPadLandscape
      || isIPadLandscape || isIPadMiniLandscape
      ? verticalScale(17)
      : verticalScale(12),
  },

  scrollContent: {
    paddingHorizontal: scale(16),
    paddingBottom: 
      isCompactAndroid
      ? verticalScale(150)
      : verticalScale(100),
    gap: scale(12),
  },

  postCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: radius(12),
    borderWidth: scale(1.5),
    borderColor: "#E0E4F0",
    overflow: "hidden",
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  cardAccent: {
    height: 
      isFold || isAndroidTabletLandscape || isLargeIPad
      || isIPadLandscape || isIPadMiniLandscape
      ? verticalScale(5)
      : verticalScale(3),
    width: "100%",
  },

  cardBody: {
    padding: scale(14),
    gap: scale(10),
    backgroundColor: "transparent",
  },

  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
    backgroundColor: "transparent",
  },

  platformPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
    paddingHorizontal: scale(8),
    paddingVertical: 
      isAndroidTabletPortrait || isLargeIPad || isIPad
      || isIPadMini
      ? verticalScale(5)
      : isFold
      ? verticalScale(8)
      : verticalScale(3),
    borderRadius: radius(20),
  },

  platformLabel: {
    fontSize: font(11),
    fontWeight: "600",
    lineHeight: font(12)
  },

  postContent: {
    fontSize: font(13),
    color: "#35408E",
    lineHeight: font(20),
  },

  postFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
    backgroundColor: "transparent",
  },

  postDate: {
    fontSize: font(11),
    color: "#9BA8C0",
    lineHeight: 
      isLargeIPad || isIPad || isIPadMini
      ? font(14)
      : font(12)
  },

  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
    backgroundColor: "transparent",
  },

  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
    backgroundColor: "transparent",
  },

  statTxt: {
    fontSize: font(11),
    color: "#9BA8C0",
    fontWeight: "500",
    lineHeight: font(11)
  },
})};