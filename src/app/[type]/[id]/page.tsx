'use client';
import { getDetailById } from '@/app/_service';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import MovieDetails from './_component/MovieDetails';
import TvDetails from './_component/TvDetails';
import styles from './detail.module.scss';
import Loading from '@/app/loading';
import { snakeToCamel } from '@/utilities/snakeToCamel';

const MediaDetail = () => {
  const pathname = usePathname();
  const type = pathname.split('/')[1];
  const id = pathname.split('/')[2];

  const { data, isLoading } = useQuery({ queryKey: ['detail', type, id], queryFn: () => getDetailById(type, id) });

  return (
    <div className={styles.container}>
      {isLoading || !data ? (
        <Loading />
      ) : type === 'movie' ? (
        <MovieDetails data={snakeToCamel(data)} />
      ) : (
        <TvDetails data={snakeToCamel(data)} />
      )}
    </div>
  );
};

export default MediaDetail;
