import { StyleSheet, TouchableOpacity } from 'react-native';

import { TextPrimary, View } from '../components/Theme/Themed';
import { RootStackScreenProps } from '../types';

export default function NotFoundScreen({ navigation }: RootStackScreenProps<'NotFound'>) {
  return (
    <View style={styles.container}>
      <TextPrimary style={styles.title}>This screen doesn't exist.</TextPrimary>
      <TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
        <TextPrimary style={styles.linkText}>Go to home screen!</TextPrimary>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
