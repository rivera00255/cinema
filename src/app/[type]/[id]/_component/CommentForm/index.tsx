'use client';
import { Fragment, SyntheticEvent, useRef, useState } from 'react';
import styles from './comment.module.scss';
import { useRouter } from 'next/navigation';

const CommentForm = ({ id }: { id: string }) => {
  const [star, setStar] = useState(0);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(star);
  };

  return (
    <div>
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
          <textarea maxLength={140} ref={textRef} />
        </div>
        <button>
          <p>코멘트</p>
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
      <div className={styles.buttonWrapper}>
        <button className={styles.commentButton} onClick={() => router.push(`./${id}/comment`)}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg
              height="22px"
              width="22px"
              version="1.1"
              id="_x32_"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              fill="#262626">
              <g>
                <path
                  className="st0"
                  d="M92.574,294.24V124.336H43.277C19.449,124.336,0,144.213,0,168.467v206.44
              c0,24.254,19.449,44.133,43.277,44.133h62v45.469c0,3.041,1.824,5.777,4.559,6.932c2.736,1.154,5.957,0.486,8.023-1.641
              l49.844-50.76h106.494c23.828,0,43.279-19.879,43.279-44.133v-0.061H172.262C128.314,374.846,92.574,338.676,92.574,294.24z"
                />
                <path
                  className="st0"
                  d="M462.717,40H172.26c-27.105,0-49.283,22.59-49.283,50.197v204.037c0,27.61,22.178,50.199,49.283,50.199
                h164.668l75.348,76.033c2.399,2.442,6.004,3.172,9.135,1.852c3.133-1.322,5.176-4.434,5.176-7.887v-69.998h36.131
                c27.106,0,49.283-22.59,49.283-50.199V90.197C512,62.59,489.822,40,462.717,40z M369.156,280.115H195.92v-24.316h173.236V280.115z
                M439.058,204.129H195.92v-24.314h243.138V204.129z M439.058,128.143H195.92v-24.315h243.138V128.143z"
                />
              </g>
            </svg>
          </div>
          <p>코멘트 보기</p>
        </button>
      </div>
    </div>
  );
};

export default CommentForm;
