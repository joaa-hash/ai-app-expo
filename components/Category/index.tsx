import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '../Theme/Themed';
import { ResultObject } from '../../types';

export const Category = (result: ResultObject) => {
  return result.type.map((el, idx) => {
    return (
      <Text key={idx} style={styles.typeText}>
        {el.toUpperCase()}
        {idx + 1 !== result.type.length && result.type.length > 1 ? ' | ' : null}
      </Text>
    );
  });
};

const styles = StyleSheet.create({
  typeText: {
    color: '#fff',
    fontSize: 42,
    letterSpacing: 16,
    fontWeight: '700',
  },
});
