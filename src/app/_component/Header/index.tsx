import Link from 'next/link';
import styles from './header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <h1>
          <Link href="/">Cinema</Link>
        </h1>
        <ul>
          <li>
            <Link href="/">영화</Link>
          </li>
          <li>
            <Link href="/">TV시리즈</Link>
          </li>
        </ul>
        <button>로그인</button>
      </nav>
    </header>
  );
};

export default Header;
