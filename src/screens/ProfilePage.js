import AsyncStorage from '@react-native-community/async-storage';
import {Body, Header, Input, Label, Left} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {appTheme} from '../constants/colors';
import {isTokenValid} from '../utils/isTokenValid';
import {logout} from '../utils/logout';
import {showError, showSuccess} from '../utils/notification';

const ProfilePage = ({navigation}) => {
  const [editMode, toggleEditMode] = useState(false);

  const [firstName, updateFirstName] = useState('John');
  const [lastName, updateLastName] = useState('Doe');
  const [email, updateEmail] = useState('demo@user.com');
  const [gender, updateGender] = useState('M');
  const [age, updateAge] = useState('20');
  const [isStaff, updateIsStaff] = useState(false);

  const [isReady, setReady] = useState(false);

  useEffect(() => {
    getCurrentUserInfo();
  }, []); //called only when component mounted

  const getCurrentUserInfo = async () => {
    try {
      const tokenValidity = await isTokenValid(navigation);
      console.log('token valid? ', tokenValidity);
      if (tokenValidity) {
        const auth_key = await AsyncStorage.getItem('auth_key');

        const res = await fetch(
          'http://chouhanaryan.pythonanywhere.com/auth/users/me/',
          {
            method: 'GET',
            headers: {
              Authorization: `Token ${auth_key}`,
            },
          },
        );

        const data = await res.json();
        console.log(data);
        const firstName = data.first_name;
        const lastName = data.last_name;
        const age = data.age.toString();
        const email = data.email;
        const gender = data.gender === 'F' ? 'Female' : 'Male';
        const isStaff = data.is_staff;

        //set user details to state
        updateAge(age);
        updateEmail(email);
        updateFirstName(firstName);
        updateLastName(lastName);
        updateGender(gender);
        updateIsStaff(isStaff);

        if (res.status === 200) {
          setReady(true);
        }
      } else {
        logout(navigation);
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  const onSavePressed = async () => {
    // validation
    if (firstName === '' || lastName === '' || age === '') {
      if (firstName === '') showError('Please enter firstName.');
      else if (lastName === '') showError('Please enter lastName.');
      else if (age === '') showError('Please enter age.');
    } else {
      try {
        let formData = new FormData();
        formData.append('email', email);
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('age', age);

        const auth_key = await AsyncStorage.getItem('auth_key');

        const res = await fetch(
          'http://chouhanaryan.pythonanywhere.com/auth/user_update/',
          {
            method: 'POST',
            headers: {
              Authorization: `Token ${auth_key}`,
            },
            body: formData,
          },
        );
        console.log(res);
        console.log(res.status);
        const resJson = await res.json();
        console.log(resJson);
        if (res.status === 200) {
          showSuccess('Details updated.');
        } else {
          showError('Error in updating details');
        }
        toggleEditMode(!editMode);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <ScrollView style={{flex: 1}}>
      <Header
        style={{backgroundColor: appTheme.appBlue, flexDirection: 'row'}}
        androidStatusBarColor={appTheme.statusBar}>
        <Left>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Drawer');
            }}>
            <Icon name="home" color={appTheme.textPrimary} size={35} />
          </TouchableOpacity>
        </Left>
        <Body>
          <Text style={{fontSize: 21, color: appTheme.textPrimary}}>
            Profile
          </Text>
        </Body>
      </Header>

      {/* container */}

      {!isReady && (
        <Body style={{justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#000" />
        </Body>
      )}

      {isReady && (
        <View>
          <View style={{alignItems: 'center', marginTop: 20}}>
            {/* <Text style={styles.profileTitle}>  </Text> */}

            {!editMode && (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => toggleEditMode(!editMode)}>
                <Icon name="edit" color={appTheme.appBlue} size={25} />
                <Text style={styles.editText}> Edit </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={{alignItems: 'center'}}>
            <View floatingLabel style={styles.inputBox}>
              <Label style={styles.label}>First Name</Label>
              <Input
                style={
                  editMode ? styles.inputAreaEditMode : styles.inputAreaViewMode
                }
                value={firstName}
                disabled={editMode ? false : true}
                onChangeText={val => updateFirstName(val.trim())}
              />
            </View>

            <View floatingLabel style={styles.inputBox}>
              <Label style={styles.label}>Last Name</Label>
              <Input
                style={
                  editMode ? styles.inputAreaEditMode : styles.inputAreaViewMode
                }
                value={lastName}
                disabled={editMode ? false : true}
                onChangeText={val => updateLastName(val.trim())}
              />
            </View>

            <View style={styles.inputBox}>
              <Label style={styles.label}>Email</Label>
              <Input
                style={styles.inputAreaViewMode}
                value={email}
                disabled={true}
              />
            </View>

            <View style={styles.inputBox}>
              <Label style={styles.label}>Gender</Label>

              <Input
                style={styles.inputAreaViewMode}
                value={gender}
                disabled={true}
              />
            </View>

            <View style={styles.inputBox}>
              <Label style={styles.label}>Age</Label>
              <Input
                keyboardType="numeric"
                style={
                  editMode ? styles.inputAreaEditMode : styles.inputAreaViewMode
                }
                onChangeText={val => updateAge(val.trim())}
                value={age}
                disabled={editMode ? false : true}
              />
            </View>

            <View style={styles.inputBox}>
              <Label style={styles.label}>is staff?</Label>
              <Text style={styles.inputAreaViewMode}>
                {' '}
                {isStaff ? 'true' : 'false'}
              </Text>
            </View>

            {/* {
                            editMode &&
                            <View style={styles.inputBox}>

                                <Label style={styles.label}> is staff? </Label>
                                <View style={styles.radioGroup}>
                                    <Text style={styles.isStaffText}> true </Text>
                                    <Radio selected={isStaff} />

                                    <Text style={styles.isStaffText}> false </Text>
                                    <Radio selected={!isStaff} />
                                </View>
                            </View>
                        } */}

            {/* end of userinput */}
          </View>
          {/* end of form */}
          {editMode && (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => onSavePressed()}>
              {/* <Icon name="edit" color={appTheme.appBlue} size={25} /> */}
              <Text style={styles.editText}> Save </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              logout(navigation);
            }}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  profileTitle: {
    fontSize: 22,
    flex: 1,
    textAlign: 'center',
  },
  editText: {
    color: appTheme.appBlue,
  },
  editButton: {
    borderColor: appTheme.appBlue,
    borderWidth: 2,
    width: 200,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    paddingLeft: 5,
    color: appTheme.labelColor,
    fontSize: 16,
    textAlignVertical: 'center',
  },
  saveButton: {
    borderColor: appTheme.appBlue,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 20,
    marginHorizontal: 60,

    alignItems: 'center',
  },
  inputAreaEditMode: {
    backgroundColor: appTheme.darkGrey,
    borderRadius: 10,
    marginRight: 28,
    marginLeft: 28,
    textAlign: 'center',

    fontSize: 20,
    height: 55,
  },
  inputAreaViewMode: {
    backgroundColor: 'transparent',

    borderRadius: 10,
    marginRight: 28,
    marginLeft: 28,
    textAlign: 'center',

    fontSize: 20,
    height: 55,

    flex: 1,
  },
  radioGroup: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  inputBox: {
    flexDirection: 'row',
    borderRadius: 10,
    marginRight: 28,
    marginLeft: 28,
    textAlign: 'left',
    marginVertical: 10,
  },
  isStaffText: {
    fontSize: 20,
    marginLeft: 30,
  },

  logoutButton: {
    backgroundColor: appTheme.appBlue,
    marginHorizontal: 100,
    paddingVertical: 10,

    borderRadius: 10,
  },
  logoutText: {
    color: appTheme.textPrimary,
    fontWeight: 'bold',
    fontSize: 18,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default ProfilePage;
