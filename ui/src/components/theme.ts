import { createTheme, PaletteMode } from '@mui/material/styles';

const themeMaker = (mode: PaletteMode) =>
	createTheme({
		palette: {
			mode,
			background: {
				default: mode === 'dark' ? '#121212' : '#ffffff',
				paper: mode === 'dark' ? '#1e1e1e' : '#f5f5f5',
			},
			text: {
				primary: mode === 'dark' ? '#ffffff' : '#000000',
				secondary: mode === 'dark' ? '#b0b0b0' : '#4f4f4f',
			},
		},
		typography: {
			fontFamily: `'Cal Sans', sans-serif`,
		},
	});

export default themeMaker;
