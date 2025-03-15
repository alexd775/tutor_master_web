import React, { useEffect } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface NotificationProps {
    open: boolean;
    message: string;
    severity: AlertColor;
    onClose: () => void;
    duration?: number;
}

const Notification: React.FC<NotificationProps> = ({ open, message, severity, onClose, duration = 4000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [onClose, duration]);

    return (
        <Snackbar
            open={open}
            autoHideDuration={duration}
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