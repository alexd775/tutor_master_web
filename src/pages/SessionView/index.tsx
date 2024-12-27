import { useState, useEffect } from 'react';
import { Box, Container, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import TopicInfo from '../../components/session/TopicInfo';
import ChatWindow from '../../components/session/ChatWindow';
import MessageInput from '../../components/session/MessageInput';
import { MessageRole } from '../../types/auth';

const SessionView = () => {
  const { sessionId } = useParams();
  const theme = useTheme();
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

  useEffect(() => {
    // TODO: Load session data and chat history
  }, [sessionId]);

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: theme.palette.mode === 'dark' ? '#0f172a' : '#f8fafc',
      py: 2,
    }}>
      <Container maxWidth="lg">
        <TopicInfo
          title="Introduction to Python"
          description="Learn the basics of Python programming language"
          difficulty={1}
          duration="45 minutes"
        />
        <ChatWindow messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
      </Container>
    </Box>
  );
};

export default SessionView;