import AsyncStorage from '@react-native-community/async-storage';
import {Body, CardItem, Container, Content} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import EmployeeListItem from '../components/EmployeeListItem';
import HeaderView from '../components/HeaderView';
import {appTheme} from '../constants/colors';

const EmployeeListScreen = ({navigation}) => {
  const [employeeList, setEmployeeList] = useState([]);
  const [isReady, setReady] = useState(false);
  const [currentUserDetails, setCurrentUserDetails] = useState({});

  useEffect(() => {
    getCurrentUserInfo();
  }, []);

  useEffect(() => {
    getUserList();
  }, [employeeList]);

  const getCurrentUserInfo = async () => {
    const auth_key = await AsyncStorage.getItem('auth_key');

    fetch('http://chouhanaryan.pythonanywhere.com/auth/users/me/', {
      method: 'GET',
      headers: {
        Authorization: `Token ${auth_key}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        setCurrentUserDetails(data); //set user details to state
        setReady(true);

        //if logged in user is a staff, only then he can view the user list
        if (data.is_staff) {
          getUserList();
        }
      })
      .catch(err => console.log(err));
  };

  const getUserList = async () => {
    const auth_key = await AsyncStorage.getItem('auth_key');

    fetch('http://chouhanaryan.pythonanywhere.com/auth/users/', {
      method: 'GET',
      headers: {
        Authorization: `Token ${auth_key}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        // console.log(JSON.stringify(data))
        setEmployeeList(data);
      })
      .catch(err => console.log(err));
  };

  const deleteEmployee = async formData => {
    const auth_key = await AsyncStorage.getItem('auth_key');

    fetch('http://chouhanaryan.pythonanywhere.com/auth/user_delete/', {
      method: 'POST',
      headers: {Authorization: `Token ${auth_key}`},
      body: formData,
    })
      .then(ToastAndroid.show('Employee Deleted !', ToastAndroid.SHORT))
      .then(res => console.log('Employee Deleted!'))
      .catch(err => console.log(err));
  };

  const onMenuPressed = employeeItem => {
    Alert.alert(
      `${employeeItem.first_name} ${employeeItem.last_name}`,
      `${employeeItem.email}`,
      [
        {
          text: 'Delete',
          onPress: () => {
            let formData = new FormData();
            formData.append('email', employeeItem.email);
            deleteEmployee(formData);
          },
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
    );
  };

  if (isReady) {
    if (currentUserDetails.is_staff) {
      return (
        <Container style={{backgroundColor: appTheme.appgreyBackground}}>
          <HeaderView navigation={navigation} title={'Employee Details'} />
          <Content>
            {/* the entire outerpart */}
            <Body style={styles.listContainer}>
              {/* the header of table */}
              <View style={styles.tableHeader}>
                <CardItem style={{backgroundColor: 'rgba(255,255,255,0)'}}>
                  <Text style={styles.nameHeader}>Name</Text>
                  <Text style={styles.genderHeader}>Gender</Text>
                  <Text style={styles.emailHeader}>Email</Text>
                  <Text style={styles.ageHeader}>Age</Text>
                </CardItem>
              </View>

              {/* the inner list */}
              <ScrollView>
                <View>
                  <FlatList
                    style={styles.flatlist}
                    data={employeeList}
                    renderItem={({item}) => (
                      <EmployeeListItem
                        onMenuPressed={data => onMenuPressed(data)}
                        item={item}
                      />
                    )}
                    keyExtractor={item => item.id}
                  />
                </View>
              </ScrollView>

              {/* the add employee button */}
              <TouchableOpacity
                style={styles.addEmployeeButton}
                onPress={() =>
                  navigation.navigate('AddEmployee', {getUserList})
                }>
                <Icon name="plus" color={appTheme.textPrimary} size={25} />
                <Text style={styles.addEmployeeButtonText}>Add Employee</Text>
              </TouchableOpacity>
            </Body>
          </Content>
        </Container>
      );
    } else if (!currentUserDetails.is_staff) {
      return (
        <Container style={{backgroundColor: appTheme.appgreyBackground}}>
          <HeaderView navigation={navigation} title={'Employee Details'} />
          <Content>
            <Body
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 30,
                marginVertical: 250,
              }}>
              <Text style={{fontSize: 24, lineHeight: 45, textAlign: 'center'}}>
                You do not have permission to View, Create or Delete Employees!
              </Text>
            </Body>
          </Content>
        </Container>
      );
    }
  } else {
    return (
      <Container style={{backgroundColor: appTheme.appgreyBackground}}>
        <HeaderView navigation={navigation} title={'Employee Details'} />
        <Content>
          <Body style={{justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#000" />
          </Body>
        </Content>
      </Container>
    );
  }
};

export default EmployeeListScreen;

const DEVICE_WIDTH = Dimensions.get('screen').width;
const DEVICE_HEIGHT = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: appTheme.textPrimary,
    borderColor: appTheme.borderGrey,
    borderWidth: 0.5,
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 20,
    width: DEVICE_WIDTH - 32,
  },
  flatlist: {
    width: DEVICE_WIDTH - 32,
    backgroundColor: appTheme.textPrimary,
    height: 500,
  },
  tableHeader: {
    backgroundColor: appTheme.tableHeader,
    // backgroundColor: 'red',
    // alignSelf: 'stretch',
    width: DEVICE_WIDTH - 32,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  nameHeader: {
    flex: 0.3,
    fontSize: 18,
    paddingLeft: 6,
    marginLeft: 30,
    fontWeight: 'bold',
  },
  genderHeader: {
    flex: 0.25,
    fontSize: 18,
    fontWeight: 'bold',
  },
  emailHeader: {
    flex: 0.3,
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 14,
  },
  ageHeader: {
    flex: 0.15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  addEmployeeButton: {
    backgroundColor: appTheme.appBlue,
    margin: 40,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    // position:'fixed',
  },
  addEmployeeButtonText: {
    color: appTheme.textPrimary,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    // padding:6,
  },
});
