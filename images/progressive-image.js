import React from 'react';
import {
	ActivityIndicator,
	Animated,
	Image,
	StyleSheet,
	View
} from 'react-native';
import PropTypes from 'prop-types';
import Color from 'color-js';
import { get } from 'lodash';

const loaded = false;

export default ProgressiveImage = (props) => {
	const {
		afterImgLoaded,
		height,
		imgProps: img_props,
		overlay,
		round,
		source,
		style,
		width
	} = props;

	const round_styles = round ? { borderRadius: Math.fround(height / 2), overflow: 'hidden' } : {};
	const img_opacity = new Animated.Value(loaded ? 1 : 0);
	const overlay_color = overlay ? Color(overlay.color).setAlpha(overlay.alpha || 0.5).toRGB() : 'transparent';
	const img_size = get(img_props, 'resizeMode', null) === 'cover' ? { flex: 1, height: null, width: null } : { height, width };

	const imageLoaded = () => {
		if (!loaded) {
			Animated.timing(img_opacity, {
				duration: 300,
				toValue: 1
			}).start(() => {
				loaded = true;
				if (typeof(afterImgLoaded) === 'function') {
					afterImgLoaded();
				}
			});
		}
	};

	const renderActivity = () => {
		if (!loaded) {
			return (
				<View style={[ styles.full, styles.center_v_auto ]}>
					<ActivityIndicator color={props.loaderColor} />
				</View>
			)
		} else {
			return null;
		}
	}

	const getImg = (source) => {
		if (source) {
			return (
				<View style={{ flex: 1 }}>
					{renderActivity()}
					<Animated.View style={{ flex: 1, opacity: img_opacity }}>
						<Image
							style={[ img_size ]}
							source={source}
							onLoadEnd={imageLoaded}
							{...img_props}
						/>
						<View style={[ styles.full, styles.center_v_auto, { backgroundColor: overlay_color } ]}></View>
					</Animated.View>
				</View>
			);
		}
	};

	return (
		<View style={[ { height, width, backgroundColor: props.defaultBGColor }, style, round_styles ]}>
			{getImg(source)}
			<View style={[ styles.full, styles.center_v_auto, { backgroundColor: 'transparent' } ]}>
				{props.children}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	center_v_auto: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	full: {
		flex: 1,
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	}
});

ProgressiveImage.propTypes = {
	afterImgLoaded: PropTypes.func,
	defaultBGColor: PropTypes.string,
	height: PropTypes.number,
	imgProps: PropTypes.object,
	loaderColor: PropTypes.string,
	overlay: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.object
	]),
	round: PropTypes.bool,
	source:PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.func,
		PropTypes.number,
		PropTypes.object
	]),
	style: PropTypes.object,
	width: PropTypes.number
};

ProgressiveImage.defaultProps = {
	defaultBGColor: '#CCCCCC',
	height: null,
	loaderColor: '#FFFFFF',
	overlay: false,
	round: false,
	source: false,
	width: null
};
