import { getShowtimesApi } from "@api/showtime.api";

export const getShowtimesServices = async (movie_id: string) => {
  try {
    const res = await getShowtimesApi(movie_id);
    return res;
  } catch (error) {
    throw error;
  }
};
