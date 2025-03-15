import { styled } from '@mui/system';
import ListItemButton, {
	ListItemButtonProps,
} from '@mui/material/ListItemButton';

interface StyledListItemButtonProps extends ListItemButtonProps {
	to?: string; // Allow `to` prop when using `component={Link}`
}

const StyledListItemButton = styled(ListItemButton)<StyledListItemButtonProps>(
	({ theme }) => ({
		'&.Mui-selected': {
			backgroundColor: theme.palette.background.default,
		},
	})
);

export default StyledListItemButton;
