import { Movies, Person, TVSeries } from '@/app/type';
import styles from './result.module.scss';
import Image from 'next/image';
import PlaceHolderImg from '../../../../assets/image/placeholder.jpg';
import Link from 'next/link';

const SearchResult = ({ data }: { data: Movies | TVSeries | Person }) => {
  const getImageUrl = (data: Movies | TVSeries | Person) => {
    const baseImageUrl = `${process.env.NEXT_PUBLIC_IMG_URL}/w500`;
    if (data.mediaType === 'person') return `${baseImageUrl}${data.profilePath}`;
    return `${baseImageUrl}${data.posterPath}`;
  };

  const handlePath = (data: Movies | TVSeries | Person) => {
    if (data.mediaType === 'person') {
      const searchParams = new URLSearchParams();
      searchParams.set('q', encodeURIComponent(JSON.stringify(data)));
      return `../${data.mediaType}/${data.id}?${searchParams}`;
    }
    return `../${data.mediaType}/${data.id}`;
  };

  return (
    <div className={styles.container}>
      <Link href={handlePath(data)}>
        <div className={styles.image}>
          {(data as Movies | TVSeries).posterPath || (data as Person).profilePath ? (
            <Image src={getImageUrl(data)} width={160} height={240} alt={data.id} />
          ) : (
            <Image src={PlaceHolderImg} width={160} height={240} alt="no image" />
          )}
        </div>
        <div className={styles.desc}>
          {data.mediaType === 'movie' && <p>{(data as Movies).title}</p>}
          {data.mediaType === 'tv' && <p>{(data as TVSeries).name}</p>}
          {data.mediaType === 'person' && <p>{(data as Person).name}</p>}
        </div>
      </Link>
    </div>
  );
};

export default SearchResult;
