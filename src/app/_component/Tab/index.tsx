'use client';
import { useContext } from 'react';
import styles from './tab.module.scss';
import { TabContext } from '../TabProvider';
import { useTranslation } from 'react-i18next';

const Tab = () => {
  const { tab, setTab } = useContext(TabContext);
  const { t } = useTranslation();

  return (
    <div className={styles.tab}>
      <div onClick={() => setTab('movie')}>
        <p>{t('movie')}</p>
        <div className={styles.indicator} hidden={tab === 'tv'} />
      </div>
      <div onClick={() => setTab('tv')}>
        <p>{t('tv')}</p>
        <div className={styles.indicator} hidden={tab === 'movie'} />
      </div>
    </div>
  );
};

export default Tab;
