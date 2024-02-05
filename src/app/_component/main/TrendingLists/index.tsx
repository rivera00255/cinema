'use client';
import { getTrendingLists } from '@/app/_service';
import { useQuery } from '@tanstack/react-query';
import { useContext, useMemo } from 'react';
import { TabContext } from '../TabProvider';
import MediaPreview from '../../MediaPreview';
import { Movies, TVSeries } from '@/app/type';
import { cameliseSnakeArr } from '@/utilities/snakeToCamel';
import styles from './trending.module.scss';

const TrendingLists = () => {
  const { tab } = useContext(TabContext);

  const { data } = useQuery({ queryKey: ['trending', tab], queryFn: () => getTrendingLists(tab) });
  // console.log(data.results);

  return (
    <div className={styles.container}>
      {data?.results &&
        cameliseSnakeArr(data.results).map((item: Movies | TVSeries) => <MediaPreview item={item} key={item.id} />)}
    </div>
  );
};

export default TrendingLists;
