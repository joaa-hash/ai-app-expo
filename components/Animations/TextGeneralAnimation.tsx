import { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { View, AnimatedText } from '../Theme/Themed';

type Props = {
  styleObject: {
    color: string;
    fontSize: number;
    letterSpacing: number;
    paddingVertical: number;
  };
  input: string;
  checkedAnswer: boolean;
};

export const TextGeneralAnimation = ({ styleObject, input, checkedAnswer }: Props) => {
  const config = {
    duration: 500,
    easing: Easing.ease,
  };

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = withTiming(checkedAnswer ? 1 : 0, config);
    return {
      opacity,
    };
  });

  return (
    <View>
      <AnimatedText style={[styleObject, animatedStyle]}>{input}</AnimatedText>
    </View>
  );
};
