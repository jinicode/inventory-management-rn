import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Body, Container, Input, Item, Label} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {appTheme} from '../constants/colors';
import {showError, showSuccess} from '../utils/notification';

const Buy = ({navigation}) => {
  const [product, setProduct] = useState([]);
  const [date_array, setDate_array] = useState([]);

  const [show, setShow] = useState(false);
  const [curr_ind, setCurr_ind] = useState(0);

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    setProduct([{name: '', price: 0, quantity: 0, expiry: ''}]);
    setDate_array([new Date()]);
  }, []);

  const makeBuyBill = async () => {
    const auth_key = await AsyncStorage.getItem('auth_key');
    let object = {
      name: customerName,
      phone: phoneNumber,
      address: address,
      in_or_out: 'In',
      order: {...product},
    };
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Token ' + auth_key);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify(object);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://chouhanaryan.pythonanywhere.com/api/order/', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

  const buyprod = async () => {
    product.forEach(async product => {
      const formdata = new FormData();

      formdata.append('name', product.name);
      formdata.append('quantity', product.quantity);
      formdata.append('avg_cost_price', product.price);
      formdata.append('expiry', product.expiry);

      let myHeaders = new Headers();
      const auth_key = await AsyncStorage.getItem('auth_key');
      myHeaders.append('Authorization', `Token ${auth_key}`);

      fetch('http://chouhanaryan.pythonanywhere.com/api/buy/', {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          showSuccess('Items purchases successfully.');
        })
        .catch(err => {
          showError('Error in buying items');
          console.log(err);
        });
    });
  };

  const set_date = e => {
    setShow(false);

    let date_array_copy = [...date_array];
    let product_copy = [...product];

    const date = new Date(e.nativeEvent.timestamp);

    date_array_copy[curr_ind] = date;
    setDate_array(date_array_copy);

    if (date == 'Invalid Date') {
      product_copy[curr_ind].expiry = 'Choose a date and press OK';
      setProduct(product_copy);
    } else {
      const month = date.toLocaleDateString().split('/')[0];
      const day = date.toLocaleDateString().split('/')[1];
      const year = date.toDateString().split(' ')[3];
      const final_date = year + '-' + month + '-' + day;

      product_copy[curr_ind].expiry = final_date;
      setProduct(product_copy);
    }
  };

  return (
    <Container style={{backgroundColor: appTheme.appgreyBackground}}>
      <ScrollView>
        <Body>
          <Text style={styles.heading}>Buy Items</Text>

          {/* separator line above name, phone no. and address fields */}
          <View style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
            <View style={styles.mainView} />
          </View>

          {/* customer name */}
          <Item floatingLabel style={styles.inputBox}>
            <Label style={styles.label}>Customer Name</Label>
            <Input
              style={styles.inputArea}
              value={customerName}
              onChangeText={value => setCustomerName(value)}
            />
          </Item>

          {/* phone number */}
          <Item floatingLabel style={styles.inputBox}>
            <Label style={styles.label}>Phone number</Label>
            <Input
              style={styles.inputArea}
              keyboardType="number-pad"
              value={phoneNumber}
              onChangeText={value => setPhoneNumber(value)}
            />
          </Item>

          {/* address */}
          <Item floatingLabel style={styles.inputBox}>
            <Label style={styles.label}>Address</Label>
            <Input
              style={styles.inputArea}
              value={address}
              onChangeText={value => setAddress(value)}
            />
          </Item>

          {product.map((item, index) => {
            return (
              <View key={index} style={{width: Dimensions.get('window').width}}>
                {/* for the separating line */}
                <View style={styles.mainBorder} />

                {/* Product title */}
                <Text style={styles.product_titles}>
                  Product {product.length == 1 ? '' : index + 1}
                </Text>

                {/* Product name input */}
                <Item floatingLabel style={styles.inputBox}>
                  <Label style={styles.label}>Product Name</Label>
                  <Input
                    placeholder={product[index].name}
                    style={styles.inputArea}
                    onChangeText={value => (product[index].name = value.trim())}
                  />
                </Item>

                {/* Price input */}
                <Item floatingLabel style={styles.inputBox}>
                  <Label style={styles.label}>Price</Label>
                  <Input
                    style={styles.inputArea}
                    keyboardType="numeric"
                    onChangeText={value =>
                      (product[index].price = parseFloat(value.trim()))
                    }
                  />
                </Item>

                {/* Quantity input */}
                <Item floatingLabel style={styles.inputBox}>
                  <Label style={styles.label}>No. of Items</Label>
                  <Input
                    style={styles.inputArea}
                    keyboardType="numeric"
                    onChangeText={value =>
                      (product[index].quantity = parseInt(value.trim()))
                    }
                  />
                </Item>

                {/* Expiry date text */}
                <View style={{flexDirection: 'row', flex: 1}}>
                  <View style={styles.dateMainView}>
                    <Text style={styles.expiryText}>
                      Expiry: {product[index].expiry}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      setCurr_ind(index);
                      setShow(true);
                    }}>
                    <Icon
                      name="calendar"
                      color={appTheme.appBlue}
                      size={30}
                      style={styles.datePickerIcon}
                    />
                  </TouchableOpacity>
                </View>

                {/* Date display */}
                <View>
                  <View>
                    {show && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={new Date()}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={e => set_date(e)}
                      />
                    )}
                  </View>
                </View>
              </View>
            );
          })}

          <TouchableOpacity
            onPress={() => {
              if (
                product[product.length - 1].name &&
                product[product.length - 1].price &&
                product[product.length - 1].quantity &&
                product[product.length - 1].expiry.length === 10 // length should be 10 because for date, we have format YYYY-MM-DD, and the length of the string is thus 10
              ) {
                let copy = [...product];
                copy.push({name: '', price: 0, quantity: 0, expiry: ''});
                setProduct(copy);
                let dates_copy = [...date_array];
                dates_copy.push(new Date());
                setDate_array(dates_copy);
              } else {
                showError(
                  `Please fill all details for product ${product.length}`,
                );
              }
            }}
            style={styles.addButton}>
            <Icon
              name="plus"
              color={appTheme.appBlue}
              size={25}
              style={styles.icon}
            />
            <Text style={styles.addButtonText}>Add Product</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              let can_buy = true;
              let incomplete_product_index = 0;
              for (let i = 0; i < product.length; i++) {
                if (
                  product[i].name == '' ||
                  product[i].price == 0 ||
                  product[i].quantity == 0 ||
                  product[i].expiry.length !== 10
                ) {
                  can_buy = false;
                  incomplete_product_index = i + 1;
                  break;
                }
              }
              if (!can_buy) {
                showError(
                  `Please fill valid details for product ${incomplete_product_index}`,
                );
              } else {
                await buyprod();
                await makeBuyBill();
                await setProduct([]);
                await setProduct([
                  {name: '', price: 0, quantity: 0, expiry: ''},
                ]);
                await setDate_array([new Date()]);
                await setAddress();
                await setAddress('');
                await setCustomerName();
                await setCustomerName('');
                await setPhoneNumber();
                await setPhoneNumber('');
              }
            }}
            style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Buy</Text>
          </TouchableOpacity>
        </Body>
      </ScrollView>
    </Container>
  );
};

export default Buy;

const styles = StyleSheet.create({
  datePickerIcon: {
    marginLeft: -10,
    flex: 1,
    marginRight: 30,
    marginTop: 20,
  },
  dateMainView: {
    backgroundColor: appTheme.darkGrey,
    borderRadius: 10,
    marginRight: 20,
    marginLeft: 28,
    textAlign: 'left',
    marginVertical: 10,
    height: 55,
    flex: 9,
  },
  heading: {
    fontSize: 26,
    color: appTheme.paleBlue,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
    alignSelf: 'center',
    marginLeft: '5%',
  },
  product_titles: {
    fontSize: 24,
    color: appTheme.paleBlue,
    marginTop: 25,
    marginBottom: 10,

    marginLeft: '10%',
  },
  mainBorder: {
    borderColor: appTheme.darkGrey,
    borderWidth: 1,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 2,
    marginBottom: -10,
    marginTop: 5,
  },
  inputBox: {
    backgroundColor: appTheme.darkGrey,
    borderRadius: 10,
    marginRight: 28,
    marginLeft: 28,
    textAlign: 'left',
    marginVertical: 10,
    height: 55,
  },

  label: {
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    color: appTheme.labelColor,
  },
  inputArea: {
    paddingLeft: 20,
  },
  buyButton: {
    backgroundColor: appTheme.appBlue,
    margin: 15,
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    flexDirection: 'row',
  },
  buyButtonText: {
    color: appTheme.textPrimary,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  addButton: {
    borderColor: appTheme.appBlue,
    borderWidth: 2,
    margin: 20,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
  },
  addButtonText: {
    color: appTheme.appBlue,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  icon: {
    marginLeft: 4,
    marginRight: 10,
  },
  mainView: {
    borderColor: appTheme.darkGrey,
    borderWidth: 1,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 2,
    marginBottom: -10,
    marginTop: 5,
  },
  expiryText: {
    marginLeft: 4,
    fontSize: 16,
    marginTop: 17,
    color: 'black',
  },
});
