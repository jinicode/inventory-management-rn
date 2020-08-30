import { Container, Tab, Tabs } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import HeaderView from '../components/HeaderView';
import { appTheme } from '../constants/colors';
import ExpiryScreen from './ExpiryScreen';
import InventoryListScreen from './InventoryListScreen';

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
