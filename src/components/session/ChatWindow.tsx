import { useEffect, useRef } from 'react';
import { Box, Paper, CircularProgress } from '@mui/material';
import ChatMessage from './ChatMessage';
import { ChatMessage as ChatMessageType } from '../../types/chat';

interface ChatWindowProps {
  messages: ChatMessageType[];
  isLoading?: boolean;
}

const ChatWindow = ({ messages, isLoading }: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const prevMessagesLengthRef = useRef<number>(messages.length);
  
  // Auto-scroll to bottom only when new messages are added
  useEffect(() => {
    const isNewMessage = messages.length > prevMessagesLengthRef.current;
    prevMessagesLengthRef.current = messages.length;
    
    if (isNewMessage && messagesEndRef.current && chatContainerRef.current) {
      // Scroll to bottom only for new messages
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  return (
    <Paper
      elevation={0}
      sx={{
        height: '60vh',
        mb: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        ref={chatContainerRef}
        sx={{
          p: 2,
          overflowY: 'auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            // Don't show loading for user messages
            isLoading={false}
          />
        ))}
        
        {/* Show typing indicator when waiting for response */}
        {isLoading && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 2,
              borderRadius: 2,
              bgcolor: (theme) => 
                theme.palette.mode === 'dark' ? '#374151' : 'grey.100',
              alignSelf: 'flex-start',
              maxWidth: '70%',
            }}
          >
            <CircularProgress size={16} />
            <Box
              component="span"
              sx={{
                fontSize: '0.875rem',
                color: 'text.secondary',
              }}
            >
              Tutor is typing...
            </Box>
          </Box>
        )}
        
        <div ref={messagesEndRef} />
      </Box>
    </Paper>
  );
};

export default ChatWindow;