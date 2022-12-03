/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  TextInput as DefaultTextInput,
  View as DefaultView,
  ScrollView as DefaultScrollView,
  Animated as DefaultAnimated,
} from 'react-native';

import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type TextInputProps = ThemeProps & DefaultTextInput['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type ScrollViewProps = ThemeProps & DefaultScrollView['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function SubText(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'subtext');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultTextInput style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'border');

  return <DefaultView style={[{ backgroundColor, borderColor }, style]} {...otherProps} />;
}

export function ScrollView(props: ScrollViewProps) {
  const { style, ...otherProps } = props;

  return <DefaultScrollView style={[style]} {...otherProps} />;
}

export function AnimatedText(props: { [x: string]: any; style: any }) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultAnimated.Text style={[{ color }, style]} {...otherProps} />;
}

export function AnimatedView(props: { [x: string]: any; style: any }) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'border');

  return <DefaultAnimated.View style={[{ backgroundColor, borderColor }, style]} {...otherProps} />;
}
