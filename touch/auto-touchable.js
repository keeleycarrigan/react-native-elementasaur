import React from 'react';
import {
	Platform,
	TouchableHighlight,
	TouchableNativeFeedback,
	TouchableOpacity,
	View
} from 'react-native';
import PropTypes from 'prop-types';

export default AutoTouchable = (props) => {
	const {
		children,
		disabled,
		flat,
		borderless,
		borderRadius,
		underlayColor,
		rippleColor: ripple_color,
		...other_props
	} = props;

	let Component = flat ? TouchableOpacity : TouchableHighlight;
	let platform_props = {
		underlayColor,
		style: {
			borderRadius: borderRadius || 0
		}
	};

	if (Platform.OS === 'android') {
		Component = TouchableNativeFeedback;
		const flat_effect = borderless ? 'SelectableBackgroundBorderless' : 'SelectableBackground';
		const bg_effect = flat ? TouchableNativeFeedback[flat_effect]() : TouchableNativeFeedback.Ripple(ripple_color);

		platform_props = {
			background: bg_effect
		}
	} else if (disabled) {
		Component = View;
	}

	return (
		<Component {...platform_props} {...other_props}>
			<View>{children}</View>
		</Component>
	)
}

AutoTouchable.propTypes = {
	borderless: PropTypes.bool,
	flat: PropTypes.bool,
	onPress: PropTypes.func.isRequired,
	rippleColor: PropTypes.string
};

AutoTouchable.defaultProps = {
	borderless: false,
	rippleColor: '#FFFFFF'
};
