import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Box,
} from '@mui/material';
import { TopicFormData } from '../../types/management';
import { TopicResponse } from '../../types/topic';
import { useAgents } from '../../hooks/useAgents';
import { useTopics } from '../../hooks/topics';

interface TopicFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: TopicFormData & { agent_id: string }) => void;
    initialData?: TopicResponse;
    title: string;
}

const TopicForm = ({ open, onClose, onSubmit, initialData, title }: TopicFormProps) => {
    const { data: agents, isLoading: isLoadingAgents } = useAgents();
    const { data: topics } = useTopics();

    const [formData, setFormData] = useState<TopicFormData & { agent_id: string }>({
        title: '',
        description: '',
        content: {},
        difficulty_level: 1,
        duration: 30,
        parent_id: '',
        agent_id: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                description: initialData.description || '',
                content: initialData.content,
                difficulty_level: initialData.difficulty_level,
                duration: initialData.duration,
                parent_id: initialData.parent_id || '',
                agent_id: initialData.agent_id,
            });
        } else {
            setFormData({
                title: '',
                description: '',
                content: {},
                difficulty_level: 1,
                duration: 30,
                parent_id: '',
                agent_id: '',
            });
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const parentTopics = topics?.filter(t => !t.parent_id) || [];

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            multiline
                            rows={3}
                            fullWidth
                        />
                        <TextField
                            select
                            label="Agent"
                            value={formData.agent_id}
                            onChange={(e) => setFormData({ ...formData, agent_id: e.target.value })}
                            required
                            fullWidth
                            disabled={isLoadingAgents}
                        >
                            {agents?.map((agent) => agent.is_active ? (
                                <MenuItem key={agent.id} value={agent.id}>
                                    {agent.name}
                                </MenuItem>
                            ) : null)}
                        </TextField>
                        {parentTopics.length > 0 && (
                            <TextField
                                select
                                label="Parent Topic"
                                value={formData.parent_id}
                                onChange={(e) => setFormData({ ...formData, parent_id: e.target.value })}
                                fullWidth
                            >
                                <MenuItem value="">None</MenuItem>
                                {parentTopics.map((topic) => (
                                    <MenuItem key={topic.id} value={topic.id}>
                                        {topic.title}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                        <TextField
                            select
                            label="Difficulty Level"
                            value={formData.difficulty_level}
                            onChange={(e) => setFormData({ ...formData, difficulty_level: Number(e.target.value) })}
                            fullWidth
                        >
                            {[1, 2, 3, 4, 5].map((level) => (
                                <MenuItem key={level} value={level}>
                                    Level {level}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Duration (minutes)"
                            type="number"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                            fullWidth
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained">
                        {initialData ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default TopicForm;