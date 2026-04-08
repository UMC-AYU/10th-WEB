import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../types/movies";
import axios from "axios";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      const token = import.meta.env.VITE_TMDB_TOKEN;

      if (!token) {
        setErrorMessage("TMDB 토큰이 없어요. .env.local 파일을 확인해 주세요.");
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await axios.get<MovieResponse>(
          "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: "application/json",
            },
          },
        );

        setMovies(data.results);
      } catch (error) {
        console.error("영화 목록 요청 실패", error);
        setErrorMessage(
          "영화 목록을 불러오지 못했어요. 토큰 값을 확인해 주세요.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (isLoading) {
    return <p>영화 목록 불러오는 중...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-zinc-900">Popular Movies</h1>
        <p className="mt-2 text-sm text-zinc-500">
          TMDB 인기 영화 목록을 불러왔어요.
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies.map((movie) => (
        <li
          key={movie.id}
          className="overflow-hidden rounded-2xl bg-white shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="aspect-[2/3] bg-zinc-200">
            {movie.poster_path ? (
              <img
                src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center px-4 text-center text-sm text-zinc-500">
                포스터 이미지가 없어요
              </div>
            )}
          </div>

          <div className="space-y-1 px-3 py-3">
            <h2 className="line-clamp-2 text-sm font-semibold text-zinc-900">
              {movie.title}
            </h2>
            <p className="text-xs text-zinc-500">{movie.release_date}</p>
            <p className="text-xs font-medium text-amber-600">
              평점 {movie.vote_average.toFixed(1)}
            </p>
          </div>
        </li>
      ))}
      </ul>
    </section>
  );
};

export default MoviesPage;
