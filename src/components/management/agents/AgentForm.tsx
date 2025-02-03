import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Switch,
    FormControlLabel,
    styled,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import { Agent } from '../../../types/agent';

// Create a styled textarea component that's resizable
const ResizableTextField = styled(TextField)({
    '& .MuiInputBase-inputMultiline': {
        resize: 'vertical',
        minHeight: '100px',
    },
});

interface AgentFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: Omit<Agent, 'id' | 'created_at' | 'updated_at'>) => void;
    initialData?: Agent;
    title: string;
}

const AgentForm = ({ open, onClose, onSubmit, initialData, title }: AgentFormProps) => {
    const [formData, setFormData] = useState<Omit<Agent, 'id' | 'created_at' | 'updated_at'>>({
        name: '',
        description: '',
        type: 'chatgpt',
        model: 'gpt-4o',
        config: {},
        system_prompt: '',
        welcome_message: '',
        reminder_message: '',
        is_active: true,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                description: initialData.description || '',
                type: initialData.type,
                model: initialData.model || '',
                config: initialData.config,
                system_prompt: initialData.system_prompt,
                welcome_message: initialData.welcome_message,
                reminder_message: initialData.reminder_message || '',
                is_active: initialData.is_active,
            });
        } else {
            setFormData({
                name: '',
                description: '',
                type: 'chatgpt',
                model: 'gpt-4o',
                config: {},
                system_prompt: '',
                welcome_message: '',
                reminder_message: '',
                is_active: true,
            });
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

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
                }
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
                            label="Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            fullWidth
                        />
                        <FormControl fullWidth required>
                            <InputLabel id="agent-type-label">Type</InputLabel>
                            <Select
                                labelId="agent-type-label"
                                value={formData.type}
                                label="Type"
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <MenuItem value="chatgpt">ChatGPT</MenuItem>
                                <MenuItem value="assistant">Assistant</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Model"
                            value={formData.model}
                            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                            fullWidth
                        />
                        <ResizableTextField
                            label="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            multiline
                            minRows={1}
                            fullWidth
                        />
                        <ResizableTextField
                            label="System Prompt"
                            value={formData.system_prompt}
                            onChange={(e) => setFormData({ ...formData, system_prompt: e.target.value })}
                            multiline
                            minRows={1}
                            required
                            fullWidth
                        />
                        <ResizableTextField
                            label="Welcome Message"
                            value={formData.welcome_message}
                            onChange={(e) => setFormData({ ...formData, welcome_message: e.target.value })}
                            multiline
                            minRows={1}
                            required
                            fullWidth
                        />
                        <ResizableTextField
                            label="Reminder Message"
                            value={formData.reminder_message}
                            onChange={(e) => setFormData({ ...formData, reminder_message: e.target.value })}
                            multiline
                            minRows={1}
                            fullWidth
                            helperText="Message to remind the user about important points during the session"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.is_active}
                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                />
                            }
                            label="Active"
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

export default AgentForm;