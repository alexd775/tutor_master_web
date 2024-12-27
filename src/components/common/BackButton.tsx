import { IconButton, Tooltip, Typography, useTheme } from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
    to?: string;
    toText: string;
}

const BackButton = ({ to, toText }: BackButtonProps) => {
    const navigate = useNavigate();
    const theme = useTheme();

    const handleClick = () => {
        if (to) {
            navigate(to);
        } else {
            navigate(-1);
        }
    };
    const title = to ? `Go back to ${toText}` : 'Go back';

    return (
        <Tooltip title={title}>
            <IconButton
                onClick={handleClick}
                sx={{
                    color: theme.palette.text.primary,
                    '&:hover': {
                        bgcolor: theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(0, 0, 0, 0.04)',
                    },
                }}
            >
                <ArrowLeft size={24} />
            </IconButton>
        </Tooltip>
    );
};

export default BackButton;