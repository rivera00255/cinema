'use client';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import styles from './season.module.scss';
import { useEffect, useState } from 'react';
import { Season } from '@/app/type';
import Image from 'next/image';
import Dimmer from '@/app/_component/Dimmer';

const SeasonModal = () => {
  const searchParams = useSearchParams();
  const [info, setInfo] = useState<Season | undefined>(undefined);
  // console.log(info);

  const getSeasonInfo = (searchParams: ReadonlyURLSearchParams) => {
    const params = new URLSearchParams(searchParams.toString());
    const entries = params.entries();
    const result: { [key: string]: string | number } | Season = {};
    for (const [key, value] of params.entries()) {
      result[key] = value;
    }
    return result;
  };

  useEffect(() => {
    setInfo(getSeasonInfo(searchParams) as Season);
  }, [searchParams]);

  return (
    <Dimmer>
      <div className={styles.modal}>
        {info && (
          <>
            <h4>{info.name}</h4>
            <Image
              src={`${process.env.NEXT_PUBLIC_IMG_URL}w500${info.posterPath}`}
              width={100}
              height={100}
              alt={info.name}
            />
            <p>
              - 방영 시작일 : <strong>{info.airDate}</strong>
            </p>
            <p>
              - 총 에피소드 수 : <strong>{info.episodeCount}</strong>
            </p>
            <p>{info.overview}</p>
          </>
        )}
      </div>
    </Dimmer>
  );
};

export default SeasonModal;
