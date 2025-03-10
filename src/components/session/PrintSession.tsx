import { Box, Button, Dialog, DialogContent, DialogTitle, Typography, IconButton } from '@mui/material';
import { Printer, X } from 'lucide-react';
import { Session } from '../../types/session';
import { ChatMessage } from '../../types/chat';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useRef } from 'react';

interface PrintSessionProps {
  open: boolean;
  onClose: () => void;
  session: Session;
  messages: ChatMessage[];
}

const PrintSession = ({ open, onClose, session, messages }: PrintSessionProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  
  // Force light theme on the dialog content
  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.setAttribute('data-theme', 'light');
    }
  }, [open]);
  
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
      sx={{
        zIndex: 9999,
      }}
    >
      <DialogTitle 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          '@media print': { display: 'none' },
          position: 'sticky',
          top: 0,
          bgcolor: 'background.paper',
          zIndex: 1000,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
          Session Preview
        </Typography>
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
      <DialogContent 
        ref={dialogRef}
        sx={{ 
          bgcolor: '#ffffff',
          color: '#000000',
        }}
      >
        <Box sx={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          p: 3,
          bgcolor: '#ffffff',
          color: '#000000',
        }}>
          {/* Session Header */}
          <Typography variant="h4" gutterBottom sx={{ color: '#000000' }}>
            {session.topic_title}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Session Created: {formatDate(session.created_at)} / ID: {session.id}
          </Typography>
          <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
            {/* <Typography variant="body2">
              Duration: {session.duration} minutes
            </Typography> */}
            {/* <Typography variant="body2">
              Completion Rate: {Math.round(session.completion_rate * 100)}%
            </Typography> */}
            <Typography variant="body2" sx={{ color: '#000000' }}>
              User: {session.user_full_name || 'Unknown'} / {session.user_id || '-'}
            </Typography>
          </Box>

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
                  color: '#000000',
                }}
              >
                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: 'block',
                    mb: 1,
                    color: '#666666',
                  }}
                >
                  {message.role === 'user' ? 'User' : 'Tutor'} - {formatDate(message.created_at)}
                </Typography>
                <Box sx={{
                  '& p': { m: 0, '&:not(:last-child)': { mb: 1 }, color: '#000000' },
                  '& pre': {
                    p: 1,
                    borderRadius: 1,
                    bgcolor: '#f8fafc',
                    overflow: 'auto',
                    color: '#000000',
                  },
                  '& code': {
                    bgcolor: '#f8fafc',
                    p: 0.5,
                    borderRadius: 0.5,
                    fontFamily: 'monospace',
                    color: '#000000',
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