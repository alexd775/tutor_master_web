import { useState } from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';
import { Send } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const MessageInput = ({ onSendMessage, disabled }: MessageInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
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
        boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.05)',
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        multiline
        maxRows={4}
        disabled={disabled}
      />
      <IconButton type="submit" sx={{ p: '10px' }} disabled={disabled}>
        <Send />
      </IconButton>
    </Paper>
  );
};

export default MessageInput;