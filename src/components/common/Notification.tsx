import { Snackbar, Alert, AlertColor } from '@mui/material';

interface NotificationProps {
    open: boolean;
    message: string;
    severity: AlertColor;
    onClose: () => void;
}

const Notification = ({ open, message, severity, onClose }: NotificationProps) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{
                position: 'fixed',
                zIndex: 2100, // Higher than Navbar's z-index (2000)
                mt: 8, // Add margin-top to position below AppBar
            }}
        >
            <Alert
                onClose={onClose}
                severity={severity}
                variant="filled"
                sx={{
                    minWidth: '280px',
                    boxShadow: (theme) => theme.shadows[4],
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Notification;