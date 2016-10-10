import React, {Component} from 'react';
import {
	View,
	StyleSheet,
	ActivityIndicator
} from 'react-native';

export default class LoaderComponent extends Component {
	render() {
		return (
			<View style={styles.loader}>
				<ActivityIndicator color={'#ff8000'} size={'large'}></ActivityIndicator>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});