import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import styles from './page.module.scss';
import { getTrendingLists } from './_service';
import TabProvider from './_component/TabProvider';
import Tab from './_component/Tab';
import TrendingLists from './_component/TrendingLists';
import { Suspense } from 'react';

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['trending', 'movie'],
    queryFn: ({ pageParam }) => getTrendingLists('movie', 'week', pageParam),
    initialPageParam: 1,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={styles.container}>
      <div className={styles.list}>
        <h2>Trending</h2>
        <h3>이번주 인기 급상승</h3>
        <TabProvider>
          <HydrationBoundary state={dehydratedState}>
            <Tab />
            <Suspense fallback={<div>loading...</div>}>
              <TrendingLists />
            </Suspense>
          </HydrationBoundary>
        </TabProvider>
      </div>
    </main>
  );
}
