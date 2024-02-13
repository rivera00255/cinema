'use client';
import { useQuery } from '@tanstack/react-query';
import styles from './tv.module.scss';
import { getPopularLists, getTopRatedLists, getTrendingLists } from '@/app/_service';
import Carousel from '@/app/_component/Carousel';
import { cameliseSnakeArr } from '@/utilities/snakeToCamel';

const TVLists = () => {
  const { data: trending } = useQuery({ queryKey: ['trending', 'day'], queryFn: () => getTrendingLists('tv', 'day') });
  const { data: popular } = useQuery({ queryKey: ['popular', 'tv'], queryFn: () => getPopularLists('tv') });
  const { data: topRated } = useQuery({ queryKey: ['topRated', 'tv'], queryFn: () => getTopRatedLists('tv') });

  return (
    <div className={styles.container}>
      <h2>TV</h2>
      <h3>오늘의 인기작</h3>
      <div>{trending && <Carousel item={cameliseSnakeArr(trending.results)} />}</div>
      <h3>Popular</h3>
      <div>{popular && <Carousel item={cameliseSnakeArr(popular.results)} />}</div>
      <h3>Top Rated</h3>
      <div>{topRated && <Carousel item={cameliseSnakeArr(topRated.results)} />}</div>
    </div>
  );
};

export default TVLists;
