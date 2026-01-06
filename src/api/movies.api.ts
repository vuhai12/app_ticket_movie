import {
  Movie,
  moviesWithShowtimes,
  SortableMovieField,
} from "../types/movie.types";
import { axiosInstance } from "./axiosInstance";

type SortOrder = "asc" | "desc";

export const getMoviesApi = async (payload: {
  status?: string;
  title?: string;
  from: number;
  to: number;
  sortBy?: SortableMovieField; // trường để sort
  order?: SortOrder; // hướng sort: asc / desc
}) => {
  try {
    const params: Record<string, string> = {};

    if (payload.title) {
      params.title = `ilike.*${payload.title}*`; // Supabase/PostgREST-style search
    }
    if (payload.status) {
      params.status = `eq.${payload.status}`;
    }
    // params.order = "id.desc";
    const res = await axiosInstance.get<Movie[]>("/movies", {
      params,
      headers: {
        Prefer: "count=exact",
        Range: `${payload.from}-${payload.to}`,
      },

      paramsSerializer: (params) => {
        const query = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) =>
          query.append(key, value)
        );
        if (payload.sortBy && payload.order) {
          query.append("order", `${payload.sortBy}.${payload.order}`);
        } else {
          // ✅ fallback mặc định
          query.append("order", "created_at.desc");
        }
        return query.toString();
      },
    });
    const total = Number(res.headers["content-range"]?.split("/")[1]);
    return { dataMovies: res.data, total };
  } catch (error) {
    throw error;
  }
};

export const getMovieDetailApi = async (movieId: string) => {
  try {
    const res = await axiosInstance.get<Movie[]>("/movies", {
      params: {
        id: `eq.${movieId}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getMoviesWithShowtimesApi = async (cinemaId: string) => {
  const res = await axiosInstance.get<moviesWithShowtimes[]>(
    `/movies?select=
      id,
      title,
      actor,
      release_date,
      poster_url,
      category,
      trailer_url,
      show_times (
        id,
        show_date,
        start_time,
        end_time,
        price,
        branch_id
      )&show_times.branch_id=eq.${cinemaId}
    `
  );
  return res.data;
};

export const createMovieApi = async (payload: Omit<Movie, "id">) => {
  try {
    const res = await axiosInstance.post<Movie[]>("/movies", payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateMovieApi = async (
  movieId: string,
  payload: Partial<Omit<Movie, "id">>
) => {
  try {
    const res = await axiosInstance.patch<Movie[]>("/movies", payload, {
      params: {
        id: `eq.${movieId}`, // chỉ update record có id = movieId
      },
    });

    // res.data là mảng, Supabase luôn trả về mảng
    return res.data[0];
  } catch (error) {
    throw error;
  }
};

export const deleteMovieApi = async (movieId: string) => {
  try {
    const res = await axiosInstance.delete<Movie[]>("/movies", {
      params: {
        id: `eq.${movieId}`, // chỉ xóa record có id = movieId
      },
    });

    // Supabase trả về mảng chứa item vừa xóa (nếu return=representation)
    return res.data[0];
  } catch (error) {
    throw error;
  }
};
