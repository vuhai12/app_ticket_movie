import { axiosApp } from "./axiosApp";
import { supabase } from "./supabaseClient";

export const registerAuth = async (payload: {
  email: string;
  name: string;
  password: string;
}) => {
  try {
    await axiosApp.post("/api/register", payload);
  } catch (error) {
    throw error;
  }
};

export const logonApi = async (payload: {
  email: string;
  password: string;
}) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword(payload);
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};
