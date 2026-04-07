import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Movie, MovieResponse } from "../types/movies";
import axios from "axios";
import useCustomFetch from "../hooks/useCustomFetch";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const initialMoviesData = { movies: [] as Movie[], totalPages: 1 };

type MovieCategory = "popular" | "now_playing" | "top_rated" | "upcoming";

type MoviesPageProps = {
  category: MovieCategory;
};

const categoryMeta: Record<
  MovieCategory,
  { title: string; description: string }
> = {
  popular: {
    title: "인기 영화",
    description: "가장 많은 관심을 받고 있는 영화들이에요.",
  },
  now_playing: {
    title: "상영 중",
    description: "현재 극장에서 상영 중인 영화를 모아봤어요.",
  },
  top_rated: {
    title: "평점 높은",
    description: "평점이 높은 작품들을 먼저 확인해 보세요.",
  },
  upcoming: {
    title: "개봉 예정",
    description: "곧 만나게 될 기대작 목록이에요.",
  },
};

const MoviesPage = ({ category }: MoviesPageProps) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [category]);

  const fetchMovies = useCallback(async () => {
    const token = import.meta.env.VITE_TMDB_TOKEN;

    if (!token) {
      throw new Error("TMDB 토큰이 없어요. .env.local 파일을 확인해 주세요.");
    }

    const { data } = await axios.get<MovieResponse>(
      `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      },
    );

    return {
      movies: data.results,
      totalPages: Math.min(data.total_pages, 500),
    };
  }, [category, page]);

  const {
    data: { movies, totalPages },
    isLoading,
    error,
  } = useCustomFetch({
    fetchData: fetchMovies,
    deps: [category, page],
    initialData: initialMoviesData,
  });

  const { title, description } = categoryMeta[category];

  if (isLoading) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-lime-200 border-t-lime-500" />
        <p className="mt-6 text-sm font-medium text-zinc-500">
          영화 목록을 불러오는 중이에요...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-rose-500">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">{title}</h1>
          <p className="mt-2 text-sm text-zinc-500">{description}</p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
            className="h-11 w-11 rounded-xl bg-fuchsia-300 text-lg font-bold text-white transition hover:bg-fuchsia-400 disabled:cursor-not-allowed disabled:bg-zinc-300"
          >
            {"<"}
          </button>
          <p className="min-w-24 text-center text-sm font-semibold text-zinc-700">
            {page} 페이지
          </p>
          <button
            type="button"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= totalPages}
            className="h-11 w-11 rounded-xl bg-fuchsia-300 text-lg font-bold text-white transition hover:bg-fuchsia-400 disabled:cursor-not-allowed disabled:bg-zinc-300"
          >
            {">"}
          </button>
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="overflow-hidden rounded-2xl bg-white shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
          >
            <Link to={`/movies/${movie.id}`} className="block">
              <div className="aspect-2/3 bg-zinc-200">
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
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-center text-xs text-zinc-400">
        총 {totalPages} 페이지 중 {page} 페이지를 보고 있어요.
      </p>
    </section>
  );
};

export default MoviesPage;
