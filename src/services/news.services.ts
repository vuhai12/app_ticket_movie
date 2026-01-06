import { getNewsApi, getNewsDetailApi } from "@api/news.api";

export const getNewsServices = async () => {
  try {
    const res = await getNewsApi();
    return res;
  } catch (error) {
    throw error;
  }
};

export const getNewsDetailServices = async (newsId: string) => {
  try {
    const res = await getNewsDetailApi(newsId);
    return res;
  } catch (error) {
    throw error;
  }
};
