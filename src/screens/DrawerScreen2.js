import React, {Component} from 'react';
import {
  ImageBackground,
  View,
  StatusBar,
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Content,
  Text,
  Tab,
  Tabs,
  Header,
  Left,
  Right,
  Body,
  Item,
  Input,
  Label,
} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import Buy from './Buy';
import Sell from './Sell';
import HeaderView from '../components/HeaderView';
import colors, {appTheme} from '../constants/colors';
import {spacing} from '../constants/dimension';
import fontSizes from '../constants/fontSizes';

const deviceHeight = Dimensions.get('window').height;

const MyHeader = ({navigation}) => {
  return (
    <Header style={{backgroundColor: appTheme.appBlue, flexDirection: 'row'}}>
      <Left>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" color={appTheme.textPrimary} size={35} />
        </TouchableOpacity>
      </Left>
      <Body>
        <Text style={{fontSize: 21, color: appTheme.textPrimary}}>Drawer</Text>
      </Body>
      <Right>
        <TouchableOpacity onPress={() => {}}>
          <Icon name="user" color={appTheme.textPrimary} size={35} />
        </TouchableOpacity>
      </Right>
    </Header>
  );
};

const DrawerScreen2 = ({navigation}) => {
  return (
    <Container>
      <HeaderView navigation={navigation} />

      <Tabs>
        <Tab
          activeTabStyle={{backgroundColor: appTheme.appBlue}}
          tabStyle={{backgroundColor: appTheme.appBlue}}
          heading="Buy">
          <Buy navigation={navigation} />
        </Tab>
        <Tab
          activeTabStyle={{backgroundColor: appTheme.appBlue}}
          tabStyle={{backgroundColor: appTheme.appBlue}}
          heading="Sell">
          <Sell />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default DrawerScreen2;
