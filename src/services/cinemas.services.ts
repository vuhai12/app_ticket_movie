import { getCinemasApi } from "@api/cinemas.api";

export const getCinemasServices = async () => {
  try {
    const res = await getCinemasApi();
    return res;
  } catch (error) {
    throw error;
  }
};
