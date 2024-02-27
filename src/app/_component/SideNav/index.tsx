'use client';
import { useLanguageStore } from '@/store/language';
import styles from './nav.module.scss';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

const SideNav = () => {
  const { setMode } = useLanguageStore();
  const { i18n } = useTranslation();

  const router = useRouter();

  return (
    <div className={styles.container}>
      <ul>
        <li>
          <button
            onClick={() => {
              setMode('ko');
              i18n.changeLanguage('ko');
            }}>
            한국어
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setMode('en-US');
              i18n.changeLanguage('en');
            }}>
            English
          </button>
        </li>
      </ul>
      <button onClick={() => router.push('../login')}>로그인</button>
    </div>
  );
};

export default SideNav;
