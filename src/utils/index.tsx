import { Dimensions } from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from 'react-native-responsive-screen';

function getWindowDimensions() {
	const winDim = Dimensions.get('window');

	return {
		height: winDim.height,
		width: winDim.width
	};
}

const { width, height } = getWindowDimensions();

function getResponsiveWP({ px }: { px: number }) {
	const percent = `${(px / getWindowDimensions().width) * 100}%`;
	return wp(percent);
}
function getResponsiveHP({ px }: { px: number }) {
	const percent = `${(px / getWindowDimensions().height) * 100}%`;
	return hp(percent);
}
function getResponsiveGenHP({ p }: { p: number }) {
	return hp(`${p}%`);
}

function getResponsiveGenWP({ p }: { p: number }) {
	return wp(`${p}%`);
}

export {
	getResponsiveWP,
	getWindowDimensions,
	getResponsiveGenHP,
	getResponsiveGenWP,
	getResponsiveHP,
	width as windowWidth,
	height as windowHeight
};