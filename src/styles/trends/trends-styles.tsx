import { StyleSheet } from 'react-native';
import {
  font,
  isExtraTallScreen,
  isFold,
  isNormalScreen,
  isShortScreen,
  isTablet,
  isTallScreen,
  radius,
  scale,
  verticalScale,
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
export const trendsPageStyles = StyleSheet.create({
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
      ? 900 
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
    borderWidth: scale(1),
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
      : isFold && isNormalScreen
      ? verticalScale(350)
      : isFold && isTallScreen
      ? verticalScale(300)
      : isExtraTallScreen
      ? verticalScale(210)
      : verticalScale(180),
    gap: scale(10),
    backgroundColor: colors.bgGray,
    borderRadius: radius(12),
  },

  legendContainer: {
    marginHorizontal: scale(20),
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

  breakdownBG: {
    backgroundColor: colors.bgGray,
    width: '100%',
    padding: scale(5),
    marginBottom: verticalScale(10),
  },

  breakdownContent: {
    flexDirection: 'row',
    padding: scale(20),
    justifyContent: 'center',
    gap: scale(5),
    backgroundColor: 'transparent',
    flexWrap: 'nowrap',
  },
});