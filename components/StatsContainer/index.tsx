import React from 'react';
import { TextPrimary, View } from '../Theme/Themed';
import { styles } from './styles';

export const StatsContainer: React.FC = () => {
  return (
    <View style={styles.statRow}>
      <View style={styles.statCol}>
        <TextPrimary style={styles.statText}>10</TextPrimary>
        <TextPrimary style={styles.statDescription}>PLAYED</TextPrimary>
      </View>
      <View style={styles.statCol}>
        <TextPrimary style={styles.statText}>50</TextPrimary>
        <TextPrimary style={styles.statDescription}>WIN %</TextPrimary>
      </View>
      <View style={styles.statCol}>
        <TextPrimary style={styles.statText}>14</TextPrimary>
        <TextPrimary style={styles.statDescription}>STREAK</TextPrimary>
      </View>
      <View style={styles.statCol}>
        <TextPrimary style={styles.statText}>38</TextPrimary>
        <TextPrimary style={styles.statDescription}>ALL-TIME</TextPrimary>
        <TextPrimary style={styles.statDescription}>STREAK</TextPrimary>
      </View>
    </View>
  );
};
