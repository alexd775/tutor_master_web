import { useState } from 'react';
import {
    Box,
    Button,
    Grid,
    Typography,
    IconButton,
    useTheme,
    Chip,
} from '@mui/material';
import { Plus, Edit2, Trash2, FileText } from 'lucide-react';
import { useTopics } from '../../hooks/topics';
import { useTopicManagement } from '../../hooks/useManagement';
import TopicCard from '../common/Card/TopicCard';
import TopicForm from './TopicForm';
import FileListDialog from './files/FileListDialog';
import Notification from '../common/Notification';
import { TopicResponse } from '../../types/topic';
import { TopicFormData } from '../../types/management';
import { useTopicFiles } from '../../hooks/useFiles';

const TopicsManagement = () => {
    const theme = useTheme();
    const { data: topics, isLoading } = useTopics();
    const { createTopic, updateTopic, deleteTopic } = useTopicManagement();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editTopic, setEditTopic] = useState<TopicResponse | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<TopicResponse | null>(null);
    const [notification, setNotification] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error';
    }>({ open: false, message: '', severity: 'success' });

    const showNotification = (message: string, severity: 'success' | 'error') => {
        setNotification({ open: true, message, severity });
    };

    const handleCreate = async (data: TopicFormData) => {
        try {
            await createTopic.mutateAsync(data);
            setIsCreateOpen(false);
            showNotification('Topic created successfully', 'success');
        } catch (error) {
            showNotification('Failed to create topic', 'error');
        }
    };

    const handleUpdate = async (data: TopicFormData) => {
        if (editTopic) {
            try {
                await updateTopic.mutateAsync({ ...data, id: editTopic.id });
                setEditTopic(null);
                showNotification('Topic updated successfully', 'success');
            } catch (error) {
                showNotification('Failed to update topic', 'error');
            }
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this topic?')) {
            try {
                await deleteTopic.mutateAsync(id);
                showNotification('Topic deleted successfully', 'success');
            } catch (error) {
                showNotification('Failed to delete topic', 'error');
            }
        }
    };

    if (isLoading) return null;

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5" color="text.primary">Topics Management</Typography>
                <Button
                    startIcon={<Plus size={20} />}
                    variant="contained"
                    onClick={() => setIsCreateOpen(true)}
                >
                    Create Topic
                </Button>
            </Box>

            <Grid container spacing={3}>
                {topics?.map((topic) => (
                    <Grid item xs={12} sm={6} md={4} key={topic.id}>
                        <Box sx={{ position: 'relative' }}>
                            <TopicCard topic={topic} onClick={() => setEditTopic(topic)} />
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    display: 'flex',
                                    gap: 1,
                                    zIndex: 1,
                                }}
                            >
                                <IconButton
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedTopic(topic);
                                    }}
                                    sx={{
                                        bgcolor: theme.palette.info.main,
                                        color: 'white',
                                        '&:hover': { bgcolor: theme.palette.info.dark },
                                    }}
                                >
                                    <FileText size={16} />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setEditTopic(topic);
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
                                        handleDelete(topic.id);
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
                    </Grid>
                ))}
            </Grid>

            <TopicForm
                open={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                onSubmit={handleCreate}
                title="Create New Topic"
            />

            <TopicForm
                open={!!editTopic}
                onClose={() => setEditTopic(null)}
                onSubmit={handleUpdate}
                initialData={editTopic || undefined}
                title="Edit Topic"
            />

            {selectedTopic && (
                <FileListDialog
                    open={!!selectedTopic}
                    onClose={() => setSelectedTopic(null)}
                    topicId={selectedTopic.id}
                    topicTitle={selectedTopic.title}
                />
            )}

            <Notification
                open={notification.open}
                message={notification.message}
                severity={notification.severity}
                onClose={() => setNotification({ ...notification, open: false })}
            />
        </Box>
    );
};

export default TopicsManagement;