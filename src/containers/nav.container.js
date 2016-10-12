import React, { Component } from 'react';
import {
	DrawerLayoutAndroid,
	StyleSheet,
	Navigator,
	View,
	Text,
	BackAndroid,
	TouchableOpacity,
	InteractionManager
} from 'react-native';
import { connect } from 'react-redux';
import {toggleNavbarVisibility, userLoginSuccess, logoutUser} from '../actions';
import {fetchUserFromStorage} from '../services/auth.service';
import { fetchUserService} from '../actions/api.actions'
import HomeComponent from '../components/home.component';
import LoginComponent from '../components/login.component';
import Loader from '../components/loader.component';
import ServiceComponent from './service.container.js';
import DrawerComponent from './drawer.container';
let Icon = require('react-native-vector-icons/MaterialIcons');
let moment = require('moment');

class NavContainer extends Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {
		var self = this;
		BackAndroid.addEventListener('hardwareBackPress', function () {
			var routes = self.refs.APP_NAV.getCurrentRoutes(0);
			if (routes.length > 1) {
				self.refs.APP_NAV.pop();
				return true;
			}
			return false;
		});

		const user = await fetchUserFromStorage();
		if (user) {
			console.log("REHYDRATE:", user);
			//The user is logged in - Rehydrate state
			await this.props.dispatch(userLoginSuccess(user));
			// await this.props.dispatch(fetchUserService());

			this.goToRoute({
				replace: true,
				name: 'service',
				component: HomeComponent,
				title: 'Home'
			});
		} else {
			//Not logged in- Show the login view
			this.goToRoute({
				replace: true,
				name: 'login',
				hideNavBar: true,
				component: LoginComponent,
				title: 'Login'
			});
		}
	}

	async logoutUser() {
		await this.props.dispatch(logoutUser());
		this.goToRoute({
			replace: true,
			name: 'login',
			hideNavBar: true,
			component: LoginComponent,
			title: 'Login'
		});
	}

	openDrawer() {
		this.refs.DRAWER_REF.openDrawer();
	}

	closeDrawer() {
		this.refs.DRAWER_REF.closeDrawer();
	}

	goToRoute(route) {
		this.closeDrawer();

		if (!route.name) {
			this.refs.APP_NAV.pop();
		} else if (route.replace) {
			this.refs.APP_NAV.replace(route);
		} else {
			this.refs.APP_NAV.push(route);
		}
	}

	_respondToRouteChange(route) {
		if (route.hasOwnProperty('hideNavBar')) {
			this.props.dispatch(toggleNavbarVisibility(false));
		} else {
			this.props.dispatch(toggleNavbarVisibility(true));
		}
	}

	_getNavigationBar(hidden) {
		const { navigation } = this.props;
		const _this = this;

		if (navigation.hideNavBar) {
			return null;
		}

		//TODO: Make the icons and buttons config based
		let NavigationBarRouteMapper = {
			LeftButton(route, navigator, index, navState) {
				return (
					<TouchableOpacity
						underlayColor="transparent"
						style={ styles.leftNavButton }
						onPress={() => _this.openDrawer() }>
						<Icon style={styles.navbarIcon} name='menu' size={30} />
					</TouchableOpacity>
				)
			},
			RightButton(route, navigator, index, navState) {
				if (route.onRightPress) {
					if (route.customTopRightIcon) {
						return (
							<View style={styles.iconList}>
								{
									route.customTopRightIcon.map((button, idx) => {
										return (
											<TouchableOpacity
												style={ styles.rightNavButton } key={idx} onPress={() => { route.onRightPress(route, navigator, index, navState, button.iconName) } }>
												{button.iconName ? <Icon style={[styles.navbarIcon, styles.moreIcon]} name={button.iconName} size={26} /> :
													null }
											</TouchableOpacity>
										)
									})
								}
							</View>
						)
					} else {
						return <Icon style={[styles.navbarIcon, styles.moreIcon]} name='more-vert' size={26} />
					}

				}
			},
			Title(route, navigator, index, navState) {
				return (
					<View style={ styles.titleBox }>
						<Text style={ styles.title }>{route.title?(route.title.length > 20)?route.title.substring(0,20) + '...':route.title:null}</Text>
						{ route.detail ? <Text style={styles.detail}>{route.detail}</Text> : null }
					</View>
				)
			}
		};

		return (
			<Navigator.NavigationBar
				style={ styles.nav }
				routeMapper={ NavigationBarRouteMapper } />
		)
	}

	_configureScene(route, routeStack) {
    switch (route.type) {
			case 'Modal':
				return ({
					...Navigator.SceneConfigs.FloatFromBottomAndroid,
					gestures: false
				});
            case 'Right':
                return ({
                    ...Navigator.SceneConfigs.FloatFromRight,
                    gestures: false
                });
			default:
				return ({
					...Navigator.SceneConfigs.FadeAndroid,
					gestures: false
				});
		}
	}

	_getNavigator() {
		var self = this;
		var goToRoute = this.goToRoute.bind(this);
		var props = self.props;
		const initialRoute = {
			name: 'loading',
			hideNavBar: true,
			title: 'Loading...',
			component: Loader
		};
		return (
			<Navigator
				ref={"APP_NAV"}
				navigationBar={ self._getNavigationBar() }
				initialRoute={initialRoute}
				onWillFocus={ self._respondToRouteChange.bind(self) }
				configureScene={ self._configureScene }
				renderScene={(route, navigator) => {
					if (route.component) {
						return React.createElement(route.component, {
							navigator,
							route,
							goToRoute: route.goToRoute || goToRoute,
							...props
						});
				}
				} } />
		);
	}

render() {
		var self = this;
		var drawerLockState = 'unlocked';
		return (
		<DrawerLayoutAndroid
			drawerWidth={304}
			drawerLockMode={drawerLockState}
			ref={'DRAWER_REF'}
			drawerPosition={DrawerLayoutAndroid.positions.Left}
			renderNavigationView={() => {
				return (
					<DrawerComponent
						logoutUser={self.logoutUser.bind(self) }
						goToRoute={self.goToRoute.bind(self) }  {...self.props} />
				)
			} }>
			{
				self._getNavigator()
			}
		</DrawerLayoutAndroid>
		);
}
}

const styles = StyleSheet.create({
	nav: {
		flex: 1,
		backgroundColor: "#fafafa",
	},
	navbarIcon: {
		padding: 13
	},
	titleBox: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
	title: {
		paddingHorizontal: 0,
		fontSize: 18

	},
	midIcon: {
		paddingVertical: 13,
		paddingHorizontal: 15,
	},
	moreIcon: {
		paddingVertical: 13,
		paddingHorizontal: 5,
	},
	detail: {
		color: '#d00000',
		fontSize: 12
	},
	iconList: {
		flexDirection: 'row'
	}
});

const mapStateToProps = function (state) {
	return state
};

const Nav = connect(mapStateToProps)(NavContainer);
export default Nav;
