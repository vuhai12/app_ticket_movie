import { News } from "../types/news.types";
import { axiosInstance } from "./axiosInstance";

export const getNewsApi = async () => {
  try {
    const res = await axiosInstance.get<News[]>("/news");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getNewsDetailApi = async (newsId: string) => {
  try {
    const res = await axiosInstance.get<News[]>("/news", {
      params: {
        id: `eq.${newsId}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

// export const getMoviesWithShowtimesApi = async () => {
//   const res = await axiosInstance.get<moviesWithShowtimes[]>(
//     `/movies?select=
//       id,
//       title,
//       actor,
//       release_date,
//       poster_url,
//       category,
//       trailer_url,
//       show_times (
//         id,
//         show_date,
//         start_time,
//         end_time,
//         price,
//         branch_id
//       )
//     `
//   );

//   return res.data;
// };
