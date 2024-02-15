import { MediaType, MovieDetail, TVDetail } from '@/app/type';
import styles from './info.module.scss';

const DetailInfo = ({ type, data }: { type: MediaType; data: MovieDetail | TVDetail }) => {
  if (type === 'movie') {
    return (
      <div className={styles.info}>
        <span>개봉일 : {(data as MovieDetail).releaseDate}</span>
        <p>상영 시간 : {(data as MovieDetail).runtime}분</p>
        <p>관람 평점 : {data.voteAverage.toFixed(1)}</p>
      </div>
    );
  } else {
    return (
      <div className={styles.info}>
        <p>방영 시작일 : {(data as TVDetail).firstAirDate}</p>
        <p>마지막 방영일 : {(data as TVDetail).lastAirDate}</p>
        <p>마지막 시즌 : {(data as TVDetail).seasons.length}</p>
        <p>{data.status === 'Ended' ? '완결' : '미완'}</p>
      </div>
    );
  }
};

export default DetailInfo;
