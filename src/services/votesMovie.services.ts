import { votesMovieApi, votesMovieBulkApi } from "@api/votesMovie.api";
import { MovieVotes } from "../types/votes";

export const votesMovieServices = async (payload: Omit<MovieVotes, "id">) => {
  try {
    const data = await votesMovieApi(payload);
    return data;
  } catch (error) {
    throw error;
  }
};

export const votesMovieBulkServices = async (
  payload: Omit<MovieVotes, "id">[]
) => {
  try {
    const data = await votesMovieBulkApi(payload);
    return data;
  } catch (error) {
    throw error;
  }
};
