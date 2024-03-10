'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './signup.module.scss';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

type Inputs = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
};

const Signup = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const signup = async ({ email, password, nickname }: { email: string; password: string; nickname: string }) => {
    try {
      const { data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nickname,
          },
        },
      });
      if (data) {
        alert('회원가입이 완료되었습니다. 이메일 확인 후 로그인해주세요.');
        router.push('../login');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Inputs>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (isValid && watch('password') === watch('passwordConfirm')) {
      signup(data);
    }
  };

  return (
    <div className={styles.container}>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">{t('email')}</label>
        <input id="email" type="text" placeholder="이메일" {...register('email', { pattern: /^\S+@\S+\.\S+$/ })} />
        {errors.email && <p className={styles.errorMessage}>정확한 이메일 주소를 입력해주세요.</p>}
        <label htmlFor="nickname">{t('nickname')}</label>
        <input id="nickname" type="text" placeholder="10자리 이하" {...register('nickname', { maxLength: 10 })} />
        {errors.nickname && <p className={styles.errorMessage}>10자리 이하로 입력해주세요.</p>}
        <label htmlFor="password">{t('password')}</label>
        <input
          id="password"
          type="password"
          placeholder="6자리 이상 20자리 이하"
          {...register('password', { pattern: /^(?=.*[a-z])(?=.*[0-9]).{6,20}$/ })}
        />
        {errors.password && (
          <p className={styles.errorMessage}>영어 소문자와 숫자를 6자리 이상 20자리 이하로 입력해주세요.</p>
        )}
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
          id="passwordConfirm"
          type="password"
          placeholder="비밀번호를 한번 더 입력해주세요"
          {...register('passwordConfirm', { pattern: /^(?=.*[a-z])(?=.*[0-9]).{6,20}$/ })}
        />
        {watch('password') && watch('passwordConfirm') && watch('password') !== watch('passwordConfirm') && (
          <p className={styles.errorMessage}>비밀번호를 다시 한번 입력해주세요.</p>
        )}
        <button>{t('signup')}</button>
      </form>
    </div>
  );
};

export default Signup;
