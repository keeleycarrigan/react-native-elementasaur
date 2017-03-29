import React from 'react';
import {
	Image,
	StyleSheet,
	View
} from 'react-native';

export default BackgroundImg = (props) => {
	const {
		source,
		style,
		screenStyle: screen_style
	} = props;

	return (
		<Image source={source} resizeMode={'cover'} style={{ flex: 1, width: null, height: null, ...style }}>
			<View style={[ styles.img_screen, screen_style || {} ]}></View>
			{props.children}
		</Image>
	);
};

const styles = StyleSheet.create({
	img_screen: {
		flex: 1,
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	}
});
