import { CardItem } from 'native-base';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { appTheme } from '../constants/colors';

export default class ExpiryListItem extends React.Component {
  componentDidMount() {
    console.disableYellowBox = true;
  }
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <CardItem
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            alignContent: 'center',
            textAlign: 'center',
          }}>
          <Text style={styles.productHeader}>{this.props.item.name}</Text>
          <Text style={styles.itemsHeader}>{this.props.item.quantity}</Text>
          <Text style={styles.daysHeader}>{this.props.item.daysLeft}</Text>
        </CardItem>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    borderColor: appTheme.darkGrey,
    borderWidth: 0.5,
  },

  itemsHeader: {
    flex: 0.25,
    fontSize: 16,

    marginLeft: 40,
  },
  productHeader: {
    flex: 0.35,
    fontSize: 16,

    marginLeft: 20,
  },

  daysHeader: {
    flex: 0.4,
    fontSize: 16,
    marginRight: -20,
    marginLeft: 30,
  },
});
