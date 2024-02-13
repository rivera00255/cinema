import { headers } from 'next/headers';
import styles from './type.module.scss';
import MovieLists from './_component/MovieLists';
import TVLists from './_component/TVLists';

const MediaType = () => {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';

  return <div className={styles.container}>{pathname.replace('/', '') === 'movie' ? <MovieLists /> : <TVLists />}</div>;
};

export default MediaType;
