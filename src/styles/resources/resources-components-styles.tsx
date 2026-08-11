import { StyleSheet } from 'react-native';
import {
  font,
  isExtraTallScreen,
  isTallScreen,
  radius,
  ResponsiveValues,
  scale,
  spacing,
  verticalScale
} from '../responsive';
import { colors } from './resources-color';

/**
 * Styles for the Resources flow's sub-components:
 *
 *   resourcesCardStyles     -> components/cards/resources-card.tsx
 *   externalResourcesStyles -> components/cards/external-resources.tsx
 *   resourcesDropdownStyles -> components/dropdown/resources-dropdown.tsx
 *
 * Page-level styles (the resources list and resource-details
 * screens) live in resources-page-styles.ts.
 */

// scale() grows linearly with device width forever, which is fine
// for phones but oversizes small fixed-size UI (the card's icon
// badge) on fold/tablet-class screens.
const capScale = (size: number, max: number) => Math.min(scale(size), max);

/* ============================================================
    RESOURCES CARD
============================================================ */

export function resourcesCardStyles (r: ResponsiveValues) {
    
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
    gap: scale(14),
    paddingVertical: 
        isFold
        ? verticalScale(5)
        : verticalScale(4),
    paddingHorizontal: 
        isFold
        ? scale(0.5)
        : scale(5),
  },

  cardShadow: {
    borderRadius: radius(12),
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: verticalScale(4) },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    backgroundColor: 'transparent',
  },

  card: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: radius(12),
    overflow: 'hidden',
  },

  cardAccentBar: {
    width: scale(4),
  },

  cardContent: {
    flex: 1,
    padding: scale(16),
    gap: 
        isFold
        ? scale(10)
        : scale(8),
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  iconContainer: {
    width: 
        isFold
        ? capScale(45, 55)
        : isLargeIPadPortrait || isIPadPortrait
        ? capScale(50, 62)
        : capScale(40, 52),
    height: 
        isFold
        ? capScale(45, 55)
        : isLargeIPadPortrait || isIPadPortrait
        ? capScale(50, 62)
        : capScale(40, 52),
    borderRadius: radius(10),
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardlabelPill: {
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(4),
    borderRadius: radius(20),
    justifyContent: 'center',
  },

  cardlabelText: {
    fontSize: font(11),
    fontWeight: '600',
    lineHeight: font(13)
  },

  cardtitle: {
    fontSize: 
        isFold
        ? font(18)
        : font(16),
    fontWeight: '700',
    color: colors.primary,
    lineHeight: font(18)
  },

  carddescription: {
    fontSize: 
        isFold
        ? font(15)
        : font(13),
    color: colors.textGray,
    lineHeight: font(15)
  },

  carddivider: {
    height: verticalScale(1),
    backgroundColor: colors.borderLight,
  },

  cardbuttonRow: {
    flexDirection: 'row',
    gap: scale(10),
  },

  readMoreBtn: {
    paddingHorizontal: scale(18),
    paddingVertical: 
        isFold
        ? verticalScale(20)
        : verticalScale(8),
    borderRadius: radius(6),
    justifyContent: "center"
  },

  readMoreText: {
    color: colors.white,
    fontWeight: '600',
    lineHeight: font(14)
  },

  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(5),
    paddingHorizontal: scale(14),
    paddingVertical: 
        isFold
        ? verticalScale(20)
        : verticalScale(8),
    borderRadius: radius(6),
    borderWidth: scale(1),
    borderColor: colors.border,
  },

  downloadText: {
    color: colors.primary,
    fontWeight: '600',
    lineHeight: font(14)
  },
})};

/* ============================================================
    EXTERNAL RESOURCES
============================================================ */

export function externalResourcesStyles (r: ResponsiveValues) {
    
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

  // was an inline, unscaled `{ gap: 5, padding: 5 }` object in the
  // component before
  scrollContent: {
    gap: scale(5),
    padding: 
        isFold
        ? scale(2)
        : scale(5),
  },

  extcard: {
    backgroundColor: colors.white,
    padding: scale(15),
    marginTop: 
        isFold
        ? verticalScale(15)
        : verticalScale(10),
    borderRadius: radius(7),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },

  iconBox: {
    padding: scale(10),
    borderRadius: radius(10),
  },

  textContainer: {
    flex: 1,
    marginLeft: scale(10),
    backgroundColor: 'transparent',
  },

  sourceTitle: {
    fontSize: 
        isFold
        ? font(20)
        : font(16),
    fontWeight: '600',
    lineHeight: font(20)
  },

  extdescription: {
    fontSize: 
        isFold
        ? font(12)
        : font(11.5),
    fontWeight: '400',
    marginTop: verticalScale(3),
    lineHeight: 
        isFold
        ? spacing(18)
        : spacing(15)
  },
})};

/* ============================================================
    RESOURCES DROPDOWN
============================================================ */

export function resourcesDropdownStyles (r: ResponsiveValues) {
    
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

  // NOTE: the component reads this as `styles.container`. The
  // original combined stylesheet only defined `dropcontainer`,
  // which meant `styles.container` was silently falling through to
  // the *ResourceDetails* screen's `container` (a full-screen white
  // background) instead of this dropdown's own wrapper — harmless
  // by luck since neither has visible layout side effects here, but
  // still the wrong style object. Naming it `container` in this
  // dropdown's own object fixes that for good.
  container: {
    width: '49%',
    backgroundColor: 'transparent',
    zIndex: 100,
  },

  dropdownButton: {
    backgroundColor: colors.white,
    padding: scale(10),
    borderRadius: radius(10),
    borderWidth: 1.5,
    borderColor: colors.border
  },

  dropdownContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },

  dropdownText: {
    fontSize: font(13),
    color: colors.primary,
    lineHeight: font(15)
  },

  dropdownMenu: {
    position: "absolute",

    backgroundColor: colors.white,
    borderRadius: radius(12),

    maxHeight: 
      isNormalFold
      ? verticalScale(370)
      : isTallFold
      ? verticalScale(250)
      : verticalScale(175),

    borderWidth: 1.5,
    borderColor: colors.border,

    elevation: 10,
    zIndex: 999,

    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },

  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    padding: scale(10),
    borderBottomWidth: scale(1),
    borderBottomColor: colors.divider,
  },

  itemText: {
    fontSize: 
      isAndroidTabletPortrait || isAndroidTabletLandscape
      ? font(13)
      : font(12),
    color: colors.primary,
    lineHeight: font(14)
  },

  activeItem: {
    backgroundColor: colors.primary,
    borderRadius: radius(10),
  },

  activeText: {
    color: colors.white,
    fontWeight: 'bold',
  },

  countBadge: {
    marginLeft: scale(6),
    width: scale(18),
    height: 
      isFold
      ? verticalScale(28)
      : verticalScale(18),
    borderRadius: radius(999),
    backgroundColor: "#35408E",
    justifyContent: "center",
    alignItems: "center",
  },

countText: {
  color: "#FFF",
  fontWeight: "700",
  fontSize: font(9),
},

overlay: {
  flex: 1,
  backgroundColor: "transparent",
},

//MATERIAL TYPE DROPDOWN

option: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
    marginHorizontal: scale(4),
    borderRadius: radius(8),
},

optionIcon: {
    width: 
      isAndroidTabletPortrait || isAndroidTabletLandscape || isIPad 
      || isIPadMini || isLargeIPad
      ? scale(25)
      : isFold
      ? scale(25)
      : scale(30),
    height: 
      isAndroidTabletPortrait || isAndroidTabletLandscape || isLargeIPad
      || isIPad|| isIPadMini 
      ? verticalScale(35)
      : isFold
      ? verticalScale(50)
      : verticalScale(30),
    borderRadius: radius(8),
    justifyContent: "center",
    alignItems: "center",
},

checkbox: {
    width: scale(20),
    height: 
      isAndroidTabletPortrait || isAndroidTabletLandscape || isLargeIPad 
      || isIPad || isIPadMini 
      ? verticalScale(25)
      : isFold
      ? verticalScale(40)
      : verticalScale(20),
    borderRadius: radius(5),
    borderWidth: 1.5,
    borderColor: "#D1D5E8",
    backgroundColor: "#F8F9FD",
    justifyContent: "center",
    alignItems: "center",
},

optionLabel: {
    flex: 1,
    fontSize: 
      isAndroidTabletPortrait || isAndroidTabletLandscape || isLargeIPad
      || isIPad|| isIPadMini
      ? font(13)
      : font(12),
    color: "#35408E",
    fontWeight: "400",
    lineHeight: font(14)
},

modalOverlay: {
    flex: 1,
  },

    optionActive: {
    backgroundColor: "#F8F9FD",
  },

dropdown: {
  position: "absolute",
  backgroundColor: "#FFF",
  borderRadius: 12,
  borderWidth: 1.5,
  borderColor: "#E0E4F0",
  paddingVertical: 9,

  shadowColor: "#1A1F5E",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.12,
  shadowRadius: 12,
  elevation: 10,
},
})};

// was a hardcoded, unscaled `maxHeight: 250` inline on the
// dropdown's ScrollView — now scales with device height, with more
// room to show options on taller screens
export const resourcesDropdownMaxHeight =
  isTallScreen || isExtraTallScreen ? verticalScale(320) : verticalScale(250);