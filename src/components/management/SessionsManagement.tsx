import { useState, useEffect } from 'react';
import { Box, Typography, Grid, TextField, MenuItem } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useAllSessions } from '../../hooks/useManagement';
import { useUsers } from '../../hooks/useUsers';
import { useTopics } from '../../hooks/topics';
import SessionCard from '../sessions/SessionCard';
import { useNavigate } from 'react-router-dom';
import { useChatHistory } from '../../hooks/useChat';
import PrintSession from '../session/PrintSession';

const SessionsManagement = () => {
    const location = useLocation();
    const [selectedUserId, setSelectedUserId] = useState<string>('');
    const [selectedTopicId, setSelectedTopicId] = useState<string>('');
    const [selectedSession, setSelectedSession] = useState<string | null>(null);
    const { data: sessions, isLoading } = useAllSessions(selectedUserId, selectedTopicId);
    const { data: users } = useUsers();
    const { data: topics } = useTopics();
    const { data: messages = [] } = useChatHistory(selectedSession || '');
    const navigate = useNavigate();

    // Handle user selection from state
    useEffect(() => {
        const state = location.state as { userId?: string };
        if (state?.userId) {
            setSelectedUserId(state.userId);
            // Clear the state to avoid persisting the filter
            navigate('.', { replace: true, state: {} });
        }
    }, [location.state, navigate]);

    if (isLoading) return null;

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" color="text.primary">
                    Active Sessions
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        select
                        size="small"
                        value={selectedTopicId}
                        onChange={(e) => setSelectedTopicId(e.target.value)}
                        sx={{ minWidth: 200 }}
                        label="Filter by Topic"
                    >
                        <MenuItem value="">All Topics</MenuItem>
                        {topics?.map((topic) => (
                            <MenuItem key={topic.id} value={topic.id}>
                                {topic.title}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        size="small"
                        value={selectedUserId}
                        onChange={(e) => setSelectedUserId(e.target.value)}
                        sx={{ minWidth: 200 }}
                        label="Filter by User"
                    >
                        <MenuItem value="">All Users</MenuItem>
                        {users?.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.full_name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
            </Box>

            <Grid container spacing={3}>
                {sessions?.map((session) => (
                    <Grid item xs={12} sm={6} md={4} key={session.id}>
                        <SessionCard
                            session={session}
                            onClick={() => setSelectedSession(session.id)}
                        />
                    </Grid>
                ))}
            </Grid>

            {selectedSession && (
                <PrintSession
                    open={!!selectedSession}
                    onClose={() => setSelectedSession(null)}
                    session={sessions?.find(s => s.id === selectedSession)!}
                    messages={messages}
                />
            )}
        </Box>
    );
};

export default SessionsManagement;