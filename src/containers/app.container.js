import React, {Component} from 'react';
import {
	Text,
	View,
	StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import Nav from './nav.container';
import ToastComponent from './../components/toaster.component'

class AppContainer extends Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<ToastComponent/>
        <Nav />
			</View>
		);
	}
}

const mapStateToProps = function (state) {
	return state;
}
const App = connect(mapStateToProps)(AppContainer);
export default App;
