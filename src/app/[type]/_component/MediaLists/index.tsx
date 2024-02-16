'use client';
import { getNowPlayingMovie, getPopularLists, getTopRatedLists, getTrendingLists } from '@/app/_service';
import { useQuery } from '@tanstack/react-query';
import styles from './lists.module.scss';
import Carousel from '@/app/_component/Carousel';
import { camelize } from '@/utilities/snakeToCamel';
import { MediaType } from '@/app/type';

const MediaLists = ({ type }: { type: MediaType }) => {
  const { data: nowPlaying } = useQuery({
    queryKey: ['nowPlaying', type],
    queryFn: getNowPlayingMovie,
    enabled: type === 'movie',
  });

  const { data: trending } = useQuery({
    queryKey: ['trending', 'day'],
    queryFn: () => getTrendingLists(type, 'day'),
    enabled: type === 'tv',
  });

  const { data: popular } = useQuery({ queryKey: ['popular', type], queryFn: () => getPopularLists(type) });
  const { data: topRated } = useQuery({ queryKey: ['topRated', type], queryFn: () => getTopRatedLists(type) });

  return (
    <div className={styles.container}>
      <h2>{type === 'movie' ? '영 화' : 'T V'}</h2>
      {type === 'movie' && (
        <>
          <h3>지금 상영 중</h3>
          <div>{nowPlaying && <Carousel item={camelize(nowPlaying.results)} />}</div>
        </>
      )}
      {type === 'tv' && (
        <>
          <h3>오늘의 인기작</h3>
          <div>{trending && <Carousel item={camelize(trending.results)} />}</div>
        </>
      )}
      <h3>Popular</h3>
      <div>{popular && <Carousel item={camelize(popular.results)} />}</div>
      <h3>Top Rated</h3>
      <div>{topRated && <Carousel item={camelize(topRated.results)} />}</div>
    </div>
  );
};

export default MediaLists;
