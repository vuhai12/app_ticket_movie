import { Tickets } from "../types/tickets.types";
import { axiosInstance } from "./axiosInstance";

export const postTicketsApi = async (payload: Omit<Tickets, "id">) => {
  try {
    const res = await axiosInstance.post<Tickets[]>("/tickets", payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};
