import React, { PropTypes } from 'react';
import {
	View,
	StyleSheet
} from 'react-native';
import { isEmpty } from 'lodash';

import {
	AutoTouchable,
	ProgressiveImage
} from '../index';

export default ListItem = (props) => {
	const {
		contentStyle: content_style,
		img,
		isStatic: is_static,
		rowStyle: row_style,
		...other_props
	} = props;
	const has_img = !isEmpty(img);
	const is_btn = typeof(props.onPress) === 'function' && !is_static;
	const MainWrapper = is_btn ? AutoTouchable : View;
	let wrapper_props = {};

	if (is_btn) {
		wrapper_props = {
			flat: true
		};
	}

	return (
		<MainWrapper {...wrapper_props} { ...other_props }>
			<View style={[ styles.row, styles.base_side_pad, row_style ]}>
				{(() => {
					if (has_img) {
						return <ProgressiveImage { ...img } />
					}
				})()}
				<View style={[ { flex: 1 }, has_img && styles.content, content_style ]}>
					{props.children}
				</View>
			</View>
		</MainWrapper>
	)
};

const styles = StyleSheet.create({
	base_side_pad: {
		paddingLeft: 15,
		paddingRight: 15
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 10,
		paddingBottom: 10,
	},
	content: {
		marginLeft: 10
	}
});

ListItem.propTypes = {
	contentStyle: PropTypes.object,
	img: PropTypes.object,
	isStatic: PropTypes.bool,
	onPress: PropTypes.func,
	rowStyle: PropTypes.object
};

ListItem.defaultProps = {
	contentStyle: {},
	img: {},
	isStatic: false,
	rowStyle: {}
}
