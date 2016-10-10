import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableNativeFeedback
} from 'react-native';

export default class ButtonComponent extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        var TouchableElement = TouchableNativeFeedback;
        return(
            <View>
                <TouchableElement>
                    <View
                        style={styles.button}>
                        <Text style={styles.buttonText}
                              onPress={() => { this.props.buttonClick()}}>{this.props.buttonText}</Text>
                    </View>
                </TouchableElement>
            </View>
        )
    }
}

var styles=StyleSheet.create({
    button: {
        backgroundColor: '#ff8000',
        borderRadius: 4,
        padding:10
    },
    buttonText : {
        color : '#fff',
        textAlign:'center',
        fontWeight: 'bold'
    }
})