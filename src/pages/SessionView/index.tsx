import { useState } from 'react';
import { Box, Container, useTheme, CircularProgress, Typography } from '@mui/material';
import { useParams, Navigate } from 'react-router-dom';
import TopicInfo from '../../components/session/TopicInfo';
import ChatWindow from '../../components/session/ChatWindow';
import MessageInput from '../../components/session/MessageInput';
import SessionHeader from '../../components/session/SessionHeader';
import FileList from '../../components/session/FileList';
import BackButton from '../../components/common/BackButton';
import { useSessionData } from '../../hooks/useSession';
import { useTopicFiles } from '../../hooks/useFiles';
import { useChatHistory, useSendMessage } from '../../hooks/useChat';
import { ChatMessage } from '../../types/chat';

const SessionView = () => {
  const { sessionId } = useParams();
  const theme = useTheme();
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]);

  const {
    session,
    topic,
    isLoading: isSessionLoading,
    error: sessionError
  } = useSessionData(sessionId || '');

  const {
    data: filesData,
    isLoading: isFilesLoading
  } = useTopicFiles(sessionId || '');

  const {
    data: serverMessages = [],
    isLoading: isMessagesLoading
  } = useChatHistory(session?.id || '');

  const { mutate: sendMessage, isPending: isSending } = useSendMessage(session?.id || '');

  // Combine server messages with local optimistic updates
  const allMessages = [...serverMessages, ...localMessages];

  const handleSendMessage = (content: string) => {
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
        <SessionHeader session={session} />
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
          disabled={isSending}
        />
      </Container>
    </Box>
  );
};

export default SessionView;