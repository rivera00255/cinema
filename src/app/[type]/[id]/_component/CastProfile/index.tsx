import { Cast } from '@/app/type';
import Image from 'next/image';
import styles from './profile.module.scss';

const CastProfile = ({ item }: { item: Cast }) => {
  return (
    <div className={styles.container}>
      <div>
        <Image
          src={`${process.env.NEXT_PUBLIC_IMG_URL}w500${item.profilePath}`}
          fill={true}
          sizes="(max-width: 768px) 100vw, 33vw"
          alt={item.name}
        />
      </div>
      <p>
        <strong>{item.character}</strong>
      </p>
      <p>{item.name}</p>
    </div>
  );
};

export default CastProfile;
