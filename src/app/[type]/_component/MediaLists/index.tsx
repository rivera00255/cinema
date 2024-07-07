'use client';
import { getNowPlayingMovie, getPopularLists, getTopRatedLists, getTrendingLists } from '@/app/_service';
import { useQuery } from '@tanstack/react-query';
import styles from './lists.module.scss';
import Carousel from '@/app/_component/Carousel';
import { camelize } from '@/utilities/snakeToCamel';
import { MediaType } from '@/app/type';
import { useLanguageStore } from '@/store/language';
import { useTranslation } from 'react-i18next';
import NotFound from '@/app/not-found';
import { MediaKeys } from '@/app/_service/keys';

const MediaLists = ({ type }: { type: MediaType }) => {
  const { mode } = useLanguageStore();
  const { t } = useTranslation();

  const { data: nowPlaying } = useQuery({
    queryKey: MediaKeys.list(type, { category: 'nowPlaying' }, undefined, mode),
    queryFn: () => getNowPlayingMovie(mode),
    enabled: type === 'movie',
  });

  const { data: trending } = useQuery({
    queryKey: MediaKeys.list(type, { category: 'trending', time: 'day' }, undefined, mode),
    queryFn: () => getTrendingLists(type, 'day', 1, mode),
    enabled: type === 'tv',
  });
  // console.log(trending);

  const { data: popular } = useQuery({
    queryKey: MediaKeys.list(type, { category: 'popular' }, undefined, mode),
    queryFn: () => getPopularLists(type, mode),
  });

  const { data: topRated } = useQuery({
    queryKey: MediaKeys.list(type, { category: 'topRated' }, undefined, mode),
    queryFn: () => getTopRatedLists(type, mode),
  });

  if (type !== 'movie' && type !== 'tv') return <NotFound />;
  return (
    <div className={styles.container}>
      <h2>{type === 'movie' ? '영 화' : 'T V'}</h2>
      {type === 'movie' && (
        <>
          <h3>{t('nowPlaying')}</h3>
          <div className={styles.list}>{nowPlaying && <Carousel item={camelize(nowPlaying.results)} />}</div>
        </>
      )}
      {type === 'tv' && (
        <>
          <h3>{t('todaysTrending')}</h3>
          <div className={styles.list}>{trending && <Carousel item={camelize(trending.results)} />}</div>
        </>
      )}
      <h3>{t('popular')}</h3>
      <div className={styles.list}>{popular && <Carousel item={camelize(popular.results)} />}</div>
      <h3>{t('topRated')}</h3>
      <div className={styles.list}>{topRated && <Carousel item={camelize(topRated.results)} />}</div>
    </div>
  );
};

export default MediaLists;
