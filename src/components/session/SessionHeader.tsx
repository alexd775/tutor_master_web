import { useState } from 'react';
import { Box, Typography, Chip, Button, useTheme } from '@mui/material';
import { Clock, BarChart2, RefreshCw } from 'lucide-react';
import { Session } from '../../types/session';
import { useSessionManagement } from '../../hooks/useSessionManagement';
import ConfirmationDialog from '../common/ConfirmationDialog';

interface SessionHeaderProps {
    session: Session;
    onRestartSuccess?: () => void;
    onRestartError?: (error: Error) => void;
}

const SessionHeader = ({ session, onRestartSuccess, onRestartError }: SessionHeaderProps) => {
    const theme = useTheme();
    const { restartSession } = useSessionManagement();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const handleRestart = async () => {
        try {
            await restartSession.mutateAsync(session.id);
            onRestartSuccess?.();
        } catch (error) {
            onRestartError?.(error as Error);
        }
    };

    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
            }}>
                <Box>
                    <Typography variant="overline" color="text.secondary">
                        Current Session
                    </Typography>
                    <Typography variant="h5" color="text.primary" gutterBottom>
                        {session.topic_title}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: theme.palette.text.secondary,
                    }}>
                        <Clock size={16} />
                        <Typography variant="body2">
                            {session.duration} min
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: theme.palette.text.secondary,
                    }}>
                        <BarChart2 size={16} />
                        <Typography variant="body2">
                            {Math.round(session.completion_rate * 100)}% complete
                        </Typography>
                    </Box>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<RefreshCw size={16} />}
                        onClick={() => setIsConfirmOpen(true)}
                        disabled={restartSession.isPending}
                    >
                        Restart Session
                    </Button>
                </Box>
            </Box>

            <ConfirmationDialog
                open={isConfirmOpen}
                title="Restart Session"
                message="Are you sure you want to restart this session? This will create a new session and you'll lose the current conversation history."
                onConfirm={() => {
                    setIsConfirmOpen(false);
                    handleRestart();
                }}
                onCancel={() => setIsConfirmOpen(false)}
                confirmText="Restart"
            />
        </>
    );
};

export default SessionHeader;