import { CardItem } from 'native-base';
import React from 'react';
import {
  AsyncStorage, PermissionsAndroid,
  Platform, StyleSheet,


  Text,



  TouchableOpacity, View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFetchBlob from 'rn-fetch-blob';
import { appTheme } from '../constants/colors';
import { showError } from "../utils/notification";

export default class HistoryListItem extends React.Component {
  componentDidMount() {
    console.disableYellowBox = true;
  }
  // parseDate = date => {
  //   //console.log(date)=>2020-05-07T13:19:40.442654Z
  //   const newDate = new Date(date).toDateString().slice(4); //=>May 07 2020
  //   const forMonthAndDate = newDate.split(' '); //convert to array and take only May 7
  //   const finalDate = forMonthAndDate[0] + ' \n ' + forMonthAndDate[1]; //join May and 7
  //   return finalDate;
  // };

  // parsePrice = transactions => {
  //   //accumulator mei store karo from left to right
  //   return transactions.reduce((acc, obj) => acc + obj.rate * obj.quantity, 0);
  // };
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
        title: `invoice${id}.pdf`,
        path: `${dirs.DownloadDir}/invoice${id}.pdf`,
      },
    })
      .fetch('GET', `http://chouhanaryan.pythonanywhere.com/api/pdf/${id}`, {
        'Content-Type': 'application/pdf',
        Authorization: 'Token ' + auth_key,
      })
      .then(async res => {
        
        if ((Platform.OS = 'android')) {
          android.actionViewIntent(res.path(), 'application/pdf');
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  namesGiver = itemNamesArray => {
    var itemNamesArray = itemNamesArray.map(item => item.name);
    itemNamesArray = itemNamesArray.join(',\n');
    return itemNamesArray;
  };
  priceGiver = eachItemPriceArray => {
    var eachItemPriceArray = eachItemPriceArray.map(item => item.quantity);
    eachItemPriceArray = eachItemPriceArray.join(',\n');
    return eachItemPriceArray;
  };
  downloadFile = async id => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.actualDownload(id);
      } else {
        showError(
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
      <View style={styles.container}>
        <CardItem
          style={styles.eachRow}>
          <Text style={styles.type}>
            {this.props.item.item.in_or_out == 'In' ? 'Buy' : 'Sell'}
          </Text>
          <Text style={styles.product}>
            {this.namesGiver(
              JSON.parse(this.props.item.item.billdetails).entries,
            )}
          </Text>
          <Text style={styles.quantity}>
            {this.priceGiver(
              JSON.parse(this.props.item.item.billdetails).entries,
            )}
          </Text>
          <Text style={styles.price}>
            {JSON.parse(this.props.item.item.billdetails).total_bill}
          </Text>
          <TouchableOpacity>
            <Icon
              name="download"
              size={30}
              color={appTheme.appBlue}
              style={styles.downloadButton}
              onPress={() => {
                this.downloadFile(this.props.item.index);
              }}
            />
          </TouchableOpacity>
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
  eachRow: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },

  type: {
    flex: 0.25,
    fontSize: 16,
    fontWeight: 'bold',
  },
  product: {
    flex: 0.3,
    fontSize: 16,
    
    
  },
  quantity: {
    flex: 0.2,
    fontSize: 16,
    paddingLeft: 10,
  },
  price: {
    flex: 0.25,
    fontSize: 16,
    marginLeft: 5,
  },
  downloadButton:{flex: 0.08, marginRight: -5}
});
