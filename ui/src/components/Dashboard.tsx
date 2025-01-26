import React from 'react';
import {
	AppBar,
	Box,
	CssBaseline,
	Drawer,
	IconButton,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Switch,
	Toolbar,
	Typography,
	useTheme,
} from '@mui/material';
import { styled } from '@mui/system';
import {
	Home,
	Settings,
	BarChart,
	Brightness4,
	Brightness7,
} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

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
	},
}));

const MainContent = styled(Box)(({ theme }) => ({
	flexGrow: 1,
	padding: theme.spacing(3),
	backgroundColor: theme.palette.background.default,
	marginLeft: drawerWidth,
	width: `calc(100% - ${drawerWidth}px)`,
	height: '100vh',
	boxSizing: 'border-box',
	overflow: 'auto',
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	color: theme.palette.text.primary,
	width: `calc(100% - ${drawerWidth}px)`,
	marginLeft: drawerWidth,
	boxSizing: 'border-box',
	boxShadow: 'none',
}));

interface DashboardProps {
	mode: 'light' | 'dark';
	setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
}

export const Dashboard: React.FC<DashboardProps> = ({ mode, setMode }) => {
	const theme = useTheme();

	const handleThemeToggle = () => {
		setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
	};

	return (
		<Root>
			<CssBaseline />
			{/* AppBar */}
			<StyledAppBar position="fixed">
				<Toolbar>
					<Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
						Dashboard
					</Typography>
					{/* Theme Switch */}
				</Toolbar>
			</StyledAppBar>

			{/* Drawer */}
			<StyledDrawer variant="permanent">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="open drawer"
						sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
				</Toolbar>
				<Box sx={{ overflow: 'auto' }}>
					<List>
						<ListItemButton>
							<ListItemIcon>
								<Home color="inherit" />
							</ListItemIcon>
							<ListItemText primary="Home" />
						</ListItemButton>
						<ListItemButton>
							<ListItemIcon>
								<BarChart color="inherit" />
							</ListItemIcon>
							<ListItemText primary="Analytics" />
						</ListItemButton>
						<ListItemButton>
							<ListItemIcon>
								<Settings color="inherit" />
							</ListItemIcon>
							<ListItemText primary="Settings" />
						</ListItemButton>
						<ListItemButton>
							<Switch
								color="default"
								checked={mode === 'dark'}
								onChange={handleThemeToggle}
								inputProps={{
									'aria-label': 'toggle theme mode',
								}}
							/>
							<IconButton color="inherit">
								{mode === 'dark' ? (
									<Brightness7 />
								) : (
									<Brightness4 />
								)}
							</IconButton>
						</ListItemButton>
					</List>
					{/* <Divider /> */}
				</Box>
			</StyledDrawer>

			{/* Main Content */}
			<MainContent>
				<Toolbar />
				<Typography variant="h4" gutterBottom>
					Welcome to the Dashboard
				</Typography>
				<Typography variant="body1">
					This is your dashboard where you can manage your tasks, view
					analytics, and configure settings.
				</Typography>
			</MainContent>
		</Root>
	);
};
