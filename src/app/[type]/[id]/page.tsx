'use client';
import { getDetailById } from '@/app/_service';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import styles from './detail.module.scss';
import MediaDetails from './_component/MediaDetails';
import { MediaType } from '@/app/type';
import { useLanguageStore } from '@/store/language';
import { MediaKeys } from '@/app/_service/keys';

const Media = () => {
  const pathname = usePathname();
  const type = pathname.split('/')[1];
  const id = pathname.split('/')[2];

  const { mode } = useLanguageStore();

  const { data } = useQuery({
    queryKey: MediaKeys.detail(type as MediaType, id, mode),
    queryFn: () => getDetailById(type, id, mode),
  });

  return <div className={styles.container}>{data && <MediaDetails type={type as MediaType} data={data} />}</div>;
};

export default Media;
