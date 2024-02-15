'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import styles from './carousel.module.scss';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const Carousel = ({ item }: { item: { [key: string]: any }[] }) => {
  const params = useParams();

  return (
    <div className={styles.carousel}>
      <Swiper spaceBetween={10} slidesPerView={5} navigation={true} modules={[Navigation]}>
        {item.map((data) => (
          <SwiperSlide key={data.id}>
            <div className={styles.poster}>
              <Link href={`${params.type}/${data.id}`}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}/w500${data.posterPath}`}
                  // fill={true}
                  // sizes="(max-width: 768px) 50vw, 33vw"
                  width={160}
                  height={240}
                  alt={data.id}
                  style={{ width: '160xp', height: '240px' }}
                  priority
                />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
