import { Cast } from '@/app/type';
import Image from 'next/image';
import styles from './profile.module.scss';
import PlaceholderImg from '../../../../../assets/image/placeholder_portrait.png';

const CastProfile = ({ item }: { item: Cast }) => {
  return (
    <div className={styles.container}>
      <div>
        {item.profilePath ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_IMG_URL}w500${item.profilePath}`}
            fill={true}
            sizes="(max-width: 768px) 100vw, 33vw"
            alt={item.name}
          />
        ) : (
          <Image src={PlaceholderImg} alt={item.name} />
        )}
      </div>
      <p>
        <strong>{item.character}</strong>
      </p>
      <p>{item.name}</p>
    </div>
  );
};

export default CastProfile;
