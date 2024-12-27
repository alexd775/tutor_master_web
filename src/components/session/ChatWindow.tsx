import { Box, Paper, Typography } from '@mui/material';
import { MessageRole } from '../../types/auth';

interface Message {
  role: MessageRole;
  content: string;
  id: string;
}

interface ChatWindowProps {
  messages: Message[];
}

const ChatWindow = ({ messages }: ChatWindowProps) => {
  return (
    <Paper 
      sx={{ 
        height: '60vh',
        overflow: 'auto',
        p: 2,
        bgcolor: '#ffffff',
        borderRadius: 2,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}
    >
      {messages.map((message) => (
        <Box
          key={message.id}
          sx={{
            mb: 2,
            ml: message.role === MessageRole.USER ? 'auto' : 0,
            mr: message.role === MessageRole.ASSISTANT ? 'auto' : 0,
            maxWidth: '70%',
          }}
        >
          <Typography
            sx={{
              bgcolor: message.role === MessageRole.USER ? 'primary.main' : 'grey.100',
              color: message.role === MessageRole.USER ? 'white' : 'text.primary',
              p: 2,
              borderRadius: 2,
            }}
          >
            {message.content}
          </Typography>
        </Box>
      ))}
    </Paper>
  );
};

export default ChatWindow;