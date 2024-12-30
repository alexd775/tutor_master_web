import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Button,
    useTheme,
} from '@mui/material';
import { File, Download, Trash2, Plus } from 'lucide-react';
import { useTopicFiles } from '../../../hooks/useFiles';
import { useFileManagement } from '../../../hooks/useFileManagement';
import { downloadFile } from '../../../utils/fileManagement';
import FileUploadDialog from './FileUploadDialog';

interface FileListDialogProps {
    open: boolean;
    onClose: () => void;
    topicId: string;
    topicTitle: string;
}

const FileListDialog = ({ open, onClose, topicId, topicTitle }: FileListDialogProps) => {
    const theme = useTheme();
    const { data: filesData, isLoading } = useTopicFiles(topicId);
    const { deleteFile } = useFileManagement();
    const [isUploadOpen, setIsUploadOpen] = useState(false);

    const handleDelete = async (fileId: string) => {
        if (window.confirm('Are you sure you want to delete this file?')) {
            try {
                await deleteFile.mutateAsync(fileId);
            } catch (error) {
                console.error('Failed to delete file:', error);
            }
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    typography: 'h6'
                }}>
                    <Box component="span">Files - {topicTitle}</Box>
                    <Button
                        startIcon={<Plus size={20} />}
                        onClick={() => setIsUploadOpen(true)}
                        variant="contained"
                        size="small"
                    >
                        Upload
                    </Button>
                </DialogTitle>
                <DialogContent>
                    {isLoading ? (
                        <Box sx={{ textAlign: 'center', py: 2 }}>Loading...</Box>
                    ) : !filesData?.items.length ? (
                        <Box sx={{ textAlign: 'center', py: 2 }}>No files uploaded yet</Box>
                    ) : (
                        <List>
                            {filesData.items.map((file) => (
                                <ListItem
                                    key={file.id}
                                    secondaryAction={
                                        <Box>
                                            <IconButton
                                                edge="end"
                                                onClick={() => downloadFile(file.id, file.filename)}
                                                sx={{ mr: 1 }}
                                            >
                                                <Download size={20} />
                                            </IconButton>
                                            <IconButton
                                                edge="end"
                                                onClick={() => handleDelete(file.id)}
                                                sx={{ color: theme.palette.error.main }}
                                            >
                                                <Trash2 size={20} />
                                            </IconButton>
                                        </Box>
                                    }
                                >
                                    <ListItemIcon>
                                        <File size={20} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={file.title}
                                        secondary={`${file.filename} • ${formatFileSize(file.size)}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </DialogContent>
            </Dialog>

            <FileUploadDialog
                open={isUploadOpen}
                onClose={() => setIsUploadOpen(false)}
                topicId={topicId}
            />
        </>
    );
};

export default FileListDialog;