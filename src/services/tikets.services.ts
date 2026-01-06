import { postTicketsApi } from "@api/tickets.api";
import { Tickets } from "../types/tickets.types";

export const postTicketsServices = async (payload: Omit<Tickets, "id">) => {
  try {
    const data = await postTicketsApi(payload);
    return data;
  } catch (error) {
    throw error;
  }
};
