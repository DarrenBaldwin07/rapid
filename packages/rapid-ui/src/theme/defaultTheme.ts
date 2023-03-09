import {
	buttonTheme,
	inputTheme,
	menuButtonTheme,
	textAreaTheme,
	selectTheme,
	tooltipTheme,
	switchTheme,
} from '../components';
import { createTheme } from './createTheme';

const theme = createTheme({
	button: buttonTheme,
	input: inputTheme,
	textArea: textAreaTheme,
	menuButton: menuButtonTheme,
	select: selectTheme,
	tooltip: tooltipTheme,
	switch: switchTheme,
});

export default theme;
