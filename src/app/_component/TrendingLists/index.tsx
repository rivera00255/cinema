'use client';
import { getTrendingLists } from '@/app/_service';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useContext, useEffect, useRef, useState } from 'react';
import { TabContext } from '../TabProvider';
import { Movies, TVSeries } from '@/app/type';
import { camelize } from '@/utilities/snakeToCamel';
import styles from './trending.module.scss';
import Link from 'next/link';
import { useLanguageStore } from '@/store/language';
import MediaPreview from '../MediaPreview';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

const TrendingLists = () => {
  const [isShow, setIsShow] = useState(false);

  const { tab } = useContext(TabContext);

  const { mode } = useLanguageStore();

  const targetRef = useRef<HTMLDivElement>(null);
  const intersecting = useIntersectionObserver(targetRef);

  const scrolllToTop = () => {
    if (typeof window !== 'undefined') {
      scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const showScrollTopButton = () => {
    if (typeof window !== 'undefined') {
      window.scrollY > window.innerHeight ? setIsShow(true) : setIsShow(false);
    }
  };

  const { data, fetchNextPage, isFetching, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['trending', tab, mode],
    queryFn: ({ pageParam = 1 }) => getTrendingLists(tab, 'week', pageParam, mode),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.page + 1,
  });
  // console.log(isFetching);
  // console.log(isFetchingNextPage);

  useEffect(() => {
    if (intersecting) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [intersecting, hasNextPage, fetchNextPage, isFetching]);

  useEffect(() => {
    const timer = setTimeout(() => window.addEventListener('scroll', showScrollTopButton), 500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', showScrollTopButton);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div>
        {data?.pages?.map((page) =>
          camelize(page.results).map((item: Movies | TVSeries) => (
            <Link href={`/${item.mediaType}/${item.id}`} key={item.id}>
              <MediaPreview item={item} />
            </Link>
          ))
        )}
      </div>
      <div ref={targetRef} />
      {isShow && (
        <button className={styles.scrollTop} onClick={scrolllToTop}>
          <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17 15L12 10L7 15"
              stroke="#404040"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default TrendingLists;
