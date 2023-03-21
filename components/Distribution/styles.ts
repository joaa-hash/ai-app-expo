import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    paddingHorizontal: 18,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderColor: '#232323',
  },
  guessBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#232323',
    borderBottomWidth: 1,
    flex: 1,
    paddingBottom: 8,
  },
  guessBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  line: {
    backgroundColor: '#fff',
    height: '100%',
    minWidth: '.5%',
    maxWidth: '90%',
  },
  answerIndex: {
    fontWeight: '700',
    fontSize: 30,
    paddingRight: 14,
  },
  input: {
    paddingRight: 14,
    paddingTop: 0,
    fontWeight: '700',
    fontSize: 14,
    alignSelf: 'center',
  },
});
