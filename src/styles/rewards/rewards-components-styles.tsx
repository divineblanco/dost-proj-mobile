import { StyleSheet } from 'react-native';
import {
  font,
  isAndroidTablet,
  radius,
  ResponsiveValues,
  scale,
  verticalScale
} from '../responsive';
import { colors } from './rewards-colors';

/**
 * Styles for the Rewards flow's sub-components:
 *
 *   badgeCardStyles           -> components/cards/badge-card.tsx
 *   earnPointsStyles          -> components/cards/earn-points.tsx
 *   leaderboardStyles         -> components/cards/leaderboard.tsx
 *   leaderboardDropdownStyles -> components/dropdown/leaderboard-dropdown.tsx
 *
 * Page-level styles live in rewards-page-styles.ts.
 */

// scale() grows linearly with device width forever, which is fine
// for phones but oversizes small fixed-size UI (badge icon circle,
// avatar) on fold/tablet-class screens.
const capScale = (size: number, max: number) => Math.min(scale(size), max);

/* ============================================================
    BADGE CARD
============================================================ */

export function badgeCardStyles (r: ResponsiveValues) {
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

  badgeCard: {
    backgroundColor: colors.white,
    padding: scale(15),
    borderRadius: radius(8),
    borderWidth: scale(2),
    borderColor: colors.border,
    elevation: 2,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  sectionTitle: {
    fontSize: font(18),
    fontWeight: '600',
    paddingVertical: 
        isFold
        ? verticalScale(10)
        : verticalScale(5),
    marginBottom: verticalScale(10),
    lineHeight: font(22),
  },

  view: {
    fontSize: font(12),
    fontWeight: '600',
    lineHeight: font(12)
  },

  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },

  badgeItem: {
    flex: 1,
    alignItems: 'center',
    borderRadius: radius(12),
    paddingVertical: 
        isFold
        ? verticalScale(10)
        : verticalScale(5),
    paddingHorizontal: scale(8),
    marginHorizontal: scale(4),
  },

  badgeIconContainer: {
    width: 
        isFold || isAndroidTabletPortrait || isLargeIPad
        || isIPadLandscape
        ? capScale(70, 85)
        : isAndroidTabletLandscape
        ? capScale(90, 95)
        : capScale(56, 72),
    height: 
        isFold || isAndroidTablet || isLargeIPad
        || isIPadLandscape
        ? capScale(70, 85)
        : isAndroidTabletLandscape
        ? capScale(90, 95)
        : capScale(56, 72),
    borderRadius: 
        isFold || isAndroidTabletPortrait || isLargeIPad
        || isIPadLandscape
        ? capScale(30, 40)
        : isAndroidTabletLandscape
        ? capScale(40, 50)
        : capScale(28, 36),
    backgroundColor: colors.badgeBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 
        isFold
        ? verticalScale(20)
        : verticalScale(10),
  },

  badgeLabel: {
    fontSize: 
        isFold || isAndroidTablet || isLargeIPadLandscape
        || isIPadLandscape
        ? font(15)
        : isIPadMiniLandscape
        ? font(14)
        : font(12),
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: font(16),
  },
})};

/* ============================================================
    EARN POINTS
============================================================ */

export function earnPointsStyles (r: ResponsiveValues) {
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

  earnCard: {
    backgroundColor: colors.white,
    padding: scale(15),
    borderRadius: radius(8),
    borderWidth: scale(2),
    borderColor: colors.border,
    elevation: 2,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    gap: scale(8),
  },

  title: {
    fontSize: 
        isFold
        ? font(18)
        : font(18),
    fontWeight: '600',
    marginVertical: verticalScale(5),
    lineHeight: font(18)
  },

  rewardItem: {
    backgroundColor: colors.rewardItemBg,
    padding: scale(12),
    borderRadius: radius(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    backgroundColor: 'transparent',
  },

  label: {
    fontSize: 
        isFold || isAndroidTabletLandscape || isLargeIPadLandscape
        || isIPadLandscape 
        ? font(16)
        : isIPadMiniLandscape
        ? font(15)
        : font(14),
    fontWeight: '500',
    lineHeight: font(16)
  },

  earnPoints: {
    fontSize: 
        isFold
        ? font(15)
        : font(14),
    fontWeight: '700',
    color: colors.primary,
    lineHeight: font(18)
  },
})};

/* ============================================================
    LEADERBOARD
============================================================ */

export function leaderboardStyles(r: ResponsiveValues) {
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

  leaderCard: {
    backgroundColor: colors.white,
    padding: scale(15),
    borderRadius: radius(8),
    borderWidth: scale(2),
    borderColor: colors.border,
    elevation: 2,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    gap: scale(8),
  },

  // shared with EarnPointsCard's "How to Earn Points" heading —
  // duplicated here (rather than imported cross-file) so this
  // component's styles stay fully self-contained
  title: {
    fontSize: 
        isFold
        ? font(18)
        : font(18),
    fontWeight: '600',
    marginVertical: verticalScale(5),
    lineHeight: font(18)
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 
        isFold
        ? verticalScale(10)
        : verticalScale(5),
  },

//   leaderTitle: {
//     fontSize: font(18),
//     fontWeight: '600',
//   },

  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },

  filterText: {
    fontSize: 
        isFold
        ? font(15)
        : font(13),
    color: colors.textMuted,
  },

  leaderboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 
        isFold
        ? verticalScale(10)
        : verticalScale(5),
    paddingHorizontal: scale(8),
    borderRadius: radius(8),
  },

  currentUserRow: {
    backgroundColor: colors.rewardItemBg,
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    backgroundColor: 'transparent',
  },

  // NOTE: the component previously used the Rewards page's generic
  // `rank` style here (fontSize 14, regular weight, no fixed
  // width) instead of this purpose-built one — `leaderRank` was
  // defined in the original stylesheet but never actually wired up
  // anywhere. Using it now gives the rank number the bold, fixed
  // width it needs to line up cleanly across rows.
  leaderRank: {
    width: scale(25),
    fontSize: 
        isFold
        ? font(18)
        : font(16),
    fontWeight: '700',
    color: colors.primaryDark,
    lineHeight: font(18)
  },

  avatar: {
    width: 
        isFold || isAndroidTabletPortrait || isIPadMiniPortrait
        || isIPadPortrait || isLargeIPadPortrait  || isIPadMiniLandscape
        ? capScale(50, 60)
        : isAndroidTabletLandscape || isLargeIPadLandscape || isIPadLandscape
        ? capScale(60, 70)
        : capScale(34, 44),
    height: 
        isFold || isAndroidTabletPortrait || isIPadMiniPortrait
        || isIPadPortrait || isLargeIPadPortrait || isIPadMiniLandscape
        ? capScale(50, 60)
        : isAndroidTabletLandscape || isLargeIPadLandscape || isIPadLandscape
        ? capScale(60, 70)
        : capScale(34, 44),
    borderRadius: 
        isFold || isAndroidTabletPortrait || isIPadMiniPortrait
        || isIPadPortrait || isLargeIPadPortrait || isIPadMiniLandscape
        ? capScale(20, 30)
        : isAndroidTabletLandscape || isLargeIPadLandscape|| isIPadLandscape
        ? capScale(30, 40)
        : capScale(17, 22),
    borderWidth: scale(0.5),
    borderColor: colors.avatarBorder,
  },

  userName: {
    fontSize: 
        isFold || isAndroidTabletPortrait || isIPadMiniPortrait
        || isIPadPortrait || isLargeIPadPortrait || isIPadMiniLandscape
        ? font(16)
        : isAndroidTabletLandscape || isLargeIPadLandscape || isIPadLandscape
        ? font(18)
        : font(15),
    fontWeight: '500',
    lineHeight: 
      isLargeIPadLandscape || isAndroidTabletLandscape || isIPadLandscape
      ? font(18)
      : font(16)
  },

  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    backgroundColor: 'transparent',
  },

  userPoints: {
    fontSize: 
        isFold || isAndroidTabletPortrait || isLargeIPadLandscape
        || isIPadLandscape || isIPadMiniLandscape
        ? font(15)
        : isAndroidTabletLandscape 
        ? font(18)
        : font(14),
    fontWeight: '500',
    lineHeight: 
        isFold || isAndroidTablet
        ? font(18)
        : font(15)
  },
})};

/* ============================================================
    LEADERBOARD DROPDOWN
============================================================ */

export function leaderboardDropdownStyles (r: ResponsiveValues) {
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

  filterContainer: {
    position: 'relative',
    backgroundColor: 'transparent',
  },

  LfilterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    gap: scale(4),
    paddingHorizontal: 
        isFold
        ? verticalScale(20)
        : verticalScale(10),
    paddingVertical: 
        isFold 
        ? verticalScale(10)
        : verticalScale(6),
    borderRadius: radius(8),
    backgroundColor: colors.filterBg,
  },

  LfilterText: {
    fontSize: font(13),
    color: colors.primaryDark,
    fontWeight: '500',
    lineHeight: font(13)
  },

  dropdown: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderRadius: radius(10),
    borderWidth: scale(1),
    borderColor: colors.border,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    zIndex: 100,
    overflow: 'visible',
  },

  dropdownItem: {
    paddingVertical: 
        isFold 
        ? verticalScale(20)
        : verticalScale(10),
    paddingHorizontal: scale(12),
  },

  activeDropdownItem: {
    backgroundColor: colors.badgeBg,
  },

  dropdownText: {
    fontSize: font(13),
    color: colors.textBody,
    lineHeight: font(13)
  },

  activeDropdownText: {
    color: colors.primary,
    fontWeight: '600',
  },
})};