import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  statRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'baseline',
    justifyContent: 'space-evenly',
    paddingVertical: 22,
  },
  statCol: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statText: {
    color: '#fff',
    fontSize: 42,
    letterSpacing: 2.5,
  },
  statDescription: {
    color: '#fff',
    fontSize: 9,
    letterSpacing: 2.5,
  },
});
