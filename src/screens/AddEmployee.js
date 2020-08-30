import AsyncStorage from '@react-native-community/async-storage';
import {Body, Container, Content, Input, Item, Label} from 'native-base';
import React, {Component} from 'react';
import {
  Alert,
  Picker,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import HeaderView from '../components/HeaderView';
import {appTheme} from '../constants/colors';
import {showError, showSuccess} from '../utils/notification';

export default class AddEmployee extends Component {
  constructor(props) {
    super(props);
    console.log(props.route.params);
    this.state = {
      fname: '',
      email: '',
      lname: '',
      password: '',
      confpass: '',
      gender: 'M',
      age: '',
      inval_email: false,
      inval_pass: false,
      inval_confpass: false,
      failed: false,
      is_staff: true,
    };
  }
  async keyy() {
    console.log(await AsyncStorage.getItem('auth_key'));
    return await AsyncStorage.getItem('auth_key');
  }

  sendUserData = async formData => {
    const auth_key = await AsyncStorage.getItem('auth_key');
    // console.log('auth key is', auth_key);
    fetch('http://chouhanaryan.pythonanywhere.com/auth/users/', {
      method: 'POST',
      headers: {Authorization: `Token ${auth_key}`},
      body: formData,
    })
      .then(res => {
        console.log(res);
        if (res.status == 201) {
          showSuccess('Success!', 'Employee Added Successfully!');
        } else {
          this.setState({failed: true});
        }
        return res.json();
      })
      .then(data => {
        console.log('pas', data);
        if (this.state.failed === true) {
          let responseErr = Object.values(data)[0][0];
          Alert.alert('Ooops!', responseErr);
          this.setState({failed: false});
        } else {
          this.props.route.params.getUserList();
          this.props.navigation.navigate('EmployeeList');
        }
      })
      .catch(error => console.log('err', error.response));
  };

  buttonPressed = () => {
    // console.log('in button pressed');

    let formData = new FormData();
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);
    formData.append('first_name', this.state.fname);
    formData.append('last_name', this.state.lname);
    formData.append('is_staff', this.state.is_staff);
    formData.append('age', this.state.age);
    formData.append('gender', this.state.gender);
    console.log(formData);
    this.sendUserData(formData);
  };

  render() {
    return (
      <Container style={{backgroundColor: appTheme.appgreyBackground}}>
        <HeaderView navigation={this.props.navigation} title={'Add Employee'} />
        <Content>
          <ScrollView>
            <Body>
              <Text style={styles.heading}>Account</Text>

              <Item floatingLabel style={styles.inputBox}>
                <Label style={styles.label}>First Name</Label>
                <Input
                  style={styles.inputArea}
                  onChangeText={value => {
                    this.setState({fname: value});
                  }}
                />
              </Item>
              <Item floatingLabel style={styles.inputBox}>
                <Label style={styles.label}>Last Name</Label>
                <Input
                  style={styles.inputArea}
                  onChangeText={value => {
                    this.setState({lname: value});
                  }}
                />
              </Item>

              <Item floatingLabel style={styles.inputBox}>
                <Label style={styles.label}>Email ID</Label>
                <Input
                  style={styles.inputArea}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={value => {
                    var mailformat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
                    this.setState({email: value});
                    if (value.match(mailformat)) {
                      this.setState({inval_email: false});
                    } else {
                      this.setState({inval_email: true});
                    }
                  }}
                />
              </Item>
              {this.state.inval_email && this.state.email !== '' && (
                <Text
                  style={{
                    color: 'red',
                    alignSelf: 'flex-start',
                    marginLeft: 40,
                  }}>
                  Invalid Email
                </Text>
              )}

              <Item floatingLabel style={styles.inputBox}>
                <Label style={styles.label}>Password</Label>
                <Input
                  style={styles.inputArea}
                  secureTextEntry
                  onChangeText={value => {
                    this.setState({password: value});
                    var passw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                    if (value.length >= 8) {
                      this.setState({inval_pass: false});
                    } else {
                      this.setState({inval_pass: true});
                    }
                  }}
                />
              </Item>
              {this.state.inval_pass && this.state.password !== '' && (
                <Text
                  style={{
                    color: 'red',
                    alignSelf: 'flex-start',
                    marginLeft: 40,
                  }}>
                  Password should be atleast 8 characters
                </Text>
              )}

              <Item floatingLabel style={styles.inputBox}>
                <Label style={styles.label}>Confirm Password</Label>
                <Input
                  style={styles.inputArea}
                  secureTextEntry
                  onChangeText={value => {
                    this.setState({confpass: value});
                  }}
                />
              </Item>
              {this.state.inval_confpass && (
                <Text
                  style={{
                    color: 'red',
                    alignSelf: 'flex-start',
                    marginLeft: 40,
                  }}>
                  Password not matching!
                </Text>
              )}

              <Item floatingLabel style={styles.inputBox}>
                <Label style={styles.label}>Age</Label>
                <Input
                  style={styles.inputArea}
                  onChangeText={value => {
                    this.setState({age: value});
                  }}
                />
              </Item>

              <Item style={styles.inputBox}>
                <Label style={{marginLeft: 28}}>Gender</Label>
                <Picker
                  style={{width: 247, height: 25, marginLeft: 25}}
                  selectedValue={this.state.gender}
                  onValueChange={value => {
                    this.setState({gender: value});
                  }}>
                  <Picker.Item label="Male" value="M" />
                  <Picker.Item label="Female" value="F" />
                  <Picker.Item label="Others" value="Other" />
                </Picker>
              </Item>
              <RadioForm
                radio_props={[
                  {label: 'Employee', value: false},
                  {label: 'Manager', value: true},
                ]}
                labelHorizontal={true}
                formHorizontal={true}
                buttonColor={'black'}
                labelColor={'black'}
                labelStyle={{marginRight: 20}}
                style={{paddingLeft: 10, marginTop: 8}}
                onPress={value => {
                  this.setState({is_staff: value});
                }}
              />

              {/* <Text style={{color: 'red'}}>HEY</Text> */}

              <TouchableOpacity
                rounded
                style={styles.regButton}
                onPress={() => {
                  if (
                    this.state.email !== '' &&
                    this.state.password !== '' &&
                    this.state.age !== '' &&
                    this.state.lname !== ''
                  ) {
                    if (
                      this.state.fname !== '' &&
                      this.state.password === this.state.confpass
                    ) {
                      // let formData = new FormData()
                      // formData.append('email', this.state.email)
                      // formData.append('password', this.state.password)
                      // formData.append('first_name', this.state.fname)
                      // formData.append('last_name', this.state.lname)
                      // formData.append('is_staff', true)
                      // formData.append('age', this.state.age)
                      // formData.append('gender', this.state.gender)
                      this.buttonPressed();
                    } else {
                      this.setState({inval_confpass: true});
                    }
                  } else {
                    showError('Please enter all the fields');
                  }
                }}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </Body>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  regButton: {
    width: 280,
    height: 40,
    backgroundColor: appTheme.appBlue,
    borderRadius: 20,
    justifyContent: 'center',
    marginTop: 25,
  },
  buttonText: {
    color: appTheme.textPrimary,
    fontSize: 20,
    alignSelf: 'center',
    alignContent: 'flex-start',
    textAlign: 'center',
  },
  heading: {
    fontSize: 30,
    color: appTheme.paleBlue,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: 27,
  },
  subHeading: {
    fontSize: 22,
    color: appTheme.paleBlue,
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 20,
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
    paddingLeft: 30,
    color: appTheme.labelColor,
    fontSize: 15,
  },
  inputArea: {
    paddingLeft: 20,
  },
});
