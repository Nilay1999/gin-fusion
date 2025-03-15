import { useMemo, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@hooks/AuthContext';
import { ThemeProvider } from '@mui/material';
import themeConfig from '@components/theme';
import AppRoutes from './AppRoutes';

const App: React.FC = () => {
	const [mode, setMode] = useState<'light' | 'dark'>('dark');
	const theme = useMemo(() => themeConfig(mode, 'professional'), [mode]);

	return (
		<ThemeProvider theme={theme}>
			<AuthProvider>
				<Router>
					<AppRoutes mode={mode} setMode={setMode} />
				</Router>
			</AuthProvider>
		</ThemeProvider>
	);
};

export default App;
