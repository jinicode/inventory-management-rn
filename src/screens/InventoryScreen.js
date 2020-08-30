import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import {Container, Tab, Tabs} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import InventoryListScreen from './InventoryListScreen';
import ExpiryScreen from './ExpiryScreen'
import HeaderView from '../components/HeaderView';
import colors, {appTheme} from "../constants/colors";
import {spacing} from "../constants/dimension";
import fontSizes from "../constants/fontSizes";

const deviceHeight = Dimensions.get('window').height;

const TransactionsScreen = ({navigation}) => {
  return (
    <Container>
      <HeaderView navigation={navigation} title={'Inventory'} />

      <Tabs>
        <Tab
          
          activeTabStyle={{backgroundColor: appTheme.appBlue}}
          tabStyle={{backgroundColor: appTheme.appBlue}}
          textStyle={{color: appTheme.textPrimary}}
          activeTextStyle={{color: appTheme.textPrimary, fontWeight: 'bold'}}
          heading="Inventory">
          <InventoryListScreen />
        </Tab>
        <Tab
          activeTabStyle={{backgroundColor: appTheme.appBlue}}
          tabStyle={{backgroundColor: appTheme.appBlue}}
          textStyle={{color: appTheme.textPrimary}}
          activeTextStyle={{color: appTheme.textPrimary, fontWeight: 'bold'}}
          heading="Near expiry">
          <ExpiryScreen />
        </Tab>

      </Tabs>
    </Container>
  );
};

export default TransactionsScreen;
