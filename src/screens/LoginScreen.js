import AsyncStorage from '@react-native-community/async-storage';
import {
  Body,

  Container,
  Content,


  Header, Input,


  Item,
  Label
} from 'native-base';
import React, { useState } from 'react';
import {
  Image, StyleSheet,

  Text,
  TouchableOpacity
} from 'react-native';
import { appTheme } from '../constants/colors';
import { showError } from "../utils/notification";


// For Testing enter password : admin   email : admin@admin.com in text inputs

const LoginScreen = ({navigation}) => {
  const [email, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');

  const login = () => {
    // fetching the token by providing email and password
    fetch('http://chouhanaryan.pythonanywhere.com/auth/token/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(res => res.json())
      .then(async data => {
        const token = data.auth_token;
        if (token) {
          console.log('token is: ' + token);

          // storing token in async storage
          try {
            await AsyncStorage.setItem('auth_key', token);
          } catch (error) {
            console.log('Token not saved in async storage properly');
            console.log(error);
          }

          // using the token just received to check the info of the current logged in user
          fetch('http://chouhanaryan.pythonanywhere.com/auth/users/me/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`,
            },
          })
            .then(res => res.json())
            .then(async data => {
              // storing is_staff boolean in async storage
              try {
                await AsyncStorage.setItem(
                  'is_staff',
                  data.is_staff.toString(),
                );
              } catch (error) {
                console.log('is_staff not saved in async storage properly');
                console.log(error);
              }
              navigation.replace('Drawer');
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          showError('Invalid email or password')
           
          
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <Container style={{backgroundColor: appTheme.appgreyBackground}}>
      <Header
        style={{
          backgroundColor: appTheme.appBlue,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        androidStatusBarColor={appTheme.statusBar}>
        <Text style={{color: appTheme.textPrimary, fontSize: 24}}>Login</Text>
      </Header>
      <Content>
        <Body>
          <Image
            style={{
              width: 274,
              height: 207,
              marginVertical: 40,
              marginRight: 10,
            }}
            source={require('../Images/Illustration.png')}
          />

          <Item floatingLabel style={styles.inputBox}>
            <Label style={styles.label}>Email ID</Label>

            <Input
              style={styles.inputArea}
              blurOnSubmit={true}
              onChangeText={value => {
                setUserEmail(value);
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </Item>

          <Item floatingLabel style={styles.inputBox}>
            <Label style={styles.label}>Password</Label>
            <Input
              style={styles.inputArea}
              blurOnSubmit={true}
              onChangeText={value => {
                setUserPassword(value);
              }}
              name="password"
              autoCapitalize="none"
              secureTextEntry
            />
          </Item>

          <TouchableOpacity
            rounded
            style={styles.loginButton}
            onPress={() => {
              login();
            }}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {/* <View style={{ flexDirection: 'row' }}>
            <Text style={styles.newUser}>New user? </Text>
            <TouchableOpacity onPress={() => {
              navigation.navigate('RegisterScreen');
            }}   ><Text style={{
              fontSize: 18,
              textDecorationLine: 'underline',
              color: 'black',
              // borderBottomWidth:1,
              // borderBottomColor: 'black',

              marginTop: 25,
              marginBottom: 10,
              marginBottom: 10,
            }}>Register</Text></TouchableOpacity>
          </View> */}
        </Body>
      </Content>
    </Container>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  newUser: {
    fontSize: 18,
    color: 'black',

    marginTop: 25,
    marginBottom: 10,
    marginBottom: 10,
  },
  loginButton: {
    width: 280,
    height: 50,
    backgroundColor: appTheme.appBlue,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 25,
  },
  buttonText: {
    color: appTheme.textPrimary,
    fontSize: 20,
    alignSelf: 'center',
    alignContent: 'flex-start',
    textAlign: 'center',
  },
  heading: {
    fontSize: 30,
    color: appTheme.paleBlue,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 22,
    color: appTheme.paleBlue,
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 20,
  },
  inputBox: {
    backgroundColor: appTheme.darkGrey,
    borderRadius: 10,
    marginRight: 28,
    marginLeft: 28,
    textAlign: 'left',
    marginVertical: 10,
    height: 55,
  },

  label: {
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    color: appTheme.labelColor,
  },
  inputArea: {
    paddingLeft: 20,
  },
});
