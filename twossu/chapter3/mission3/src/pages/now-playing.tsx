import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/movie-card";
import LoadingSpinner from "../components/loading-spinner";
import { tmdbApi } from "../axios/api";

const NowPlayingPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  // 1. 로딩 상태
  const [isPending, setIsPending] = useState(false);
  // 2. 에러 상태
  const [isError, setIsError] = useState(false);
  // 3. 페이지
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsPending(true);

      try {
        const { data } = await tmdbApi.get<MovieResponse>(
          `/movie/now_playing?language=ko-KR&page=${page}`,
        );
        setMovies(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovies();
  }, [page]);

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center gap-6 mt-5">
        <button
          className="bg-amber-200 px-6 py-3 rounded-lg shadow-md hover:bg-amber-100 transition-all duration-200 disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >{`<`}</button>
        <span>{page} 페이지</span>
        <button
          className="bg-amber-200 px-6 py-3 rounded-lg shadow-md hover:bg-amber-100 transition-all duration-200 cursor-pointer "
          onClick={() => setPage((prev) => prev + 1)}
        >{`>`}</button>
      </div>

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

export default NowPlayingPage;
