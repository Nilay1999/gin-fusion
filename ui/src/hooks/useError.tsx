import { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

interface ErrorState {
	message: string;
	show: boolean;
}

const useError = () => {
	const [error, setError] = useState<ErrorState>({
		message: '',
		show: false,
	});

	const showError = (message: string) => {
		setError({ message, show: true });
	};

	const clearError = () => {
		setError({ message: '', show: false });
	};

	// Error component with MUI
	const ErrorComponent = () => (
		<Snackbar
			open={error.show}
			autoHideDuration={6000}
			onClose={clearError}
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
			<Alert
				onClose={clearError}
				severity="error"
				variant="filled"
				elevation={6}>
				{error.message}
			</Alert>
		</Snackbar>
	);

	return { error, showError, clearError, ErrorComponent };
};

export default useError;
