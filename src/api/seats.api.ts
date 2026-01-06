import { Seats } from "../types/seats.type";
import { axiosInstance } from "./axiosInstance";

export const postSeatsApi = async (payload: Seats[]) => {
  try {
    const res = await axiosInstance.post<Seats[]>("/seats", payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getSeatsApi = async (showtime_id: string) => {
  try {
    const res = await axiosInstance.get<Seats[]>(
      `/seats?showtime_id=eq.${showtime_id}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
