import AsyncStorage from '@react-native-community/async-storage';
import {Body, CardItem, Container, Content} from 'native-base';
import React, {PureComponent} from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {appTheme} from '../constants/colors';
import HistoryListItem from './HistoryListItem';

class History extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      transactionlist: [],
      refreshing: false,
    };
  }
  async componentDidMount() {
    // this.willFocusSubscription = this.props.navigation.addListener(
    //   "focus",
    //   async () => {
    //     console.log("focus");
    this.apiFetch();
    //   }
    // );
  }
  // componentWillUnmount() {
  //   this.willFocusSubscription();
  // }
  apiFetch = async () => {
    const auth_key = await AsyncStorage.getItem('auth_key');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Token ' + auth_key);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch('http://chouhanaryan.pythonanywhere.com/api/bill/', requestOptions)
      .then(response => response.json())
      .then(result => {
        //console.log(result);
        this.setState({transactionlist: result});
        //console.log(this.state.transactionlist);
      })
      .catch(error => console.log('error', error));
  };

  onRefresh = async () => {
    await this.setState({refreshing: !this.state.refreshing});
    this.apiFetch();
    await this.setState({refreshing: !this.state.refreshing});
  };

  render() {
    return (
      <Container style={{backgroundColor: appTheme.appgreyBackground}}>
        <Content>
          {/* the entire outerpart */}
          <Body style={styles.listContainer}>
            {/* the header of table */}
            <View style={styles.tableHeader}>
              <CardItem
                style={{
                  backgroundColor: 'rgba(255,255,255,0)',
                  justifyContent: 'center',
                }}>
                <Text style={styles.typeHeader}>Type</Text>
                <Text style={styles.productHeader}>Product</Text>
                <Text style={styles.noOfItemsHeader}>Quanity</Text>
                <Text style={styles.priceHeader}>Total</Text>
              </CardItem>
            </View>

            {/* the inner list */}
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />
              }>
              <View>
                <FlatList
                  style={styles.flatlist}
                  data={this.state.transactionlist}
                  // scrollEnabled={true}
                  renderItem={item => <HistoryListItem item={item} />}
                  keyExtractor={item => item.id.toString()}
                />
              </View>
            </ScrollView>
          </Body>
        </Content>
      </Container>
    );
  }
}

export default History;

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
    height: 600,
    borderRadius: 10,
  },
  tableHeader: {
    backgroundColor: appTheme.tableHeader,
    width: DEVICE_WIDTH - 32,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  typeHeader: {
    flex: 0.15,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: -20,
  },
  productHeader: {
    flex: 0.3,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  noOfItemsHeader: {
    flex: 0.2,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: -10,
  },
  priceHeader: {
    flex: 0.22,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
