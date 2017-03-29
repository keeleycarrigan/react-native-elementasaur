import React, { Component } from 'react';
import {
	Dimensions,
	findNodeHandle,
	Keyboard,
	Platform,
	StyleSheet,
	ScrollView,
	View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class KeyboardView extends Component {
	constructor(props) {
		super(props);

		this.top_spacing = this.props.topSpacing || 20;
	}

	componentWillMount() {
		this.updateSavedHeight();
	}

	updateSavedHeight() {
		this.saved_height = Dimensions.get('window').height - this.top_spacing;
	}

	onKeyboardShow() {
		if (typeof(this.props.onShow) === 'function') {
			this.props.onShow(this.scroll_view);
		}
	}

	onKeyboardHide() {
		if (typeof(this.props.onHide) === 'function') {
			this.props.onHide();
		}
	}



	render() {
		this.scroll_view = ScrollView;

		return (
			<View style={{ marginTop: this.top_spacing }}>
				<KeyboardAwareScrollView
					resetScrollToCoords={{ y: 0, x: 0 }}
					onKeyboardWillShow={this.onKeyboardShow.bind(this)}
					onKeyboardWillHide={this.onKeyboardHide.bind(this)}
				>
					<View style={{ height: this.saved_height }}>
						{this.props.children}
					</View>
				</KeyboardAwareScrollView>
			</View>

		);
	}
}

const styles = StyleSheet.create({
	wrap: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
