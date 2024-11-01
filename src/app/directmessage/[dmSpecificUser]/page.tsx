"use client";

import { Box } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Home from '../../home/page';
import styles from '../index.module.scss';
import UserAutocomplete from '../../../common/Formfields';

interface Params {
  // Define the expected structure of params here
  userId: string;
}

export default function DmSpecifiUser({ params }: { params: Params }) {
    const [users, setUsers] = useState([]);
 

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


  return (
    <Home>
      <Box className={styles.content}>
        <p className={styles.newMessageTitle}>New Message</p>
        <Box className={styles.toMessageStyles}>
          <UserAutocomplete users={users} />
        </Box>
      </Box>
    </Home>
  );
}
