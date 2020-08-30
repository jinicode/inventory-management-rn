import { Container, Tab, Tabs } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import Buy from '../components/Buy';
import HeaderView from '../components/HeaderView';
import History from '../components/History';
import Sell from '../components/Sell';
import { appTheme } from '../constants/colors';


const deviceHeight = Dimensions.get('window').height;

const TransactionsScreen = ({navigation}) => {
  return (
    <Container>
      <HeaderView navigation={navigation} title={'Transactions'} />

      <Tabs>
        <Tab
          activeTabStyle={{backgroundColor: appTheme.appBlue}}
          tabStyle={{backgroundColor: appTheme.appBlue}}
          heading="Buy">
          <Buy />
        </Tab>
        <Tab
          activeTabStyle={{backgroundColor: appTheme.appBlue}}
          tabStyle={{backgroundColor: appTheme.appBlue}}
          heading="Sell">
          <Sell />
        </Tab>
        <Tab
          activeTabStyle={{backgroundColor: appTheme.appBlue}}
          tabStyle={{backgroundColor: appTheme.appBlue}}
          heading="History">
          <History navigation={navigation} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default TransactionsScreen;
