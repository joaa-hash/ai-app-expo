import { StyleProp, ViewStyle } from 'react-native';
import { PlatformTypes } from '../../types';

export const checkStyles = (
  mobileStyle: StyleProp<ViewStyle>,
  webStyle: StyleProp<ViewStyle>,
  platform: PlatformTypes
) => {
  return platform.OS === 'web' ? webStyle : mobileStyle;
};
