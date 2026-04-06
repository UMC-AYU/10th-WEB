import axios from "axios";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});