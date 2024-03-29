'use client';
import { Dispatch, Fragment, RefObject, SetStateAction, SyntheticEvent } from 'react';
import styles from './form.module.scss';
import { Comments } from '@/app/type';
import { useTranslation } from 'react-i18next';

const CommentForm = ({
  star,
  setStar,
  textRef,
  onSubmit,
  prevComment,
}: {
  star: number;
  setStar: Dispatch<SetStateAction<number>>;
  textRef: RefObject<HTMLTextAreaElement>;
  onSubmit: (e: SyntheticEvent) => void;
  prevComment?: Comments;
}) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.rating}>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Fragment key={i}>
              <input
                type="radio"
                name={(5 - i).toString()}
                id={(5 - i).toString()}
                checked={5 - star === Number(i)}
                onChange={(e) => setStar(Number(e.target.name))}
              />
              <label htmlFor={(5 - i).toString()}></label>
            </Fragment>
          ))}
      </div>
      <div className={styles.text}>
        <textarea maxLength={140} defaultValue={prevComment?.content || ''} ref={textRef} />
      </div>
      <button>
        <p>{!prevComment ? `${t('comment')}` : `${t('edit')}`}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="21px" height="21px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z"
              fill="#262626"
            />
          </svg>
        </div>
      </button>
    </form>
  );
};

export default CommentForm;
