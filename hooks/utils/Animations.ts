import { Animated } from 'react-native';

export const modalFadeIn = new Animated.Value(1);
export const modalFadeOut = new Animated.Value(0.7);

export const modalIn = () => {
  Animated.timing(modalFadeIn, {
    toValue: 0.7,
    duration: 400,
    useNativeDriver: false,
  }).start();
};

export const modalOut = () => {
  Animated.timing(modalFadeOut, {
    toValue: 1,
    duration: 400,
    useNativeDriver: false,
  }).start();
};

export const fadeInColorChange = new Animated.Value(0);
export const fadeOutColorChange = new Animated.Value(1);

export const colorChangeIn = () => {
  Animated.timing(fadeInColorChange, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: false,
  }).start();
};

export const colorChangeOut = () => {
  setTimeout(() => {
    Animated.timing(fadeOutColorChange, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, 300);
};
