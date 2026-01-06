import { MovieVotes } from "../types/votes";

import { axiosInstance } from "./axiosInstance";

export const votesMovieApi = async (payload: Omit<MovieVotes, "id">) => {
  try {
    const res = await axiosInstance.post<MovieVotes[]>(
      "/movie_votes?on_conflict=user_id,movie_id&select=*",
      payload
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const votesMovieBulkApi = async (payload: Omit<MovieVotes, "id">[]) => {
  try {
    const res = await axiosInstance.post<MovieVotes[]>(
      "/movie_votes?on_conflict=user_id,movie_id&select=*",
      payload
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
