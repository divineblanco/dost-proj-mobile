import { StyleSheet } from 'react-native';
import {
  font,
  radius,
  ResponsiveValues,
  scale,
  verticalScale
} from '../responsive';
import { colors } from './rewards-colors';

/**
 * Styles for the Rewards page itself (app/.../rewards.tsx), which
 * includes the page chrome plus the inline "My Community Points"
 * card. The four sub-components (BadgeCard, EarnPointsCard,
 * Leaderboard, LeaderboardDropdown) have their own styles in
 * rewards-components-styles.ts.
 */
export function rewardsPageStyles (r: ResponsiveValues) {
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
  // screens instead of letting the cards stretch edge to edge;
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
      ? verticalScale(130)
      : isExtraTallScreen
      ? verticalScale(120)
      : isNormalScreen
      ? verticalScale(125)
      : verticalScale(95),
  },

  headerContainer: {
    padding: scale(10),
  },

  rewardsContainer: {
    padding: scale(10),
    gap: scale(10),
  },

  card: {
    backgroundColor: colors.white,
    padding: 
      isAndroidTabletLandscape || isLargeIPadLandscape || isIPadLandscape
      || isIPadMiniLandscape
      ? scale(20)
      : scale(15),
    borderRadius: radius(8),
    borderWidth: scale(2),
    borderColor: colors.border,
    elevation: 2,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  pointsTitle: {
    fontSize: font(18),
    fontWeight: '600',
    lineHeight: font(22),
  },

  horizontalDivider: {
    backgroundColor: colors.divider,
    padding: scale(0.5),
    width: '100%',
    marginVertical: 
      isFold
      ? verticalScale(20)
      : isAndroidTabletLandscape || isLargeIPadLandscape || isIPadLandscape
      || isIPadMiniLandscape
      ? verticalScale(15)
      : verticalScale(8),
  },

  pointsContent: {
    flexDirection: 'row',
    gap: 
      isFold 
      ? scale(10)
      : scale(5),
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  pointsColumn: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    gap: scale(2),
  },

  points: {
    fontSize: 
      isAndroidTabletLandscape
      ? font(35)
      : isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape
      ? font(25)
      : font(19),
    fontWeight: '600',
    lineHeight: 
      isAndroidTabletLandscape
      ? font(35)
      : font(25),
  },

  totalTxt: {
    fontSize: 
      isFold || isLargeIPadLandscape || isIPadLandscape
      || isIPadMiniLandscape
      ? font(15)
      : isAndroidTabletLandscape 
      ? font(20)
      : font(14),
    fontWeight: '500',
    lineHeight: 
      isAndroidTabletLandscape
      ? font(20)
      : font(15)
  },

  rankColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    gap: scale(2),
  },

  rank: {
    fontSize: 
      isFold || isLargeIPadLandscape || isIPadLandscape
      || isIPadMiniLandscape
      ? font(15)
      : isAndroidTabletLandscape 
      ? font(20)
      : font(14),
    fontWeight: '400',
    lineHeight: 
      isAndroidTabletLandscape
      ? font(20)
      : font(15)
  },

  rankNo: {
    fontSize: 
      isFold
      ? font(20)
      : isAndroidTabletLandscape
      ? font(30)
      : isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape
      ? font(25)
      : font(18),
    fontWeight: '600',
    lineHeight: 
      isAndroidTabletLandscape
      ? font(30)
      : font(25),
  },

  month: {
    fontSize: 
      isFold || isLargeIPadLandscape || isIPadLandscape
      || isIPadMiniLandscape
      ? font(15)
      : isAndroidTabletLandscape
      ? font(20)
      : font(14),
    fontWeight: '500',
    lineHeight: 
      isAndroidTabletLandscape
      ? font(20)
      : font(15)
  },

  verticalDivider: {
    backgroundColor: colors.divider,
    padding: scale(0.5),
    height: '80%',
    marginHorizontal: scale(40),
  },

  progressTrack: {
    width: '100%',
    height: 
      isFold
      ? verticalScale(30)
      : isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape
      ? verticalScale(20)
      : isAndroidTabletLandscape 
      ? verticalScale(25)
      : verticalScale(15),
    backgroundColor: colors.trackBg,
    borderRadius: radius(999),
    overflow: 'hidden',
    marginVertical: 
      isFold
      ? verticalScale(25)
      : verticalScale(12),
  },

  progressFill: {
    width: '60%',
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radius(999),
  },

  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },

  level: {
    color: colors.levelGray,
    lineHeight: font(15)
  },
})};