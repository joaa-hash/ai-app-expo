import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    minWidth: 480,
    width: '60%',
    maxWidth: 600,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    top: '30%',
    zIndex: 1,
  },
  modalView: {
    width: '100%',
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#6d6d6da5',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 8,
    elevation: 0,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    paddingTop: 4,
    paddingRight: 8,
  },
  closeButtonText: {
    fontSize: 18,
    padding: 8,
    fontWeight: '900',
  },
  lineBreak: {
    width: '80%',
    height: 1,
  },
});
