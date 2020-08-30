import React, {Component} from 'react';

import {Dimensions} from 'react-native';
import {Container, Tab, Tabs} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import Buy from '../components/Buy';
import Sell from '../components/Sell';
import History from '../components/History';
import HeaderView from '../components/HeaderView';
import colors, {appTheme} from "../constants/colors";
import {spacing} from "../constants/dimension";
import fontSizes from "../constants/fontSizes";

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
          <Buy  />
        </Tab>
        <Tab
          activeTabStyle={{backgroundColor: appTheme.appBlue}}
          tabStyle={{backgroundColor: appTheme.appBlue}}
          heading="Sell">
          <Sell  />
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
