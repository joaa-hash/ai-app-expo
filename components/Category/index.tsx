import React from 'react';
import { StyleSheet } from 'react-native';
import { Head, TextPrimary } from '../Theme/Themed';
import { ResultObject } from '../../types';

export const Category = (result: ResultObject) => {
  return result.type.map((el, idx) => {
    return (
      <Head key={idx} style={styles.typeText}>
        {el.toUpperCase()}
        {idx + 1 !== result.type.length && result.type.length > 1 ? ' | ' : null}
      </Head>
    );
  });
};

const styles = StyleSheet.create({
  typeText: {
    fontWeight: '700',
  },
});
