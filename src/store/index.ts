import { configureStore } from "@reduxjs/toolkit";
import cinemasReducer from "./slices/cinemaSlice";
import moviesReducer from "./slices/movieSlice";
import newsReducer from "./slices/newsSlice";
import movieDetailReducer from "./slices/movieDetailSlice";
import newsDetailReducer from "./slices/newsDetailSlice";
import showtimesReducer from "./slices/showtimesSlice";
import usersReducer from "./slices/usersSlice";
import ticketsReducer from "./slices/ticketsSlice";
import seatsReducer from "./slices/seatsSlice";
import moviesWithShowtimesReducer from "./slices/moviesWithShowtimesSlice";
import votesMovieReducer from "./slices/votesMovieSlice";

export const store = configureStore({
  reducer: {
    cinemas: cinemasReducer,
    votesMovie: votesMovieReducer,
    users: usersReducer,
    tickets: ticketsReducer,
    seats: seatsReducer,
    movies: moviesReducer,
    news: newsReducer,
    movieDetail: movieDetailReducer,
    newsDetail: newsDetailReducer,
    showtimes: showtimesReducer,
    moviesWithShowtimes: moviesWithShowtimesReducer,
  },
});

// type cho TS (nếu dùng)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
