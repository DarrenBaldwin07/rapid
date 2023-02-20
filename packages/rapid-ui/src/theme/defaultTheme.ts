import { buttomTheme, inputTheme, menuButtonTheme, textAreaTheme } from '../components';
import { createTheme } from './createTheme';

const theme = createTheme({
	button: buttomTheme,
	input: inputTheme,
	textArea: textAreaTheme,
	menuButton: menuButtonTheme,
});

export default theme;
