'use client';
import { getImages } from '@/app/_service';
import { useQuery } from '@tanstack/react-query';
import PhotoCarousel from '../PhotoCarousel';
import { camelize } from '@/utilities/snakeToCamel';
import Image from 'next/image';
import { MediaType } from '@/app/type';

const Photos = ({ type, id }: { type: MediaType; id: string }) => {
  const { data: images } = useQuery({
    queryKey: [type, 'images', id],
    queryFn: () => getImages(type, id),
  });

  return (
    <div>
      {images &&
        images.backdrops &&
        (images.backdrops.length > 3 ? (
          <PhotoCarousel item={camelize(images.backdrops)} />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {camelize(images.backdrops).map((item) => (
              <Image
                src={`${process.env.NEXT_PUBLIC_IMG_URL}/w500${item.filePath}`}
                width={324}
                height={200}
                alt={item.filePath}
                key={item.filePath}
                style={{ marginRight: '16px' }}
              />
            ))}
          </div>
        ))}
    </div>
  );
};

export default Photos;
