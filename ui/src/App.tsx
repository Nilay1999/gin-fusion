import { useContext, useMemo, useState } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
	Outlet,
} from 'react-router-dom';
import { AuthContext, AuthProvider } from '@hooks/AuthContext';
import Login from '@components/auth/Login';
import Register from '@components/auth/Register';
import { ThemeProvider } from '@mui/material';
import { Dashboard } from '@components/Dashboard';
import themeConfig from '@components/theme';

const App: React.FC = () => {
	const [mode, setMode] = useState<'light' | 'dark'>('light');
	const theme = useMemo(() => themeConfig(mode), [mode]);
	const PrivateRoute = () => {
		const { authenticated } = useContext(AuthContext);
		if (!authenticated) return <Navigate to="/login" replace />;

		return <Outlet />;
	};

	return (
		<ThemeProvider theme={theme}>
			<AuthProvider>
				<Router>
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Register />} />
						<Route element={<PrivateRoute />}>
							<Route
								path="/home"
								element={
									<Dashboard mode={mode} setMode={setMode} />
								}
							/>
						</Route>
					</Routes>
				</Router>
			</AuthProvider>
		</ThemeProvider>
	);
};

export default App;
