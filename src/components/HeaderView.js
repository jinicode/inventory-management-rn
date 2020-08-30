import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Header, Left, Right, Body} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import colors, {appTheme} from '../constants/colors';
import {spacing} from '../constants/dimension';
import fontSizes from '../constants/fontSizes';

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
