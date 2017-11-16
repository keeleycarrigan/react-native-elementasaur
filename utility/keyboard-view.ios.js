import React, { Component } from 'react';
import {
	Animated,
	Dimensions,
	findNodeHandle,
	Keyboard,
	LayoutAnimation,
	ScrollView,
	View
} from 'react-native';
import PropTypes from 'prop-types';

const { height: win_height, width: win_width } = Dimensions.get('window');

export default class KeyboardView extends Component {
	constructor(props) {
		super(props);


		this.state = {
			active: false,
			height: new Animated.Value(0)
		}
	}

	componentDidMount() {
		this.onKeyboardShowListener = Keyboard.addListener('keyboardWillShow', this.onKeyboardShow.bind(this));
		this.onKeyboardHideListener = Keyboard.addListener('keyboardWillHide', this.onKeyboardHide.bind(this));
	}

	componentWillUnmount() {
		this.onKeyboardShowListener.remove();
		this.onKeyboardHideListener.remove();
	}

	// scrollToEl(e) {
	// 	const responder = this.scroll_view.getScrollResponder();

	// 	responder.scrollResponderScrollNativeHandleToKeyboard(findNodeHandle(e.target), 50, true);
	// }

	onKeyboardShow(e) {
		Animated.timing(
			this.state.height,
			{
				toValue: e.endCoordinates.screenY,
				duration: 200,
			}
		).start(() => this.setState({ active: true }));

		if (typeof(this.props.onToggle) === 'function') {
			this.props.onToggle(true, this);
		}
	}

	onKeyboardHide(e) {
		Animated.timing(
			this.state.height,
			{
				toValue: e.endCoordinates.screenY,
				duration: 200,
			}
		).start(() => this.setState({ active: false }));

		if (typeof(this.props.onToggle) === 'function') {
			this.props.onToggle(false, this);
			this.scroll_view.scrollTo({ y: 0 });
		}
	}

	handleOnLayout = (e) => {
		const { height } = e.nativeEvent.layout;

		Animated.timing(
			this.state.height,
			{
				toValue: height,
				duration: 0,
			}
		).start();
	}

	render() {
		return (
			<View
				ref={(ref) => { this.wrap_view = ref; }}
				style={{ flex: 1 }}
				onLayout={this.handleOnLayout}
			>
				<Animated.View style={{ height: this.state.height }}>
					<ScrollView ref={(scroll_view) => { this.scroll_view = scroll_view; }}>
						{this.props.children}
					</ScrollView>
				</Animated.View>

			</View>

		);
	}
}

KeyboardView.propTypes = {
	topSpacing: PropTypes.number,
	onToggle: PropTypes.func
};

KeyboardView.defaultProps = {
	topSpacing: 0
};
