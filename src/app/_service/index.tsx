import { snakeToCamel } from '@/utilities/snakeToCamel';
import { Lang } from '../type';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const optios = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
};
const language = 'ko';
const region = 'KR';

export const getTrendingLists = async (type: string, time: string, page: number, lang?: Lang) => {
  if (!lang) lang = language;
  const response = await fetch(`${baseUrl}trending/${type}/${time}?language=${lang}&page=${page}`, optios);
  if (!response.ok) throw new Error('Failed to fetch Trending Lists.');
  return response.json();
};

export const getDetailById = async (type: string, id: string, lang?: Lang) => {
  if (!lang) lang = language;
  const response = await fetch(`${baseUrl}${type}/${id}?language=${lang}`, optios);
  if (!response.ok) throw new Error(`Failed to fetch ${type} - ${id} Detail.`);
  return snakeToCamel(await response.json());
};

export const getCredits = async (type: string, id: string, lang?: Lang) => {
  if (!lang) lang = language;
  const response = await fetch(`${baseUrl}${type}/${id}/credits?language=${lang}`, optios);
  if (!response.ok) throw new Error(`Failed to fetch ${type} - ${id} Credidts.`);
  return response.json();
};

export const getVideos = async (type: string, id: string, lang?: Lang) => {
  if (!lang) lang = language;
  const response = await fetch(`${baseUrl}${type}/${id}/videos?language=${lang}`, optios);
  if (!response.ok) throw new Error(`Failed to fetch ${type} - ${id} Videos.`);
  return response.json();
};

export const getImages = async (type: string, id: string) => {
  const response = await fetch(`${baseUrl}${type}/${id}/images`, optios);
  if (!response.ok) throw new Error(`Failed to fetch ${type} - ${id} Images.`);
  return response.json();
};

export const getDetailByTVSeason = async (seriesId: string, seasonNumber: number, lang?: Lang) => {
  if (!lang) lang = language;
  const response = await fetch(`${baseUrl}tv/${seriesId}/season/${seasonNumber}?language=${lang}`, optios);
  if (!response.ok) throw new Error(`Failed to fetch ${seriesId} - ${seasonNumber} Details.`);
  return snakeToCamel(await response.json());
};

export const getNowPlayingMovie = async (lang?: Lang) => {
  if (!lang) lang = language;
  const response = await fetch(`${baseUrl}movie/now_playing?language=${lang}&page=1&region=${region}`, optios);
  if (!response.ok) throw new Error(`Failed to fetch Now Playing.`);
  return response.json();
};

export const getPopularLists = async (type: string, lang?: Lang) => {
  if (!lang) lang = language;
  const response = await fetch(`${baseUrl}${type}/popular?language=${lang}&page=1&region=${region}`, optios);
  if (!response.ok) throw new Error('Failed to fetch Popular Lists.');
  return response.json();
};

export const getTopRatedLists = async (type: string, lang?: Lang) => {
  if (!lang) lang = language;
  const response = await fetch(`${baseUrl}${type}/top_rated?language=${lang}&page=1&region=${region}`, optios);
  if (!response.ok) throw new Error('Failed to fetch Top Rated Lists.');
  return response.json();
};
