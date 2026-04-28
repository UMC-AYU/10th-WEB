import { useEffect, useRef, useState } from "react";
import type { DependencyList } from "react";

type UseCustomFetchParams<T> = {
  fetchData: () => Promise<T>;
  deps: DependencyList;
  initialData: T;
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "데이터를 불러오는 중 문제가 발생했어요.";
};

const useCustomFetch = <T>({
  fetchData,
  deps,
  initialData,
}: UseCustomFetchParams<T>) => {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchDataRef = useRef(fetchData);

  useEffect(() => {
    fetchDataRef.current = fetchData;
  }, [fetchData]);

  useEffect(() => {
    let isCancelled = false;

    const requestData = async () => {
      setIsLoading(true);
      setError("");

      try {
        const result = await fetchDataRef.current();

        if (!isCancelled) {
          setData(result);
        }
      } catch (error) {
        if (!isCancelled) {
          setData(initialData);
          setError(getErrorMessage(error));
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    requestData();

    return () => {
      isCancelled = true;
    };
  }, [initialData, ...deps]);

  return { data, isLoading, error };
};

export default useCustomFetch;
