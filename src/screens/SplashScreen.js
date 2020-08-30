import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Container, Content, Body} from 'native-base';
import {StackActions} from '@react-navigation/native';
import colors, {appTheme} from '../constants/colors';
import {spacing} from '../constants/dimension';
import fontSizes from '../constants/fontSizes';

export default class SplashScreen extends React.Component {
  componentDidMount = async () => {
    try {
      const auth_key = await AsyncStorage.getItem('auth_key'); // gets auth token from async storage
      console.log('authkey', auth_key);
      const data = await fetch(
        'http://chouhanaryan.pythonanywhere.com/auth/users/me/',
        {
          method: 'GET',
          headers: {
            Authorization: `Token ${auth_key}`,
          },
        },
      );
      console.log('okStatus', data.ok);
      if (data.ok) {
        // its a valid user
        setTimeout(
          () => this.props.navigation.dispatch(StackActions.replace('Drawer')),
          1000,
        );
      } else {
        setTimeout(
          () =>
            this.props.navigation.dispatch(StackActions.replace('LoginScreen')),
          1000,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Container>
        <Content>
          <Body style={styles.container}>
            <Image
              style={{
                width: 374,
                height: 300,
                justifyContent: 'center',
                marginVertical: 40,
                resizeMode: 'cover',
              }}
              source={require('../Images/store-inventory-logo.jpg')}
            />
          </Body>
        </Content>
      </Container>
    );
  }
}
const DEVICE_WIDTH = Dimensions.get('screen').width;
const DEVICE_HEIGHT = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    textAlign: 'center',
    fontSize: 30,
    color: appTheme.paleBlue,
    fontWeight: 'bold',
    marginTop: 65,
    lineHeight: 50,
  },
});
