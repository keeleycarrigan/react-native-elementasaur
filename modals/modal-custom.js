import React, { Component } from 'react';
import {
	Animated,
	InteractionManager,
	Modal,
	View
} from 'react-native';

import { getDeviceSize } from 'utilidon/react-native';

export default class ModalCustom extends Component {
	constructor(props) {
		super(props);

		this.state = {
			active: props.active,
			animation: props.animation || 'slide-up',
			animating: false,
			modal_position: new Animated.Value(props.active)
		}

		this.interaction_handler = null;
	}

	componentWillReceiveProps(next_props) {
		const {
			active,
			animation
		} = next_props;

		if (active !== this.state.active && !this.state.animating) {
			this.setState({ animating: true }, () => {
				this.interaction_handler = InteractionManager.createInteractionHandle();

				if (active) {
					this.onModalShow();
				} else {
					this.onModalHide();
				}
			})
		}

	}

	onModalShow = () => {
		this.setState({ active: true }, () => {
			InteractionManager.runAfterInteractions(() => {
				this.setState({ animating: false });
				if (typeof(this.props.onShow) === 'function') {
					this.props.onShow(this)
				}
			});

			this.toggleModal(true);
		});
	}

	onModalHide = () => {
		InteractionManager.runAfterInteractions(() => {
			this.setState({ active: false }, () => {
				this.setState({ animating: false });
				if (typeof(this.props.onHide) === 'function') {
					this.props.onHide(this)
				}
			});
		});

		this.toggleModal();
	}

	requestClose = () => {
		if (typeof(this.props.onRequestClose) === 'function') {
			this.props.onRequestClose(this);
		}
	}

	toggleModal(active = false) {
		Animated.timing(this.state.modal_position, {
			duration: this.props.duration || 400,
			toValue: active,
			useNativeDriver: true
		}).start(() => {

			if (this.interaction_handler) {
				InteractionManager.clearInteractionHandle(this.interaction_handler);
			}
		});
	}

	getInterpolation() {
		const {
			height,
			width
		} = getDeviceSize();
		let outputRange = [ height, 0 ];

		switch (this.state.animation) {
			case 'fade-in':
				outputRange = [ 0, 1 ];
				break;
			case 'slide-right':
				outputRange = [ -width, 0 ];
				break;
			case 'slide-left':
				outputRange = [ width, 0 ];
				break;
			case 'slide-down':
				outputRange = [ -height, 0 ];
				break;
		}

		return {
				inputRange: [ false, true ],
				outputRange,
				extrapolate: 'clamp'
			};
	}

	getStyle() {
		const interpolation = this.getInterpolation();

		switch (this.state.animation) {
			case 'fade-in':
				return { opacity: this.state.modal_position.interpolate(interpolation) }
			case 'slide-right':
			case 'slide-left':
				return { transform: [ { translateX: this.state.modal_position.interpolate(interpolation) } ] }
				break;
			case 'slide-up':
			case 'slide-down':
			default:
				return { transform: [ { translateY: this.state.modal_position.interpolate(interpolation) } ] }
				break;
		}
	}

	render() {
		if (this.state.active) {
			return (
				<Modal
					animationType={'none'}
					transparent={true}
					visible={this.state.active}
					onRequestClose={this.requestClose}
				>
					<Animated.View style={[ { flex: 1, backgroundColor: 'white' }, this.getStyle(), this.props.style || {} ]}>
						{this.props.children}
					</Animated.View>
				</Modal>
			);
		} else {

			return null;
		}
	}
}
