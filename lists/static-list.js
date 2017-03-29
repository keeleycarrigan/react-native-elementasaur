import React, { PropTypes } from 'react';
import {
	TouchableOpacity,
	View
} from 'react-native';
import {
	isObject,
	isArray
} from 'lodash';

import {
	exists,
	objToArray
} from 'utilidon/vanilla-js';

import {
	AutoTouchable,
	OptionalText
} from '../index';

export default StaticList = (props) => {
	const {
		data,
		onPress,
		pressTest,
		renderRow,
		renderSeparator,
		separatorColor: sep_color,
		separatorStyles: sep_styles,
		separatorWidth: sep_width,
		showSeparator,
		...other_props
	} = props;
	const item_list = exists(data) && (isObject(data) || isArray(data)) ? objToArray(data) : [];
	const internalRenderSeparator = (item, idx, items) => {
		if (idx < items.length - 1) {
			return (
				<View style={[ { height: sep_width, backgroundColor: sep_color }, sep_styles ]} />
			);
		}
	};
	const internalRenderRow = (item, idx, items) => {
		const is_btn = typeof(onPress) === 'function';
		const btn_test = pressTest ? pressTest(item) : true;
		const MainWrapper = is_btn && btn_test ? AutoTouchable : View;
		const separatorRenderer = showSeparator ? renderSeparator || internalRenderSeparator : false;
		let item_data = Object.assign({}, item, { is_btn: false });
		let wrapper_props = {};

		if (is_btn && btn_test) {
			item_data.is_btn = true;
			wrapper_props = {
				onPress: () => onPress(item),
				flat: true
			};
		}

		return (
			<View key={idx}>
				<MainWrapper {...wrapper_props}>
					{renderRow(item_data, idx, items)}
				</MainWrapper>
				{separatorRenderer && separatorRenderer(item, idx, items)}
			</View>
		);
	};

	if (item_list.length) {
		return (
			<View {...other_props}>
				{item_list.map(internalRenderRow)}
			</View>
		);
	} else {
		return null;
	}
}

StaticList.propTypes = {
	data: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object
	]),
	renderRow: PropTypes.func.isRequired,
	renderSeparator: PropTypes.func,
	separatorWidth: PropTypes.number,
    separatorColor: PropTypes.string,
	separatorStyles: PropTypes.object,
	showSeparator: PropTypes.bool
};

StaticList.defaultProps = {
  data: [],
  separatorWidth: 1,
  separatorColor: '#3B4752',
  separatorStyles: {},
  showSeparator: true
};
