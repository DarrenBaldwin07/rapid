import {
	buttonTheme,
	inputTheme,
	menuButtonTheme,
	textAreaTheme,
	selectTheme,
	tooltipTheme,
	switchTheme,
	dividerTheme,
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
	divider: dividerTheme,
});

export default theme;
