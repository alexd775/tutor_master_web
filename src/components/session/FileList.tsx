import { useState } from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Paper,
    useTheme,
    Collapse,
    Tooltip,
} from '@mui/material';
import { FileText, Download, File, ChevronDown, ChevronUp } from 'lucide-react';
import { TopicFile } from '../../types/file';
import { downloadFile } from '../../utils/fileManagement';

interface FileListProps {
    files: TopicFile[];
}

const FileList = ({ files }: FileListProps) => {
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    if (files.length === 0) {
        return null;
    }

    return (
        <Paper sx={{
            mb: 3,
            bgcolor: theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
            borderRadius: 2,
            boxShadow: theme.palette.mode === 'dark'
                ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)'
                : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}>
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    '&:hover': {
                        bgcolor: theme.palette.mode === 'dark' ? '#374151' : '#f8fafc',
                    },
                }}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FileText size={20} />
                    <Typography variant="h6" color="text.primary">
                        Related Files ({files.length})
                    </Typography>
                </Box>
                <IconButton
                    size="small"
                    sx={{ color: theme.palette.text.secondary }}
                >
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </IconButton>
            </Box>
            <Collapse in={isExpanded}>
                <List sx={{ p: 0 }}>
                    {files.map((file) => (
                        <ListItem
                            key={file.id}
                            secondaryAction={
                                file.downloadable && (
                                    <IconButton
                                        edge="end"
                                        aria-label="download"
                                        onClick={() => downloadFile(file.id, file.filename)}
                                        sx={{ color: theme.palette.primary.main }}
                                >
                                        <Download size={20} />
                                    </IconButton>
                                )
                            }
                            sx={{
                                borderTop: `1px solid ${theme.palette.divider}`,
                                '&:hover': {
                                    bgcolor: theme.palette.mode === 'dark' ? '#374151' : '#f8fafc',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: theme.palette.text.secondary }}>
                                <File size={20} />
                            </ListItemIcon>
                            <Tooltip title={file.description || ''}>
                                <ListItemText
                                    primary={file.title}
                                    secondary={`${file.filename} • ${formatFileSize(file.size)}`}
                                    primaryTypographyProps={{
                                        color: theme.palette.text.primary
                                    }}
                                    secondaryTypographyProps={{
                                        color: theme.palette.text.secondary
                                    }}
                                />
                            </Tooltip>
                        </ListItem>
                    ))}
                </List>
            </Collapse>
        </Paper>
    );
};

export default FileList;