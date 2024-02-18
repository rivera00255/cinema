'use client';
import { ReadonlyURLSearchParams, useParams, useSearchParams } from 'next/navigation';
import styles from './season.module.scss';
import Image from 'next/image';
import Dimmer from '@/app/_component/Dimmer';
import { useQuery } from '@tanstack/react-query';
import { getDetailByTVSeason } from '@/app/_service';
import { Episode } from '@/app/type';
import { camelize } from '@/utilities/snakeToCamel';
import { useLanguageStore } from '@/store/language';

const SeasonModal = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const seasonNumber = Number(searchParams.get('seasonNumber'));
  // const [info, setInfo] = useState<Season | undefined>(undefined);

  const { mode } = useLanguageStore();

  // const getSeasonInfo = (searchParams: ReadonlyURLSearchParams) => {
  //   const params = new URLSearchParams(searchParams.toString());
  //   const entries = params.entries();
  //   const result: { [key: string]: string | number } | Season = {};
  //   for (const [key, value] of params.entries()) {
  //     result[key] = value;
  //   }
  //   return result;
  // };

  const { data: info } = useQuery({
    queryKey: ['tv', 'season', id, seasonNumber, mode],
    queryFn: () => getDetailByTVSeason(id.toString(), seasonNumber, mode),
    enabled: !!id && seasonNumber > -1,
  });

  // useEffect(() => {
  //   setInfo(getSeasonInfo(searchParams) as Season);
  // }, [searchParams]);

  return (
    <Dimmer>
      <div className={styles.modal}>
        {info && (
          <>
            <h4>{info.name}</h4>
            <div>
              <div>
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}w500${info.posterPath}`}
                  width={180}
                  height={280}
                  alt={info.name}
                />
              </div>
              <div>
                <p>
                  - 방영 시작일 : <strong>{info.airDate}</strong>
                </p>
                <p>
                  - 총 에피소드 수 : <strong>{info.episodes.length}</strong>
                </p>
                {info.episodes.length < 11 &&
                  camelize(info.episodes).map((item: Episode) => (
                    <p>
                      <strong>{item.name}</strong>&nbsp;&nbsp;
                      {item.airDate}
                    </p>
                  ))}
              </div>
            </div>
            <p>{info.overview}</p>
          </>
        )}
      </div>
    </Dimmer>
  );
};

export default SeasonModal;
