'use client';
import Dimmer from '@/app/_component/Dimmer';
import styles from './comment.module.scss';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getCommentByMediaId } from '@/app/_service/comment';
import Comment from '../Comment';
import { Comments } from '@/app/type';
import { CommentKeys } from '@/app/_service/keys';

const CommentModal = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: CommentKeys.list(id.toString()),
    queryFn: () => getCommentByMediaId(id.toString()),
  });

  return (
    <Dimmer>
      <div className={styles.modal}>
        <h3>Comment</h3>
        <div className={styles.list}>
          {data && data.length < 1 ? (
            <div>
              <p style={{ color: '#a1a1aa' }}>아직 작성된 코멘트가 없습니다.</p>
            </div>
          ) : (
            data?.map((item: Comments) => <Comment data={item} key={item.id} />)
          )}
        </div>
      </div>
    </Dimmer>
  );
};

export default CommentModal;
