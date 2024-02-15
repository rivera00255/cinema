'use client';
import { getTrendingLists } from '@/app/_service';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { TabContext } from '../TabProvider';
import MediaPreview from '../../MediaPreview';
import { Movies, TVSeries } from '@/app/type';
import { cameliseSnakeArr } from '@/utilities/snakeToCamel';
import styles from './trending.module.scss';
import Link from 'next/link';

const TrendingLists = () => {
  const { tab } = useContext(TabContext);

  const { data } = useQuery({ queryKey: ['trending', tab], queryFn: () => getTrendingLists(tab, 'week') });

  return (
    <div className={styles.container}>
      {data?.results &&
        cameliseSnakeArr(data.results).map((item: Movies | TVSeries) => (
          <Link href={`/${item.mediaType}/${item.id}`} key={item.id}>
            <MediaPreview item={item} />
          </Link>
        ))}
    </div>
  );
};

export default TrendingLists;
