import { useState, useEffect } from 'react';
import { Box, Container, useTheme, CircularProgress, Typography } from '@mui/material';
import { useParams, Navigate } from 'react-router-dom';
import TopicInfo from '../../components/session/TopicInfo';
import ChatWindow from '../../components/session/ChatWindow';
import MessageInput from '../../components/session/MessageInput';
import SessionHeader from '../../components/session/SessionHeader';
import FileList from '../../components/session/FileList';
import BackButton from '../../components/common/BackButton';
import Notification from '../../components/common/Notification';
import SessionTimer from '../../components/session/SessionTimer';
import ExpirationDialog from '../../components/session/ExpirationDialog';
import { useSessionData } from '../../hooks/useSession';
import { useTopicFiles } from '../../hooks/useFiles';
import { useChatHistory, useSendMessage } from '../../hooks/useChat';
import { useSessionTimer } from '../../hooks/useSessionTimer';
import { ChatMessage } from '../../types/chat';

const SessionView = () => {
  const { sessionId } = useParams();
  const theme = useTheme();
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]);
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning';
  }>({ open: false, message: '', severity: 'success' });
  const [showExpirationDialog, setShowExpirationDialog] = useState(false);

  const {
    session,
    topic,
    isLoading: isSessionLoading,
    error: sessionError
  } = useSessionData(sessionId || '');

  const {
    isExpired,
    isExpirable,
    showExpirationWarning,
    remainingTime,
  } = useSessionTimer(session?.id || '');

  const {
    data: filesData,
    isLoading: isFilesLoading
  } = useTopicFiles(sessionId || '');

  const {
    data: serverMessages = [],
    isLoading: isMessagesLoading
  } = useChatHistory(session?.id || '');

  const { mutate: sendMessage, isPending: isSending } = useSendMessage(session?.id || '');

  // Show expiration warning notification
  useEffect(() => {
    if (showExpirationWarning) {
      setNotification({
        open: true,
        // message: `Session will expire in ${remainingTime}`,
        message: `Du har 5 minutter tilbage med TutorMaster. Du kan fortælle ham, at du vil runde af, hvis du ikke allerede har gjort det.`,
        severity: 'warning',
      });
    }
  }, [showExpirationWarning]);

  // Show expiration dialog when session expires
  useEffect(() => {
    if (isExpired) {
      setShowExpirationDialog(true);
    }
  }, [isExpired]);

  // Combine server messages with local optimistic updates
  const allMessages = [...serverMessages, ...localMessages];

  const handleSendMessage = (content: string) => {
    if (isExpired) return;

    const optimisticMessage: ChatMessage = {
      id: `temp-${Date.now()}`,
      session_id: session?.id || '',
      role: 'user',
      content,
      created_at: new Date().toISOString(),
    };

    setLocalMessages(prev => [...prev, optimisticMessage]);

    sendMessage(
      { content },
      {
        onSuccess: () => {
          setLocalMessages([]);
        },
        onError: () => {
          setLocalMessages(prev => prev.filter(msg => msg.id !== optimisticMessage.id));
        },
      }
    );
  };

  const handleRestartSuccess = () => {
    setNotification({
      open: true,
      message: 'Session restarted successfully',
      severity: 'success',
    });
  };

  const handleRestartError = (error: Error) => {
    setNotification({
      open: true,
      message: 'Failed to restart session. Please try again.',
      severity: 'error',
    });
  };

  if (!sessionId) {
    return <Navigate to="/topics" replace />;
  }

  if (isSessionLoading || isFilesLoading || isMessagesLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: theme.palette.mode === 'dark' ? '#0f172a' : '#f8fafc',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (sessionError || !session || !topic) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: theme.palette.mode === 'dark' ? '#0f172a' : '#f8fafc',
        }}
      >
        <Typography color="error">
          Failed to load session. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: theme.palette.mode === 'dark' ? '#0f172a' : '#f8fafc',
      py: 2,
    }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 2 }}>
          <BackButton to="/topics" toText='Topics' />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <SessionHeader 
            session={session}
            onRestartSuccess={handleRestartSuccess}
            onRestartError={handleRestartError}
            isExpired={isExpired}
            isExpirable={isExpirable}
          />
          <SessionTimer remainingTime={remainingTime} isExpired={isExpired} />
        </Box>
        <TopicInfo
          title={topic.title}
          description={topic.description}
          difficulty={topic.difficulty_level}
          duration={topic.duration ? `${topic.duration} minutes` : undefined}
        />
        {filesData && <FileList files={filesData.items} />}
        <ChatWindow
          messages={allMessages}
          isLoading={isSending}
        />
        <MessageInput
          onSendMessage={handleSendMessage}
          disabled={isSending || isExpired}
        />
        <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={() => setNotification({ ...notification, open: false })}
        />
        <ExpirationDialog
          open={showExpirationDialog}
          onClose={() => setShowExpirationDialog(false)}
        />
      </Container>
    </Box>
  );
};

export default SessionView;