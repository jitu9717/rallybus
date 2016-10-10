
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableNativeFeedback
} from 'react-native';


export default class UploadImageComponent extends Component{
    constructor(props){
        super(props);
    }


    render() {
        var self=this;
        return (
            <View>
                <View style={styles.contentStyle}>
                    <Text style={styles.textHeading}>{self.props.text}</Text>
                    <View style={styles.imageContainer}>
                        <Image source={self.props.imageSource} resizeMode='contain' style={styles.image} />
                    </View>
                    <View style={styles.imageOption}>
                            <TouchableNativeFeedback onPress={()=> self.props.onClick()}>
                                <View><Text style={styles.uploadButton}>UPLOAD IMAGE</Text></View>
                            </TouchableNativeFeedback>

                            {self.props.imageSource ?
                                <TouchableNativeFeedback onPress={()=> self.props.onRemoveImage()}>
                                    <View><Text style={styles.removeButton}>REMOVE IMAGE</Text></View>
                                </TouchableNativeFeedback> :null
                            }
                    </View>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    imageContainer: {
        flex: 1,
        alignItems: 'center'
    },
    image: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#dddddd',
        marginRight:16,
        marginVertical: 16,
        width: 328,
        height: 150
    },
    uploadButton: {
        color:'#0c0090',
        fontSize:12
    },
    removeButton: {
        color:'red',
        fontSize:12,
        paddingHorizontal:20
    },
    textHeading:{
        color:'lightgrey',
        fontSize: 12,
        paddingBottom:12
    },
    contentStyle:{
        padding:16
    },
    imageOption: {
        flexDirection: 'row'
    }
});
