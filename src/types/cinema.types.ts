export interface Cinema {
  id: string;
  name: string;
  address: string;
}

export interface CinemasState {
  data: Cinema[];
  loading: boolean;
  error: string | null;
}
