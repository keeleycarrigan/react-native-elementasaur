import React, { PropTypes } from 'react';
import {
	ListView,
	View
} from 'react-native';
import {
	isArray,
	isPlainObject
} from 'lodash';

import { makeListSrc } from 'utilidon/react-native';
import { exists } from 'utilidon/vanilla-js';

export default BaseList = (props) => {
	const {
		data,
		initialSize,
		meta,
		renderRow,
		renderSeparator,
		separatorColor: sep_color,
		separatorStyles: sep_styles,
		separatorWidth: sep_width,
		...other_props
	} = props;
	const src_opts = isArray(data) ? {} : { sectionHeaderHasChanged: (s1, s2) => s1 !== s2 };
	const clone = isArray(data) ? 'cloneWithRows' : 'cloneWithRowsAndSections';
	const list_src = makeListSrc(src_opts);
	const list_data = list_src[clone](data);

	const renderItemSeparator = (sectionID, rowID, adjacentRowHighligted) =>
		(<View key={`${sectionID}-${rowID}`} style={[ { height: sep_width, backgroundColor: sep_color }, sep_styles ]} />)

	const renderItemRow = (data, section_id, row_id, hightlight_row) => {
		const row_data = isPlainObject(data) ? data : { data };
		return renderRow(Object.assign({}, meta, row_data), section_id, row_id, hightlight_row);
	}

	if (list_data.getRowCount()) {
		return (
			<ListView
				dataSource={list_data}
				initialListSize={initialSize}
				renderSeparator={props.showSeparator ? renderSeparator || renderItemSeparator : null}
				renderRow={renderItemRow}
				{...other_props}
			/>
		)
	} else {
		return null;
	}
}

BaseList.propTypes = {
	data: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object
	]),
	initialListSize: PropTypes.number,
	renderRow: PropTypes.func.isRequired,
	renderSeparator: PropTypes.func,
	separatorWidth: PropTypes.number,
    separatorColor: PropTypes.string,
	separatorStyles: PropTypes.object,
	showSeparator: PropTypes.bool
};

BaseList.defaultProps = {
  data: [],
  initialListSize: 5,
  meta: {},
  separatorWidth: 1,
  separatorColor: '#3B4752',
  separatorStyles: {},
  showSeparator: true
};
