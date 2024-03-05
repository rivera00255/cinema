'use client';
import { useContext } from 'react';
import styles from './tab.module.scss';
import { TabContext } from '../TabProvider';
import { useTranslation } from 'react-i18next';
import { persist } from '@/utilities/persist';

const Tab = () => {
  const { tab, setTab } = useContext(TabContext);
  const { t } = useTranslation();

  return (
    <div className={styles.tab}>
      <div
        onClick={() => {
          setTab('movie');
          persist.setSessionStorage('tab', 'movie');
        }}>
        <p>{t('movie')}</p>
        <div className={styles.indicator} hidden={tab === 'tv'} />
      </div>
      <div
        onClick={() => {
          setTab('tv');
          persist.setSessionStorage('tab', 'tv');
        }}>
        <p>{t('tv')}</p>
        <div className={styles.indicator} hidden={tab === 'movie'} />
      </div>
    </div>
  );
};

export default Tab;
