'use client';
import { useLanguageStore } from '@/store/language';
import styles from './nav.module.scss';
import { useTranslation } from 'react-i18next';

const SideNav = () => {
  const { setMode } = useLanguageStore();
  const { i18n } = useTranslation();

  return (
    <div className={styles.container}>
      <ul>
        <li>
          <button
            onClick={() => {
              setMode('ko');
              i18n.changeLanguage('ko');
            }}>
            한국어(Korean)
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setMode('en-US');
              i18n.changeLanguage('en');
            }}>
            영어(English)
          </button>
        </li>
      </ul>
      <button>로그인</button>
    </div>
  );
};

export default SideNav;
