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

export const getTrendingLists = async (type: string, time: string) => {
  const response = await fetch(`${baseUrl}trending/${type}/${time}?language=${language}&page=1`, optios);
  if (!response.ok) throw new Error('Failed to fetch Trending Lists.');
  return response.json();
};

export const getDetailById = async (type: string, id: string) => {
  const response = await fetch(`${baseUrl}${type}/${id}?language=${language}`, optios);
  if (!response.ok) throw new Error(`Failed to fetch ${type} - ${id} Detail.`);
  return response.json();
};

export const getCredits = async (type: string, id: string) => {
  const response = await fetch(`${baseUrl}${type}/${id}/credits?language=${language}`, optios);
  if (!response.ok) throw new Error(`Failed to fetch ${type} - ${id} Credidts.`);
  return response.json();
};

export const getVideos = async (type: string, id: string) => {
  const response = await fetch(`${baseUrl}${type}/${id}/videos?language=${language}`, optios);
  if (!response.ok) throw new Error(`Failed to fetch ${type} - ${id} Videos.`);
  return response.json();
};

export const getNowPlayingMovie = async () => {
  const response = await fetch(`${baseUrl}movie/now_playing?language=${language}&page=1&region=${region}`, optios);
  if (!response.ok) throw new Error(`Failed to fetch Now Playing.`);
  return response.json();
};

export const getPopularLists = async (type: string) => {
  const response = await fetch(`${baseUrl}${type}/popular?language=${language}&page=1&region=${region}`, optios);
  if (!response.ok) throw new Error('Failed to fetch Popular Lists.');
  return response.json();
};

export const getTopRatedLists = async (type: string) => {
  const response = await fetch(`${baseUrl}${type}/top_rated?language=${language}&page=1&region=${region}`, optios);
  if (!response.ok) throw new Error('Failed to fetch Top Rated Lists.');
  return response.json();
};
