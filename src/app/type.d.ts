export type Response = {
  page: number;
  results: Movies[] | TVSeries[];
  totalPages: number;
  totalResults: number;
};

export type Lang = 'ko' | 'en-US';

export type MediaType = 'movie' | 'tv';

type MediaDefault = {
  adult: boolean;
  backdropPath: string;
  id: string;
  originalLanguage: string;
  overview: string;
  popularity: number;
  posterPath: string;
  voteAverage: number;
  voteCount: number;
};

type Media = MediaDefault & {
  genreIds: number[];
  mediaType: MediaType;
};

export type Movies = Media & {
  title: string;
  originalTitle: string;
  releaseDate: string;
  video: boolean;
};

export type TVSeries = Media & {
  name: string;
  originalName: string;
  firstAirDate: string;
  originCountry: string[];
};

export type MovieDetail = Movies & {
  budget: string;
  genres: { id: number; name: string }[];
  revenue: string;
  runtime: number;
  status: string;
  tagline: string;
  homepage: string;
  productionCompanies: { [key: string]: any }[];
  productioonContries: { [key: string]: any }[];
  spokenLangrages: { [key: string]: any }[];
};

export type TVDetail = TVSeries & {
  createdBy: { [key: string]: any }[];
  episodeRunTime: number[];
  genres: { id: number; name: string }[];
  homepage: string;
  inProductuon: boolean;
  languages: string[];
  lastAirDate: string;
  lastEpisodeToAir: { [key: string]: any };
  nextEipsodeToAir: { [key: string]: any }[];
  networks: { [key: string]: any }[];
  numberOfEpisode: number;
  numberOfSeasons: number;
  originallLanguages: string;
  originalName: string;
  productionCompanies: { [key: string]: any }[];
  productioonContries: { [key: string]: any }[];
  spokenLangrages: { [key: string]: any }[];
  spokenLanguages: { [key: string]: any }[];
  seasons: Season[];
  status: string;
  tagline: string;
  type: string;
};

export type Season = {
  airDate: string;
  episodes: Episode[];
  id: string;
  name: string;
  overview: string;
  posterPath: string;
  seasonNumber: number;
  voteAverage: number;
  Id: string;
};

export type Episode = {
  airDate: string;
  crew: { [key: string]: any }[];
  episodeNumber: number;
  guestStars: { [key: string]: any }[];
  id: StorageManager;
  name: string;
  overview: string;
  productionCode: string;
  runtime: number;
  seasonNumber: number;
  showId: string;
  stillPath: string;
  voteAverage: number;
  voteCount: number;
};

export type Cast = {
  adult: boolean;
  castId: number;
  character: string;
  creditId: string;
  gender: number;
  id: string;
  knownForDepartment: string;
  name: string;
  order: number;
  originalName: string;
  popularity: number;
  profilePath: string;
};

export type Video = {
  id: string;
  iso6391: string;
  iso31661: string;
  key: string;
  name: string;
  official: string;
  publishedAt: string;
  site: string;
  size: number;
  type: string;
};

type VideoType = 'Teaser' | 'Trailer' | 'Behind the Scenes' | 'Featurette';

export type MovieImages = {
  id: string;
  backdrops: Image[];
  logos: Image[];
  posters: Image[];
};

export type TVImages = {
  id: string;
  stills: Image[];
};

export type Image = {
  aspectRatio: number;
  filePath: string;
  height: number;
  width: number;
  iso6391: string | null;
  voteAverage: number;
  voteCount: number;
};

export type Person = {
  adule: boolean;
  gender: number;
  id: string;
  knownFor: Movies[] | TVSeries[];
  knownForDepartment: string;
  mediaType: 'person';
  name: string;
  originalName: string;
  popularity: number;
  profilePath: string;
};

export type Comments = {
  id: string;
  content: string;
  mediaId: string;
  mediaType: string;
  userId: string;
  author: {
    email: string;
    nickname: string;
  };
  star: number;
  createdAt: string;
  updateAt: string | null;
};
