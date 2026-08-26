import { Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { font } from '@/styles/responsive';
import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

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
    fontSize: font(10),
    lineHeight: 17,
    fontWeight: 400,
    color: "#35408E"
  },
  smallBoldColor:{
    fontSize: font(10),
    lineHeight: 17,
    fontWeight: 700,
    color: "#FFB633"
  },
  smallBold: {
    fontSize: font(11),
    lineHeight: 17,
    fontWeight: 700,
    color: "#35408E"
  },
  default: {
    fontSize: font(12),
    lineHeight: 17,
    fontWeight: 400,
    color: "#35408E"
  },
  title: {
    fontSize: font(20),
    color: "#35408E",
    textAlign: "center",
    fontWeight: "bold",
  },
  titleLogin: {
    fontSize: font(20),
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: font(16),
    fontWeight: 800,
    color: "#35408E"
  },
  subtitleLight: {
    fontSize: font(15),
    fontWeight: 600,
    color: "#35408E"
  },
  subtitleItalic: {
    fontSize: font(15),
    fontWeight: 400,
    fontStyle: "italic",
    color: "#35408E"
  },
  buttonCaption: {
    fontSize: font(15),
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  trendCard: {
    fontSize: font(13),
    color: "#35408E",
    fontWeight: "bold",
    textAlign: "center"
  },
  filterLabel: {
    fontSize: font(12),
    fontWeight: "bold",
    color: "white"
  },
  filterOptions: {
    fontSize: font(12),
    fontWeight: "400",
    color: "black"
  },
  filterApply: {
    fontSize: font(15),
    fontWeight: "bold",
    color: "white",
    textAlign: "center"
  },
  link: {
    lineHeight: 30,
    fontSize: font(14),
  },
  linkPrimary: {
    lineHeight: 30,
    fontSize: font(14),
    color: '#3c87f7',
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: font(12),
  },
});