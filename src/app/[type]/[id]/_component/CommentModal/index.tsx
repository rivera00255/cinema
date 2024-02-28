'use client';
import Dimmer from '@/app/_component/Dimmer';
import styles from './comment.module.scss';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getCommentByMediaId } from '@/app/_service/comment';
import Comment from '../Comment';
import { Comments } from '@/app/type';

const CommentModal = () => {
  const { id } = useParams();

  const { data } = useQuery({ queryKey: ['comment', id], queryFn: () => getCommentByMediaId(id.toString()) });

  return (
    <Dimmer>
      <div className={styles.modal}>
        <h3>Comment</h3>
        <div className={styles.list}>{data?.map((item: Comments) => <Comment data={item} key={item.id} />)}</div>
      </div>
    </Dimmer>
  );
};

export default CommentModal;
