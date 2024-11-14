import { Box } from '@mui/material';
import Home from '../home/page';
import styles from './index.module.scss';
import SearchUserField from '@/components/common/Formfields/SearchPeopleField';

export default function DirectMessage() {
  return (
    <Home>
      <Box className={styles.content}>
        <p className={styles.newMessageTitle}>New Message</p>
        <Box className={styles.toMessageStyles}>
          <SearchUserField />
        </Box>
      </Box>
    </Home>
  );
}
