export interface MovieVotesState {
  data: MovieVotes[];
  loading: boolean;
  error: string | null;
}

export interface MovieVotes {
  id: string;
  user_id: string;
  movie_id: string;
  vote: string;
}
