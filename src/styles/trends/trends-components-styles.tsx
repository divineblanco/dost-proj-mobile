import { StyleSheet } from 'react-native';
import {
    font,
    isExtraTallScreen,
    isFold,
    isNormalScreen,
    isShortScreen,
    isSmallPhone,
    isTablet,
    isTallScreen,
    radius,
    scale,
    verticalScale,
} from '../responsive';
import { colors } from './trends-colors';

/**
 * Styles for the Trends flow's sub-components:
 *
 *   trendingTopicsStyles -> components/cards/trendtopics-box.tsx
 *   recentTableStyles    -> components/table/recent-table.tsx
 *   trendsFilterStyles   -> components/filters/trends-filter.tsx
 *
 * Page-level styles live in trends-page-styles.ts.
 */

// scale() grows linearly with device width forever, which is fine
// for phones but oversizes small fixed-size UI (the trend icon
// badge) on fold/tablet-class screens.
const capScale = (size: number, max: number) => Math.min(scale(size), max);

/* ============================================================
    TRENDING TOPICS BOX
============================================================ */

export const trendingTopicsStyles = StyleSheet.create({
  summaryContainer2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    padding: scale(10),
    gap: scale(10),
  },

  trendsBox: {
    // was a flat scale(170) — grows with device width, but so does
    // its wrapping container, so the ratio (and therefore column
    // count) barely changed between a phone and a tablet. A
    // percentage width actually adds columns as the screen widens:
    // 1-up on small phones, 2-up on phones, 3-up on folds, 4-up on
    // tablets — matching the same scheme used for the Home
    // dashboard's stat boxes.
    width: 
        isSmallPhone 
        ? '100%' 
        : isTablet 
        ? '23%' 
        : isFold 
        ? '48%' 
        : '48%',
    minHeight: 
        isFold && isNormalScreen
        ? verticalScale(170)
        : isFold && isTallScreen
        ? verticalScale(150)
        : isShortScreen
        ? verticalScale(90)
        : verticalScale(80),
    padding: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgGray,
    borderRadius: radius(7),
    flexDirection: 'row',
    position: 'relative',
    overflow: 'hidden',
  },

  box: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    zIndex: 2,
    gap: scale(5),
  },

  boxInfo: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    textAlign: 'center',
    flex: 1,
    flexShrink: 1,
  },

  boxTitle: {
    flexWrap: 'wrap',
    fontSize: 
        isFold
        ? font(18)
        : font(13)
  },

  boxMore: {
    fontSize: 
        isFold
        ? font(15)
        : font(12),
    // was the number 400 — React Native's fontWeight type only
    // accepts 'normal'/'bold' or a numeric *string* ('100'-'900')
    fontWeight: '400',
    fontStyle: 'italic',
    color: colors.primary,
    textAlign: 'center',
  },

  iconBG: {
    width: 
        isFold
        ? capScale(50, 62)
        : capScale(40, 52),
    height: 
        isFold
        ? capScale(50, 62)
        : capScale(40, 52),
    borderRadius: radius(10),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  trendRise: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    flexShrink: 0,
    justifyContent: 'center',
    marginTop: 
        isFold
        ? verticalScale(5)
        : verticalScale(2),
  },
});

/* ============================================================
    RECENT TABLE
============================================================ */

export const recentTableStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: radius(10),
    padding: scale(5),
    elevation: 5,
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    maxHeight: 
        isFold
        ? verticalScale(500)
        : verticalScale(300)
  },

  headerRow: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: 
        isFold
        ? verticalScale(20)
        : verticalScale(10),
    borderRadius: radius(6),
    marginBottom: 
        isFold
        ? verticalScale(3)
        : verticalScale(5),
  },

  headerCell: {
    flex: 1,
    color: colors.white,
    fontSize: 
        isFold
        ? font(15)
        : font(12),
    fontWeight: 'bold',
    textAlign: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: isTallScreen || isExtraTallScreen ? verticalScale(65) : verticalScale(55),
    backgroundColor: colors.bgGray,
    borderBottomWidth: scale(1),
    borderBottomColor: colors.rowBorder,
  },

  contentCellContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(6),
    backgroundColor: 'transparent',
  },

  cellContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(4),
    backgroundColor: 'transparent',
  },

  cell: {
    width: '100%',
    textAlign: 'center',
    fontSize: 
        isFold
        ? font(14)
        : font(12),
    paddingVertical: 
        isFold
        ? verticalScale(45) 
        : undefined
  },

  colorText: {
    color: 'white',
    fontWeight: '600',
  },

  sentimentBadge: {
    paddingHorizontal: scale(10),
    paddingVertical: 
        isFold
        ? verticalScale(15)
        : verticalScale(4),
    borderRadius: radius(12),
    minWidth: scale(70),
    alignItems: 'center',
    justifyContent: 'center',
  },

  positiveBadge: {
    backgroundColor: colors.positive,
  },

  neutralBadge: {
    backgroundColor: colors.neutral,
  },

  negativeBadge: {
    backgroundColor: colors.negative,
  },

  sentimentText: {
    fontSize: 
        isFold
        ? font(13)
        : font(11),
    fontWeight: '700',
    lineHeight: font(13)
  },
});

/* ============================================================
    TRENDS FILTER
============================================================ */

export const trendsFilterStyles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: verticalScale(8),
    right: scale(12),
    zIndex: 1,
  },

  filterDropdown: {
    position: 'absolute',
    top: 
        isFold && isTallScreen
        ? verticalScale(100)
        : isFold && isNormalScreen
        ? verticalScale(120)
        : verticalScale(60),
    marginHorizontal: scale(10),
    width: 'auto',
    backgroundColor: colors.primary,
    borderRadius: radius(10),
    padding: scale(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 999,
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
    padding: scale(15),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    rowGap: verticalScale(16),
  },

  // one grid cell: label + its dropdown box. Fixed at ~47% so two
  // always sit side by side with a small gutter between them.
  filterOptionContent: {
    backgroundColor: 'transparent',
    width: '47%',
    gap: scale(8),
  },

  // opt-in override: apply alongside filterOptionContent to stack
  // a field into the full row instead of the 2-up grid — used on
  // the last of Trends' 3 fields (Platform) so it doesn't sit
  // alone at half width.
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
        isFold
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
        isFold && isNormalScreen
        ? verticalScale(55)
        : isFold && isTallScreen
        ? verticalScale(45)
        : verticalScale(25),
    backgroundColor: '#FFF',
    borderRadius: radius(8),
    paddingVertical: scale(8),
    paddingLeft: scale(7),
    maxHeight: isTallScreen || isExtraTallScreen ? verticalScale(260) : verticalScale(200),
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

  filterDropdownAnchor: {
    // left: scale(102),
  },

  filterScrollContent: {
    paddingBottom: verticalScale(20),
  },

  filterScroller: {
    position: 'relative',
  },

  filterCalendar: {
    backgroundColor: colors.white,
    borderRadius: radius(8),
    padding: scale(5),
    marginTop: verticalScale(60),
    width: '100%',
    zIndex: 999,
    position: 'absolute',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: '#000',
    maxHeight: isTallScreen || isExtraTallScreen ? verticalScale(260) : verticalScale(200),
  },
});