'use client';
import { useContext } from 'react';
import styles from './tab.module.scss';
import { TabContext } from '../TabProvider';

const Tab = () => {
  const { tab, setTab } = useContext(TabContext);

  return (
    <div className={styles.tab}>
      <div onClick={() => setTab('movie')}>
        <p>영화</p>
        <div className={styles.indicator} hidden={tab === 'tv'} />
      </div>
      <div onClick={() => setTab('tv')}>
        <p>TV</p>
        <div className={styles.indicator} hidden={tab === 'movie'} />
      </div>
    </div>
  );
};

export default Tab;
