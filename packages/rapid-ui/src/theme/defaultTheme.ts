import { buttomTheme, inputTheme, menuButtonTheme } from '../components';
import { createTheme } from './createTheme';

const theme = createTheme({
	button: buttomTheme,
	input: inputTheme,
	menuButton: menuButtonTheme,
});

export default theme;
