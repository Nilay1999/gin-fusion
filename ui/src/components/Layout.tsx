import * as React from 'react';
import {
	styled,
	useTheme,
	ThemeProvider,
	createTheme,
	Theme,
} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
	Menu,
	Home,
	Explore,
	Settings,
	Brightness4,
	Brightness7,
	ChevronLeft,
	ChevronRight,
} from '@mui/icons-material';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
const drawerWidth = 240;

const openedMixin = (theme: Theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: 'space-between',
}));

const AppBarStyled = styled(AppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
	backgroundColor: theme.palette.background.paper,
	color: theme.palette.text.primary,
	boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const DrawerStyled = styled(Drawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	'& .MuiDrawer-paper': {
		boxSizing: 'border-box',
		backgroundColor: theme.palette.background.default,
		borderRight: `1px solid ${theme.palette.divider}`,
		...(open ? openedMixin(theme) : closedMixin(theme)),
	},
}));

const MainContent = styled(Box, {
	shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
	flexGrow: 1,
	padding: theme.spacing(3),
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginLeft: open ? `${drawerWidth}px` : `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		marginLeft: open
			? `${drawerWidth}px`
			: `calc(${theme.spacing(8)} + 1px)`,
	},
	width: open
		? `calc(100% - ${drawerWidth}px)`
		: `calc(100% - ${theme.spacing(7)} - 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: open
			? `calc(100% - ${drawerWidth}px)`
			: `calc(100% - ${theme.spacing(8)} - 1px)`,
	},
}));

interface LayoutProps {
	mode: 'light' | 'dark';
	setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
}

const menuItems = [
	{ text: 'Home', icon: <Home />, route: '' },
	{ text: 'Explore', icon: <Explore />, route: 'explore' },
	{ text: 'Settings', icon: <Settings />, route: 'settings' },
];

const Layout: React.FC<LayoutProps> = ({ mode, setMode }) => {
	const theme = useTheme();
	const [open, setOpen] = React.useState(true);
	const location = useLocation();

	const handleDrawerToggle = () => {
		setOpen(!open);
	};

	const handleThemeToggle = () => {
		setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
	};

	const handleSelected = (path: string) => {
		return location.pathname === `/${path}`;
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBarStyled position="fixed" open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="toggle drawer"
						onClick={handleDrawerToggle}
						edge="start"
						sx={{ mr: 2 }}>
						<Menu />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						<Box display="flex" alignItems="center">
							<RamenDiningIcon sx={{ mr: 1 }} />
							Noodl
						</Box>
					</Typography>
				</Toolbar>
			</AppBarStyled>
			<DrawerStyled variant="permanent" open={open}>
				<DrawerHeader>
					{open && (
						<Typography variant="h6" sx={{ ml: 2 }}>
							Menu
						</Typography>
					)}
					<IconButton onClick={handleDrawerToggle}>
						{theme.direction === 'rtl' ? (
							<ChevronRight />
						) : (
							<ChevronLeft />
						)}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{menuItems.map(({ text, icon, route }) => (
						<ListItem
							key={text}
							disablePadding
							sx={{ display: 'block' }}>
							<ListItemButton
								selected={handleSelected(route)}
								component={Link}
								to={`/${route}`}
								sx={{
									minHeight: 48,
									px: 2.5,
									justifyContent: open ? 'initial' : 'center',
								}}>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : 'auto',
										justifyContent: 'center',
									}}>
									{icon}
								</ListItemIcon>
								<ListItemText
									primary={text}
									sx={{ opacity: open ? 1 : 0 }}
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Box sx={{ flexGrow: 1 }} />
				<Divider />
				<List>
					<ListItem
						sx={{
							justifyContent: open ? 'space-between' : 'center',
						}}>
						{open && (
							<ListItemIcon sx={{ minWidth: 0, mr: 3 }}>
								{mode === 'dark' ? (
									<Brightness7 />
								) : (
									<Brightness4 />
								)}
							</ListItemIcon>
						)}
						<Switch
							checked={mode === 'dark'}
							onChange={handleThemeToggle}
							aria-label="toggle theme mode"
						/>
					</ListItem>
				</List>
			</DrawerStyled>
			<MainContent open={open}>
				<DrawerHeader />
				<Outlet />
			</MainContent>
		</Box>
	);
};

export default Layout;
