import { buttomTheme, inputTheme, menuButtonTheme, textAreaTheme, selectTheme } from '../components';
import { createTheme } from './createTheme';

const theme = createTheme({
	button: buttomTheme,
	input: inputTheme,
	textArea: textAreaTheme,
	menuButton: menuButtonTheme,
	select: selectTheme,
});

export default theme;
