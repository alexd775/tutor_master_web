import { Box, Typography, Chip, useTheme } from '@mui/material';
import { Clock, BarChart2 } from 'lucide-react';
import { Session } from '../../types/session';

interface SessionHeaderProps {
    session: Session;
}

const SessionHeader = ({ session }: SessionHeaderProps) => {
    const theme = useTheme();

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
        }}>
            <Box>
                <Typography variant="overline" color="text.secondary">
                    Current Session
                </Typography>
                <Typography variant="h5" color="text.primary" gutterBottom>
                    {session.topic_title}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: theme.palette.text.secondary,
                }}>
                    <Clock size={16} />
                    <Typography variant="body2">
                        {session.duration} min
                    </Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: theme.palette.text.secondary,
                }}>
                    <BarChart2 size={16} />
                    <Typography variant="body2">
                        {Math.round(session.completion_rate * 100)}% complete
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default SessionHeader;