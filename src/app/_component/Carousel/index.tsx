'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import styles from './carousel.module.scss';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const Carousel = ({ item }: { item: { [key: string]: any }[] }) => {
  const params = useParams();

  return (
    <div className={styles.carousel}>
      <Swiper
        spaceBetween={10}
        slidesPerView={5}
        navigation={true}
        // pagination={{ clickable: true }}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
        modules={[Navigation, Pagination]}>
        {item.map((data) => (
          <SwiperSlide key={data.id}>
            <div className={styles.item}>
              <Link href={`${params.type}/${data.id}`}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}/w500${data.posterPath}`}
                  fill={true}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  alt={data.id}
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
