import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from './styles';

interface Props {
  modalState: boolean,
  setModalState: React.Dispatch<React.SetStateAction<boolean>>
}

export const Header: React.FC<{ modalState: boolean, setModalState: React.Dispatch<React.SetStateAction<boolean>> }> = (props: Props) => {

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Header</Text>
      <Pressable
        onPress={() => props.modalState === true ? props.setModalState(false) : props.setModalState(true)}
      >
        <Text style={styles.text}>⚙</Text>
      </Pressable>
    </View>
  );
};
