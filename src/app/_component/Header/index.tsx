import Link from 'next/link';
import styles from './header.module.scss';

const routes = [
  { id: 1, path: '/movie', route: '영화' },
  { id: 2, path: '/tv', route: 'TV시리즈' },
];

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <h1>
          <Link href="/">Cinema</Link>
        </h1>
        <ul>
          {routes.map((item) => (
            <li key={item.id}>
              <Link href={item.path}>{item.route}</Link>
            </li>
          ))}
        </ul>
        <button>로그인</button>
      </nav>
    </header>
  );
};

export default Header;
