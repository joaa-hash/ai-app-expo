import React from 'react';
import { Profile } from '../../types';
import { TextPrimary, View } from '../Theme/Themed';
import { styles } from './styles';

type Props = {
  userData: Profile;
};

export const StatsContainer = ({ userData }: Props) => {
  return (
    <View style={styles.statRow}>
      {userData ? (
        <View style={styles.statRow}>
          <View style={styles.statCol}>
            <TextPrimary style={styles.statText}>
              {userData ? userData?.gamesPlayed : 0}
            </TextPrimary>
            <TextPrimary style={styles.statDescription}>PLAYED</TextPrimary>
          </View>
          <View style={styles.statCol}>
            <TextPrimary style={styles.statText}>
              {userData ? Math.round((userData?.wins / userData.gamesPlayed) * 100) : 0}
            </TextPrimary>
            <TextPrimary style={styles.statDescription}>WIN %</TextPrimary>
          </View>
          <View style={styles.statCol}>
            <TextPrimary style={styles.statText}>{userData ? userData?.streak : 0}</TextPrimary>
            <TextPrimary style={styles.statDescription}>STREAK</TextPrimary>
          </View>
          <View style={styles.statCol}>
            <TextPrimary style={styles.statText}>
              {userData ? userData?.longestStreak : 0}
            </TextPrimary>
            <TextPrimary style={styles.statDescription}>ALL-TIME</TextPrimary>
            <TextPrimary style={styles.statDescription}>STREAK</TextPrimary>
          </View>
        </View>
      ) : (
        <TextPrimary>Sorry, we were unable to pull stats, check back later.</TextPrimary>
      )}
    </View>
  );
};
