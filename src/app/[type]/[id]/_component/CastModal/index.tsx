'use client';
import Dimmer from '@/app/_component/Dimmer';
import styles from './cast.module.scss';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getCredits } from '@/app/_service';
import { Cast } from '@/app/type';
import CastProfile from '../CastProfile';
import { snakeToCamel } from '@/utilities/snakeToCamel';

const CastModal = () => {
  const { type, id } = useParams();

  const { data: credits } = useQuery({
    queryKey: [type, 'credits', Number(id)],
    queryFn: () => getCredits(type.toString(), id.toString()),
  });

  return (
    <Dimmer>
      <div className={styles.modal}>
        <h3>Cast</h3>
        <div>{credits?.cast?.map((item: Cast) => <CastProfile item={snakeToCamel(item)} key={item.id} />)}</div>
      </div>
    </Dimmer>
  );
};

export default CastModal;
