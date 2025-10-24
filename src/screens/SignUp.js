import { View, Text, ScrollView,TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Input from '../common/Input';
import Button from '../common/Button';
import { Platform } from 'react-native';
import api from '../core/api';
import { log } from '../core/utils';
import useGlobal from '../core/global';


const SignUp = ({navigation}) => {
   const [username, setUsername] = useState('');
   const [firstname, setFirstname] = useState('');
   const [lastname, setLastname] = useState('');
   const [password1, setPassword] = useState('');
   const [password2, setPassword2] = useState('');
  
   const [usernameError, setUsernameError] = useState('');
   const [firstnameError, setFirstnameError] = useState('');
   const [lastnameError, setLastnameError] = useState('');
   const [password1Error, setPassword1Error] = useState('');
   const [password2Error, setPassword2Error] = useState('');

   // global state
   const login = useGlobal((state) => state.login);








 function onSignUp() {
 // check username
 const failUsername = !username || username.length < 5
  if (failUsername) {
    setUsernameError('Username must be at least 5 characters long');
  }
  // check first name
  const failFirstname = !firstname
  if (failFirstname) {
    setFirstnameError('First name is required');
  }
  // check last name
  const failLastname = !lastname
  if (failLastname) {
    setLastnameError('Last name is required');
  }
  // check password
  const failPassword1 = !password1 || password1.length < 8
  if (failPassword1) {
    setPassword1Error('Password must be at least 8 characters long');
  }
  // check confirm password
  const failPassword2 = password2 !== password1
  if (failPassword2) {
    setPassword2Error('Passwords do not match');
  }
  if (failUsername || failFirstname || failLastname || failPassword1 || failPassword2) {
    return;
  }

   api({
        method: 'post',
        url: 'signup/',
        data: {
          username: username,
          first_name: firstname,
          last_name: lastname,
          password: password1,
        },
      })
        .then(response => {
          log('SignUp:', response.data);
          const credentials = {
				  username: username,
				  password: password
			}
			login(
				credentials, 
				response.data.user,
				// response.data.tokens
			)
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
 }




  return (
    <SafeAreaView style={{flex:1 }}>
      <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>    
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    
    <View style={{flex:1, justifyContent:'center', paddngHorizontal:16 , paddingLeft:20}}>
      <Text style={{fontSize:36, fontWeight:'bold', textAlign:'center', marginBottom: '24'}}>
        Sign Up
      </Text>
      <Input 
       title='Username'
       value={username}
       setValue={setUsername}
       error={usernameError}
       setError={setUsernameError}
      />
      <Input 
      title='First Name' 
      value={firstname}
      setValue={setFirstname}
      error={firstnameError}
      setError={setFirstnameError}
      />
      <Input 
      title='Last Name' 
      value={lastname}
      setValue={setLastname}
      error={lastnameError}
      setError={setLastnameError}

      />
      <Input 
      title='Password'
      value={password1}
      setValue={setPassword}
      error={password1Error}
      setError={setPassword1Error}
      secureTextEntry={true}

      />
      <Input 
      title='Confirm Password'
      value={password2}
      setValue={setPassword2}
      error={password2Error}
      setError={setPassword2Error}
      secureTextEntry={true}

      
      />
      <Button title='Sign In'  onPress={onSignUp}/>

       <Text style={{ color: '#70747a',  paddingVertical:14 ,  textAlign:'center', marginTop:40}}>
            Already have an account? <Text style={{ color: 'blue',}}
              onPress={() => navigation.navigate('SignIn')}>Sign In</Text>
            </Text>

    
    </View>
  
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  
    </SafeAreaView>
  )
}

export default SignUp