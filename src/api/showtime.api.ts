import { Showtime } from "../types/showtime.type";
import { moviesWithShowtimes } from "../types/movie.types";
import { axiosInstance } from "./axiosInstance";

export const getShowtimesApi = async (movie_id: string) => {
  try {
    const res = await axiosInstance.get<Showtime[]>("/show_times", {
      params: {
        movie_id: `eq.${movie_id}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getShowtimesWithMovieApi = async () => {
  const res = await axiosInstance.get<moviesWithShowtimes[]>(
    `/show_times?select=id,show_date,start_time,movie:movie_id(id,title,actor,release_date,poster_url,category,trailer_url)`
  );

  return res.data;
};
