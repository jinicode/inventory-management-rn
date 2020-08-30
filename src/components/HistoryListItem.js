import React, {Component} from 'react';
import {CardItem} from 'native-base';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  PermissionsAndroid,
  Platform,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFetchBlob from 'rn-fetch-blob';
import colors, {appTheme} from "../constants/colors";
import {spacing} from "../constants/dimension";
import fontSizes from "../constants/fontSizes";

export default class HistoryListItem extends React.Component {
  componentDidMount() {
    console.disableYellowBox = true;
  }
  parseDate = date => {
    //console.log(date)=>2020-05-07T13:19:40.442654Z
    const newDate = new Date(date).toDateString().slice(4); //=>May 07 2020
    const forMonthAndDate = newDate.split(' '); //convert to array and take only May 7
    const finalDate = forMonthAndDate[0] + ' \n ' + forMonthAndDate[1]; //join May and 7
    return finalDate;
  };

  parsePrice = transactions => {
    //accumulator mei store karo from left to right
    return transactions.reduce((acc, obj) => acc + obj.rate * obj.quantity, 0);
  };
  //row=this.props.item could have done this rather than writing this.props.item evrywhere
  actualDownload = async id => {
    const auth_key = await AsyncStorage.getItem('auth_key');
    const dirs = RNFetchBlob.fs.dirs;
    const android = RNFetchBlob.android;
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        mime: 'application/pdf',
        notification: true,
        mediaScannable: true,
        title:  `invoice${id}.pdf`,
        path: `${dirs.DownloadDir}/invoice${id}.pdf`,
      },
    })
      .fetch("GET",
        `http://chouhanaryan.pythonanywhere.com/api/pdf/${id}`,
        {
          'Content-Type': 'application/pdf',
          'Authorization': "Token " + auth_key,
        },
      )
      .then(async res => {
        
        console.log(res);
        // if ((Platform.OS = 'android')) {
        //   android.actionViewIntent(res.path(), 'application/pdf');
        // }
      })
      .catch(e => {
        console.log(e);
      });
  };

  downloadFile = async id => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.actualDownload(id);
      } else {
        Alert.alert(
          'Permission Denied!',
          'You need to give storage permission to download the file',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  render() {
    return (
      <View style={listItemStyles.container}>
        <CardItem
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            alignContent: 'center',
            textAlign: 'center',
          }}>
          <Text style={listItemStyles.type}>
            {this.props.item.in_or_out == 'In' ? 'Buy' : 'Sell'}
          </Text>
          <Text style={listItemStyles.product}>{this.props.item.name}</Text>
          <Text style={listItemStyles.items}>{this.props.item.quantity}</Text>
          <Text style={listItemStyles.price}>{this.props.item.rate}</Text>
          <TouchableOpacity>
          <Icon name="download" size={30} color="black" style={{ flex: 0.1 }} onPress={() => { this.downloadFile(this.props.item.id) }} />
          </TouchableOpacity>
        </CardItem>
      </View>
    );
  }
}

const listItemStyles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    borderColor: '#E0E0E0',
    borderWidth: 0.5,
  },

  type: {
    flex: 0.25,
    fontSize: 16,
  },
  product: {
    flex: 0.3,
    fontSize: 16,
    marginLeft: -10
  },
  items: {
    flex: 0.25,
    fontSize: 16,
    marginLeft: 5
  },
  price: {
    flex: 0.2,
    fontSize: 16,
  },
});
