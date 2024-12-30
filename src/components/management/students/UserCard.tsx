import { Card, CardContent, Typography, Box, Chip, IconButton, useTheme } from '@mui/material';
import { User, BookOpen, CheckCircle, UserCheck, UserX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { User as UserType } from '../../../types/auth';
import { useUserManagement } from '../../../hooks/useUserManagement';

interface UserCardProps {
    user: UserType;
    onStatusChange?: () => void;
}

const UserCard = ({ user, onStatusChange }: UserCardProps) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { deactivateUser } = useUserManagement();

    const handleDeactivate = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm(`Are you sure you want to deactivate ${user.full_name}?`)) {
            try {
                await deactivateUser.mutateAsync(user.id);
                onStatusChange?.();
            } catch (error) {
                console.error('Failed to deactivate user:', error);
            }
        }
    };
    const handleClick = () => {
        if (user.total_sessions > 0) {
            navigate('/management', { state: { tab: 1, userId: user.id }, replace: true });
        }
    };

    return (
        <Card sx={{
            background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
                : 'linear-gradient(135deg, white 0%, #f8fafc 100%)',
            cursor: user.total_sessions > 0 ? 'pointer' : 'default',
            '&:hover': user.total_sessions > 0 ? {
                transform: 'translateY(-2px)',
                transition: 'transform 0.2s'
            } : {},
        }}
            onClick={handleClick}
        >
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <User size={20} />
                        {user.full_name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                            size="small"
                            label={user.is_active ? 'Active' : 'Inactive'}
                            color={user.is_active ? 'success' : 'default'}
                        />
                        {user.is_active && (
                            <IconButton
                                size="small"
                                onClick={handleDeactivate}
                                sx={{
                                    bgcolor: theme.palette.error.main,
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: theme.palette.error.dark,
                                    },
                                }}
                                title='Deactivate User'
                            >
                                <UserX size={16} />
                            </IconButton>
                        )}
                    </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {user.email}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, color: 'text.secondary' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <BookOpen size={16} />
                        <Typography variant="body2">
                            {user.total_sessions} sessions
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CheckCircle size={16} />
                        <Typography variant="body2">
                            {user.completed_topics} completed
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <UserCheck size={16} />
                        <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                            {user.role}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default UserCard;