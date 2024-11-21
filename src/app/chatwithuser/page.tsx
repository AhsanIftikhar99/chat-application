import { Divider } from '@mui/material';
import Home from '../home/page';
import styles from './index.module.scss';
import SearchUserField from '@/components/common/Formfields/SearchPeopleField';

export default function DirectMessage() {
  return (
    <Home>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.newMessageTitle}>New Message</p>
          <div className={styles.toMessageStyles}>
            <SearchUserField />
          </div>
        </div>
      </div>
    </Home>
  );
}
