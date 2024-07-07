import { Lang, MediaType } from '../type';

export type DetailInfo = 'credits' | 'videos' | 'images';

export const MediaKeys = {
  all: ['media'] as const,
  lists: () => [...MediaKeys.all, 'list'] as const,
  list: (type: MediaType, filter: object, page?: number, lang?: Lang) =>
    [...MediaKeys.lists(), type, { ...filter }, page, lang] as const,
  item: (type: MediaType, id: string) => [...MediaKeys.all, 'detail', type, id] as const,
  detail: (type: MediaType, id: string, lang?: Lang) => [...MediaKeys.item(type, id), lang] as const,
  detailInfo: (type: MediaType, id: string, detailInfoType: DetailInfo, lang?: Lang) =>
    [...MediaKeys.item(type, id), detailInfoType, lang] as const,
  tvDetail: (id: string, filter: object, lang?: Lang) => [...MediaKeys.item('tv', id), { filter }, lang] as const,
  MovieDetail: (id: string, filter: object, lang?: Lang) => [...MediaKeys.item('movie', id), { filter }, lang] as const,
  search: (word: string, lang?: Lang) => [...MediaKeys.all, 'search', word, lang] as const,
};

export const CommentKeys = {
  all: ['comment'] as const,
  lists: () => [...CommentKeys.all, 'list'] as const,
  list: (mediaId: string) => [...CommentKeys.lists(), mediaId] as const,
  filteredList: (filter: object) => [...CommentKeys.lists(), { ...filter }] as const,
  detail: (mediaId: string, userId?: string) => [...CommentKeys.all, 'detail', mediaId, userId] as const,
};
