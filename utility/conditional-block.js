import React, { PropTypes } from 'react';
import { View } from 'react-native';
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
	test: PropTypes.bool
};
