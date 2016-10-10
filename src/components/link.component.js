import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableNativeFeedback,
	TouchableOpacity
} from 'react-native';
let Icon = require('react-native-vector-icons/MaterialIcons');
let IonIcon = require('react-native-vector-icons/Ionicons');

export default class LinkComponent extends Component {

	_getIcon(iconName) {
		if (iconName) {
			if (iconName.indexOf('md') === 0) {
				//Ionicon
				return <IonIcon style={styles.icon} name={iconName} size={18} />
			} else {
				return <Icon style={styles.icon} name={iconName} size={18} />
			}
		}
		return null;
	}

	render() {
		return (
			<View style={styles.link}>
				<TouchableNativeFeedback
					onPress={this.props.onPress}
					>
					<View style={styles.container}>
						{
							this._getIcon(this.props.linkIcon)
						}
						<View style={styles.textArea}><Text style={styles.text}>{this.props.primaryText}</Text></View>
						{
							this.props.secondaryText ?
								<View style={styles.secondaryArea}><Text style={[styles.text, styles.secondary]}>{this.props.secondaryText}</Text></View> :
								null
						}
					</View>
				</TouchableNativeFeedback>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		flexDirection: 'row',
	},
	text: {
		fontSize: 16
	},
	secondary: {
		textAlign: 'right',
		color: '#57c4c6'
	},
	icon: {
		marginTop: 2
	},
	textArea: {
		paddingHorizontal: 16
	},
	secondaryArea: {
		flex: 1
	},
	link: {
		borderTopWidth: 1,
		borderTopColor: '#f4f4f4',
	}
});