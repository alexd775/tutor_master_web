import { useEffect, useRef } from 'react';
import { Box, Paper, useTheme, CircularProgress } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
          <Box
            sx={{
              bgcolor: message.role === 'user'
                ? 'primary.main'
                : theme.palette.mode === 'dark' ? '#374151' : 'grey.100',
              color: message.role === 'user'
                ? 'white'
                : theme.palette.text.primary,
              p: 2,
              borderRadius: 2,
              '& p': {
                m: 0,
                '&:not(:last-child)': {
                  mb: 1,
                },
              },
              '& a': {
                color: message.role === 'user'
                  ? 'inherit'
                  : 'primary.main',
                textDecoration: 'underline',
              },
              '& code': {
                bgcolor: theme.palette.mode === 'dark'
                  ? 'rgba(0, 0, 0, 0.2)'
                  : 'rgba(0, 0, 0, 0.05)',
                p: 0.5,
                borderRadius: 1,
                fontFamily: 'monospace',
              },
              '& pre': {
                bgcolor: theme.palette.mode === 'dark'
                  ? 'rgba(0, 0, 0, 0.2)'
                  : 'rgba(0, 0, 0, 0.05)',
                p: 1,
                borderRadius: 1,
                overflow: 'auto',
                '& code': {
                  bgcolor: 'transparent',
                  p: 0,
                },
              },
              '& ul, & ol': {
                pl: 3,
                mb: 1,
              },
              '& li': {
                mb: 0.5,
              },
              '& blockquote': {
                borderLeft: `4px solid ${theme.palette.divider}`,
                pl: 2,
                ml: 0,
                mr: 0,
                my: 1,
              },
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Override default link behavior to open in new tab
                a: ({ node, ...props }) => (
                  <a target="_blank" rel="noopener noreferrer" {...props} />
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </Box>
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