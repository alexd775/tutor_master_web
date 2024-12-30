import { Box, TextField, FormControlLabel, Switch, MenuItem } from '@mui/material';
import { UserFilters as FilterType } from '../../../types/user';
import { UserRole } from '../../../types/auth';

interface UserFiltersProps {
    filters: FilterType;
    onFilterChange: (filters: FilterType) => void;
}

const UserFilters = ({ filters, onFilterChange }: UserFiltersProps) => {
    const handleChange = (key: keyof FilterType, value: string | boolean) => {
        onFilterChange({ ...filters, [key]: value });
    };

    return (
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <TextField
                label="Search"
                size="small"
                value={filters.search || ''}
                onChange={(e) => handleChange('search', e.target.value)}
                sx={{ minWidth: 200 }}
            />

            <TextField
                select
                label="Role"
                size="small"
                value={filters.role || ''}
                onChange={(e) => handleChange('role', e.target.value)}
                sx={{ minWidth: 150 }}
            >
                <MenuItem value="">All Roles</MenuItem>
                {Object.values(UserRole).map((role) => (
                    <MenuItem key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                    </MenuItem>
                ))}
            </TextField>

            <FormControlLabel
                control={
                    <Switch
                        checked={filters.is_active ?? true}
                        onChange={(e) => handleChange('is_active', e.target.checked)}
                    />
                }
                label="Active Users"
            />
        </Box>
    );
};

export default UserFilters;