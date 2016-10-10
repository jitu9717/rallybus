import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Alert
} from 'react-native';

import ProfileSummary from '../components/profile.summary.component';
import ServiceComponent from './service.container';
import ContactComponent from './contact.container';
import HomeComponent from '../components/home.component';
import Link from '../components/link.component';
import {connect} from 'react-redux';

const components = {
	HomeComponent,
	ServiceComponent,
	ContactComponent
};

let moment = require('moment');

export default class DrawerComponent extends Component {

	constructor(props) {
		super(props);
	}


	showComponent(item) {
		if (item.name === 'logout') {
			return this.logout(item);
		}

		let obj = {
			name: item.name,
			title: item.primaryText,
			component: components[item.componentToShow],
			goToRoute: this.props.goToRoute
		};
		if (item.topRightMenu)
			obj.onRightPress = (route, navigator, index, navState) => {
				console.log("pressed right button");
			};

		this.props.goToRoute(obj);
	}

	logout(item) {
		const self = this;
		Alert.alert(
			'Logout',
			'Are you sure you want to Logout?',
			[
				{ text: 'Cancel', style: 'cancel' },
				{
					text: 'Ok', onPress: () => {
						self.props.logoutUser();
					}
				}
			]
		)
	}

	render() {
		let self = this;

		return (
			<View style={styles.drawer}>
				<ScrollView
					ref={'SCROLLER'}
					automaticallyAdjustContentInsets={false}
					scrollEventThrottle={200}>
					<ProfileSummary {...this.props} />
					{
						this.props.drawer.list.map((item, idx) => {
							return (
								(this.props) ?
								<Link
									{...self.props}
									key={idx}
									linkIcon={item.linkIcon}
									primaryText={item.primaryText}
									secondaryText={item.secondaryText}
									onPress={() => { self.showComponent(item) } }
									/> : null
							)
						})
					}
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	drawer: {
		flex: 1
	}
});
