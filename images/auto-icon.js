import React from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

export default AutoIcon = (props) => {
	const {
		name,
		outline,
		size,
		style,
		...other_props
	} = props;

	if (typeof(name) === 'string') {
		const logos = [ 'android', 'angular', 'apple', 'bitcoin', 'buffer', 'chrome', 'codepen', 'css3', 'designernews', 'dribbble', 'dropbox', 'euro', 'facebook', 'foursquare', 'freebsd-devil', 'github', 'google', 'googleplus', 'hackernews', 'html5', 'instagram', 'javascript', 'linkedin', 'markdown', 'nodejs', 'octocat', 'pinterest', 'playstation', 'python', 'reddit', 'rss', 'sass', 'skype', 'snapchat', 'steam', 'tumblr', 'tux', 'twitch', 'twitter', 'usd', 'vimeo', 'whatsapp', 'windows', 'wordpress', 'xbox', 'yahoo', 'yen', 'youtube' ];

		let icon_name = Platform.OS === 'ios' ? `ios-${name}` : `md-${name}`;

		if (logos.indexOf(name) > -1) {
			icon_name = `logo-${name}`;
		} else if (Platform.OS === 'ios' && outline) {
			icon_name = `${icon_name}-outline`;
		}

		return (
			<Icon
				name={icon_name}
				size={size}
				style={[ { height: size }, style ]}
				{...other_props}
			/>
		);
	} else {
		return null;
	}

}

AutoIcon.propTypes = {
	color: PropTypes.string,
	name: PropTypes.string.isRequired,
	outline: PropTypes.bool,
	size: PropTypes.number
};

AutoIcon.defaultProps = {
	color: '#3B4752',
	outline: false,
	size: 20
};
