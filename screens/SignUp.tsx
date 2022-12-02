import React, { useCallback } from 'react'
import { ColorSchemeName, KeyboardAvoidingView, Modal, Pressable, StyleSheet } from 'react-native'
import { ScrollView, View, Text, TextInput } from '../components/Themed'

export default function Signup(props: { 
  email: string,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  setVerifyPassword: React.Dispatch<React.SetStateAction<string>>,
  setProfile: React.Dispatch<React.SetStateAction<{
    company: string;
    firstName: string;
    lastName: string;
    phoneNo: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  }>>,
  password: string,
  verifyPassword: string,
  validatePassword: () => boolean,
  profile: {
    company: string;
    firstName: string;
    lastName: string;
    phoneNo: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  },
  modalState: boolean,
  setModalState: React.Dispatch<React.SetStateAction<boolean>>,
  theme: NonNullable<ColorSchemeName>,
  colorFromProps: {
    text: string;
    background: string;
    tint: string;
    tabIconDefault: string;
    tabIconSelected: string;
    border: string;
  } | {
      text: string;
      background: string;
      tint: string;
      tabIconDefault: string;
      tabIconSelected: string;
      border: string;
  },
  blankProfile: {
    company: string;
    firstName: string;
    lastName: string;
    phoneNo: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  },
  handleSignUp: () => void
}) {
  const { 
    email,
    setEmail,
    password,
    setPassword,
    verifyPassword,
    setVerifyPassword,
    validatePassword,
    profile,
    setProfile,
    modalState,
    setModalState,
    theme,
    colorFromProps,
    blankProfile,
    handleSignUp
  } = props;

  const checkRequiredForRegister = useCallback(() => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return password === verifyPassword 
      && validatePassword()
      && reg.test(email)
      && profile.firstName.length > 0
      && profile.lastName.length > 0
      && profile.phoneNo.length === 10
      ? false
      : true
  }, [password, verifyPassword, email, profile.firstName, profile.lastName, profile.phoneNo])

  const disableRegisterButton = useCallback(() => {
    return (
      { 
        backgroundColor: checkRequiredForRegister() === true ? colorFromProps.background : '#3f2fd3',
        borderColor: checkRequiredForRegister() === true ? '#3f3f3f' : '#3f2fd3'
      }
    )
  }, [password, verifyPassword, theme, email, profile]);

  const changeTextColorForRegister = useCallback(() => {
    return (
      { 
        color: checkRequiredForRegister() === true ? colorFromProps.text : '#ffffff' 
      }
    )
  }, [theme, email, password, verifyPassword, profile.firstName, profile.lastName, profile.phoneNo]);

  const formatPhoneNo = useCallback((text: string) => {
    var cleaned = ("" + text).replace(/\D/g, "");
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? "+1 " : "", 
        number = [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
      return number;
    }
    return text;
  }, [profile.phoneNo])

  return (
    <Modal
      animationType='slide'
      visible={modalState}
      onRequestClose={() => {
        setModalState(!modalState)
      }}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
      >
        <View style={styles.container}>
          <View style={styles.modalView}>
            <ScrollView style={styles.modalInputContainer}>
            <Text style={styles.label}>Set Login Credentials</Text>
              <TextInput 
                placeholder='Email'
                placeholderTextColor='#3f3f3f'
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
                keyboardType='email-address'
                autoCapitalize='none'
                autoComplete='email'
              />
              <TextInput 
                placeholder='Password'
                placeholderTextColor='#3f3f3f'
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
                autoCorrect={false}
                autoCapitalize='none'
                autoComplete='password-new'
                passwordRules='minlength: 8; required: lower; required: upper; required: digit; required: [-]'
              />
              <Text style={styles.subText}>
                Password must be at least 
                8 characters have one upper & lowercase, 
                one number & one special character
              </Text>
              <TextInput 
                placeholder='Verify Password'
                placeholderTextColor='#3f3f3f'
                value={verifyPassword}
                onChangeText={text => setVerifyPassword(text)}
                style={styles.input}
                secureTextEntry
                autoCorrect={false}
                autoComplete='password-new'
                passwordRules='minlength: 8; required: lower; required: upper; required: digit; required: [-]'
              />
              <View style={styles.profileInformationContainer}>
                <Text style={styles.label}>Profile Information</Text>
                <TextInput 
                  placeholder='Company'
                  placeholderTextColor='#3f3f3f'
                  value={profile.company}
                  onChangeText={text => setProfile({ ...profile, company: text})}
                  style={styles.input}
                  autoCorrect={false}
                />
                <View style={styles.nameContainer}>
                  <View style={{ flexDirection: 'column', width: '47.5%' }}>
                    <TextInput 
                      placeholder='First Name'
                      placeholderTextColor='#3f3f3f'
                      value={profile.firstName}
                      onChangeText={text => setProfile({ ...profile, firstName: text})}
                      style={styles.input}
                      autoCorrect={false}
                      autoComplete='name'
                      autoCapitalize='characters'
                      keyboardType='name-phone-pad'
                    />
                    <Text style={[styles.subText, { fontStyle: 'italic', paddingHorizontal: 4 }]}>Required</Text>
                  </View>
                  <View style={{ flexDirection: 'column', width: '47.5%' }}>
                    <TextInput 
                      placeholder='Last Name'
                      placeholderTextColor='#3f3f3f'
                      value={profile.lastName}
                      onChangeText={text => setProfile({ ...profile, lastName: text})}
                      style={styles.input}
                      autoCorrect={false}
                      autoComplete='name-family'
                      autoCapitalize='characters'
                      keyboardType='name-phone-pad'
                    />
                    <Text style={[styles.subText, { fontStyle: 'italic', paddingHorizontal: 4 }]}>Required</Text>
                  </View>
                </View>
                <View style={{ paddingBottom: 6 }}>
                  <TextInput 
                    placeholder='Phone'
                    placeholderTextColor='#3f3f3f'
                    value={formatPhoneNo(profile.phoneNo)}
                    onChangeText={text => setProfile({ ...profile, phoneNo: text})}
                    style={styles.input}
                    autoCorrect={false}
                    autoComplete='tel'
                    keyboardType='phone-pad'
                  />
                  <Text style={[styles.subText, { fontStyle: 'italic', paddingHorizontal: 4 }]}>Required</Text>
                </View>
                <View style={styles.addressContainer}>
                  <TextInput 
                    placeholder='Address'
                    placeholderTextColor='#3f3f3f'
                    value={profile.address}
                    onChangeText={text => setProfile({ ...profile, address: text})}
                    style={styles.input}
                    autoCorrect={false}
                    autoComplete='street-address'
                  />
                  <View style={styles.localityContainer}>
                    <TextInput 
                      placeholder='City'
                      placeholderTextColor='#3f3f3f'
                      value={profile.city}
                      onChangeText={text => setProfile({ ...profile, city: text})}
                      style={[styles.input, { width: '69%' }]}
                      autoCorrect={false}
                      autoComplete='postal-address-locality'
                    />
                    <TextInput 
                      placeholder='State'
                      placeholderTextColor='#3f3f3f'
                      value={profile.state}
                      onChangeText={text => setProfile({ ...profile, state: text})}
                      style={[styles.input, { width: '28%' }]}
                      autoCorrect={false}
                      maxLength={2}
                      autoComplete='postal-address-region'
                      autoCapitalize='characters'
                    />
                  </View>
                  <TextInput 
                    placeholder='Zip'
                    placeholderTextColor='#3f3f3f'
                    value={profile.zipCode}
                    onChangeText={text => setProfile({ ...profile, zipCode: text})}
                    style={styles.input}
                    autoCorrect={false}
                    maxLength={5}
                    autoComplete='postal-address-extended-postal-code'
                    keyboardType='number-pad'
                  />
                </View>
              </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
              <Pressable
                onPress={() => {
                  handleSignUp()
                  setModalState(!modalState)
                }}
                style={[styles.button, disableRegisterButton()]}
                disabled={checkRequiredForRegister()}
              >
                <Text style={[styles.buttonText, changeTextColorForRegister()]}>Submit</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setEmail('')
                  setPassword('')
                  setVerifyPassword('')
                  setProfile(blankProfile)
                  setModalState(!modalState)
                }}
                style={styles.cancelButton}
              >
                <Text style={[styles.buttonText, { color: '#ffffff' }]}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#3f3f3f',
    marginTop: 6,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  modalInputContainer: {
    width: '100%',
    paddingHorizontal: 28,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 28,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1.5
  },
  buttonOutline: {
    marginTop: 5,
    borderColor: '#3f2fd3',
    borderWidth: 1.5,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
  },
  cancelButton: {
    backgroundColor: '#d55252',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  modalView: {
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#6d6d6d',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    height: '80%'
  },
  subText: {
    fontSize: 10,
    color: '#3f3f3f',
    paddingHorizontal: 12,
    paddingTop: 5
  },
  profileInformationContainer: {
    paddingVertical: 10
  },
  label: {
    paddingVertical: 8,
    fontSize: 18,
    fontWeight: 'bold'
  },
  nameContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 6
  },
  addressContainer: {
    
  },
  localityContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 16
  },
})
