'use client';
import { useLanguageStore } from '@/store/language';
import styles from './nav.module.scss';
import { useTranslation } from 'react-i18next';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/utilities/AuthProvider';
import { supabase } from '@/lib/supabaseClient';

const SideNav = () => {
  const { setMode } = useLanguageStore();
  const { t, i18n } = useTranslation();

  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  const session = useContext(AuthContext);
  // console.log(params);

  useEffect(() => {
    if (params.type && !params.id) sessionStorage.removeItem('tab');
  }, [params]);

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
        <button onClick={() => router.push('../login')}>{t('signin')}</button>
      ) : (
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            if (pathname.includes('mypage')) router.push('/');
          }}>
          {t('signout')}
        </button>
      )}
    </div>
  );
};

export default SideNav;
