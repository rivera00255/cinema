import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import styles from './page.module.scss';
import { getTrendingLists } from './_service';
import Tab from './_component/main/Tab';
import TabProvider from './_component/main/TabProvider';
import TrendingLists from './_component/main/TrendingLists';
import { Suspense } from 'react';

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['trending', 'movie'],
    queryFn: () => getTrendingLists('movie', 'week'),
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
