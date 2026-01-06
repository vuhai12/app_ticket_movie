export interface TicketsState {
  data: Tickets[];
  loading: boolean;
  error: string | null;
}

export interface Tickets {
  id: string;
  user_id: string | null;
  movie_id: string | null;
  show_time_id: string | null;
  ticket_quantity: number | null;
  total_price: number | null;
  name: string;
  phone: string;
}
