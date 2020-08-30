import React from 'react';
import {
  Body,
  Input,
  Container,
  Content,
  Item,
  Label,
  Icon,
  Header,
} from 'native-base';

import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors, {appTheme} from '../constants/colors';
import {spacing} from '../constants/dimension';
import fontSizes from '../constants/fontSizes';
const RegisterScreen = ({navigation}) => {
  return (
    <Container style={{backgroundColor: appTheme.appgreyBackground}}>
      <Header
        style={{
          backgroundColor: appTheme.appBlue,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        androidStatusBarColor={appTheme.statusBar}>
        <Text style={{color: appTheme.textPrimary, fontSize: 20}}>
          Register
        </Text>
      </Header>
      <Content>
        <Body>
          {/* <Text style={styles.heading}>Register</Text> */}
          <Text
            style={{
              alignSelf: 'flex-start',
              fontSize: 25,
              color: appTheme.paleBlue,
              marginLeft: 28,
              marginTop: 25,
              marginBottom: 10,
            }}>
            Account
          </Text>

          <Item floatingLabel style={styles.inputBox}>
            <Label style={styles.label}>Full Name</Label>

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
            <Label style={styles.label}>Email-id</Label>

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
              secureTextEntry
            />
          </Item>
          <Item floatingLabel style={styles.inputBox}>
            <Label style={styles.label}>Confirm Password</Label>

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
          <Text
            style={{
              alignSelf: 'flex-start',
              fontSize: 25,
              color: appTheme.paleBlue,

              marginLeft: 28,

              marginTop: 25,
              marginBottom: 10,
              marginBottom: 10,
            }}>
            Shop Details
          </Text>
          <Item floatingLabel style={styles.inputBox}>
            <Label style={styles.label}>Name</Label>

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
            <Label style={styles.label}>Address</Label>

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
          <TouchableOpacity
            rounded
            style={styles.loginButton}
            onPress={() => {
              navigation.navigate('LoginScreen');
            }}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </Body>
      </Content>
    </Container>
  );
};

export default RegisterScreen;

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
    height: 40,
    backgroundColor: appTheme.appBlue,
    borderRadius: 20,
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
