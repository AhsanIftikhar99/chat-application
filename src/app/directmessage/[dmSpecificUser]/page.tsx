"use client";
import axios from '@/utils/axiosConfig';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import useSocket from '@/hooks/useSocket';
import CustomButton from '@/components/GenericButton';
import TextEditor from '@/common/MessageEditor';
import SendIcon from '@mui/icons-material/Send';
import Home from '../../home/page';
import { Avatar, Box, Typography } from '@mui/material';
import styles from './index.module.scss';

type User = {
  id: string;
  displayName: string;
  username: string;
  icon?: string;
};

type Message = {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  messageType: string;
  timestamp: string;
};

export default function DmSpecificUser() {
  const [user, setUser] = useState<User | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const socket = useSocket();
  const params = useParams();

  const fetchUserById = async (userId: string) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/users/${userId}`, {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchMessages = async (chatId: string) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/chats/${chatId}/messages`, {
        withCredentials: true,
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    if (typeof params?.dmSpecificUser === 'string') {
      fetchUserById(params.dmSpecificUser);
    }
  }, [params]);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:4000/api/chats/${user.id}`)
        .then((res) => {
          setChatId(res.data.chatId);
          fetchMessages(res.data.chatId);
        })
        .catch((error) => console.error('Error fetching chat:', error));
    }
  }, [user]);

  useEffect(() => {
    socket.on('newMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (message.trim() && chatId && user) {
      const newMessage = {
        chatId,
        senderId: user.id,
        content: message.replace(/<\/?p>/g, ''), // Sanitize <p> tags
        messageType: 'text',
      };

      socket.emit('sendMessage', newMessage);
      setMessages((prevMessages) => [...prevMessages, { ...newMessage, timestamp: new Date().toISOString(), id: Math.random().toString() }]);
      setMessage('');
    }
  };

  return (
    <Home>
      <Box className={styles.container}>
        <Box className={styles.profileContainer}>
          <Box sx={{ ml: '15px' }}>
            {user && (
              <>
                <Box className={styles.userInfo}>
                  {!user.icon ? (
                    <Avatar variant='rounded' className={styles.avatar}>
                      {user.displayName.charAt(0)}
                    </Avatar>
                  ) : (
                    <Avatar variant='square' src={user.icon} />
                  )}
                </Box>
                <Box className={styles.userDetails}>
                  <Typography variant="h6" className={styles.displayName}>
                    {user.displayName}
                  </Typography>
                  <Typography variant="body2" className={styles.username}>
                    @{user.username}
                  </Typography>
                </Box>
              </>
            )}
            <Box className={styles.profileMessage}>
              <p>
                This conversation is just between
                <span> @{user?.username}</span> and you. Check out their profile to learn more about them.
              </p>
            </Box>
            <CustomButton
              title='View Profile'
              sx={{
                backgroundColor: "white",
                border: "1px solid #08344D",
                color: "#08344D",
                marginTop: '10px',
              }}
            />
          </Box>
        </Box>

        <Box className={styles.chatContainer}>
          <Box className={styles.messagesContainer}>
            {messages.map((msg) => (
              <Box key={msg.id} className={styles.messageRow}>
                <Avatar variant="rounded" className={styles.messageAvatar}>
                  {msg.senderId === user?.id ? user.displayName.charAt(0) : 'You'}
                </Avatar>
                <Box className={styles.messageContentContainer}>
                  <Typography variant="body2" className={styles.messageContent}>
                    {msg.content}
                  </Typography>
                  <Typography variant="caption" className={styles.messageTimestamp}>
                    {new Date(msg.timestamp).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box className={styles.editorContainer}>
            <TextEditor
              value={message}
              onChange={setMessage}
            />
            <CustomButton title='Send' icon={<SendIcon />} onClick={handleSendMessage} />
          </Box>
        </Box>
      </Box>
    </Home>
  );
}
