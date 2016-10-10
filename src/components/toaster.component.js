import React, {Component} from 'react'
import {
    Text,
    View,
    TouchableHighlight,
    Animated,
    StyleSheet,
    Dimensions
} from 'react-native' ;


import {connect} from 'react-redux';
import {hideToaster} from './../actions/service.action'

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

 class ToastComponent extends Component{
    constructor(props){
        super(props);
        this.animatedValue = new Animated.Value(0);
         this.state = {
              modalShown: false,
              toastColor: this.props.service.toasterColor,
              message: this.props.service.toasterMessage
         }
    }

    callToast(type){
    if(this.state.modalShown) return
       this.setToastType(type);
       this.setState({ modalShown: true })
       Animated.timing(
        this.animatedValue,
        {
            toValue:1,
            duration:350
        }).start(this.closeToast())

    }

    closeToast(){
        setTimeout(()=>{
           this.setState({modalShown:false})
           this.props.dispatch(hideToaster())
           Animated.timing(
           this.animatedValue,
           {
            toValue:0,
            duration:350
           }).start()
        },2000)
    }


    setToastType(type='error') {
        let color
        if (type == 'error') color = '#ee6053'
        if (type == 'primary') color = '#2487DB'
        if (type == 'warning') color = '#ec971f'
        if (type == 'success') color = 'green'
        this.setState({ toastColor: color })
      }

      componentWillReceiveProps(props){
        if(props.service.showToaster){
            this.callToast(props.service.toasterType)
        }
      }

      render(){
      let animation = this.animatedValue.interpolate({
             inputRange: [0, .3, 1],
             outputRange: [-70, -10, 0]
       })
        return (
       <View>
       <Animated.View  style={{ transform: [{ translateY: animation }], height: 70, backgroundColor: this.state.toastColor, position: 'absolute',left:0, top:0, right:0, justifyContent:'center',zIndex:99999,alignItems:'center' }}>
                 <Text style={{ marginLeft: 10,  color: 'white',  fontSize:16, fontWeight: 'bold' }}>
                   { this.props.service.toasterMessage }
                 </Text>
       </Animated.View>
        </View>

        )
      }

}


const mapStateToProps = function (state) {
	return state;
}
const ToasterComponent = connect(mapStateToProps)(ToastComponent);
export default ToasterComponent