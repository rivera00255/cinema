import NotFound from '@/app/not-found';
import { MovieDetail } from '@/app/type';
import Image from 'next/image';
import styles from './movie.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getCredits } from '@/app/_service';

const MovieDetails = ({ data }: { data: MovieDetail }) => {
  // const { data: credits } = useQuery({
  //   queryKey: ['movie', 'credits', data.id],
  //   queryFn: () => getCredits('movie', data.id),
  //   enabled: !!data.id,
  // });
  // console.log(credits);

  if (!data) return <NotFound />;
  return (
    <div className={styles.container}>
      <h2>{data.title}</h2>
      <h4>{data.tagline}</h4>
      <hr />
      <div className={styles.desc}>
        <div className={styles.image}>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMG_URL}original${data.backdropPath}`}
            fill={true}
            sizes="(max-width: 768px) 100vw, 33vw"
            alt={data.title}
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
          <div className={styles.info}>
            <span>개봉일 : {data.releaseDate}</span>
            <p>상영 시간 : {data.runtime}분</p>
            <p>관람 평점 : {data.voteAverage.toFixed(1)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
