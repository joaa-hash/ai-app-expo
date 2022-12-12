import React, { useCallback, useEffect, useState } from 'react';
import { Image, Pressable, Animated, TextInput, View as RNView } from 'react-native';
import { View, TextPrimary } from '../Theme/Themed';
import { ResultObject } from '../../types';
import { styles } from './styles';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';

interface Props {
  result: ResultObject;
  guesses: number;
  textInputRef: React.RefObject<TextInput>;
}

export const ImageCarousel = ({ result, guesses, textInputRef }: Props) => {
  const [imageUrls, setImageUrls] = useState<string[]>([result.urls[0].toString()]);
  const [imageToShow, setImageToShow] = useState(0);
  const theme = useColorScheme();

  const imageIndexRef = React.createRef<RNView>();

  const getUrls = (obj: ResultObject) => {
    if (obj !== undefined) {
      if (obj.urls[0] !== undefined && guesses === 0) {
        setImageUrls([obj.urls[0].toString()]);
      }
      if (obj.urls[guesses] !== undefined && guesses > 0) {
        setImageUrls([...imageUrls, obj.urls[guesses].toString()]);
      } else return;
    } else return;
  };

  const fadeIn = new Animated.Value(0);
  const fadeOut = new Animated.Value(1);

  const imageChangeIn = () => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const imageChangeOut = () => {
    Animated.timing(fadeOut, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };

  const showImage = useCallback(
    (index: number, uris: string[]) => {
      if (guesses === 0) {
        return (
          <View>
            <Image
              style={[styles.image, { borderColor: Colors[theme]['border'], borderWidth: 1 }]}
              source={{ width: 300, height: 300, uri: uris[index] }}
            />
          </View>
        );
      }
      if (guesses >= 1) {
        if (imageToShow === 0) {
          return (
            <View>
              <Animated.Image
                style={[
                  styles.image,
                  {
                    position: 'absolute',
                    alignSelf: 'center',
                    opacity: fadeOut,
                    borderColor: Colors[theme]['border'],
                    borderWidth: 1,
                  },
                ]}
                source={{ width: 300, height: 300, uri: uris[uris.length - 1] }}
              />
              <Animated.Image
                style={[
                  styles.image,
                  { opacity: fadeIn, borderColor: Colors[theme]['border'], borderWidth: 1 },
                ]}
                source={{ width: 300, height: 300, uri: uris[index] }}
              />
            </View>
          );
        } else {
          return (
            <View>
              <Animated.Image
                style={[
                  styles.image,
                  {
                    position: 'absolute',
                    alignSelf: 'center',
                    opacity: fadeOut,
                    borderColor: Colors[theme]['border'],
                    borderWidth: 1,
                  },
                ]}
                source={{ width: 300, height: 300, uri: uris[index - 1] }}
              />
              <Animated.Image
                style={[
                  styles.image,
                  { opacity: fadeIn, borderColor: Colors[theme]['border'], borderWidth: 1 },
                ]}
                source={{ width: 300, height: 300, uri: uris[index] }}
              />
            </View>
          );
        }
      } else {
        return (
          <View>
            <Animated.Image
              style={[
                styles.image,
                {
                  position: 'absolute',
                  alignSelf: 'center',
                  opacity: fadeOut,
                  borderColor: Colors[theme]['border'],
                  borderWidth: 1,
                },
              ]}
              source={{ width: 300, height: 300, uri: uris[index - 1] }}
            />
            <Animated.Image
              style={[
                styles.image,
                { opacity: fadeIn, borderColor: Colors[theme]['border'], borderWidth: 1 },
              ]}
              source={{ width: 300, height: 300, uri: uris[index] }}
            />
          </View>
        );
      }
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
              <TextPrimary style={{ fontSize: 20 }}>●</TextPrimary>
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
                <TextPrimary style={{ fontSize: 18, color: '#9c9c9c91' }}>○</TextPrimary>
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
                <TextPrimary style={{ fontSize: 18, color: '#9c9c9c91' }}>○</TextPrimary>
              </Pressable>
            );
          } else {
            return index === imageIndex ? (
              <TextPrimary style={{ fontSize: 20 }} key={index}>
                ●
              </TextPrimary>
            ) : (
              <TextPrimary style={{ fontSize: 18, color: '#9c9c9c91' }} key={index}>
                ○
              </TextPrimary>
            );
          }
        } else {
          return index === imageIndex ? (
            <TextPrimary style={{ fontSize: 20 }} key={index}>
              ●
            </TextPrimary>
          ) : (
            <TextPrimary style={{ fontSize: 18, color: '#9c9c9c91' }} key={index}>
              ○
            </TextPrimary>
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
    imageChangeOut();
    imageChangeIn();
  }, [imageToShow]);

  useEffect(() => {
    imageUrls.length >= imageToShow && imageUrls.length !== imageToShow + 1
      ? setImageToShow(imageToShow + 1)
      : setImageToShow(0);
  }, [imageUrls]);

  return (
    <View>
      <Pressable
        ref={imageIndexRef}
        style={[styles.imageContainer]}
        onPress={() => {
          imageIndexRef.current?.blur();
          textInputRef.current?.focus();
          if (imageUrls.length >= 1) {
            imageUrls.length >= imageToShow + 1 && imageUrls.length !== imageToShow + 1
              ? setImageToShow(imageToShow + 1)
              : setImageToShow(0);
          }
        }}
      >
        {showImage(imageToShow, imageUrls)}
      </Pressable>
      <View style={styles.imageIndex}>{showImageIndex(imageToShow)}</View>
    </View>
  );
};
