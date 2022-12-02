import { Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, View } from '../components/Themed';
import { auth } from '../firebase';
import { getFirestore } from 'firebase/firestore'
import { RootStackParamList } from '../types';

export default function TabTwoScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  

  const handleSignOut = () => {
    auth
    .signOut()
    .then(() => {
      navigation.replace("Login")
    })
    .catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{auth.currentUser?.email}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Pressable
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={[{ color: '#ffffff' }]}>Sign Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    backgroundColor: '#3f2fd3',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
});
