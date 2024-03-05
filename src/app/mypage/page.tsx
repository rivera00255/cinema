import styles from './mypage.module.scss';
import AuthProvider from '@/utilities/AuthProvider';
import CommentList from './_component/CommentList';

const MyPage = () => {
  return (
    <div className={styles.container}>
      <h2>마이페이지</h2>
      <AuthProvider>
        <CommentList />
      </AuthProvider>
    </div>
  );
};

export default MyPage;
