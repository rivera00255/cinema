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
  content,
  star,
  userId,
}: {
  mediaId: string;
  content: string;
  star: number;
  userId: string;
}) => {
  const { error } = await supabase.from('comment').insert({ mediaId, content, star, userId });
  if (error) console.log(error);
};

export const updateComment = async ({
  id,
  content,
  star,
  userId,
  updatedAt,
}: {
  id: string;
  content: string;
  star: number;
  userId: string;
  updatedAt: Date;
}) => {
  const { error } = await supabase
    .from('comment')
    .update({ content, star, updatedAt })
    .eq('userId', userId)
    .eq('id', id);
};

export const deleteComment = async ({ id, userId }: { id: string; userId: string }) => {
  const { error } = await supabase.from('comment').delete().eq('userId', userId).eq('id', id);
};
