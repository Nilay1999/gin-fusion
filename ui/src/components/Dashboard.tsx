import React, { useState } from 'react';
import {
	Box,
	CssBaseline,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Switch,
	Toolbar,
} from '@mui/material';
import { borderRadius, borderRight, styled } from '@mui/system';
import {
	Home,
	Settings,
	Explore,
	Brightness4,
	Brightness7,
} from '@mui/icons-material';
import { Link, Outlet, useLocation } from 'react-router-dom';
import StyledListItemButton from './button/StyledListItemButton';

const drawerWidth = 200;

const Root = styled(Box)({
	display: 'flex',
	width: '100vw',
	height: '100vh',
	overflow: 'hidden',
});

const StyledDrawer = styled(Drawer)(({ theme }) => ({
	width: drawerWidth,
	flexShrink: 0,
	'.MuiDrawer-paper': {
		width: drawerWidth,
		boxSizing: 'border-box',
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.text.primary,
		boxShadow: 'none',
		borderRight: 'none',
	},
}));

const MainContent = styled(Box)(({ theme }) => ({
	flexGrow: 1,
	backgroundColor: theme.palette.background.default,
	marginLeft: drawerWidth,
	width: `calc(100% - ${drawerWidth}px)`,
	height: '100vh',
	boxSizing: 'border-box',
	overflow: 'auto',
}));

const StyledListItemIcon = styled(ListItemIcon)({
	minWidth: '40px',
	display: 'flex',
	justifyContent: 'flex-start',
});

interface DashboardProps {
	mode: 'light' | 'dark';
	setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
}

export const Dashboard: React.FC<DashboardProps> = ({ mode, setMode }) => {
	const location = useLocation();
	const handleSelected = (path: string) => {
		return location.pathname === `/${path}`;
	};

	const handleThemeToggle = () => {
		setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
	};

	return (
		<Root>
			<CssBaseline />
			{/* Drawer */}
			<StyledDrawer variant="permanent">
				<List>
					<ListItem disablePadding>
						<StyledListItemButton
							component={Link}
							to="/"
							selected={handleSelected('')}>
							<StyledListItemIcon>
								<Home />
							</StyledListItemIcon>
							<ListItemText primary="Home" />
						</StyledListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<StyledListItemButton
							component={Link}
							to="/explore"
							selected={handleSelected('explore')}>
							<StyledListItemIcon>
								<Explore />
							</StyledListItemIcon>
							<ListItemText primary="Explore" />
						</StyledListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<StyledListItemButton
							component={Link}
							to="/settings"
							selected={handleSelected('settings')}>
							<StyledListItemIcon>
								<Settings />
							</StyledListItemIcon>
							<ListItemText primary="Settings" />
						</StyledListItemButton>
					</ListItem>
				</List>

				{/* Spacer to push the Switch to the bottom */}
				<Box sx={{ flexGrow: 1 }} />

				{/* Theme Switch at the bottom */}
				<List>
					<ListItem
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
						}}>
						<StyledListItemIcon>
							{mode === 'dark' ? (
								<Brightness7 />
							) : (
								<Brightness4 />
							)}
						</StyledListItemIcon>
						<Switch
							color="default"
							edge="start"
							checked={mode === 'dark'}
							onChange={handleThemeToggle}
							inputProps={{ 'aria-label': 'toggle theme mode' }}
						/>
					</ListItem>
				</List>
			</StyledDrawer>

			{/* Main Content */}
			<MainContent>
				<Toolbar />
				<Outlet />
				{/* This is where the dynamic content will be rendered */}
			</MainContent>
		</Root>
	);
};
