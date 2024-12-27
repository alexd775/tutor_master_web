import { useState } from 'react';
import { Box, Container, useTheme, CircularProgress, Typography } from '@mui/material';
import { useParams, Navigate } from 'react-router-dom';
import TopicInfo from '../../components/session/TopicInfo';
import ChatWindow from '../../components/session/ChatWindow';
import MessageInput from '../../components/session/MessageInput';
import SessionHeader from '../../components/session/SessionHeader';
import FileList from '../../components/session/FileList';
import { MessageRole } from '../../types/auth';
import { useSessionData } from '../../hooks/useSession';
import { useTopicFiles } from '../../hooks/useFiles';

const SessionView = () => {
  const { sessionId } = useParams();
  const theme = useTheme();
  const { session, topic, isLoading: isSessionLoading, error: sessionError } = useSessionData(sessionId || '');
  const { data: filesData, isLoading: isFilesLoading } = useTopicFiles(sessionId || '');
  const [messages, setMessages] = useState<Array<{
    id: string;
    role: MessageRole;
    content: string;
  }>>([]);

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      content,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  if (!sessionId) {
    return <Navigate to="/topics" replace />;
  }

  if (isSessionLoading || isFilesLoading) {
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
        <SessionHeader session={session} />
        <TopicInfo
          title={topic.title}
          description={topic.description}
          difficulty={topic.difficulty_level}
          duration={topic.duration ? `${topic.duration} minutes` : undefined}
        />
        {filesData && <FileList files={filesData.items} />}
        <ChatWindow messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
      </Container>
    </Box>
  );
};

export default SessionView;