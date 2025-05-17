import { createTheme, PaletteMode } from '@mui/material';

// Placeholder image URLs for testing
export const PLACEHOLDER_IMAGES = {
	avatar: 'https://i.pravatar.cc/300',
	product: 'https://picsum.photos/800/600',
	logo: 'https://placehold.co/200x50',
	banner: 'https://picsum.photos/1200/400',
	thumbnail: 'https://picsum.photos/200/200',
	background: 'https://picsum.photos/1920/1080',
};

const themeMaker = (mode: PaletteMode, style: 'professional') =>
	createTheme({
		palette: {
			mode,
			...(style === 'professional' && {
				primary: { main: mode === 'dark' ? '#3B82F6' : '#2563EB' },
				secondary: { main: mode === 'dark' ? '#F59E0B' : '#D97706' },
				background: {
					default: mode === 'dark' ? '#1F2937' : '#F5F5F5',
					paper: mode === 'dark' ? '#374151' : '#FFFFFF',
				},
				text: {
					primary: mode === 'dark' ? '#E0E0E0' : '#2C3E50',
					secondary: mode === 'dark' ? '#B0BEC5' : '#34495E',
				},
				divider:
					mode === 'dark'
						? 'rgba(255, 255, 255, 0.12)'
						: 'rgba(0, 0, 0, 0.08)',
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
					root: {
						textTransform: 'none',
						borderRadius: 8,
						boxShadow: 'none',
						'&:hover': {
							boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
						},
					},
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
			MuiInputBase: {
				styleOverrides: {
					input: {
						color: '#000000',
					},
				},
			},
			MuiPaper: {
				styleOverrides: {
					root: {
						backgroundImage: 'none',
					},
				},
			},
		},
	});

export default themeMaker;
