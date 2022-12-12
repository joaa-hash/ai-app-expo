import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    top: '40%',
  },
  modalView: {
    minWidth: 360,
    width: '60%',
    maxWidth: '80%',
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
    color: '#fff',
    paddingTop: 4,
    paddingRight: 10,
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 22,
  },
  text: {
    color: '#fff',
  },
  lineBreak: {
    width: '80%',
    backgroundColor: '#fff',
    height: 1,
  },
});
