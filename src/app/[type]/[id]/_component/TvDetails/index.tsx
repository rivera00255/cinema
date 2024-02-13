import NotFound from '@/app/not-found';
import { Cast, TVDetail } from '@/app/type';
import styles from './tv.module.scss';
import Image from 'next/image';
import { cameliseSnakeArr, snakeToCamel } from '@/utilities/snakeToCamel';
import Link from 'next/link';
import { useState } from 'react';
import PlaceholderImg from '../../../../../assets/image/placeholder.jpg';
import { useQuery } from '@tanstack/react-query';
import { getCredits, getVideos } from '@/app/_service';
import CastProfile from '../CastProfile';

const TvDetails = ({ data }: { data: TVDetail }) => {
  const [limit, setLimit] = useState(6);

  const { data: credits } = useQuery({
    queryKey: ['tv', 'credits', data.id],
    queryFn: () => getCredits('tv', data.id),
    enabled: !!data.id,
  });

  // const { data: videos } = useQuery({
  //   queryKey: ['tv', 'videos', data.id],
  //   queryFn: () => getVideos('tv', data.id),
  //   enabled: !!data.id,
  // });

  if (!data) return <NotFound />;
  return (
    <div className={styles.container}>
      <h2>{data.name}</h2>
      <h4>{data.tagline}</h4>
      <hr />
      <div className={styles.desc}>
        <div className={styles.image}>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMG_URL}original${data.backdropPath}`}
            fill={true}
            sizes="(max-width: 768px) 100vw, 33vw"
            alt={data.name}
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
            <p>방영 시작일 : {data.firstAirDate}</p>
            <p>마지막 방영일 : {data.lastAirDate}</p>
            <p>마지막 시즌 : {data.seasons.length}</p>
            <p>{data.status === 'Ended' ? '완결' : '미완'}</p>
          </div>
        </div>
      </div>
      <div className={styles.detail}>
        <h3>시즌별 정보</h3>
        <div className={styles.seasons}>
          {cameliseSnakeArr(data.seasons.slice(0, limit)).map((item) => (
            <Link key={item.id} href={{ pathname: `./${data.id}/${item.id}`, query: item }}>
              <div>
                {item.posterPath ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}w500${item.posterPath}`}
                    width={100}
                    height={100}
                    alt={data.name}
                  />
                ) : (
                  <div className={styles.placeholder}>
                    <Image src={PlaceholderImg} width={100} height={100} alt={data.name} />
                  </div>
                )}
              </div>
              <p>{item.name}</p>
            </Link>
          ))}
          {data.seasons.length > 6 && (
            <button
              className={styles.more}
              onClick={() => setLimit(data.seasons.length)}
              hidden={data.seasons.length === limit}>
              시즌 더보기
            </button>
          )}
        </div>
      </div>
      <hr />
      <div className={styles.cast}>
        {credits?.cast?.slice(0, 6).map((item: Cast) => <CastProfile item={snakeToCamel(item)} key={item.id} />)}
      </div>
    </div>
  );
};

export default TvDetails;
