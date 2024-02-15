'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import styles from './photos.module.scss';
import Link from 'next/link';

const PhotoCarousel = ({ item }: { item: { [key: string]: any }[] }) => {
  return (
    <div className={styles.carousel}>
      <Swiper spaceBetween={8} slidesPerView={3} navigation={true} modules={[Navigation]}>
        {item.map((data) => (
          <SwiperSlide key={data.filePath} style={{ position: 'relative' }}>
            <div className={styles.backdrop}>
              <Link href={`${process.env.NEXT_PUBLIC_IMG_URL}/w500${data.filePath}`}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}/w500${data.filePath}`}
                  // fill={true}
                  // sizes="(max-width: 768px) 50vw, 33vw"
                  width={324}
                  height={200}
                  style={{ width: '324px', height: '200px' }}
                  alt={data.filePath}
                />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PhotoCarousel;
