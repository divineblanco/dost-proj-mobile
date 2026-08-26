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

/* ============================================================
    SHARED FORM PIECES
    (AddContribute + ReportMisinformation)
============================================================ */

export function sharedFormStyles (r: ResponsiveValues) {
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
    backgroundColor: colors.bgLight,
  },

  // centers the whole form into a readable column on wide screens
  // instead of stretching every section/card edge to edge; no
  // effect on phones since maxWidth never binds there
  formInner: {
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
      ? verticalScale(150)
      : isExtraTallScreen
      ? verticalScale(130)
      : isNormalFold || isTallFold
      ? verticalScale(150)
      : verticalScale(100),
  },

  header: {
    paddingHorizontal: scale(20),
    paddingTop: 
        isNormalFold || isTallFold || isLargeIPadLandscape || isIPadMiniLandscape
        ? verticalScale(30)
        : isLargeIPadPortrait || isAndroidTabletLandscape
        ? verticalScale(25)
        : verticalScale(20),
    paddingBottom: verticalScale(16),
    backgroundColor: colors.white,
  },

  headerCompact: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(10),
    backgroundColor: colors.white,
  },

  title: {
    fontSize: 
        isNormalFold || isTallFold || isIPadLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
        ? font(25)
        : isLargeIPadLandscape 
        ? font(20)
        : font(22),
    fontWeight: '700',
    color: colors.primary,
    paddingVertical: 
        isIPadMiniLandscape 
        ? verticalScale(15)
        : isNormalFold || isTallFold 
        ? verticalScale(10)
        : verticalScale(6),
    lineHeight: 
      isIPadMiniLandscape 
      ? font(15)
      : font(22)
  },

  desc: {
    fontSize: 
      isLargeIPadLandscape 
      ? font(11)
      : font(12),
    color: colors.primary,
    lineHeight: 
      isLargeIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait
      ? spacing(15)
      : spacing(17),
    textAlign: 'justify',
  },

  headerDivider: {
    height: verticalScale(3),
    backgroundColor: colors.primary,
    marginHorizontal: scale(20),
    borderRadius: radius(2),
    marginBottom: verticalScale(16),
  },

  section: {
    backgroundColor: colors.white,
    paddingHorizontal: scale(20),
    paddingVertical: 
        isFold || isIPadLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
        ? verticalScale(25)
        : isLargeIPadLandscape 
        ? verticalScale(35)
        : verticalScale(18),
    gap: scale(12),
  },

  sectionDivider: {
    height: 
        isNormalFold || isTallFold || isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
        ? verticalScale(15)
        : isLargeIPadLandscape 
        ? verticalScale(20)
        : verticalScale(8),
    backgroundColor: colors.borderLight,
  },

  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    backgroundColor: 'transparent',
  },

  qNumber: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  qNumberText: {
    fontSize: 
      isLargeIPadLandscape 
      ? font(14)
      : font(12),
    fontWeight: '700',
    color: colors.white,
    lineHeight: font(15)
  },

  question: {
    fontSize: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
      ? font(15)
      : font(14),
    fontWeight: '700',
    color: colors.primaryDark,
    flex: 1,
    lineHeight: font(15)
  },

  optional: {
    fontSize: font(11),
    color: colors.muted,
    fontWeight: '400',
  },

  subLabel: {
    fontSize: font(12),
    color: colors.muted,
    marginTop: verticalScale(-4),
    lineHeight: font(13)
  },

  textArea: {
    backgroundColor: '#F0F3FA',
    borderRadius: radius(10),
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: scale(14),
    // more writing room on taller screens instead of a flat height
    // that wastes available space, less on short screens so the
    // submit button doesn't get pushed off-screen
    height: isShortScreen
      ? verticalScale(110)
      : isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isAndroidTabletLandscape
      ? verticalScale(300)
      : isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
      ? verticalScale(250)
      : isTallScreen || isExtraTallScreen 
      ? verticalScale(170)
      : isNormalFold || isTallFold 
      ? verticalScale(300)
      : verticalScale(140),
    fontSize: font(13),
    color: colors.textBody,
    lineHeight: spacing(20),
  },

  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(8),
    backgroundColor: colors.primary,
    marginHorizontal: scale(16),
    marginTop: verticalScale(4),
    paddingVertical: 
        isNormalFold || isTallFold || isIPadMiniLandscape || isAndroidTabletLandscape
        ? verticalScale(25)
        : isIPadLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
        ? verticalScale(20)
        : isLargeIPadLandscape 
        ? verticalScale(30)
        : verticalScale(15),
    borderRadius: radius(12),
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  submitTxt: {
    color: colors.white,
    fontSize: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
      ? font(16)
      : font(15),
    fontWeight: '700',
    letterSpacing: 0.3,
    lineHeight: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
      ? font(18)
      : font(15)
  },

  errorText: {
    marginTop: verticalScale(6),
    marginLeft: scale(4),
    fontSize: font(12),
    color: "#E53935",
    fontWeight: "500",
  },

  inputError: {
    borderWidth: scale(1),
    borderColor: "#E53935",
  },

  required: {
    color: "#E53935",
    fontWeight: "700",
  },
})};

/* ============================================================
    ADD CONTRIBUTE (only)
============================================================ */

export function addContributeStyles (r: ResponsiveValues) {
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

  attachRow: {
    flexDirection: 'row',
    gap: scale(10),
  },

  attachBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    padding: scale(14),
    backgroundColor: colors.bgLight,
    borderRadius: radius(10),
    borderWidth: 
      isLargeIPadPortrait || isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
      ? 2
      : 1.5,
    borderColor: colors.border,
  },

  attachIcon: {
    width: 
      isLargeIPadLandscape  || isIPadMiniLandscape 
      ? scale(25)
      : isIPadLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
      ? scale(30)
      : scale(36),
    height: 
      isLargeIPadLandscape  || isIPadMiniLandscape
      ? scale(25)
      : isIPadLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
      ? scale(30)
      : scale(36),
    borderRadius: radius(8),
    justifyContent: 'center',
    alignItems: 'center',
  },

  attachTxt: {
    fontSize: 
      isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
      ? font(14)
      : font(13),
    fontWeight: '600',
    color: colors.primary,
    lineHeight: font(14)
  },

  sentimentRow: {
    flexDirection: 'row',
    gap: scale(10),
    backgroundColor: 'transparent',
  },

  sentimentBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(7),
    paddingVertical: 
      isIPadMiniLandscape || isAndroidTabletLandscape
      ? verticalScale(25)
      : isNormalFold || isTallFold
      ? verticalScale(35)
      : isIPadLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
      ? verticalScale(20)
      : isLargeIPadLandscape 
      ? verticalScale(30)
      : verticalScale(12),
    borderRadius: radius(10),
    borderWidth: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isAndroidTabletLandscape
      ? 3
      : isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
      ? 2
      : 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },

  sentimentDot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
  },

  sentimentTxt: {
    fontSize: 
      isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
      ? font(14)
      : font(13),
    fontWeight: '500',
    color: colors.primary,
    lineHeight: font(15)
  },

  privacyCard: {
    margin: scale(16),
    padding: 
        isNormalFold || isTallFold || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletLandscape
        ? scale(20)
        : isLargeIPadLandscape 
        ? scale(15)
        : scale(16),
    backgroundColor: '#EEF0FA',
    borderRadius: radius(12),
    borderWidth: 1,
    borderColor: '#D1D5E8',
    gap: scale(8),
  },

  privacyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    backgroundColor: 'transparent',
  },

  privacyIconBg: {
    width: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait
      ? scale(30)
      : scale(36),
    height: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait
      ? scale(30)
      :scale(36),
    borderRadius: scale(18),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  privacyTitle: {
    fontSize: 
        isNormalFold || isTallFold || isIPadMiniLandscape || isLargeIPadPortrait|| isIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
        ? font(18)
        : isLargeIPadLandscape || isIPadLandscape
        ? font(17)
        : font(14),
    fontWeight: '700',
    color: colors.primary,
    lineHeight: 
        isNormalFold || isTallFold || isIPadMiniLandscape
        ? font(18)
        : isLargeIPadLandscape || isIPadLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
        ? font(20)
        : font(14)
  },

  privacyBody: {
    fontSize: 
        isNormalFold || isTallFold || isIPadMiniLandscape || isAndroidTabletLandscape
        ? font(15)
        : isLargeIPadLandscape || isIPadLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
        ? font(13)
        : font(12),
    color: colors.textGray,
    lineHeight: 
        isNormalFold || isTallFold || isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
        ? spacing(20)
        : spacing(18),
  },

  privacyLink: {
    fontSize: 
        isNormalFold || isTallFold || isIPadMiniLandscape || isAndroidTabletLandscape
        ? font(14)
        : isLargeIPadLandscape || isIPadLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletLandscape
        ? font(13)
        : font(12),
    fontWeight: '600',
    color: colors.primary,
    textDecorationLine: 'underline',
    lineHeight: font(14)
  },
})};

/* ============================================================
    REPORT MISINFORMATION (only)
============================================================ */

export function reportMisinfoStyles (r: ResponsiveValues) {
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

  label: {
    fontSize: 
        isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
        ? font(12)
        : isFold
        ? font(13)
        : font(11),
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 
        isFold || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
        ? verticalScale(10)
        : verticalScale(5),
    letterSpacing: 0.2,
    lineHeight: font(14)
  },

  input: {
    backgroundColor: colors.white,
    padding: scale(10),
    borderRadius: radius(5),
    borderWidth: 1,
    borderColor: '#E0E4F0',
    fontSize: 
      isIPadMiniLandscape || isIPadLandscape || isLargeIPadLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
      ? font(12)
      : font(11),
    lineHeight: 
      isIPadMiniLandscape || isAndroidTabletLandscape
      ? font(15)
      : font(14)
  },

  bg: {
    backgroundColor: '#F0F3FA',
    borderRadius: radius(10),
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: scale(13),
    fontSize: font(13),
    color: colors.textBody,
  },

  attachBtnCentered: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(10),
    padding: scale(10),
    backgroundColor: colors.bgLight,
    borderRadius: radius(10),
    borderWidth: 
      isLargeIPadLandscape || isIPadMiniLandscape || isAndroidTabletLandscape
      ? 3
      : isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
      ? 2
      : 1.5,
    borderColor: colors.border,
  },

  attachIconLarge: {
    width: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait 
      ? scale(30)
      : scale(40),
    height: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait
      ? scale(30)
      : scale(40),
    borderRadius: radius(8),
    justifyContent: 'center',
    alignItems: 'center',
  },

  attachTxtLarge: {
    fontSize: font(15),
    fontWeight: '600',
    color: colors.primary,
    lineHeight: font(16)
  },

  cancelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(8),
    backgroundColor: colors.white,
    marginHorizontal: scale(16),
    marginTop: verticalScale(4),
    paddingVertical: 
        isIPadMiniLandscape || isAndroidTabletLandscape
        ? verticalScale(25)
        : isNormalFold || isTallFold || isLargeIPadLandscape 
        ? verticalScale(30)
        : isIPadLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
        ? verticalScale(20)
        : verticalScale(15),
    borderRadius: radius(12),
    borderWidth: 1,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  cancelTxt: {
    color: colors.primary,
    fontSize: 
      isLargeIPadLandscape || isIPadLandscape || isIPadMiniLandscape || isIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
      ? font(16)
      : font(15),
    fontWeight: '700',
    letterSpacing: 1,
    lineHeight: font(15)
  },
})};

/* ============================================================
    CONTRIBUTE TABS (Contributions / Misinformation tab screen)
============================================================ */

export function contributeTabsStyles (r: ResponsiveValues) {
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

  pageContainerPlain: {
    flex: 1,
  },

  scrollContentPadded: {
    paddingBottom: 
      isLargeIPadLandscape
      ? verticalScale(140)
      : isShortScreen
      ? verticalScale(150)
      : isExtraTallScreen
      ? verticalScale(130)
      : isNormalFold
      ? verticalScale(150)
      : verticalScale(100),
    paddingHorizontal: scale(14),
    paddingTop: verticalScale(14),
    gap: scale(12),
  },

  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    backgroundColor: 'transparent',
  },

  primaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(6),
    backgroundColor: colors.primary,
    paddingVertical: 
      isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait || isIPadMiniPortrait || isLargeIPadLandscape || isAndroidTabletPortrait || isAndroidTabletLandscape
      ? verticalScale(20)  
      : isNormalFold || isTallFold 
      ? verticalScale(35)
      : verticalScale(11),
    borderRadius: radius(10),
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },

  dangerBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(6),
    backgroundColor: colors.danger,
    paddingVertical: 
      isIPadLandscape || isIPadMiniLandscape  || isLargeIPadPortrait || isIPadPortrait || isIPadMiniPortrait || isLargeIPadLandscape || isAndroidTabletPortrait || isAndroidTabletLandscape
      ? verticalScale(20)  
      : isNormalFold || isTallFold  
      ? verticalScale(35)
      : verticalScale(11),
    borderRadius: radius(10),
    shadowColor: colors.danger,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },

  primaryBtnText: {
    color: colors.white,
    fontSize: 
      isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
      ? font(16)  
      : isNormalFold || isTallFold || isLargeIPadLandscape || isAndroidTabletLandscape
      ? font(20) 
      : font(14),
    fontWeight: '700',
    lineHeight: 
      isIPadLandscape || isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait
      ? font(18)  
      : isNormalFold || isTallFold || isLargeIPadLandscape || isAndroidTabletLandscape
      ? font(20) 
      : font(14)
  },

  filterBtn: {
    width: 
      isLargeIPadLandscape 
      ? scale(38)
      : isIPadLandscape || isLargeIPadPortrait || isIPadPortrait
      ? scale(40)
      : scale(44),
    height: 
      isLargeIPadLandscape
      ? scale(38)
      : isIPadLandscape || isLargeIPadPortrait || isIPadPortrait
      ? scale(40)
      : scale(44),
    borderRadius: radius(10),
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: colors.bgLight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardList: {
    gap: 0,
  },

  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 
      isIPadLandscape || isIPadMiniLandscape
      ? verticalScale(20)
      : isLargeIPadLandscape || isAndroidTabletPortrait 
      ? verticalScale(18)
      : isNormalFold || isTallFold || isLargeIPadLandscape 
      ? verticalScale(25)
      : verticalScale(13),
    position: 'relative',
  },

  tabItemActive: {
    backgroundColor: 'transparent',
  },

  tabLabel: {
    fontSize: 
      isLargeIPadLandscape || isIPadLandscape || isAndroidTabletLandscape
      ? font(16)
      : font(15),
  },

  tabLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },

  tabLabelInactive: {
    color: colors.muted,
    fontWeight: '400',
  },

  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: '15%',
    right: '15%',
    height: 
      isIPadMiniLandscape || isLargeIPadPortrait || isIPadPortrait || isAndroidTabletPortrait || isAndroidTabletLandscape
      ? verticalScale(3)
      : isNormalFold || isTallFold || isLargeIPadLandscape 
      ? verticalScale(5)
      : verticalScale(2.5),
    borderRadius: radius(2),
    backgroundColor: colors.primary,
  },
})};