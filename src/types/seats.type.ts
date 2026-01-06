export interface SeatsState {
  seatsByShowtime: Seats[]; // data từ GET
  createdSeats: Seats[]; // data từ POST
  loadingSeatsByShowtime: boolean;
  loadingCreatedSeats: boolean;
  errorSeatsByShowtime: string | null;
  errorCreatedSeats: string | null;
}

export interface Seats {
  col: number;
  row: string;
  ticket_id: string;
  showtime_id: string;
}
