import {CardItem} from 'native-base';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {appTheme} from '../constants/colors';

export default class InventoryListItem extends React.Component {
  componentDidMount() {
    console.disableYellowBox = true;
  }

  render() {
    return (
      <View style={listItemStyles.container}>
        <CardItem>
          <TouchableOpacity
            onPress={() => this.props.onMenuPressed(this.props.item)}>
            <Icon
              name="menu"
              color="grey"
              size={25}
              style={listItemStyles.icon}
            />
          </TouchableOpacity>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Text style={listItemStyles.name}>{this.props.item.name}</Text>
            <Text style={listItemStyles.items}>{this.props.item.quantity}</Text>
            <Text style={listItemStyles.price}>
              {Math.round(this.props.item.avg_cost_price)}
            </Text>
          </View>
        </CardItem>
      </View>
    );
  }
}

const listItemStyles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    borderColor: appTheme.darkGrey,
    borderWidth: 0.5,
  },
  name: {
    textAlign: 'left',
    flex: 0.44,
    fontSize: 16,
  },
  items: {
    flex: 0.18,
    fontSize: 16,
  },
  price: {
    flex: 0.18,
    fontSize: 16,
    textAlign: 'center',
  },
  rightButtons: {
    flex: 0.15,
    flexDirection: 'row',
  },

  icon: {
    // paddingRight: 8,
    marginRight: 10,
    // flex: 0.12,
  },
});
