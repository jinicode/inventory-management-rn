import { Body, Header, Left, Right } from 'native-base';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { appTheme } from '../constants/colors';

const HeaderView = ({navigation, title}) => {
  return (
    <Header
      style={{backgroundColor: appTheme.appBlue, flexDirection: 'row'}}
      androidStatusBarColor={appTheme.statusBar}>
      <Left>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" color={appTheme.textPrimary} size={35} />
        </TouchableOpacity>
      </Left>
      <Body>
        <Text style={{fontSize: 21, color: appTheme.textPrimary}}>{title}</Text>
      </Body>
      <Right>
        <TouchableOpacity onPress={() => navigation.replace('ProfilePage')}>
          <Icon name="user" color={appTheme.textPrimary} size={35} />
        </TouchableOpacity>
      </Right>
    </Header>
  );
};

export default HeaderView;
