'use client';
import { getDetailById } from '@/app/_service';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import styles from './detail.module.scss';
import MediaDetails from './_component/MediaDetails';
import { MediaType } from '@/app/type';

const Media = () => {
  const pathname = usePathname();
  const type = pathname.split('/')[1];
  const id = pathname.split('/')[2];

  const { data } = useQuery({ queryKey: ['detail', type, id], queryFn: () => getDetailById(type, id) });

  return <div className={styles.container}>{data && <MediaDetails type={type as MediaType} data={data} />}</div>;
};

export default Media;
