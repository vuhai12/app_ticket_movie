import axios from "axios";
import { supabase } from "./supabaseClient";

const BASE_URL = import.meta.env.VITE_SUPABASE_URL + "/rest/v1";
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Prefer: "return=representation, resolution=merge-duplicates",
    apikey: ANON_KEY,
    // Authorization: `Bearer ${ANON_KEY}`,
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession();

  if (data.session?.access_token) {
    config.headers.Authorization = `Bearer ${data.session.access_token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});
