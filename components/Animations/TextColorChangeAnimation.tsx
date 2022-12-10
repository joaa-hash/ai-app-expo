import { StyleSheet, TextInput } from 'react-native';
import {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { View, AnimatedText } from '../../components/Theme/Themed';
import { setFontSize } from '../../hooks/utils/setFontSize';

type Props = {
  color: string;
  input: string;
  inputRef: React.RefObject<TextInput>;
};

export const TextColorChangeAnimation = ({ color, input, inputRef }: Props) => {
  const config = {
    duration: 1700,
    easing: Easing.ease,
  };

  const progress = useDerivedValue(() => {
    return withTiming(inputRef.current?.focus ? 1 : 0, config);
  });

  const animatedStyle = useAnimatedStyle(() => {
    const textColor = interpolateColor(progress.value, [0, 1], ['#ffffff', color]);
    return {
      color: textColor,
    };
  });

  return (
    <View>
      <AnimatedText
        style={[animatedStyle, styles.answerList, { fontSize: setFontSize(input.length) }]}
      >
        {input}
      </AnimatedText>
    </View>
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
