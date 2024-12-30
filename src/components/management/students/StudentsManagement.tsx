import { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useUsers } from '../../../hooks/useUsers';
import UserCard from './UserCard';
import UserFilters from './UserFilters';
import { UserFilters as FilterType } from '../../../types/user';
import Notification from '../../common/Notification';

const StudentsManagement = () => {
    const [filters, setFilters] = useState<FilterType>({
        is_active: true,
    });
    const [notification, setNotification] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error';
    }>({ open: false, message: '', severity: 'success' });

    const { data: users, isLoading } = useUsers(filters);

    const handleStatusChange = () => {
        setNotification({
            open: true,
            message: 'User status updated successfully',
            severity: 'success',
        });
    };

    if (isLoading) return null;

    return (
        <Box>
            <Typography variant="h5" color="text.primary" sx={{ mb: 3 }}>
                Students Management
            </Typography>

            <UserFilters
                filters={filters}
                onFilterChange={setFilters}
            />

            <Grid container spacing={3}>
                {users?.map((user) => (
                    <Grid item xs={12} sm={6} md={4} key={user.id}>
                        <UserCard
                            user={user}
                            onStatusChange={handleStatusChange}
                        />
                    </Grid>
                ))}
            </Grid>

            <Notification
                open={notification.open}
                message={notification.message}
                severity={notification.severity}
                onClose={() => setNotification({ ...notification, open: false })}
            />
        </Box>
    );
};

export default StudentsManagement;