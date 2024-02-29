import { Comments } from '@/app/type';
import styles from './comment.module.scss';

const Comment = ({ data }: { data: Comments }) => {
  return (
    <div className={styles.container}>
      <div className={styles.rating}>
        {Array(data.star)
          .fill(0)
          .map((_, i) => (
            <svg
              height="14px"
              width="14px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 53.867 53.867"
              xmlSpace="preserve"
              fill="#EFCE4A"
              key={i}>
              <polygon
                points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 
	          10.288,52.549 13.467,34.013 0,20.887 18.611,18.182 "
              />
            </svg>
          ))}
      </div>
      <hr />
      <div className={styles.text}>
        <p>{data.content}</p>
      </div>
      <p className={styles.date}>{new Date(data.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default Comment;
