import { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Paper } from '@mui/material';
import { Send } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const MessageInput = ({ onSendMessage, disabled }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const shouldFocusRef = useRef(false);
  
  // Focus input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  // Handle focus after state updates
  useEffect(() => {
    if (shouldFocusRef.current && inputRef.current) {
      inputRef.current.focus();
      shouldFocusRef.current = false;
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() && !disabled) {
      // Set flag to focus after state update
      shouldFocusRef.current = true;
      
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        p: 2,
        gap: 1,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
      }}
    >
      <TextField
        inputRef={inputRef}
        fullWidth
        multiline
        maxRows={4}
        placeholder="Type your message... (Shift+Enter for new line)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={!message.trim() || disabled}
        sx={{ 
          borderRadius: 2,
          minWidth: 'auto',
          p: 1.5,
        }}
      >
        <Send size={20} />
      </Button>
    </Paper>
  );
};

export default MessageInput;