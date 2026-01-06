export interface Showtime {
  id: string;
  branch_id: string;
  movie_id: string;
  show_date: string;
  start_time: string;
  end_time: string;
  price: number;
}

export interface ShowtimeState {
  data: Showtime[];
  loading: boolean;
  error: string | null;
}
