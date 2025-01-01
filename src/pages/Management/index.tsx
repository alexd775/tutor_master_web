import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Box,
    Tabs,
    Tab,
    Typography,
    useTheme,
} from '@mui/material';
import TopicsManagement from '../../components/management/TopicsManagement';
import SessionsManagement from '../../components/management/SessionsManagement';
import StudentsManagement from '../../components/management/students/StudentsManagement';
import AgentsManagement from '../../components/management/agents/AgentsManagement';
import InviteCodesList from '../../components/management/invites/InviteCodesList';

interface LocationState {
    tab?: number;
    userId?: string;
}

const Management = () => {
    const [activeTab, setActiveTab] = useState(0);
    const theme = useTheme();
    const location = useLocation();
    const state = location.state as LocationState;

    useEffect(() => {
        if (state?.tab !== undefined) {
            setActiveTab(state.tab);
        }
    }, [state?.tab]);

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: theme.palette.mode === 'dark' ? '#0f172a' : '#f3f4f6',
            p: 3,
        }}>
            <Typography variant="h4" gutterBottom color="text.primary">
                Management
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)}>
                    <Tab label="Topics" />
                    <Tab label="Sessions" />
                    <Tab label="Students" />
                    <Tab label="Agents" />
                    <Tab label="Invite Codes" />
                </Tabs>
            </Box>

            {activeTab === 0 && <TopicsManagement />}
            {activeTab === 1 && <SessionsManagement />}
            {activeTab === 2 && <StudentsManagement />}
            {activeTab === 3 && <AgentsManagement />}
            {activeTab === 4 && <InviteCodesList />}
        </Box>
    );
};

export default Management;