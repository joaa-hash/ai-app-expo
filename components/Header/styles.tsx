import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 30,
    zIndex: 1,
    shadowColor: '#2d2d2dad',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    minHeight: 90,
  },
  logo: {
    fontSize: 28,
  },
  iconText: {
    fontSize: 46,
    lineHeight: 32,
  },
  text: {
    fontSize: 16,
  },
  utilityContainer: {
    flexDirection: 'row',
  },
  authGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signUpAuthButton: {
    marginRight: 30,
    borderColor: '#5346c4',
    borderWidth: 3,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    '&:hover': {
      borderColor: '#fff',
    },
  },
  logInOutAuthButton: {
    marginRight: 30,
    backgroundColor: '#5346c4',
    borderColor: '#5346c4',
    borderWidth: 3,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    '&:hover': {
      borderColor: '#fff',
      backgroundColor: '#fff',
    },
  },
});
