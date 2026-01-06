// services/uploadPoster.service.ts
import { supabase } from "./supabaseClient";

export const uploadPoster = async (file: File) => {
  if (!file) throw new Error("No file selected");

  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `/${fileName}`;

  const { error } = await supabase.storage
    .from("movie_nowShowing")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from("movie_nowShowing")
    .getPublicUrl(filePath);

  return data.publicUrl; // 👉 URL dạng text lưu vào DB
};
