import { Card, CardContent, Typography, Box, Chip, useTheme } from '@mui/material';
import { Clock, BarChart2, ThumbsUp } from 'lucide-react';
import { Session } from '../../types/session';

interface SessionCardProps {
    session: Session;
    onClick: () => void;
}

const SessionCard = ({ session, onClick }: SessionCardProps) => {
    const theme = useTheme();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <Card
            onClick={onClick}
            sx={{
                cursor: 'pointer',
                background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
                    : 'linear-gradient(135deg, white 0%, #f8fafc 100%)',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    transition: 'transform 0.2s'
                }
            }}
        >
            <CardContent>
                <Typography variant="h6" gutterBottom color="text.primary">
                    {session.topic_title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip
                        size="small"
                        label={formatDate(session.created_at)}
                        variant="outlined"
                        sx={{
                            borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : undefined,
                            color: theme.palette.text.secondary
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', gap: 2, color: 'text.secondary' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Clock size={16} />
                        <Typography variant="body2">{session.duration} min</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <BarChart2 size={16} />
                        <Typography variant="body2">
                            {Math.round(session.completion_rate * 100)}%
                        </Typography>
                    </Box>
                    {session.feedback_score > 0 && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <ThumbsUp size={16} />
                            <Typography variant="body2">{session.feedback_score}/5</Typography>
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default SessionCard;