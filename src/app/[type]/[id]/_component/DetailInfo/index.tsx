'use client';
import { MediaType, MovieDetail, TVDetail } from '@/app/type';
import styles from './info.module.scss';
import { useTranslation } from 'react-i18next';

const DetailInfo = ({ type, data }: { type: MediaType; data: MovieDetail | TVDetail }) => {
  const { t } = useTranslation();

  if (type === 'movie') {
    return (
      <div className={styles.info}>
        <span>
          {t('release')} : {(data as MovieDetail).releaseDate}
        </span>
        <p>
          {t('runtime')} : {(data as MovieDetail).runtime}분
        </p>
        <p>
          {t('vote')} : {data.voteAverage.toFixed(1)}
        </p>
      </div>
    );
  } else {
    return (
      <div className={styles.info}>
        <p>
          {t('firstAir')} : {(data as TVDetail).firstAirDate}
        </p>
        <p>
          {t('lastAir')} : {(data as TVDetail).lastAirDate}
        </p>
        <p>
          {t('lastSeason')}: {(data as TVDetail).seasons.length}
        </p>
        <p>{data.status === 'Ended' ? '완결' : '미완'}</p>
      </div>
    );
  }
};

export default DetailInfo;
