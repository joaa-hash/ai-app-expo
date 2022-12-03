import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ResultObject } from '../types';

export const getTypeText = (obj: ResultObject) => {
  if (obj !== null) {
    return obj.type.map((el, idx) => {
      return (
        <Text key={idx} style={styles.typeText}>
          {el.toUpperCase()}
          {idx + 1 !== obj.type.length && obj.type.length > 1 ? ' | ' : null}
        </Text>
      );
    });
  } else {
    return <></>;
  }
};

const styles = StyleSheet.create({
  typeText: {
    color: '#fff',
    fontSize: 42,
    letterSpacing: 16,
    fontWeight: '700',
  },
});
