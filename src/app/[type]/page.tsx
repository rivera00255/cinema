import { headers } from 'next/headers';
import styles from './type.module.scss';
import MediaLists from './_component/MediaLists';
import 'swiper/css';
import 'swiper/css/navigation';
import { MediaType } from '../type';

const MediaType = () => {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';

  return (
    <div className={styles.container}>
      <MediaLists type={pathname.replace('/', '') as MediaType} />
    </div>
  );
};

export default MediaType;
