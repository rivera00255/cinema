'use client';
import { MovieDetail, Video } from '@/app/type';
import styles from './movie.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getVideos } from '@/app/_service';
import { camelize } from '@/utilities/snakeToCamel';

const MovieDetails = ({ data }: { data: MovieDetail }) => {
  const { data: videos } = useQuery({
    queryKey: ['movie', 'videos', data.id],
    queryFn: () => getVideos('movie', data.id),
    enabled: !!data.id,
  });

  return (
    <>
      {videos?.results?.length > 0 && (
        <>
          <h3>예고편</h3>
          <div className={styles.videos}>
            {camelize(videos?.results).map(
              (item: Video) =>
                item.type === 'Trailer' && (
                  <iframe src={`https://www.youtube.com/embed/${item.key}`} key={item.id} style={{ margin: '0 8px' }} />
                )
            )}
          </div>
        </>
      )}
    </>
  );
};

export default MovieDetails;
