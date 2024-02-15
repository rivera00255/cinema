'use client';
import { getCredits } from '@/app/_service';
import { useQuery } from '@tanstack/react-query';
import styles from './cast.module.scss';
import CastProfile from '../CastProfile';
import { Cast } from '@/app/type';
import { snakeToCamel } from '@/utilities/snakeToCamel';
import { useRouter } from 'next/navigation';

const Cast = ({ type, id }: { type: 'movie' | 'tv'; id: string }) => {
  const router = useRouter();

  const { data: credits } = useQuery({
    queryKey: [type, 'credits', id],
    queryFn: () => getCredits(type, id),
  });

  return (
    <div className={styles.cast}>
      {credits?.cast?.slice(0, 6).map((item: Cast) => <CastProfile item={snakeToCamel(item)} key={item.id} />)}
      {credits?.cast?.length > 6 && (
        <button className={styles.more} onClick={() => router.push(`/${type}/${id}/cast`)}>
          전체 보기
        </button>
      )}
    </div>
  );
};

export default Cast;
