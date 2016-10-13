import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	TouchableNativeFeedback,
	TouchableOpacity
} from 'react-native';

import EditProfileComponent from './edit.profile.component';

let Icon = require('react-native-vector-icons/MaterialIcons');

export default class ProfileSummaryComponent extends Component {
	render() {

		//TODO: this data would come via the props/store
		let stats = [];

		const userState = this.props.user;
		const user = userState;
		return (
			<View style={styles.profileSummary}>
				<View style={styles.imageWrap}>
					<Image style={styles.image} resizeMode='cover' source={{ 
						uri: user && user.info && user.info.data && user.info.data.photo || 'https://www.gravatar.com/avatar/x?f=y&d=mm&s=300'
					}} />
				</View>
				<Text style={styles.userName}>
				{
					user && user.info && user.info.data && user.info.data.name || 'Login'
				}
				</Text>

				<View style={styles.stats}>
					{
						stats.map((stat) => {
							return (
								<View style={styles.statItem} key={"Tester"}>
									<Text style={styles.statItemVal}>{"Tester"}</Text>
									<Text style={styles.statItemTitle}>{"Tester"}</Text>
								</View>
							)
						})
					}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	profileSummary: {
		// flex: 1
	},
	userName: {
		fontSize: 24,
		fontFamily: 'sans-serif-light',
		textAlign: 'center',
		marginBottom: 16,
	},
	imageWrap: {
		paddingTop: 24,
		paddingBottom: 16,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	image: {
		width: 108,
		borderRadius: 54,
		height: 108,
	},
	stats: {
		flexDirection: 'row',
		// backgroundColor: '#f4f4f4'
		borderTopWidth: 1,
		borderTopColor: '#f4f4f4'
	},
	statItem: {
		flex: 1,
		paddingVertical: 16,
		borderLeftWidth: 0.5,
		borderLeftColor: '#f4f4f4',
		borderRightWidth: 0.5,
		borderRightColor: '#f4f4f4'
	},
	statItemVal: {
		textAlign: 'center',
		fontFamily: 'roboto',
		fontSize: 16
	},
	statItemTitle: {
		textAlign: 'center',
		color: 'rgba(0, 0, 0, 0.27)',
		fontSize: 12
	},
	editIconWrap: {
		backgroundColor: '#ff8000',
		padding: 5,
		borderRadius: 50,
		position: 'absolute',
		bottom: 15,
		right: 98
	},
	editIcon: {
		color: '#fff'
	}
});