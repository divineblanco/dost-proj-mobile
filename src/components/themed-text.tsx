import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'titleLogin' | 'small' | 'smallBold' | "smallBoldColor" | 'subtitle' | 'subtitleLight' | 'subtitleItalic' | 'trendCard' | 'filterLabel' | 'filterOptions' | 'filterApply' | 'link' | 'buttonCaption' |'linkPrimary' | 'code';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'] },
        type === 'default' && styles.default,
        type === 'title' && styles.title,
        type === 'titleLogin' && styles.titleLogin,
        type === 'small' && styles.small,
        type === 'smallBoldColor' && styles.smallBoldColor,
        type === 'smallBold' && styles.smallBold,
        type === 'subtitle' && styles.subtitle,
        type === 'subtitleLight' && styles.subtitleLight,
        type === 'subtitleItalic' && styles.subtitleItalic,   
        type === 'buttonCaption' && styles.buttonCaption,
        type === 'trendCard' && styles.trendCard,
        type === 'filterLabel' && styles.filterLabel,
        type === 'filterOptions' && styles.filterOptions,
        type === 'filterApply' && styles.filterApply,
        type === 'link' && styles.link,
        type === 'linkPrimary' && styles.linkPrimary,
        type === 'code' && styles.code,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontSize: 9,
    lineHeight: 17,
    fontWeight: 500,
    color: "#35408E"
  },
  smallBoldColor:{
    fontSize: 9,
    lineHeight: 17,
    fontWeight: 700,
    color: "#FFB633"
  },
  smallBold: {
    fontSize: 11,
    lineHeight: 17,
    fontWeight: 700,
    color: "#35408E"
  },
  default: {
    fontSize: 11,
    lineHeight: 17,
    fontWeight: 500,
    color: "#35408E"
  },
  title: {
    fontSize: 20,
    color: "#35408E",
    textAlign: "center",
    fontWeight: "bold",
  },
  titleLogin: {
    fontSize: 20,
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 800,
    color: "#35408E"
  },
  subtitleLight: {
    fontSize: 15,
    fontWeight: 600,
    color: "#35408E"
  },
  subtitleItalic: {
    fontSize: 15,
    fontWeight: 400,
    fontStyle: "italic",
    color: "#35408E"
  },
  buttonCaption: {
    fontSize: 15,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  trendCard: {
    fontSize: 13,
    color: "#35408E",
    fontWeight: "bold",
    textAlign: "center"
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white"
  },
  filterOptions: {
    fontSize: 12,
    fontWeight: "400",
    color: "black"
  },
  filterApply: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#35408E",
    textAlign: "center"
  },
  link: {
    lineHeight: 30,
    fontSize: 14,
  },
  linkPrimary: {
    lineHeight: 30,
    fontSize: 14,
    color: '#3c87f7',
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: 12,
  },
});
