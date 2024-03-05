import { supabase } from '@/lib/supabaseClient';

export const getComment = async () => {
  const { data, error } = await supabase.from('comment').select();
  return data;
};

export const getCommentByMediaId = async (mediaId: string) => {
  const { data } = await supabase.from('comment').select().eq('mediaId', mediaId);
  return data;
};

export const getCommentByUserId = async (userId: string) => {
  const { data } = await supabase.from('comment').select().eq('userId', userId);
  return data;
};

export const getCommentByMediaIdAndUserId = async (mediaId: string, userId: string) => {
  const { data } = await supabase.from('comment').select().eq('userId', userId).eq('mediaId', mediaId);
  return data;
};

export const addComment = async ({
  mediaId,
  mediaType,
  content,
  star,
  userId,
  author,
}: {
  mediaId: string;
  mediaType: string;
  content: string;
  star: number;
  userId: string;
  author: {
    email: string;
    nickname: string;
  };
}) => {
  const { error } = await supabase.from('comment').insert({ mediaId, content, star, userId, mediaType, author });
  if (error) console.log(error);
};

export const updateComment = async ({
  mediaId,
  content,
  star,
  userId,
  updatedAt,
}: {
  mediaId: string;
  content: string;
  star: number;
  userId: string;
  updatedAt: Date;
}) => {
  const { error } = await supabase
    .from('comment')
    .update({ content, star, updatedAt })
    .eq('userId', userId)
    .eq('mediaId', mediaId);
};

export const deleteComment = async ({ userId, mediaId }: { userId: string; mediaId: string }) => {
  const { error } = await supabase.from('comment').delete().eq('userId', userId).eq('mediaId', mediaId);
};
