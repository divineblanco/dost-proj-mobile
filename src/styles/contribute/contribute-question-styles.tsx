import { StyleSheet } from 'react-native';
import {
  font,
  isAndroidTablet,
  isExtraTallScreen,
  isFold,
  isTallScreen,
  radius,
  ResponsiveValues,
  scale,
  spacing,
  verticalScale
} from '../responsive';

const capScale = (size: number, max: number) => Math.min(scale(size), max);

/* ============================================================
    QUESTION ONE — "what would you like to share?" option grid
============================================================ */

export function questionOneStyles (r: ResponsiveValues) {
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

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing(10),
    backgroundColor: 'transparent',
  },

  box: {
    width: '100%',
    // more columns as width grows: 2-up on phones, 3-up on folds,
    // 4-up on tablets, instead of 6 options staying stuck at 2-up
    // (and looking sparse) on a much wider screen
    maxWidth: 
        isLargeIPadLandscape || isIPadMiniLandscape || isIPadLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
        ? "48%"
        : isTablet 
        ? '48%' 
        : isFold 
        ? '48%' 
        : '48%',

    flexDirection: 'row',
    alignItems: 'center',

    gap: spacing(10),

    paddingHorizontal: scale(11),
    paddingVertical: 
        isNormalFold || isTallFold || isIPadPortrait 
        ? verticalScale(25)
        : isIPadLandscape  || isLargeIPad || isIPadMiniLandscape
        || isAndroidTablet
        ? verticalScale(15)
        : verticalScale(12),

    backgroundColor: '#FFFFFF',

    borderRadius: radius(10),

    borderWidth: scale(1.5),
    borderColor: '#E8EAF0',

    shadowColor: '#1A1F5E',
    shadowOffset: {
      width: 0,
      height: verticalScale(1),
    },
    shadowOpacity: 0.06,
    shadowRadius: radius(4),
    elevation: 2,
  },

  boxSelected: {
    borderColor: '#35408E',
    backgroundColor: '#F4F5FB',
  },

  iconBubble: {
    width: 
       isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait 
        ? capScale(65, 75)
        : isNormalFold || isTallFold  || isIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
        ? capScale(45,55)
        : capScale(38, 48),
    height: 
        isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait
        ? capScale(65, 75)
        : isNormalFold || isTallFold || isIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
        ? capScale(45,55)
        : capScale(38, 48),

    borderRadius: radius(10),

    justifyContent: 'center',
    alignItems: 'center',
  },

  boxTitle: {
    flex: 1,

    fontSize: 
      isLargeIPadLandscape || isIPadLandscape || isLargeIPadPortrait || isIPadPortrait 
      ? font(13)
      : isAndroidTabletPortrait
      ? font(12.5)
      : isIPadMiniLandscape || isAndroidTabletLandscape
      ? font(15)
      : font(11.9),
    lineHeight: font(16),

    fontWeight: '600',
    color: '#4B5563',
  },

  boxTitleSelected: {
    color: '#35408E',
  },

  check: {
    width: 
      isLargeIPadLandscape  
      ? capScale(32, 37)
      : isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
      ? capScale(12, 35)
      : isIPadPortrait 
      ? capScale(11, 28)
      : capScale(18, 22),
    height: 
      isLargeIPadLandscape
      ? capScale(32, 37)
      : isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
      ? capScale(12, 35)
      : isIPadPortrait
      ? capScale(11, 28)
      : capScale(18, 22),

    borderRadius: radius(9),

    borderWidth: scale(1.5),
    borderColor: '#D1D5E8',

    backgroundColor: '#F8F9FD',

    justifyContent: 'center',
    alignItems: 'center',
  },

  checkSelected: {
    backgroundColor: '#35408E',
    borderColor: '#35408E',
  },

  otherInputContainer: {
    marginTop: 
      isLargeIPad || isIPad || isIPadMini
      || isAndroidTablet 
      ? verticalScale(15)
      : isFold
      ? verticalScale(20)
      : verticalScale(12),
    width: "100%",
  },

  otherInputLabel: {
    fontSize: 
      isLargeIPad || isIPad  || isAndroidTablet
      || isFold
      ? font(14)
      : font(13),
    lineHeight: font(14),
    fontWeight: "600",
    color: "#35408E",
    marginBottom: 
      isLargeIPad || isIPad || isIPadMini 
      || isAndroidTablet
      ? verticalScale(10)
      : isFold
      ? verticalScale(15)
      : verticalScale(6),
  },

  otherInput: {
    width: "100%",
    minHeight: 
      isLargeIPad || isIPad || isIPadMini
      ? verticalScale(100)
      : isFold
      ? verticalScale(120)
      : verticalScale(80),

    backgroundColor: "#F8F9FC",

    borderWidth: 1,
    borderColor: "#D9DEEA",

    borderRadius: radius(10),

    paddingHorizontal: scale(12),
    paddingVertical: 
      isLargeIPad || isIPad || isIPadMini
      || isFold
      ? verticalScale(15)
      : verticalScale(10),

    fontSize: 
      isLargeIPad || isIPad || isAndroidTablet
      ? font(14)
      : font(13),
    lineHeight: font(14),
    color: "#35408E",
  },
})};

/* ============================================================
    QUESTION TWO — location picker (Region / Province / City / Barangay)
============================================================ */

export function questionTwoStyles(r: ResponsiveValues) {
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

  wrapper: {
    backgroundColor: '#F0F3FA',
    borderRadius: radius(14),
    borderWidth: scale(1.5),
    borderColor: '#E0E4F0',

    padding: 
        isFold || isIPadLandscape || isIPadMiniLandscape || isAndroidTabletLandscape
        ? spacing(25)
        : isLargeIPadLandscape || isLargeIPadPortrait || isIPadPortrait 
        ? spacing(20)
        : spacing(14),
    gap: spacing(12),

    overflow: 'visible',
  },

  topRow: {
    flexDirection: 'row',
    gap: spacing(8),
    overflow: 'visible',
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing(8),

    overflow: 'visible',
    zIndex: 2,
  },

  fieldCol: {
    flex: 1,
    position: 'relative',
    overflow: 'visible',
  },

  activeField: {
    zIndex: 9999,
    elevation: 50,
  },

  fieldLabel: {
    fontSize: 
        isNormalFold || isTallFold || isIPadMiniLandscape || isAndroidTabletLandscape
        ? font(13)
        : isLargeIPadLandscape || isIPadLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
        ? font(12)
        : font(11),
    fontWeight: '600',
    lineHeight: font(13),
    color: '#35408E',

    marginBottom: 
      isLargeIPadLandscape || isAndroidTabletLandscape
      ? verticalScale(10)
      : verticalScale(5),
    letterSpacing: scale(0.2),
  },

  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: '#FFFFFF',

    borderRadius: radius(9),
    borderWidth: scale(1.5),
    borderColor: '#E0E4F0',

    paddingHorizontal: scale(10),
    paddingVertical: 
        isNormalFold || isTallFold
        ? verticalScale(20)
        : isLargeIPadLandscape || isIPadLandscape  || isAndroidTabletLandscape
        ? verticalScale(15)
        : isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
        ? verticalScale(12)
        : verticalScale(10),

    gap: spacing(4),
  },

  triggerOpen: {
    borderColor: '#35408E',
    backgroundColor: '#F4F5FB',
  },

  triggerFilled: {
    borderColor: '#C5CAE9',
  },

  triggerText: {
    flex: 1,

    fontSize: 
        isNormalFold || isTallFold || isAndroidTabletLandscape
        ? font(13)
        : font(12),
    fontWeight: '600',
    lineHeight: font(13),
    color: '#1A1F5E',
  },

  triggerPlaceholder: {
    color: '#9BA8C0',
    fontWeight: '400',
    lineHeight: font(15)
  },

  dropdownList: {
    position: 'absolute',

    top: '100%',
    left: 0,
    right: 0,

    marginTop: verticalScale(4),

    backgroundColor: '#FFFFFF',

    borderRadius: radius(10),
    borderWidth: scale(1.5),
    borderColor: '#E0E4F0',

    paddingVertical: verticalScale(10),

    zIndex: 99999,
    elevation: 60,

    shadowColor: '#1A1F5E',
    shadowOffset: {
      width: 0,
      height: verticalScale(4),
    },
    shadowOpacity: 0.1,
    shadowRadius: radius(8),

    maxHeight: 
      isTallScreen || isExtraTallScreen
      ? verticalScale(260)
      : verticalScale(200)
  },

  // exported separately (not a static style key) since it's used as
  // an inline maxHeight on the ScrollView inside each dropdown —
  // more room to show options on taller screens instead of a flat
  // cap that wastes available space
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingVertical: 
        isNormalFold || isTallFold
        ? verticalScale(15)
        : isLargeIPadLandscape || isIPadLandscape || isAndroidTabletLandscape
        ? verticalScale(10)
        : verticalScale(9),
    paddingHorizontal: scale(12),

    marginHorizontal: scale(4),

    borderRadius: radius(6),
  },

  dropdownItemActive: {
    backgroundColor: '#EEF0FA',
  },

  dropdownText: {
    fontSize: font(12),
    color: '#374151',
    lineHeight: font(15)
  },

  dropdownTextActive: {
    color: '#35408E',
    fontWeight: '600',
  },

  locationBtn: {
    width: 
      isLargeIPadLandscape  || isIPadMiniLandscape  
      ? capScale(70, 80)
      : isIPadLandscape  || isAndroidTabletLandscape
      ? capScale(65, 70)
      : isIPadPortrait || isAndroidTabletPortrait
      ? capScale(55, 65)
      : isLargeIPadPortrait 
      ? capScale(68, 75)
      : capScale(42, 52),
    height: 
      isLargeIPadLandscape || isIPadMiniLandscape
      ? capScale(70, 80)
      : isIPadLandscape || isAndroidTabletLandscape
      ? capScale(65, 70)
      : isIPadPortrait || isAndroidTabletPortrait
      ? capScale(55, 65)
      : isLargeIPadPortrait
      ? capScale(68, 75)
      : capScale(42, 52),

    borderRadius: radius(10),

    backgroundColor: '#35408E',

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: verticalScale(1),

    shadowColor: '#35408E',
    shadowOffset: {
      width: 0,
      height: verticalScale(3),
    },
    shadowOpacity: 0.3,
    shadowRadius: radius(6),
    elevation: 5,
  },
})};

// more room to show options on taller screens instead of a flat cap
// that wastes available space — used as the inline maxHeight on the
// ScrollView inside QuestionTwo's dropdown lists
export const questionTwoDropdownMaxHeight =
  isTallScreen || isExtraTallScreen ? verticalScale(260) : verticalScale(180);

/* ============================================================
    MISINFORMATION TYPE — single dropdown field (ReportMisinformation)
============================================================ */
 
export function misinformationTypeStyles (r: ResponsiveValues) {
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

  wrapper: {
    backgroundColor: '#F0F3FA',
    borderRadius: radius(14),
    borderWidth: scale(1.5),
    borderColor: '#E0E4F0',
    padding: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait
      ? spacing(15)
      : spacing(14),
    gap: spacing(12),
    overflow: 'visible',
  },
 
  row: {
    flexDirection: 'row',
    gap: spacing(8),
    alignItems: 'flex-end',
    overflow: 'visible',
    zIndex: 2,
  },
 
  fieldCol: {
    flex: 1,
    position: 'relative',
    overflow: 'visible',
  },
 
  activeField: {
    zIndex: 9999,
    elevation: 50,
  },
 
  fieldLabel: {
    fontSize: 
        isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
        ? font(12)
        : isFold
        ? font(14)
        : font(11),
    fontWeight: '600',
    color: '#35408E',
    marginBottom: 
        isFold || isLargeIPadLandscape || isIPadLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
        ? verticalScale(10)
        : verticalScale(5),
    letterSpacing: scale(0.2),
    lineHeight: font(14)
  },
 
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: radius(9),
    borderWidth: scale(1.5),
    borderColor: '#E0E4F0',
    paddingHorizontal: spacing(10),
    paddingVertical: 
        isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isAndroidTabletLandscape
        ? verticalScale(15)
        : isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
        ? verticalScale(13)
        : isFold
        ? verticalScale(20) 
        : verticalScale(10),
    gap: spacing(4),
    minHeight: verticalScale(42),
  },
 
  triggerOpen: {
    borderColor: '#35408E',
    backgroundColor: '#F4F5FB',
  },
 
  triggerFilled: {
    borderColor: '#C5CAE9',
  },
 
  triggerText: {
    flex: 1,
    fontSize: font(12),
    lineHeight: font(13),
    fontWeight: '600',
    color: '#1A1F5E',
  },
 
  triggerPlaceholder: {
    color: '#9BA8C0',
    lineHeight: font(13),
    fontWeight: '400',
  },
 
  dropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: verticalScale(4),
    backgroundColor: '#FFFFFF',
    borderRadius: radius(10),
    borderWidth: scale(1.5),
    borderColor: '#E0E4F0',
    paddingVertical: 
        isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isAndroidTabletLandscape
        ? verticalScale(15)
        : isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
        ? verticalScale(10)
        : isFold
        ? verticalScale(20)
        : verticalScale(4),
    zIndex: 99999,
    elevation: 60,
 
    shadowColor: '#1A1F5E',
    shadowOffset: {
      width: 0,
      height: verticalScale(4),
    },
    shadowOpacity: 0.1,
    shadowRadius: radius(8),
  },
 
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 
        isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
        ? verticalScale(10)
        : isFold
        ? verticalScale(15)
        : verticalScale(9),
    paddingHorizontal: spacing(12),
    marginHorizontal: spacing(4),
    borderRadius: radius(6),
  },
 
  dropdownItemActive: {
    backgroundColor: '#EEF0FA',
  },
 
  dropdownText: {
    fontSize: 
        isFold
        ? font(13)
        : font(12),
    color: '#374151',
    lineHeight: font(14)
  },
 
  dropdownTextActive: {
    color: '#35408E',
    fontWeight: '600',
  },
})};
 
// was a hardcoded, unscaled `maxHeight: 180` inline on the dropdown's
// ScrollView — now scales with the device height like QuestionTwo's
export const misinformationTypeDropdownMaxHeight =
  isTallScreen || isExtraTallScreen 
  ? verticalScale(260) 
  : isFold
  ? verticalScale(200)
  : verticalScale(180);
 