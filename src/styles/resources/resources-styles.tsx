import { StyleSheet } from 'react-native';
import {
  font,
  radius,
  ResponsiveValues,
  scale,
  verticalScale
} from '../responsive';
import { colors } from "./resources-color";

/* ============================================================
    RESOURCES LIST PAGE
============================================================ */

export function resourcesPageStyles (r: ResponsiveValues) {
    
  const {
      isCompactAndroid,
      isAndroidTablet,
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
  // screens instead of letting the search bar/cards/pagination
  // stretch edge to edge; no effect on phones
  pageInner: {
    width: '100%',
    maxWidth: isTablet ? "100%" : isFold ? 760 : undefined,
    alignSelf: 'center',
  },

  scrollContent: {
    paddingBottom: isShortScreen
      ? verticalScale(115)
      : isExtraTallScreen
      ? verticalScale(120)
      : verticalScale(95),
  },

  headerContainer: {
    padding: 
      isFold
      ? scale(5)
      : scale(10),
    gap: scale(5),
    marginBottom:
      isFold
      ? verticalScale(10)
      : verticalScale(2)
  },

  headerTitle: {
    textAlign: 'left',
  },

  headerTxt: {
    fontSize: font(12),
    fontWeight: '400',
    lineHeight: font(15)
  },

  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgGray,
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(10),
    borderRadius: radius(10),
    marginHorizontal: 
      isFold
      ? scale(5)
      : scale(10),
    gap: scale(10),
  },

  searchInput: {
    fontSize: 
      isFold
      ? font(14)
      : font(12),
    color: colors.placeholder,
    flex: 1,
  },

  filterRow: {
    paddingHorizontal: 
      isFold
      ? scale(5)
      : scale(10),
    marginTop: verticalScale(10),
    marginBottom: 
      isAndroidTablet || isLargeIPadPortrait || isIPadPortrait 
      || isIPadMiniPortrait
      ? verticalScale(10)
      : isIPadMiniLandscape || isIPadLandscape || isLargeIPadLandscape
      ? verticalScale(15)
      : isFold
      ? verticalScale(20)
      : verticalScale(5),
    flexDirection: "row",
    gap: scale(5)
  },

   resultsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(15),
    backgroundColor: "transparent",
  },

  resultsTxt: {
    fontSize: font(12),
    color: "#9BA8C0",
    fontWeight: "500",
    lineHeight: font(14)
  },

  resultsBadge: {
    color: "#35408E",
    fontWeight: "700",
  },

  clearTxt: {
    fontSize: font(12),
    color: "#35408E",
    fontWeight: "600",
    textDecorationLine: "underline",
    lineHeight: font(14)
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(18),
    gap: scale(18),
    backgroundColor: 'transparent',
  },

  paginationTxt: {
    fontSize: font(14),
    fontWeight: '700',
    color: colors.primary,
    lineHeight: font(15)
  },

  extContainer: {
    padding: scale(10),
    marginBottom: verticalScale(10),
  },

  extTitle: {
    fontSize: font(20),
    fontWeight: 'bold',
    lineHeight: font(24),
  },
})};

/* ============================================================
    RESOURCE DETAILS PAGE
============================================================ */

export function resourceDetailsStyles (r: ResponsiveValues) {
    
  const {
      isCompactAndroid,
      isAndroidTablet,
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
    flex: 1,
    backgroundColor: colors.white,
  },

  content: {
    width: '100%',
    // readable, centered column on wide screens instead of the
    // article text stretching edge to edge
    maxWidth: 
      isTablet 
      ? "100%" 
      : isFold 
      ? "100%" 
      : undefined,
    alignSelf: 'center',
    padding: scale(20),
    paddingTop: 
      isFold
      ? verticalScale(50)
      : verticalScale(15),
  },

  pillContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "flex-start"
  },

  accentBar: {
    height: 
      isFold
      ? verticalScale(10)
      : verticalScale(4),
    borderRadius: 999,
    marginBottom: 
      isFold
      ? verticalScale(25)
      : verticalScale(18),
  },

  labelPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: scale(12),
    paddingVertical: 
      isFold
      ? verticalScale(15)
      : isLargeIPadPortrait || isIPadPortrait || isIPadMiniPortrait
      ? verticalScale(8)
      : isAndroidTablet || isIPadMiniLandscape || isIPadLandscape 
      || isLargeIPadLandscape
      ? verticalScale(10)
      : verticalScale(4),
    borderRadius: radius(20),
    marginBottom: verticalScale(10),
  },

  labelText: {
    fontSize: font(14),
    fontWeight: '600',
    letterSpacing: scale(0.3),
    lineHeight: font(15)
  },

  title: {
    fontSize: font(24),
    fontWeight: '700',
    color: colors.primaryDark,
    lineHeight: font(32),
    marginBottom: verticalScale(8),
  },

  description: {
    fontSize: font(15),
    color: colors.textMuted,
    lineHeight: font(22),
  },

  divider: {
    height: verticalScale(1),
    backgroundColor: colors.borderLight,
    marginVertical: verticalScale(20),
  },

  contentText: {
    fontSize: font(15),
    lineHeight: font(26),
    color: colors.textBody,
  },

  updateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(5),
    marginTop: verticalScale(20),
    backgroundColor: 'transparent',
  },

  updateText: {
    fontSize: font(12),
    color: colors.muted,
    fontWeight: '500',
    lineHeight: font(13)
  },

  buttonRow: {
    flexDirection: 'row',
    gap: scale(10),
    marginTop: verticalScale(24),
    backgroundColor: 'transparent',
  },

  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(6),
    paddingVertical: 
      isFold
      ? verticalScale(25)
      : isAndroidTabletLandscape || isIPad || isIPadMini
      || isLargeIPadLandscape
      ? verticalScale(15)
      : verticalScale(11),
    borderRadius: radius(8),
    borderWidth: scale(1.5),
    borderColor: colors.border,
    backgroundColor: colors.bgLight,
  },

  actionBtnText: {
    fontSize: font(14),
    fontWeight: '600',
    color: colors.primary,
    lineHeight: font(15)
  },
})};