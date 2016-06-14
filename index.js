'use strict';

import React, {
	Component,
	PropTypes,
} from 'react';
import {
	Platform,
	ListView,
	ViewPagerAndroid,
	StyleSheet,
	View,
} from 'react-native';

const componentStyles = StyleSheet.create({
	navContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	navPageItem: {
		height: 10,
		width: 10,
		margin: 5,
		backgroundColor: 'gray',
		borderRadius: 5,
	},
});

export default class Pager extends Component {

	static propTypes = {
		children: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.element,
		]),
		onPageChanged: PropTypes.func.isRequired,
		style: View.propTypes.style,
	};

	static defaultProps = {
		onPageChanged: () => undefined,
		style: {},
	};

	constructor(props) {
		super(props);
		this.state = {
			activeIndex: 0,
		};
	}

	onPageChanged = (event) => {
		let activeIndex = Platform.OS === 'ios' ? event.nativeEvent.contentOffset.x / this.pageWidth : event.nativeEvent.position;
		if (activeIndex !== this.state.activeIndex) {
			this.props.onPageChanged(activeIndex);
		}
		this.setState({
			activeIndex,
		});
	};

	renderNav = () => {
		return React.Children.toArray(this.props.children).map((child, index) => {
			return (
				<View
					key={index}
					style={[componentStyles.navPageItem, this.state.activeIndex === index ? { backgroundColor: 'blue'} : {}]}
				 />
			);
		});
	};

	render() {
		if (Platform.OS === 'ios') {
			const pages = React.Children.map(this.props.children, (child) => React.cloneElement(child));
			const dataSource = new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2,
			}).cloneWithRows(pages);
			return (
				<View style={this.props.style}>
					<ListView
						dataSource={dataSource}
						horizontal={true}
						onContentSizeChange={(width) => {
							this.pageWidth = width / React.Children.count(this.props.children);
						}}
						onMomentumScrollEnd={this.onPageChanged}
						pagingEnabled={true}
						renderRow={(Page) => Page}
						showsHorizontalScrollIndicator={false}
						snapToInterval={1}
						style={this.props.style}
					/>
					<View style={componentStyles.navContainer}>
						{this.renderNav()}
					</View>
				</View>
			);
		} else if (Platform.OS === 'android') {
			return (
				<View style={this.props.style}>
					<ViewPagerAndroid
						onPageSelected={this.onPageChanged}
						style={this.props.style}
					>
						{this.props.children}
					</ViewPagerAndroid>
					<View style={componentStyles.navContainer}>
						{this.renderNav()}
					</View>
				</View>
			);
		}
	}

}