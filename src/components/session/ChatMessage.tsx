import { Box, Paper, useTheme, CircularProgress } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChatMessage as ChatMessageType } from '../../types/chat';

interface ChatMessageProps {
  message: ChatMessageType;
  isLoading?: boolean;
}

const ChatMessage = ({ message, isLoading }: ChatMessageProps) => {
  const theme = useTheme();

  if (message.role === 'system') return null;

  return (
    <Box
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
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size={24} />
          </Box>
        ) : (
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
        )}
      </Box>
    </Box>
  );
};

export default ChatMessage; 