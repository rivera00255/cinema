'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './signup.module.scss';

type Inputs = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className={styles.container}>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">이메일</label>
        <input id="email" type="text" {...register('email')} />
        <label htmlFor="name">닉네임</label>
        <input id="name" type="text" {...register('nickname')} />
        <label htmlFor="password">비밀번호</label>
        <input id="password" type="password" {...register('password')} />
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input id="passwordConfirm" type="password" {...register('passwordConfirm')} />
        <button>가 입</button>
      </form>
    </div>
  );
};

export default Signup;
