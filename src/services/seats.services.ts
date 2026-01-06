import { getSeatsApi, postSeatsApi } from "@api/seats.api";
import { Seats } from "../types/seats.type";

export const postSeatsServices = async (payload: Seats[]) => {
  try {
    const data = await postSeatsApi(payload);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getSeatsServices = async (showtime_id: string) => {
  try {
    const data = await getSeatsApi(showtime_id);
    return data;
  } catch (error) {
    throw error;
  }
};
