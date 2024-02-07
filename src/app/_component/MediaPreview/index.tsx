import { Movies, TVSeries } from '@/app/type';
import styles from './preview.module.scss';
import Image from 'next/image';

const MediaPreview = ({ item }: { item: Movies | TVSeries }) => {
  const imageUrl = process.env.NEXT_PUBLIC_IMG_URL;

  return (
    <div className={styles.preview}>
      <div className={styles.background}>
        <Image
          src={`${imageUrl}/w500${item.posterPath}`}
          fill={true}
          sizes="(max-width: 768px) 50vw, 33vw"
          alt={item.id}
          priority
        />
        <div className={styles.image}>
          <Image src={`${imageUrl}/w500${item.posterPath}`} width={210} height={100} alt={item.id} />
        </div>
      </div>
      <div className={styles.info}>
        {item.mediaType === 'movie' && (
          <>
            <p>
              <strong>{(item as Movies).title.split('-')[0]}</strong>
            </p>
            <p>{(item as Movies).releaseDate}</p>
          </>
        )}
        {item.mediaType === 'tv' && (
          <>
            <p>
              <strong>{(item as TVSeries).name.split('-')[0]}</strong>
            </p>
            <p>{(item as TVSeries).firstAirDate}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default MediaPreview;
