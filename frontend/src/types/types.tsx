export interface Movie {
  genres: Genre[];
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  reviews: Review[];
  favourite: boolean;
  cast: Cast[];
}

export interface Cast {
  name: string;
  character: string;
  profile_path: string;
}

export interface Genre {
  id: number;
  name: string;
  movies: Movie[];
  moviesInGenreCount: number;
  count: number;
}

export interface Review {
  id: number;
  content: string;
  rating: number;
  timestamp: string;
  movieid: number;
  userid: number;
}
