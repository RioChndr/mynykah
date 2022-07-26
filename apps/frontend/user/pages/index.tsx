import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

export function Index() {
  const [message, setMessage] = useState('Init')
  useEffect(() => {
    axios.get('/api').then((res) => {
      setMessage(res.data.message)
    }).catch((err) => {
      setMessage('error : ' + err)
    })
  }, [])
  return (
    <div className={styles.page}>
      {message}
    </div>
  );
}

export default Index;
