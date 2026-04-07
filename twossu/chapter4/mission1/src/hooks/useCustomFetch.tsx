import { useEffect, useState } from "react";
import { tmdbApi } from "../axios/api";
import type { Movie, MovieResponse } from "../types/movie";

export const useCustomFetch = (url: string) => {
  const [data, setData] = useState<Movie | MovieResponse | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      setIsError(false);

      try {
        const response = await tmdbApi.get<Movie | MovieResponse | null>(url);
        setData(response.data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isPending, isError };
};
