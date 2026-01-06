export interface News {
  id: string;
  title: string;
  desciption: string;
  poster_url: string;
}

export interface NewsState {
  data: News[];
  loading: boolean;
  error: string | null;
}
