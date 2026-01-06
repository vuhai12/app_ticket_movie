import { Cinema } from "../types/cinema.types";
import { axiosInstance } from "./axiosInstance";

export const getCinemasApi = async () => {
  try {
    const res = await axiosInstance.get<Cinema[]>("/cinema_branches");
    return res.data;
  } catch (error) {
    throw error;
  }
};
