import { StyleSheet } from 'react-native';
import {
  font,
  radius,
  ResponsiveValues,
  scale,
  spacing,
  verticalScale
} from '../responsive';
import { colors } from './contribute-colors';


const capScale = (size: number, max: number) => Math.min(scale(size), max);

/* ============================================================
    SHARED CARD PRIMITIVES
    Identical between ContributionsCard and MisinformationPost.
============================================================ */

export function sharedCardStyles(r: ResponsiveValues) {
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
    
  cardAvatar: {
    width: 
      isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
      ? scale(30)
      : scale(36),
    height: 
      isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
      ? scale(30)
      : scale(36),
    borderRadius: scale(18),
    borderWidth: 1.5,
    borderColor: colors.border,
  },

  cardUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    backgroundColor: 'transparent',
  },

  cardMetaDivider: {
    width: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isAndroidTabletLandscape
      ? 3
      : isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
      ? 2
      : 1,
    height: verticalScale(12),
    backgroundColor: colors.border,
  },
})};

/* ============================================================
    CONTRIBUTIONS CARD
============================================================ */

export function contributionsCardStyles(r: ResponsiveValues) {
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

  scrollContainer: {
    gap: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape
      ? scale(18)
      : isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
      ? scale(20)
      : scale(14),
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(4),
  },

  card: {
    // caps and centers the card on wide screens instead of it
    // stretching full-bleed edge to edge
    width: '100%',
    maxWidth: 
      isTablet 
        ? "100%" 
        : isFold 
        ? "100%" 
        : undefined,
    alignSelf: isTablet || isFold ? 'center' : 'stretch',

    backgroundColor: colors.white,
    borderRadius: radius(14),
    overflow: 'visible',
    padding: 
      isIPadLandscape || isIPadMiniLandscape || isAndroidTabletLandscape
      ? scale(25)
      : isIPadPortrait 
      ? scale(20)
      : scale(15),
    gap: scale(12),
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  nameText: {
    fontSize: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isAndroidTabletLandscape
      ? font(16)
      : isNormalFold || isTallFold || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
      ? font(15)
      : font(13),
    fontWeight: '600',
    color: colors.primaryDark,
    lineHeight: font(16)
  },

  typeText: {
    fontSize: 
      isNormalFold || isTallFold || isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
      ? font(12)
      : isLargeIPadLandscape || isAndroidTabletLandscape
      ? font(13)
      : font(11),
    color: colors.muted,
    lineHeight: 
      isLargeIPadLandscape || isIPadLandscape || isAndroidTabletLandscape
      ? font(15)
      : isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
      ? font(14)
      : font(12),
    marginTop: 
      isNormalFold || isTallFold 
      ? verticalScale(10)
      : verticalScale(1),
  },

  sentimentPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(5),
    paddingHorizontal: scale(10),
    paddingVertical: 
      isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletLandscape
      ? verticalScale(10)
      : isAndroidTabletPortrait
      ? verticalScale(8)
      : isNormalFold || isTallFold ||isLargeIPadLandscape 
      ? verticalScale(15)
      : verticalScale(4),
    borderRadius: radius(20),
  },

  sentimentDot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
  },

  sentimentText: {
    fontSize: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletLandscape
      ? font(12)
      : font(11),
    fontWeight: '600',
    lineHeight: font(12)
  },

  postImage: {
    width: '100%',
    // taller on wider cards so the image doesn't look squashed
    // relative to a much wider (fold/tablet) card
    height: 
      isLargeIPadLandscape || isAndroidTabletLandscape
      ? verticalScale(395)
      : isIPadLandscape || isIPadMiniLandscape 
      ? verticalScale(350)
      : isAndroidTabletLandscape || isAndroidTabletPortrait || isLargeIPadPortrait || isIPadPortrait
      ? verticalScale(260)
      : isNormalFold || isTallFold 
      ? verticalScale(300)
      : verticalScale(180),
    borderRadius: radius(10),
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    backgroundColor: 'transparent',
  },

  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(5),
    flex: 1,
    backgroundColor: 'transparent',
  },

  metaText: {
    fontSize: 
      isNormalFold || isTallFold || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
      ? font(12)
      : isLargeIPadLandscape || isIPadLandscape || isAndroidTabletLandscape
      ? font(13)
      : font(11),
    color: colors.metaBlue,
    flex: 1,
    lineHeight: 
      isNormalFold || isTallFold || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
      ? font(13)
      : isLargeIPadLandscape || isIPadLandscape || isAndroidTabletLandscape
      ? font(15)
      : font(11)
  },

  divider: {
    height: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isAndroidTabletLandscape
      ? 3
      : isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
      ? 2
      : 1,
    backgroundColor: colors.borderLight,
  },

  postText: {
    fontSize: 
      isNormalFold || isTallFold || isIPadMiniLandscape 
      ? font(15)
      : isLargeIPadLandscape || isIPadLandscape || isIPadPortrait || isAndroidTabletLandscape
      ? font(14)
      : font(12),
    lineHeight: 
      isNormalFold || isTallFold || isLargeIPadLandscape || isIPadLandscape || isAndroidTabletLandscape
      ? spacing(20)
      : spacing(18),
    color: colors.primary,
    textAlign: 'justify',
  },
})};

/* ============================================================
    MISINFORMATION POST
============================================================ */

export function misinformationPostStyles(r: ResponsiveValues) {
    
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

  scrollContainer: {
    gap: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape
      ? scale(18)
      : isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
      ? scale(20)
      : scale(14),
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(8),
  },

  // Outer wrapper carries the shadow AND the width cap/centering;
  // inner "card" clips the image corners — kept as two layers
  // because iOS shadows and overflow:hidden don't play well on the
  // same view.
  cardShadow: {
    width: '100%',
    maxWidth: 
      isTablet 
      ? "100%" 
      : isFold 
      ? "100%" 
      : undefined,
    alignSelf: isTablet || isFold ? 'center' : 'stretch',

    borderRadius: radius(14),
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: radius(14),
    overflow: 'hidden',
  },

  alertBar: {
    height: 
      isNormalFold || isTallFold || isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletLandscape
      ? verticalScale(10)
      : isAndroidTabletPortrait
      ? verticalScale(6)
      : isLargeIPadLandscape 
      ? verticalScale(15)
      : verticalScale(4),
    backgroundColor: colors.alert,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: scale(14),
    paddingTop: 
      isNormalFold || isTallFold || isIPadLandscape || isIPadMiniLandscape 
      ? verticalScale(25)
      : isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
      ? verticalScale(20)
      : isLargeIPadLandscape || isAndroidTabletLandscape
      ? verticalScale(30)
      : verticalScale(14),
  },

  nameText: {
    fontSize: 
      isNormalFold || isTallFold || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
      ? font(15)
      : isLargeIPadLandscape || isIPadLandscape || isAndroidTabletLandscape
      ? font(16)
      : font(13),
    fontWeight: '600',
    color: colors.primaryDark,
    lineHeight: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
      ? font(18)
      : font(15),
    marginBottom: 
      isNormalFold || isTallFold 
      ? verticalScale(10)
      : isLargeIPadLandscape || isIPadLandscape || isLargeIPadPortrait || isAndroidTabletLandscape
      ? verticalScale(6)
      : verticalScale(3),
  },

  typePill: {
    alignSelf: 'flex-start',
    paddingHorizontal: scale(8),
    paddingVertical: 
      isNormalFold || isTallFold || isIPadMiniLandscape || isAndroidTabletLandscape
      ? verticalScale(8)
      : isLargeIPadPortrait || isIPadPortrait 
      ? verticalScale(6)
      : isAndroidTabletPortrait
      ? verticalScale(4)
      : isLargeIPadLandscape 
      ? verticalScale(12)
      : isIPadLandscape
      ? verticalScale(10)
      : verticalScale(2),
    borderRadius: radius(20),
  },

  typeText: {
    fontSize: 
      isNormalFold || isTallFold || isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
      ? font(11)
      : font(10),
    fontWeight: '600',
    color: colors.danger,
    lineHeight: 
      isLargeIPadLandscape || isIPadLandscape || isIPadPortrait 
      ? font(12)
      : font(11),
    letterSpacing: 0.2,
  },

  warnBadge: {
    width: 
      isLargeIPadLandscape || isLargeIPadPortrait || isIPadPortrait
      ? scale(30)
      : isAndroidTabletLandscape
      ? scale(36)
      : scale(34),
    height: 
      isLargeIPadLandscape || isLargeIPadPortrait || isIPadPortrait
      ? scale(30)
      : isAndroidTabletLandscape
      ? scale(36)
      : scale(34),
    borderRadius: scale(17),
    backgroundColor: colors.dangerBg,
    justifyContent: 'center',
    alignItems: 'center',
  },

  postImage: {
    width: '100%',
    height: 
      isLargeIPadLandscape 
      ? verticalScale(400)
      : isIPadLandscape || isIPadMiniLandscape || isAndroidTabletLandscape
      ? verticalScale(350)
      : isAndroidTabletLandscape || isAndroidTabletPortrait || isLargeIPadPortrait || isIPadPortrait
      ? verticalScale(260)
      : isNormalFold || isTallFold
      ? verticalScale(300)
      : verticalScale(180),
    marginTop: 
      isNormalFold || isTallFold || isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait 
      ? verticalScale(20)
      : isAndroidTabletPortrait
      ? verticalScale(18)
      : isLargeIPadLandscape || isAndroidTabletLandscape
      ? verticalScale(25)
      : verticalScale(12),
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    backgroundColor: 'transparent',
    paddingHorizontal: scale(14),
    paddingTop: 
      isNormalFold || isTallFold || isIPadLandscape || isIPadMiniLandscape || isAndroidTabletLandscape
      ? verticalScale(20)
      : isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
      ? verticalScale(15)
      : isLargeIPadLandscape 
      ? verticalScale(30)
      : verticalScale(12),
  },

  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(5),
    backgroundColor: 'transparent',
  },

  metaText: {
    fontSize: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
      ? font(12)
      : font(11),
    color: colors.metaBlue,
    lineHeight: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
      ? font(14)
      : font(12)
  },

  divider: {
    height: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isAndroidTabletLandscape
      ? 3
      : isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
      ? 2
      : 1,
    backgroundColor: colors.borderLight,
    marginHorizontal: scale(14),
    marginTop: 
      isNormalFold || isTallFold || isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape 
      ? verticalScale(20)
      : isLargeIPadPortrait || isIPadPortrait
      ? verticalScale(15)
      : verticalScale(12),
  },

  titleText: {
    fontSize: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isAndroidTabletLandscape
      ? font(18)
      : isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
      ? font(16)
      : isNormalFold || isTallFold 
      ? font(14)
      : font(13),
    fontWeight: '700',
    color: colors.primary,
    paddingHorizontal: scale(14),
    lineHeight: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletLandscape
      ? font(18)
      : font(14),
    paddingTop: 
      isNormalFold || isTallFold || isIPadMiniLandscape 
      ? verticalScale(20)
      : isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
      ? verticalScale(15)
      : isLargeIPadLandscape || isIPadLandscape || isAndroidTabletLandscape
      ? verticalScale(25)
      : verticalScale(12),
  },

  postText: {
    fontSize: 
      isNormalFold || isTallFold || isIPadMiniLandscape || isIPadPortrait
      ? font(13)
      : isLargeIPadLandscape || isIPadLandscape || isAndroidTabletLandscape
      ? font(13.5)
      : font(12),
    lineHeight: 
      isNormalFold || isTallFold || isIPadMiniLandscape || isIPadPortrait || isAndroidTabletLandscape
      ? spacing(20)
      : spacing(18),
    color: colors.primary,
    paddingHorizontal: scale(14),
    paddingBottom: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isAndroidTabletLandscape
      ? verticalScale(30)
      : isNormalFold || isTallFold || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
      ? verticalScale(20)
      : verticalScale(14),
  },

  titlePostWrap: {
    gap: scale(4),
    backgroundColor: 'transparent',
  },
})};

/* ============================================================
    CONTRIBUTE SUCCESS MODAL
============================================================ */

export function contributeSuccessStyles(r: ResponsiveValues) {
    
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
    backgroundColor: 'rgba(15, 20, 60, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    // narrower percentage + a hard cap as the screen widens, same
    // problem/fix as the auth modals: 82% of a tablet is still huge
    width: "100%",
    maxWidth: 
      isTablet 
      ? '50%' 
      :  isFold 
      ? '65%' 
      : '82%',
    backgroundColor: colors.white,
    borderRadius: radius(20),
    paddingTop: verticalScale(36),
    paddingBottom: verticalScale(28),
    paddingHorizontal: scale(28),
    alignItems: 'center',
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 12,
  },

  iconRing: {
    width: capScale(88, 108),
    height: capScale(88, 108),
    borderRadius: capScale(44, 54),
    backgroundColor: colors.blueBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },

  iconInner: {
    width: capScale(64, 80),
    height: capScale(64, 80),
    borderRadius: capScale(32, 40),
    backgroundColor: colors.successStrong,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.successStrong,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  title: {
    fontSize: font(20),
    fontWeight: '700',
    color: colors.primaryDark,
    textAlign: 'center',
    marginBottom: verticalScale(8),
    lineHeight: spacing(20),
  },

  message: {
    fontSize: font(13),
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: spacing(20),
  },

  divider: {
    width: '100%',
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: verticalScale(22),
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(8),
    backgroundColor: colors.primary,
    paddingHorizontal: scale(32),
    paddingVertical: 
      isFold
      ? verticalScale(20)
      : verticalScale(13),
    borderRadius: radius(10),
    width: '100%',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 5,
  },

  buttonText: {
    color: colors.white,
    fontSize: font(14),
    fontWeight: '700',
    lineHeight: font(15)
  },
})};

/* ============================================================
    CONTRIBUTIONS / MISINFORMATION FILTER PANEL
    (components/filters/contributions-filter.tsx and
    components/filters/misinformation-filter.tsx)

    These two components' stylesheets are ~95% identical (close
    button, filterContainer, optionContent, optionBG,
    optionChoices, buttonApply, dropdownList, dropdownItem,
    dropdownChoice, scrollContent, scroller, calendar all match) —
    one shared "filter*" set below, used by both components.

    filterDropdown's only real difference between the two is width:
    93% (Contributions) vs 65% (Misinformation) — composed via
    filterDropdownWide / filterDropdownNarrow, e.g.
    style={[styles.filterDropdown, styles.filterDropdownWide]}
============================================================ */

export function sharedFilterStyles(r: ResponsiveValues) {
    
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

  filterCloseButton: {
    position: 'absolute',
    top: verticalScale(8),
    right: scale(12),
    zIndex: 1,
  },

  filterDropdown: {
    position: 'absolute',
    top: 
      isNormalFold || isIPadMiniLandscape || isAndroidTabletLandscape
      ? verticalScale(0)
      : isLargeIPadPortrait || isIPadPortrait || isIPadMiniPortrait
      ? verticalScale(85)
      : isTallFold 
      ? verticalScale(40)
      : isLargeIPadLandscape
      ? verticalScale(30)
      : isIPadLandscape
      ? verticalScale(5)
      : isAndroidTabletPortrait
      ? verticalScale(75)
      : isShortScreen 
      ? verticalScale(70)
      : verticalScale(60),
    marginHorizontal: 
      scale(10),
    backgroundColor: colors.primary,
    borderRadius: radius(10),
    padding: scale(8),
    // keeps the panel from getting absurdly wide on large tablets,
    // on top of whatever percentage width the Wide/Narrow variant
    // below applies
    maxWidth: 
      isIPadLandscape || isAndroidTabletLandscape
      ? "80%"
      : isTablet || isFold 
      ? "100%" 
      : undefined,
    alignSelf: 
      isTablet || isFold
      ? "center" 
      : undefined,
    // left: 
    //   isTablet || isFold 
    //   ? scale(0) 
    //   : undefined,
    // right: 
    //   isTablet || isFold 
    //   ? scale(0) 
    //   : scale(5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 999,
  },

  filterDropdownWide: {
    width: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape 
      ? "85%"
      : isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
      ? "90%"
      : '95%',
  },

  filterContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: 'transparent',
    padding: scale(15),
  },

  filterOptionContainer: {
    backgroundColor: 'transparent',
    marginTop: verticalScale(10),
    padding: 
      isLargeIPadLandscape 
      ? scale(10)
      : isIPadMiniLandscape 
      ? scale(20)
      : scale(15),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    rowGap: verticalScale(16),
  },

  // one grid cell: label + its dropdown box. Fixed at ~47% so two
  // always sit side by side with a small gutter between them,
  // regardless of the dropdown panel's overall width.
  filterOptionContent: {
    backgroundColor: 'transparent',
    width: '47%',
    gap: scale(8),
  },

  // opt-in override: apply alongside filterOptionContent to stack
  // a field into a full row instead of the 2-up grid (e.g. an odd
  // 3rd field, or a narrow panel with a long label)
  filterOptionContentFull: {
    width: '100%',
  },

  filterOptionBG: {
    backgroundColor: colors.white,
    padding: scale(10),
    width: '100%',
    borderRadius: radius(8),
  },

  filterOptionChoices: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },

  filterButtonApply: {
    backgroundColor: colors.accentYellow,
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 
      isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait || isLargeIPadLandscape || isAndroidTabletLandscape
      ? verticalScale(60)
      : isNormalFold || isTallFold 
      ? verticalScale(90)
      : verticalScale(50),
    borderRadius: radius(13),
    elevation: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: '#000',
  },

  filterDropdownList: {
    position: 'absolute',
    top: '100%',
    left: scale(0),
    right: scale(0),
    marginTop: 
      isIPadMiniLandscape || isIPadLandscape || isIPadPortrait || isLargeIPadLandscape 
      ? verticalScale(35)
      : isLargeIPadPortrait 
      ? verticalScale(40)
      : isAndroidTabletPortrait || isAndroidTabletLandscape
      ? verticalScale(30)
      : isNormalFold || isTallFold 
      ? verticalScale(55)
      : verticalScale(25),
    backgroundColor: '#FFF',
    borderRadius: radius(8),
    paddingVertical: scale(8),
    paddingLeft: scale(7),
    // more room to show options on taller screens instead of a
    // flat cap that wastes available space
    maxHeight:
      isTallScreen || isExtraTallScreen
        ? verticalScale(205)
        : verticalScale(150),
    elevation: 5,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  filterDropdownItem: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(5),
  },

  filterDropdownChoice: {
    paddingHorizontal: scale(1),
  },

  filterDropdownAnchor: {},

  filterScrollContent: {
    paddingBottom: verticalScale(20),
  },

  filterScroller: {
    position: 'relative',
  },

  calendar: {
    backgroundColor: "white",
    borderRadius: radius(8),
    padding: scale(5),
    marginTop: 
      isLargeIPadLandscape 
      ? verticalScale(145)
      : isIPadMiniPortrait || isIPadMiniLandscape
      ? verticalScale(75)
      : isIPadPortrait 
      ? verticalScale(80)
      : isIPadLandscape || isLargeIPadPortrait
      ? verticalScale(85)
      : verticalScale(60),
    
    width: "100%",
    zIndex: 999,
    position: "absolute",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: "#000",
    maxHeight:
      isTallScreen || isExtraTallScreen
        ? verticalScale(260)
        : verticalScale(200),
  },
})};