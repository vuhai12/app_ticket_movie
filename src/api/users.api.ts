import { User } from "../types/auth.types";
import { axiosInstance } from "./axiosInstance";

export const postUserApi = async (payload: {
  type: "guest" | "auth" | "admin";
  auth_id: string | null;
}) => {
  try {
    const res = await axiosInstance.post<User[]>("/users", payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};
