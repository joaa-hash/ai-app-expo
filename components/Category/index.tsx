import React from 'react';
import { StyleSheet } from 'react-native';
import { Head } from '../Theme/Themed';
import { ResultObject } from '../../types';

export const Category = (result: ResultObject) => {
  return result.category.map((el, idx) => {
    return (
      <Head key={idx} style={styles.typeText}>
        {el.toUpperCase()}
        {idx + 1 !== result.category.length && result.category.length > 1 ? ' | ' : null}
      </Head>
    );
  });
};

const styles = StyleSheet.create({
  typeText: {
    fontWeight: '700',
  },
});
