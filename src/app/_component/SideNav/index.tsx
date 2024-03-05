'use client';
import { useLanguageStore } from '@/store/language';
import styles from './nav.module.scss';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '@/utilities/AuthProvider';
import { supabase } from '@/lib/supabaseClient';

const SideNav = () => {
  const { setMode } = useLanguageStore();
  const { i18n } = useTranslation();

  const router = useRouter();

  const session = useContext(AuthContext);
  // console.log(session);

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
        {session && (
          <li style={{ color: '#71717a' }}>
            <button onClick={() => router.push('../mypage')}>마이페이지</button>
          </li>
        )}
      </ul>
      {!session ? (
        <button onClick={() => router.push('../login')}>로그인</button>
      ) : (
        <button
          onClick={async () => {
            await supabase.auth.signOut();
          }}>
          로그아웃
        </button>
      )}
    </div>
  );
};

export default SideNav;
