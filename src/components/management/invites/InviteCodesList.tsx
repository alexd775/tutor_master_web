import { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    FormControlLabel,
    Switch,
    useTheme,
} from '@mui/material';
import { Plus } from 'lucide-react';
import { useInvites, useInviteManagement } from '../../../hooks/useInvites';
import Notification from '../../common/Notification';

const InviteCodesList = () => {
    const theme = useTheme();
    const [showUnusedOnly, setShowUnusedOnly] = useState(false);
    const { data, isLoading } = useInvites(showUnusedOnly);
    const { generateInvites } = useInviteManagement();
    const [notification, setNotification] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error';
    }>({ open: false, message: '', severity: 'success' });

    const handleGenerateInvites = async () => {
        try {
            await generateInvites.mutateAsync(10);
            setNotification({
                open: true,
                message: 'Successfully generated new invite codes',
                severity: 'success',
            });
        } catch (error) {
            setNotification({
                open: true,
                message: 'Failed to generate invite codes',
                severity: 'error',
            });
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
                <Typography variant="h5" color="text.primary">
                    Invite Codes
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={showUnusedOnly}
                                onChange={(e) => setShowUnusedOnly(e.target.checked)}
                            />
                        }
                        label="Show unused only"
                    />
                    <Button
                        startIcon={<Plus size={20} />}
                        variant="contained"
                        onClick={handleGenerateInvites}
                        disabled={generateInvites.isPending}
                    >
                        Generate Codes
                    </Button>
                </Box>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Code</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Used By</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.items.map((invite) => (
                            <TableRow key={invite.id}>
                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontFamily: 'monospace',
                                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                                            p: 1,
                                            borderRadius: 1,
                                            display: 'inline-block'
                                        }}
                                    >
                                        {invite.code}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={invite.is_used ? 'Used' : 'Available'}
                                        color={invite.is_used ? 'default' : 'success'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{formatDate(invite.created_at)}</TableCell>
                                <TableCell>
                                    {invite.used_by_id || '-'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Notification
                open={notification.open}
                message={notification.message}
                severity={notification.severity}
                onClose={() => setNotification({ ...notification, open: false })}
            />
        </Box>
    );
};

export default InviteCodesList;