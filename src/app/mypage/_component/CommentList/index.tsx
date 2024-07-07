'use client';
import { useContext } from 'react';
import styles from './comment.module.scss';
import { AuthContext } from '@/utilities/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { getCommentByUserId } from '@/app/_service/comment';
import Comment from '@/app/[type]/[id]/_component/Comment';
import Link from 'next/link';
import { CommentKeys } from '@/app/_service/keys';

const CommentList = () => {
  const session = useContext(AuthContext);
  const userId = session?.user.id ?? '';

  const { data } = useQuery({
    queryKey: CommentKeys.filteredList({ userId }),
    queryFn: () => getCommentByUserId(userId),
    enabled: !!userId,
  });
  // console.log(data);

  return (
    <div className={styles.container}>
      {data?.map((item) => (
        <Link href={`../${item.mediaType}/${item.mediaId}`} key={item.id}>
          <Comment data={item} />
        </Link>
      ))}
    </div>
  );
};

export default CommentList;
