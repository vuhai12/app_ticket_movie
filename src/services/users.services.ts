import { postUserApi } from "@api/users.api";

export const postUserServices = async (payload: {
  type: "guest" | "auth" | "admin";
  auth_id: string | null;
}) => {
  try {
    const data = await postUserApi(payload);
    return data;
  } catch (error) {
    throw error;
  }
};
