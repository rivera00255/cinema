'use client';
import { TVDetail } from '@/app/type';
import styles from './tv.module.scss';
import Image from 'next/image';
import { cameliseSnakeArr } from '@/utilities/snakeToCamel';
import Link from 'next/link';
import { useState } from 'react';
import PlaceholderImg from '../../../../../assets/image/placeholder.jpg';

const TvDetails = ({ data }: { data: TVDetail }) => {
  const [limit, setLimit] = useState(6);

  return (
    <div className={styles.detail}>
      <h3>시즌별 정보</h3>
      <div className={styles.seasons}>
        {cameliseSnakeArr(data.seasons.slice(0, limit)).map((item) => (
          <Link key={item.id} href={{ pathname: `./${data.id}/season`, query: item }}>
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
  );
};

export default TvDetails;
