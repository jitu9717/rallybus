import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	CameraRoll,
	Image,
	TouchableNativeFeedback
} from 'react-native';
let Icon = require('react-native-vector-icons/MaterialIcons');

export default class EditProfileComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			pics: []
		}
	}
	componentDidMount() {
		var self = this;
		CameraRoll
			.getPhotos({ first: 10 })
			.then((photos) => {
				self.setState({ pics: photos.edges });
			})
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<TouchableNativeFeedback
						onPress={() => {
							this.props.navigator.pop();
						} }
						>
						<View>
							<Icon style={styles.close} name='close' size={24} />
						</View>
					</TouchableNativeFeedback>

					<Text style={styles.headerText}>Edit profile</Text>
				</View>

				<View style={styles.list}>
					{
						this.state.pics.map((pic, idx) => {
							return (
								<Image
									key={idx}
									source={{ uri: pic.node.image.uri }}
									style={styles.image}
									/>
							)
						})
					}
				</View>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center'
	},
	header: {
		alignSelf: 'stretch',
		backgroundColor: '#fff',
		elevation: 3,
		height: 60,
		flexDirection: 'row'
	},
	headerText: {
		fontSize: 18,
		paddingVertical: 16
	},
	close: {
		paddingVertical: 17,
		paddingHorizontal: 21
	},
	image: {
		width: 100,
		height: 100,
		margin: 3
	},
	list: {
		justifyContent: 'space-around',
		flexDirection: 'row',
		flexWrap: 'wrap',
	}
}); 