export type Response = {
  page: number;
  results: Movies[] | TVSeries[];
  total_pages: number;
  totla_results: number;
};

export type Media = {
  adult: boolean;
  backdropPath: string;
  genreIds: number[];
  id: string;
  originalLanguage: string;
  overview: string;
  popularity: number;
  posterPath: string;
  voteAverage: number;
  voteCount: number;
  mediaType: 'movie' | 'tv';
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
