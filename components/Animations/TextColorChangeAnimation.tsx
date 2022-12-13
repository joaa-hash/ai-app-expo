import { StyleSheet, TextInput } from 'react-native';
import {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { AnimatedText } from '../../components/Theme/Themed';
import { setFontSize, useColorScheme } from '../../hooks';
import Colors from '../../constants/Colors';

type Props = {
  color: string;
  input: string;
  inputRef: React.RefObject<TextInput>;
};

export const TextColorChangeAnimation = ({ color, input, inputRef }: Props) => {
  const theme = useColorScheme();
  const config = {
    duration: 1700,
    easing: Easing.ease,
  };

  const progress = useDerivedValue(() => {
    return withTiming(inputRef.current?.focus ? 1 : 0, config);
  });

  const animatedStyle = useAnimatedStyle(() => {
    const textColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors[theme]['textPrimary'], color]
    );
    return {
      color: textColor,
    };
  });

  return (
    <AnimatedText
      style={[animatedStyle, styles.answerList, { fontSize: setFontSize(input.length) }]}
    >
      {input}
    </AnimatedText>
  );
};

const styles = StyleSheet.create({
  answerList: {
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 40,
    overflow: 'visible',
    fontSize: 26,
    width: '100%',
    height: 38,
    textTransform: 'capitalize',
    letterSpacing: 1.5,
  },
});
