'use client';
import { SyntheticEvent, useContext, useRef, useState } from 'react';
import styles from './review.module.scss';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/utilities/AuthProvider';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addComment, deleteComment, getCommentByMediaIdAndUserId, updateComment } from '@/app/_service/comment';
import CommentForm from '../CommentForm';
import Comment from '../Comment';
import { useTranslation } from 'react-i18next';

export const maskingEmail = (email: string) => {
  const id = `${email.split('@')[0].slice(0, 2)}***${email.split('@')[0].slice(-1)}`;
  const mail = email.split('@')[1];
  return `${id}@${mail}`;
};

const Review = ({ id, type }: { id: string; type: string }) => {
  const [star, setStar] = useState(0);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [isEdit, setIsEdit] = useState(false);

  const router = useRouter();

  const { t } = useTranslation();

  const session = useContext(AuthContext);
  const userId = session?.user.id;
  const metadata = session && {
    email: session.user.email as string,
    nickname: session.user.user_metadata.nickname as string,
  };

  const queryClient = useQueryClient();

  const { data: prevComment } = useQuery({
    queryKey: ['comment', id, userId],
    queryFn: () => getCommentByMediaIdAndUserId(id, userId ?? ''),
    enabled: !!userId,
  });
  // prevComment && console.log(prevComment[0]);

  const { mutate: writeComment } = useMutation({
    mutationFn: addComment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comment', id] }),
  });

  const { mutate: editComment } = useMutation({
    mutationFn: updateComment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comment', id] }),
  });

  const { mutate: delComment } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comment', id] }),
  });

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const content = textRef.current?.value;
    if (metadata && userId && content && content.length > 0) {
      if (isEdit) {
        editComment({ content, mediaId: id, star, userId, updatedAt: new Date() });
        setIsEdit(false);
      } else {
        writeComment({ content, userId, mediaId: id, star, mediaType: type, author: metadata });
      }
    }
  };

  return (
    <div>
      {session &&
        (!prevComment || prevComment.length < 1 ? (
          <>
            <div className={styles.author}>
              <p>{maskingEmail(session.user.email ?? '')}</p>
              <p>{new Date().toLocaleDateString()}</p>
            </div>
            <CommentForm star={star} setStar={setStar} onSubmit={onSubmit} textRef={textRef} />
          </>
        ) : (
          <>
            <div className={!isEdit ? styles.comment : styles.editActive}>
              {!isEdit ? (
                <Comment data={prevComment[0]} />
              ) : (
                <CommentForm
                  star={star}
                  setStar={setStar}
                  onSubmit={onSubmit}
                  textRef={textRef}
                  prevComment={prevComment[0]}
                />
              )}
              <div className={styles.edit}>
                {!isEdit ? (
                  <>
                    <button onClick={() => setIsEdit(true)}>{t('edit')}</button>
                    <button
                      onClick={() => {
                        if (userId && confirm('정말 삭제할까요?')) delComment({ userId, mediaId: id });
                      }}>
                      {t('delete')}
                    </button>
                  </>
                ) : (
                  <button onClick={() => setIsEdit(false)}>취소</button>
                )}
              </div>
            </div>
          </>
        ))}
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

export default Review;
