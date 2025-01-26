import { useState } from 'react';
import {
    Box,
    Button,
    Grid,
    Typography,
    CircularProgress,
} from '@mui/material';
import { Plus } from 'lucide-react';
import { AxiosError } from 'axios';
import { useAgents } from '../../../hooks/useAgents';
import { useAgentManagement } from '../../../hooks/useAgentManagement';
import AgentCard from './AgentCard';
import AgentForm from './AgentForm';
import Notification from '../../common/Notification';
import { Agent } from '../../../types/agent';

const AgentsManagement = () => {
    const { data: agents, isLoading } = useAgents();
    const { createAgent, updateAgent, deleteAgent } = useAgentManagement();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editAgent, setEditAgent] = useState<Agent | null>(null);
    const [notification, setNotification] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error';
    }>({ open: false, message: '', severity: 'success' });

    const showNotification = (message: string, severity: 'success' | 'error') => {
        setNotification({ open: true, message, severity });
    };

    const handleCreate = async (data: Omit<Agent, 'id' | 'created_at' | 'updated_at'>) => {
        try {
            await createAgent.mutateAsync(data);
            setIsCreateOpen(false);
            showNotification('Agent created successfully', 'success');
        } catch (error) {
            showNotification('Failed to create agent', 'error');
        }
    };

    const handleUpdate = async (data: Omit<Agent, 'id' | 'created_at' | 'updated_at'>) => {
        if (editAgent) {
            try {
                await updateAgent.mutateAsync({ ...data, id: editAgent.id });
                setEditAgent(null);
                showNotification('Agent updated successfully', 'success');
            } catch (error) {
                const message = (error as AxiosError).response?.data?.detail || 'Failed to update agent';
                showNotification(message, 'error');
            }
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this agent?')) {
            try {
                await deleteAgent.mutateAsync(id);
                showNotification('Agent deleted successfully', 'success');
            } catch (error) {
                showNotification('Failed to delete agent', 'error');
            }
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5" color="text.primary">
                    Agents Management
                </Typography>
                <Button
                    startIcon={<Plus size={20} />}
                    variant="contained"
                    onClick={() => setIsCreateOpen(true)}
                >
                    Create Agent
                </Button>
            </Box>

            <Grid container spacing={3}>
                {agents?.map((agent) => (
                    <Grid item xs={12} sm={6} md={4} key={agent.id}>
                        <AgentCard
                            agent={agent}
                            onEdit={() => setEditAgent(agent)}
                            onDelete={() => handleDelete(agent.id)}
                        />
                    </Grid>
                ))}
            </Grid>

            <AgentForm
                open={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                onSubmit={handleCreate}
                title="Create New Agent"
            />

            <AgentForm
                open={!!editAgent}
                onClose={() => setEditAgent(null)}
                onSubmit={handleUpdate}
                initialData={editAgent || undefined}
                title="Edit Agent"
            />

            <Notification
                open={notification.open}
                message={notification.message}
                severity={notification.severity}
                onClose={() => setNotification({ ...notification, open: false })}
            />
        </Box>
    );
};

export default AgentsManagement;