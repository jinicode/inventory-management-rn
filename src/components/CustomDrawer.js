import {
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
const drawerCover = require('../Images/store-inventory-logo.jpg');
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const CustomDrawer = props => {
  // console.log('hereee')
  return (
    <DrawerContentScrollView {...props}>
      <Image source={drawerCover} style={styles.drawerCover} />

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};
export default CustomDrawer;

const styles = StyleSheet.create({
  drawerCover: {
    alignSelf: 'stretch',
    height: deviceHeight / 3.5,
    width: null,
    position: 'relative',
    marginBottom: 10,
  },
});
