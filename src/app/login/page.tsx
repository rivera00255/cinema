'use client';
import Link from 'next/link';
import styles from './login.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className={styles.container}>
      <h2>이메일로 로그인</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">이메일</label>
        <input id="email" type="text" {...register('email', { pattern: /^\S+@\S+\.\S+$/ })} />
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          {...register('password', { pattern: /^(?=.*[a-z])(?=.*[0-9]).{6,20}$/ })}
        />
        <button>로그인</button>
      </form>
      <button>
        <Link href="/signup">회원가입</Link>
      </button>
    </div>
  );
};

export default Login;
