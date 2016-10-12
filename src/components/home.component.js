import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet
} from 'react-native';

export default class HomeComponent extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.textstyle}>Welcome, </Text>
				<Text style={styles.textstyle}>to</Text>
				<Text style={styles.textstyle}>Rally Bus !!!!</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	textstyle : {
		fontSize: 24
	}


});