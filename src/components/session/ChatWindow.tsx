import { useEffect, useRef } from 'react';
import { Box, Paper, Typography, useTheme, CircularProgress } from '@mui/material';
import { ChatMessage } from '../../types/chat';

interface ChatWindowProps {
  messages: ChatMessage[];
  isLoading?: boolean;
}

const ChatWindow = ({ messages, isLoading }: ChatWindowProps) => {
  const theme = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, index, array) => (
      <span key={index}>
        {line}
        {index < array.length - 1 && <br />}
      </span>
    ));
  };

  return (
    <Paper
      sx={{
        height: '60vh',
        overflow: 'auto',
        p: 2,
        bgcolor: theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
        borderRadius: 2,
        boxShadow: theme.palette.mode === 'dark'
          ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)'
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        scrollBehavior: 'smooth',
        position: 'relative',
      }}
    >
      {messages.map((message) => message.role === 'system' ? null : (
        <Box
          key={message.id}
          sx={{
            mb: 2,
            ml: message.role === 'user' ? 'auto' : 0,
            mr: message.role === 'assistant' ? 'auto' : 0,
            maxWidth: '70%',
          }}
        >
          <Typography
            component="div"
            sx={{
              bgcolor: message.role === 'user'
                ? 'primary.main'
                : theme.palette.mode === 'dark' ? '#374151' : 'grey.100',
              color: message.role === 'user'
                ? 'white'
                : theme.palette.text.primary,
              p: 2,
              borderRadius: 2,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {formatMessage(message.content)}
          </Typography>
        </Box>
      ))}
      {isLoading && (
        <Box
          sx={{
            position: 'sticky',
            bottom: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            py: 2,
            bgcolor: theme.palette.mode === 'dark'
              ? 'rgba(31, 41, 55, 0.8)'
              : 'rgba(255, 255, 255, 0.8)',
          }}
        >
          <CircularProgress size={24} />
        </Box>
      )}
      <div ref={messagesEndRef} />
    </Paper>
  );
};

export default ChatWindow;