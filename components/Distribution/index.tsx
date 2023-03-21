import React from 'react';
import { Profile } from '../../types';
import { View, TextPrimary, SubHead, SubTextTertiary } from '../Theme/Themed';
import { styles } from './styles';

type Props = {
  userData: Profile;
};

export const Distribution = ({ userData }: Props): JSX.Element => {
  const distributionMap = (profile: Profile): JSX.Element[] => {
    if (profile) {
      return Object.keys(profile.guessHistory).map((key, index) => {
        const distroPercentage = profile.guessHistory[key as keyof object] / profile.gamesPlayed;
        const width =
          profile.guessHistory[key as keyof object] === 0 ? 0 : `${distroPercentage * 100}%`;
        const backgroundColor = `rgba(255, 255, 255, ${distroPercentage + 0.5})`;

        return (
          <View key={index} style={[styles.rowContainer]}>
            <TextPrimary style={styles.answerIndex}>{index + 1}</TextPrimary>
            <View style={[styles.guessBarContainer]}>
              <View style={[styles.guessBar]}>
                <SubTextTertiary style={[styles.input]}>
                  {profile.guessHistory[key as keyof object]}
                </SubTextTertiary>
                <View
                  style={[
                    styles.line,
                    {
                      width,
                      backgroundColor,
                    },
                  ]}
                >
                  <TextPrimary> </TextPrimary>
                </View>
              </View>
            </View>
          </View>
        );
      });
    } else return [<></>];
  };

  return (
    <View style={styles.container}>
      <SubHead>Guess Distribution:</SubHead>
      <View style={styles.mapContainer}>
        {userData ? distributionMap(userData) : <TextPrimary>N/A</TextPrimary>}
      </View>
    </View>
  );
};
