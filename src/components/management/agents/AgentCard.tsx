import { Card, CardContent, Typography, Box, Chip, IconButton, useTheme } from '@mui/material';
import { Bot, Edit2, Trash2, Power } from 'lucide-react';
import { Agent } from '../../../types/agent';

interface AgentCardProps {
    agent: Agent;
    onEdit: () => void;
    onDelete: () => void;
}

const AgentCard = ({ agent, onEdit, onDelete }: AgentCardProps) => {
    const theme = useTheme();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <Card sx={{
            background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
                : 'linear-gradient(135deg, white 0%, #f8fafc 100%)',
        }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Bot size={20} />
                        {agent.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                            size="small"
                            label={agent.is_active ? 'Active' : 'Inactive'}
                            color={agent.is_active ? 'success' : 'default'}
                            icon={<Power size={14} />}
                        />
                        <IconButton
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit();
                            }}
                            sx={{
                                bgcolor: theme.palette.primary.main,
                                color: 'white',
                                '&:hover': { bgcolor: theme.palette.primary.dark },
                            }}
                        >
                            <Edit2 size={16} />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete();
                            }}
                            sx={{
                                bgcolor: theme.palette.error.main,
                                color: 'white',
                                '&:hover': { bgcolor: theme.palette.error.dark },
                            }}
                        >
                            <Trash2 size={16} />
                        </IconButton>
                    </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {agent.description || 'No description provided'}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, color: 'text.secondary' }}>
                    <Typography variant="body2">
                        Type: {agent.type}
                    </Typography>
                    <Typography variant="body2">
                        Created: {formatDate(agent.created_at)}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AgentCard;