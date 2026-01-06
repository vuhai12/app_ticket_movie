import {
  createMovieApi,
  deleteMovieApi,
  getMovieDetailApi,
  getMoviesApi,
  getMoviesWithShowtimesApi,
  updateMovieApi,
} from "@api/movies.api";
import { Movie, SortableMovieField } from "../types/movie.types";

export const getMoviesServices = async (payload: {
  status?: string;
  title?: string;
  from: number;
  to: number;
  order?: "asc" | "desc";
  sortBy?: SortableMovieField;
}) => {
  try {
    const res = await getMoviesApi(payload);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getMovieDetailServices = async (movieId: string) => {
  try {
    const res = await getMovieDetailApi(movieId);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getMoviesWithShowtimesServices = async (cinemaId: string) => {
  const data = await getMoviesWithShowtimesApi(cinemaId);
  return data;
};

export const createMovieServices = async (payload: Omit<Movie, "id">) => {
  const data = await createMovieApi(payload);
  return data;
};

export const updateMovieServices = async (
  movieId: string,
  payload: Partial<Omit<Movie, "id">>
) => {
  const data = await updateMovieApi(movieId, payload);
  return data;
};

export const deleteMovieServices = async (movieId: string) => {
  const data = await deleteMovieApi(movieId);
  return data;
};
