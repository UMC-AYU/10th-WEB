import axios from "axios";
import type { MovieResponse } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/movie";

const TOKEN = "YOUR_TOKEN";

export const getMovies = async (endpoint: string, page: number) => {
  const { data } = await axios.get<MovieResponse>(
    `${API_URL}/${endpoint}?language=ko-KR&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );

  return data;
};