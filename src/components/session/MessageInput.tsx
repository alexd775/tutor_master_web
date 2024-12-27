import { useState, KeyboardEvent } from 'react';
import { Paper, InputBase, IconButton, useTheme } from '@mui/material';
import { Send } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const MessageInput = ({ onSendMessage, disabled }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const theme = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Allow new line with Shift+Enter
        return;
      }
      // Send message with just Enter
      e.preventDefault();
      if (message.trim()) {
        onSendMessage(message.trim());
        setMessage('');
      }
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        mt: 2,
        borderRadius: 2,
        bgcolor: theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 2px 4px -1px rgba(0, 0, 0, 0.2)'
          : '0 2px 4px -1px rgba(0, 0, 0, 0.05)',
      }}
    >
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          color: theme.palette.text.primary,
          '& .MuiInputBase-input': {
            '&::placeholder': {
              color: theme.palette.text.secondary,
              opacity: 1,
            },
          },
        }}
        placeholder="Type your message... (Shift+Enter for new line)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        multiline
        maxRows={4}
        disabled={disabled}
      />
      <IconButton
        type="submit"
        sx={{
          p: '10px',
          color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
        }}
        disabled={disabled || !message.trim()}
      >
        <Send />
      </IconButton>
    </Paper>
  );
};

export default MessageInput;