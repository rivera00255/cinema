'use client';
import { getImages } from '@/app/_service';
import { useQuery } from '@tanstack/react-query';
import PhotoCarousel from '../PhotoCarousel';
import { cameliseSnakeArr } from '@/utilities/snakeToCamel';

const Photos = ({ type, id }: { type: 'movie' | 'tv'; id: string }) => {
  const { data: images } = useQuery({
    queryKey: [type, 'images', id],
    queryFn: () => getImages(type, id),
  });

  return (
    <div>
      {images?.backdrops && images?.backdrops.length > 0 && <PhotoCarousel item={cameliseSnakeArr(images.backdrops)} />}
    </div>
  );
};

export default Photos;
