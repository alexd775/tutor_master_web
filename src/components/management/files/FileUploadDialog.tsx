import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
} from '@mui/material';
import { useFileManagement } from '../../../hooks/useFileManagement';

interface FileUploadDialogProps {
    open: boolean;
    onClose: () => void;
    topicId: string;
}

const FileUploadDialog = ({ open, onClose, topicId }: FileUploadDialogProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { uploadFile } = useFileManagement();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        try {
            await uploadFile.mutateAsync({
                topicId,
                file,
                title: title || file.name,
                description,
            });
            onClose();
            setFile(null);
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Failed to upload file:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Upload File</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                        <TextField
                            type="file"
                            onChange={(e) => {
                                const files = (e.target as HTMLInputElement).files;
                                if (files?.length) {
                                    setFile(files[0]);
                                    if (!title) {
                                        setTitle(files[0].name);
                                    }
                                }
                            }}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline
                            rows={3}
                            fullWidth
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!file || uploadFile.isPending}
                    >
                        Upload
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default FileUploadDialog;