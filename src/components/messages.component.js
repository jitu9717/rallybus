
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ListView,
    TouchableNativeFeedback
} from 'react-native';

export default class MessageComponent extends Component {

    render() {
        return (
            <View style={styles.messageContainer}>
                <Text style={styles.messageHeading}>{this.props.messageHeading}</Text>
                <Text style={styles.msgText}>{this.props.messageContent}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    messageContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    messageHeading: {
         color: 'grey',
        fontSize: 22,
        textAlign: 'center',
        paddingHorizontal:40,
        paddingVertical: 10
    },
    msgText: {
      fontSize: 14,
        color: 'lightgrey',
        paddingHorizontal: 70,
        textAlign: 'center'
    }
});

