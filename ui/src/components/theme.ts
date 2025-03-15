import { createTheme, PaletteMode } from '@mui/material';

const themeMaker = (mode: PaletteMode, style: 'professional') =>
	createTheme({
		palette: {
			mode,
			...(style === 'professional' && {
				primary: { main: mode === 'dark' ? '#009BE5' : '#1565C0' },
				secondary: { main: mode === 'dark' ? '#FFB74D' : '#FF9800' },
				background: {
					default: mode === 'dark' ? '#272932' : '#ECEFF1',
					paper: mode === 'dark' ? '#22242C' : '#FFFFFF',
				},
				text: {
					primary: mode === 'dark' ? '#E0E0E0' : '#37474F',
					secondary: mode === 'dark' ? '#B0BEC5' : '#5C6BC0',
				},
			}),
		},
		typography: {
			fontFamily: `'Cal Sans', sans-serif`,
			body1: { fontSize: '1rem' },
			body2: { fontSize: '0.875rem' },
		},
		components: {
			MuiButton: {
				styleOverrides: {
					root: { textTransform: 'none', borderRadius: 8 },
				},
			},
			MuiIconButton: {
				styleOverrides: {
					root: {
						':active': {
							color: '#272932',
						},
					},
				},
			},
		},
	});

export default themeMaker;
