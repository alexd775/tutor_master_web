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
    FormControlLabel,
    Switch,
    styled,
} from '@mui/material';
import { TopicFormData } from '../../types/management';
import { TopicResponse } from '../../types/topic';
import { useAgents } from '../../hooks/useAgents';
// import { useTopics } from '../../hooks/topics';

// Create a styled textarea component that's resizable
const ResizableTextField = styled(TextField)({
    '& .MuiInputBase-inputMultiline': {
        resize: 'vertical',
        minHeight: '100px',
    },
});

interface TopicFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: TopicFormData & { agent_id: string }) => void;
    initialData?: TopicResponse;
    title: string;
}

const TopicForm = ({ open, onClose, onSubmit, initialData, title }: TopicFormProps) => {
    const { data: agents, isLoading: isLoadingAgents } = useAgents();
    // const { data: topics } = useTopics();

    const [formData, setFormData] = useState<TopicFormData & { agent_id: string }>({
        title: '',
        description: '',
        content: {},
        difficulty_level: 1,
        duration: 30,
        parent_id: '',
        agent_id: '',
        is_hidden: false,
        session_opening_message: '',
        session_time_limit: 0,
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
                is_hidden: initialData.is_hidden || false,
                session_opening_message: initialData.session_opening_message || '',
                session_time_limit: initialData.session_time_limit,
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
                is_hidden: false,
                session_opening_message: '',
                session_time_limit: 0,
            });
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    // const parentTopics = topics?.filter(t => !t.parent_id) || [];

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="sm" 
            fullWidth
            PaperProps={{
                sx: {
                    height: 'auto',
                    maxHeight: '90vh',
                    m: 2,
                    position: 'relative',
                    top: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                }
            }}
            sx={{
                '& .MuiDialog-container': {
                    alignItems: 'flex-start',
                    pt: 4,
                },
                zIndex: 9999,
            }}
        >
            <DialogTitle>{title}</DialogTitle>
            <form onSubmit={handleSubmit} style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                overflow: 'hidden',
                flex: 1 
            }}>
                <DialogContent sx={{ 
                    flex: 1, 
                    overflow: 'auto',
                    '&::-webkit-scrollbar': {
                        width: '0.4em'
                    },
                    '&::-webkit-scrollbar-track': {
                        background: 'transparent'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'rgba(0,0,0,.2)',
                        borderRadius: '4px'
                    }
                }}>
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
                            SelectProps={{
                                MenuProps: {
                                    sx: {
                                        zIndex: 10000
                                    }
                                }
                            }}
                        >
                            {agents?.filter(agent => agent.is_active).map((agent) => (
                                <MenuItem key={agent.id} value={agent.id}>
                                    {agent.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        {/* Parent topic selection commented out as requested
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
                        */}
                        <TextField
                            select
                            label="Difficulty Level"
                            value={formData.difficulty_level}
                            onChange={(e) => setFormData({ ...formData, difficulty_level: Number(e.target.value) })}
                            fullWidth
                            SelectProps={{
                                MenuProps: {
                                    sx: {
                                        zIndex: 10000
                                    }
                                }
                            }}
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
                        <TextField
                            label="Session Time Limit (minutes)"
                            type="number"
                            value={formData.session_time_limit || ''}
                            onChange={(e) => {
                                const value = e.target.value ? Number(e.target.value) : 0;
                                setFormData({ ...formData, session_time_limit: value });
                            }}
                            fullWidth
                            helperText="Optional. Leave empty for no time limit"
                            inputProps={{
                                min: 0,
                                step: 1
                            }}
                        />
                        <ResizableTextField
                            label="Session Opening Message"
                            value={formData.session_opening_message}
                            onChange={(e) => setFormData({ ...formData, session_opening_message: e.target.value })}
                            multiline
                            minRows={3}
                            fullWidth
                            helperText="Custom message to be shown at the start of each session"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.is_hidden}
                                    onChange={(e) => setFormData({ ...formData, is_hidden: e.target.checked })}
                                />
                            }
                            label="Hidden Topic"
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