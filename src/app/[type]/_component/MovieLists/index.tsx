'use client';
import { useQuery } from '@tanstack/react-query';
import styles from './movies.module.scss';
import { getNowPlayingMovie, getPopularLists, getTopRatedLists } from '@/app/_service';
import Carousel from '@/app/_component/Carousel';
import { cameliseSnakeArr } from '@/utilities/snakeToCamel';

const MovieLists = () => {
  const { data: nowPlaying } = useQuery({ queryKey: ['nowPlaying', 'movie'], queryFn: getNowPlayingMovie });
  const { data: popular } = useQuery({ queryKey: ['popular', 'movie'], queryFn: () => getPopularLists('movie') });
  const { data: topRated } = useQuery({ queryKey: ['topRated', 'movie'], queryFn: () => getTopRatedLists('movie') });
  // console.log(popular);

  return (
    <div className={styles.container}>
      <h2>영 화</h2>
      <h3>지금 상영 중</h3>
      <div>{nowPlaying && <Carousel item={cameliseSnakeArr(nowPlaying.results)} />}</div>
      <h3>Popular</h3>
      <div>{popular && <Carousel item={cameliseSnakeArr(popular.results)} />}</div>
      <h3>Top Rated</h3>
      <div>{topRated && <Carousel item={cameliseSnakeArr(topRated.results)} />}</div>
    </div>
  );
};

export default MovieLists;
