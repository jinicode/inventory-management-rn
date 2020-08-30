import {
  Body,
  Container,
  Header,
  Left,
  Right,
  Tab,
  Tabs,
  Text,
} from 'native-base';
import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import HeaderView from '../components/HeaderView';
import {appTheme} from '../constants/colors';
import Buy from './Buy';
import Sell from './Sell';

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
