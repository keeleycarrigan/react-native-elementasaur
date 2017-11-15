import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import {
	isBoolean,
	isEmpty
} from 'lodash';

export default ConditionalBlock = (props) => {
	const {
		children,
		test,
		...other_props
	} = props;
	const internal_test = isBoolean(test) ? test : !isEmpty(test);

	if (internal_test) {
		return <View {...other_props}>{children}</View>
	} else {
		return null;
	}
}

ConditionalBlock.propTypes = {
	test: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.array,
		PropTypes.object
	])
};
