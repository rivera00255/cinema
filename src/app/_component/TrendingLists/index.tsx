'use client';
import { getTrendingLists } from '@/app/_service';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useContext, useEffect, useRef } from 'react';
import { TabContext } from '../TabProvider';

import { Movies, TVSeries } from '@/app/type';
import { camelize } from '@/utilities/snakeToCamel';
import styles from './trending.module.scss';
import Link from 'next/link';
import { useLanguageStore } from '@/store/language';
import MediaPreview from '../MediaPreview';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

const TrendingLists = () => {
  const { tab } = useContext(TabContext);

  const { mode } = useLanguageStore();

  const targetRef = useRef<HTMLDivElement>(null);

  const intersecting = useIntersectionObserver(targetRef);

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
    </div>
  );
};

export default TrendingLists;
