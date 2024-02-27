'use client';
import Dimmer from '@/app/_component/Dimmer';
import styles from './comment.module.scss';

const CommentModal = () => {
  return (
    <Dimmer>
      <div className={styles.modal}>
        <h3>Comment</h3>
      </div>
    </Dimmer>
  );
};

export default CommentModal;
