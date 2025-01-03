import { Box, Button, Dialog, DialogContent, DialogTitle, Typography, IconButton } from '@mui/material';
import { Printer, X } from 'lucide-react';
import { Session } from '../../types/session';
import { ChatMessage } from '../../types/chat';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PrintSessionProps {
  open: boolean;
  onClose: () => void;
  session: Session;
  messages: ChatMessage[];
}

const PrintSession = ({ open, onClose, session, messages }: PrintSessionProps) => {
  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullScreen
      PaperProps={{
        sx: {
          '@media print': {
            boxShadow: 'none',
          },
        },
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        '@media print': { display: 'none' },
      }}>
        <Typography variant="h6">Session Preview</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            startIcon={<Printer size={20} />}
            variant="contained"
            onClick={handlePrint}
          >
            Print
          </Button>
          <IconButton onClick={onClose} size="small">
            <X size={20} />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ maxWidth: '800px', margin: '0 auto', p: 3 }}>
          {/* Session Header */}
          <Typography variant="h4" gutterBottom>
            {session.topic_title}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Created: {formatDate(session.created_at)}
          </Typography>
          <Typography variant="body2" paragraph>
            Duration: {session.duration} minutes | 
            Completion Rate: {Math.round(session.completion_rate * 100)}%
          </Typography>

          {/* Chat Messages */}
          <Box sx={{ mt: 4 }}>
            {messages.map((message) => message.role === 'system' ? null : (
              <Box
                key={message.id}
                sx={{
                  mb: 3,
                  p: 2,
                  borderRadius: 1,
                  bgcolor: message.role === 'user' ? '#f3f4f6' : '#ffffff',
                  border: '1px solid #e5e7eb',
                }}
              >
                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: 'block',
                    mb: 1,
                    color: 'text.secondary',
                  }}
                >
                  {message.role === 'user' ? 'You' : 'Tutor'} - {formatDate(message.created_at)}
                </Typography>
                <Box sx={{
                  '& p': { m: 0, '&:not(:last-child)': { mb: 1 } },
                  '& pre': {
                    p: 1,
                    borderRadius: 1,
                    bgcolor: '#f8fafc',
                    overflow: 'auto',
                  },
                  '& code': {
                    bgcolor: '#f8fafc',
                    p: 0.5,
                    borderRadius: 0.5,
                    fontFamily: 'monospace',
                  },
                }}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PrintSession;