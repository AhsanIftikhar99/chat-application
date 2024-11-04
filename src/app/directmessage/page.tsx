"use client";

import { Box } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Home from '../home/page';
import styles from './index.module.scss';
import { useRouter } from 'next/navigation';
import SearchUserField from '@/components/common/Formfields/SearchPeopleField';


export default function DirectMessage() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/users', {
        withCredentials: true,
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserSelect = (user:any) => {
    console.log('Selected user:', user);
    router.push(`/directmessage/${user?.id}`);
  };

  return (
    <Home>
      <Box className={styles.content}>
        <p className={styles.newMessageTitle}>New Message</p>
        <Box className={styles.toMessageStyles}>
          <SearchUserField users={users} onUserSelect={handleUserSelect} />
        </Box>
      </Box>
    </Home>
  );
}