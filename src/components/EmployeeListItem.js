import {CardItem} from 'native-base';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import {appTheme} from '../constants/colors';

export default class EmployeeListItem extends React.Component {
  componentDidMount() {
    console.disableYellowBox = true;
  }

  // this.props.onEditPressed(this.props.item.id))}
  render() {
    const {first_name, last_name, gender, age, email, id} = this.props.item;
    return (
      <View style={listItemStyles.container}>
        <CardItem>
          <TouchableOpacity
            onPress={() => this.props.onMenuPressed(this.props.item)}>
            <Icon
              name="trash"
              color="grey"
              size={22}
              style={listItemStyles.icon}
              // fill='black'
            />
          </TouchableOpacity>

          <Text style={listItemStyles.name}>
            {first_name} {last_name}
          </Text>
          <Text style={listItemStyles.gender}>
            {gender === 'M' ? 'Male' : gender === 'F' ? 'Female' : 'Other'}
          </Text>
          <Text style={listItemStyles.email}>{email}</Text>
          <Text style={listItemStyles.age}>{age}</Text>
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
    justifyContent: 'center',
    // backgroundColor:'red',
  },
  icon: {
    paddingRight: 12,
    flex: 0.1,
  },
  name: {
    textAlign: 'left',
    flex: 0.3,
    fontSize: 16,
    paddingHorizontal: 4,
  },
  gender: {
    flex: 0.25,
    fontSize: 16,
    marginHorizontal: 4,
  },
  email: {
    flex: 0.3,
    fontSize: 13,
    paddingHorizontal: 4,
    flexWrap: 'wrap',
  },
  age: {
    flex: 0.1,
    fontSize: 15,
    paddingLeft: 10,
  },
});
