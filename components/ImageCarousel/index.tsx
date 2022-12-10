/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Pressable, View, Text, TextInput } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  FadingTransition,
  interpolate,
  RotateInUpLeft,
  SlideInLeft,
  SlideOutRight,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { ResultObject } from '../../types';
import { styles } from './styles';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';

interface Props {
  result: ResultObject;
  guesses: number;
  checkAnswer: (arg0: ResultObject, arg1: string) => boolean;
  textInputRef: React.RefObject<TextInput>;
}

export const ImageCarousel = ({ result, guesses, checkAnswer, textInputRef }: Props) => {
  const [imageUrls, setImageUrls] = useState<string[]>([result.urls[0].toString()]);
  const [imageToShow, setImageToShow] = useState(0);

  const imageRef = React.createRef<View>();

  const getUrls = (obj: ResultObject) => {
    if (obj !== undefined) {
      if (obj.urls[0] !== undefined && guesses === 0) {
        setImageUrls([obj.urls[0].toString()]);
      }
      if (obj.urls[guesses] !== undefined && guesses > 0) {
        setImageUrls([...imageUrls, obj.urls[guesses].toString()]);
      } else {
        return;
      }
    } else {
      return;
    }
  };

  const ShowImage = useCallback(
    ({ imageToShow, uris }: { imageToShow: number; uris: string[] }) => {
      const theme = useColorScheme();
      const AnimatedImage = Animated.createAnimatedComponent(Image);
      const config = {
        duration: 500,
        easing: Easing.ease,
      };

      // const progress = useDerivedValue(() => {
      //   return withTiming(imageToShow === imageToShow ? 1 : 0, config);
      // });

      const animatedIn = useAnimatedStyle(() => {
        const opacity = withTiming(imageToShow === imageToShow ? 1 : 0, config);

        return {
          opacity,
        };
      });

      const animatedOut = useAnimatedStyle(() => {
        const opacity = withTiming(imageToShow === imageToShow ? 0 : 1, config);

        return {
          opacity,
        };
      });

      return (
        <Animated.View
          style={[{ width: 300, height: 300 }]}
          // entering={SlideInLeft}
          // exiting={SlideOutRight}
        >
          <AnimatedImage
            // entering={SlideInLeft.delay(300).springify()}
            style={[
              { borderColor: Colors[theme]['border'], position: 'absolute', alignSelf: 'center' },
              styles.image,
              animatedOut,
            ]}
            source={{ width: 300, height: 300, uri: uris[imageToShow - 1] }}
          />
          <AnimatedImage
            // entering={SlideInLeft.delay(300).springify()}
            style={[{ borderColor: Colors[theme]['border'] }, styles.image, animatedIn]}
            source={{ width: 300, height: 300, uri: uris[imageToShow] }}
          />
        </Animated.View>
      );
    },
    [imageToShow]
  );

  const showImageIndex = useCallback(
    (imageIndex: number) => {
      console.log(imageIndex);
      const toDisplay = imageUrls.map((_value, index) => {
        if (index === imageIndex) {
          return (
            <View key={index} style={styles.imageIndex}>
              <Text style={{ fontSize: 20, color: '#ffffff' }}>●</Text>
            </View>
          );
        }
        if (index !== imageIndex) {
          if (index < imageIndex) {
            return (
              <Pressable
                key={index}
                style={styles.imageIndex}
                onPress={() => {
                  setImageToShow(index);
                }}
              >
                <Text style={{ fontSize: 18, color: '#9c9c9c91' }}>○</Text>
              </Pressable>
            );
          }
          if (index > imageIndex) {
            return (
              <Pressable
                key={index}
                style={styles.imageIndex}
                onPress={() => {
                  setImageToShow(index);
                }}
              >
                <Text style={{ fontSize: 18, color: '#9c9c9c91' }}>○</Text>
              </Pressable>
            );
          } else {
            return index === imageIndex ? (
              <Text style={{ fontSize: 20, color: '#ffffff' }} key={index}>
                ●
              </Text>
            ) : (
              <Text style={{ fontSize: 18, color: '#9c9c9c91' }} key={index}>
                ○
              </Text>
            );
          }
        } else {
          return index === imageIndex ? (
            <Text style={{ fontSize: 20, color: '#ffffff' }} key={index}>
              ●
            </Text>
          ) : (
            <Text style={{ fontSize: 18, color: '#9c9c9c91' }} key={index}>
              ○
            </Text>
          );
        }
      });

      return toDisplay;
    },
    [imageToShow]
  );

  useEffect(() => {
    getUrls(result);
  }, [result, guesses]);

  useEffect(() => {
    imageUrls.length >= imageToShow && imageUrls.length !== imageToShow + 1
      ? setImageToShow(imageToShow + 1)
      : setImageToShow(0);
  }, [imageUrls]);

  return (
    <View>
      <Pressable
        ref={imageRef}
        style={styles.imageContainer}
        onPress={() => {
          imageRef.current?.blur();
          textInputRef.current?.focus();
          if (imageUrls.length >= 1) {
            imageUrls.length >= imageToShow + 1 && imageUrls.length !== imageToShow + 1
              ? setImageToShow(imageToShow + 1)
              : setImageToShow(0);
          }
        }}
      >
        <ShowImage key={imageToShow} imageToShow={imageToShow} uris={imageUrls} />
      </Pressable>
      <View style={styles.imageIndex}>{showImageIndex(imageToShow)}</View>
      <TextInput style={{ width: 0, height: 0 }} />
    </View>
  );
};
