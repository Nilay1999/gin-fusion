import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '@hooks/AuthContext';
import Login from '@components/auth/Login';
import Register from '@components/auth/Register';
import { Dashboard } from '@components/Dashboard';
import HomePage from 'pages/Home';
import ExplorePage from 'pages/Explore';
import SettingsPage from 'pages/Settings';

const PrivateRoute = () => {
	const { authenticated } = useContext(AuthContext);
	if (!authenticated) return <Navigate to="/login" replace />;
	return <Outlet />;
};

const AppRoutes = ({
	mode,
	setMode,
}: {
	mode: 'light' | 'dark';
	setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
}) => {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Register />} />
			<Route element={<PrivateRoute />}>
				<Route
					path="/"
					element={<Dashboard mode={mode} setMode={setMode} />}>
					<Route index element={<HomePage />} />
					<Route path="explore" element={<ExplorePage />} />
					<Route path="settings" element={<SettingsPage />} />
				</Route>
			</Route>
		</Routes>
	);
};

export default AppRoutes;
