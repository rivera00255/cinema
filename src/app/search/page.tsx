'use client';
import { useSearchParams } from 'next/navigation';
import SearchForm from '../_component/SearchForm';
import styles from './search.module.scss';
import { useInfiniteQuery } from '@tanstack/react-query';
import { searchMulti } from '../_service';
import { useEffect, useRef, useState } from 'react';
import { Movies, Person, TVSeries } from '../type';
import SearchResult from './_component/SearchResults';
import { camelize } from '@/utilities/snakeToCamel';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useLanguageStore } from '@/store/language';
import { MediaKeys } from '../_service/keys';

const Search = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  const { mode } = useLanguageStore();

  const [queryString, setQueryString] = useState('');

  const targetRef = useRef<HTMLDivElement>(null);

  const intersecting = useIntersectionObserver(targetRef);

  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: MediaKeys.search(queryString, mode),
    // queryKey: ['search', queryString, mode],
    queryFn: ({ pageParam = 1 }) => searchMulti(queryString, pageParam, mode),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.page + 1,
  });
  // console.log(data);

  useEffect(() => {
    if (query) setQueryString(decodeURIComponent(query));
  }, [query]);

  useEffect(() => {
    if (intersecting) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [intersecting, hasNextPage, fetchNextPage, isFetching]);

  return (
    <main className={styles.container}>
      <div>
        <h2>검 색</h2>
        <SearchForm query={queryString} />
      </div>
      <div className={styles.list}>
        {data?.pages?.map((page) =>
          camelize(page.results).map((item: Movies | TVSeries | Person) => <SearchResult data={item} key={item.id} />)
        )}
      </div>
      <div ref={targetRef} />
    </main>
  );
};

export default Search;
