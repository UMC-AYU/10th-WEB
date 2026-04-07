import { useState } from "react";
import type { MovieResponse } from "../types/movie";
import MovieCard from "../components/movie-card";
import LoadingSpinner from "../components/loading-spinner";
import { useCustomFetch } from "../hooks/useCustomFetch";
import Pagination from "../components/pagination";

const MoviesPage = () => {
  const [page, setPage] = useState(1);

  const { data, isPending, isError } = useCustomFetch(
    `/movie/popular?language=ko-KR&page=${page}`,
  );

  const movieResponse = data as MovieResponse;

  const movies = movieResponse?.results || [];

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  return (
    <>
      <Pagination page={page} setPage={setPage} />

      {isPending ? (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
};

export default MoviesPage;
