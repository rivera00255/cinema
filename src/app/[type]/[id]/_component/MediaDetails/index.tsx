import Image from 'next/image';
import { MediaType, MovieDetail, TVDetail } from '@/app/type';
import styles from './detail.module.scss';
import Cast from '../Cast';
import Photos from '../Photos';
import DetailInfo from '../DetailInfo';
import TvDetails from '../TvDetails';
import MovieDetails from '../MovieDetails';
import CommentForm from '../CommentForm';

const MediaDetails = ({ type, data }: { type: MediaType; data: MovieDetail | TVDetail }) => {
  return (
    <div className={styles.container}>
      <h2>{type === 'movie' ? (data as MovieDetail).title : (data as TVDetail).name}</h2>
      <h4>{data.tagline}</h4>
      <hr />
      <div className={styles.desc}>
        <div className={styles.image}>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMG_URL}original${data.backdropPath}`}
            fill={true}
            sizes="(max-width: 768px) 100vw, 33vw"
            alt={type === 'movie' ? (data as MovieDetail).title : (data as TVDetail).name}
            priority
          />
        </div>
        <div className={styles.text}>
          <p>{data.overview}</p>
          <span>
            {data.genres.map((item) => (
              <span key={item.id}>{item.name}</span>
            ))}
          </span>
          <DetailInfo type={type} data={data} />
        </div>
      </div>
      {type === 'tv' && <TvDetails data={data as TVDetail} />}
      <hr />
      <h3>출연진</h3>
      <Cast type={type} id={data.id} />
      <hr className={styles.row} />
      <h3>포토</h3>
      <Photos type={type} id={data.id} />
      <hr className={styles.row} />
      {type === 'movie' && <MovieDetails data={data as MovieDetail} />}
      <hr className={styles.row} />
      <h3>리뷰</h3>
      <div>
        <CommentForm id={data.id} />
      </div>
    </div>
  );
};

export default MediaDetails;
