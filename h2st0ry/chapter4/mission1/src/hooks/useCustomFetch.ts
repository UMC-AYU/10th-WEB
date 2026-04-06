import { useEffect, useState } from "react";
import { api } from "../api/api";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export const useCustomFetch = <T>(
  url: string,
  deps: any[] = []
): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await api.get<T>(url);
        setData(res.data);
      } catch (err) {
        setError("데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, deps);

  return { data, loading, error };
};