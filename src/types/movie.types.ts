export interface Movie {
  id: string;
  title: string;
  status: string;
  description: string;
  duration: string;
  release_date: string;
  poster_url: string;
  trailer_url: string;
  category: string;
  actor: string;
}

export interface MovieItemState {
  data: Movie[];
  loading: boolean;
  error: string | null;
}

export interface MovieState {
  data: { dataMovies: Movie[]; total: number };
  loading: boolean;
  error: string | null;
}

export interface MovieDetailState {
  data: Movie | null;
  loading: boolean;
  error: string | null;
}

export interface moviesWithShowtimes {
  id: string;
  poster_url: string;
  trailer_url: string;
  category: string;
  release_date: string;
  title: string;
  actor: string;
  show_times: {
    branch_id: string;
    id: string;
    end_time: string;
    price: number;
    show_date: string;
    start_time: string;
  }[];
}

export interface MoviesWithShowtimesState {
  data: moviesWithShowtimes[];
  loading: boolean;
  error: string | null;
}

export type SortableMovieField =
  | "created_at"
  | "release_date"
  | "title"
  | "status"
  | "duration";
