import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import styles from './index.module.scss';
import TextEditor from '../MessageEditor';
import CustomButton from '@/components/GenericButton';
import SendIcon from '@mui/icons-material/Send';
import useSocket from '@/hooks/useSocket';
import { useGetDataFromServer } from '@/hooks/useGetDataFromServer';
import Loader from '@/components/Loader';
import { ChatContainerProps, Message, User } from '@/utils/types';


const ChatContainer: React.FC<ChatContainerProps> = ({ chatId, user, chatData }) => {
  const socket = useSocket();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const LoggedInUser = JSON.parse(localStorage.getItem('user') || '{}');

  const { data: fetchedMessages = [], isLoading: MessageLoading } = useGetDataFromServer<Message[]>({
    url: `http://localhost:4000/api/chats/${chatId}/messages`,
    queryKey: ["messages", chatId],
    enabled: !!chatData,
  });

  const [messages, setMessages] = useState<Message[]>(fetchedMessages);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (fetchedMessages) {
      setMessages(fetchedMessages);
    }
  }, [fetchedMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    socket.on('newMessage', (newMessage: Message) => {
      console.log('Received new message:', newMessage);
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
        senderId: LoggedInUser.id,
        content: message.replace(/<\/?p>/g, ''), // Sanitize <p> tags
        messageType: 'text',
        timestamp: new Date().toISOString(),
      };

      console.log("Sending message:", newMessage);
      socket.emit('sendMessage', newMessage);

      setMessages((prevMessages) => [
        ...prevMessages,
        { ...newMessage, id: Math.random().toString() },
      ]);

      setMessage('');
    }
  };

  const getDisplayName = (senderId: string) => {
    if (senderId === user?.id) {
      return user.displayName;
    } else if (senderId === LoggedInUser.id) {
      return LoggedInUser.displayName;
    }
  };

  return (
    <Box className={styles.chatContainer}>
      {MessageLoading && <Loader />}
      <Box className={styles.messagesContainer}>
        {messages.map((msg) => (
          <Box className={styles.messageRow} key={msg.id}>
            <Avatar variant="circular" className={styles.messageAvatar}>
              {msg.senderId === user?.id && user?.icon ? (
                <Avatar src={user?.icon} />
              ) : (
                <PersonIcon />
              )}
            </Avatar>
            <Box className={styles.messageContentWrapper}>
              <Box className={styles.messageHeader}>
                <h5 className={styles.messageSender}>{getDisplayName(msg.senderId)}</h5>
                <p className={styles.messageTimestamp}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                </p>
              </Box>
              <p className={styles.messageContent}>{msg.content}</p>
            </Box>
          </Box>
        ))}
        <div ref={bottomRef} />
      </Box>
      <Box className={styles.editorContainer}>
        <TextEditor
          theme="snow"
          value={message}
          onChange={setMessage}
          className={styles.textEditor} // Apply full-width styling
        />
       <CustomButton sx={{flexShrink:0}} title="Send" icon={<SendIcon />} onClick={handleSendMessage} />
      </Box>

    </Box>
  );
};

export default ChatContainer;
