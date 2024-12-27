import { Grid, Typography, Box, CircularProgress, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSessions } from '../../hooks/useSessions';
import SessionCard from '../../components/sessions/SessionCard';

const Sessions = () => {
    const navigate = useNavigate();
    const { data: sessions, isLoading, error } = useSessions();
    const theme = useTheme();

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography color="error" sx={{ mt: 4 }}>
                Error loading sessions. Please try again later.
            </Typography>
        );
    }

    if (!sessions?.length) {
        return (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography color="text.secondary">
                    No active sessions found. Start learning by exploring our topics!
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: theme.palette.mode === 'dark' ? '#0f172a' : '#f3f4f6',
        }}>
            <Typography variant="h4" gutterBottom color="text.primary">
                Your Active Sessions
            </Typography>
            <Grid container spacing={3}>
                {sessions.map((session) => session.interaction_data?.total_messages ? (
                    <Grid item xs={12} sm={6} md={4} key={session.id}>
                        <SessionCard
                            session={session}
                            onClick={() => navigate(`/session/${session.topic_id}`)}
                        />
                    </Grid>
                ) : null)}
            </Grid>
        </Box>
    );
};

export default Sessions;