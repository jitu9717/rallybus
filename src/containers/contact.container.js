import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    ListView,
    InteractionManager,
    TouchableNativeFeedback,
    ScrollView
} from 'react-native';

import {connect} from 'react-redux';
import Loader from '../components/loader.component';
import ButtonComponent from './../components/button.component.js';
import { fetchUserService} from '../actions/api.actions'
import {setStartServiceInfo, setIsSensitive, setServiceReady} from '../actions/service.action';
import {getServiceSatesFromStorage} from './../actions/service.action';

let Icon = require('react-native-vector-icons/MaterialIcons');
let moment = require('moment');


class ContactComponent extends Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    var list = [];

    this.state = {
      isReady: false,
      listData: ds.cloneWithRows(list || [])
    };


  }

  async componentDidMount() {
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    // function to call api to fetch list

  }


  renderList(elementType, data, key) {
    var self = this;

  }

  render() {
    var self = this;
      return (
          <View style={styles.container}>
              <Text>Contact Component</Text>
          </View>
      );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const Contact = connect()(ContactComponent);

export default Contact;
