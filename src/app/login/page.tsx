'use client';
import Link from 'next/link';
import styles from './login.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { supabase } from '@/lib/supabaseClient';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [error, setError] = useState('');

  const router = useRouter();

  const { t } = useTranslation();

  const signin = async ({ email, password }: { email: string; password: string }) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
        return;
      }
      router.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  const signinWithKakao = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
    });
    if (error) setError(error.message);
    console.log(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setError('');
    signin(data);
  };

  return (
    <div className={styles.container}>
      <h2>이메일로 로그인</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">{t('email')}</label>
        <input id="email" type="text" {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })} />
        <label htmlFor="password">{t('password')}</label>
        <input
          id="password"
          type="password"
          {...register('password', { required: true, pattern: /^(?=.*[a-z])(?=.*[0-9]).{6,20}$/ })}
        />
        <button>{t('signin')}</button>
      </form>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <div className={styles.oauthLogin}>
        <button onClick={signinWithKakao}>Kakao 계정으로 로그인</button>
        {/* <button>Google 계정으로 로그인</button> */}
      </div>
      <button>
        <Link href="/signup">{t('signup')}</Link>
      </button>
    </div>
  );
};

export default Login;
