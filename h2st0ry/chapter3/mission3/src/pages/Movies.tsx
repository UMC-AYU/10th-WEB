import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../types/movie";
import axios from "axios";
import { Navigate, useParams, useNavigate } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const { category } = useParams();
  const navigate = useNavigate();

  const categoryMap: Record<string, string> = {
    popular: "popular",
    "now-playing": "now_playing",
    "top-rated": "top_rated",
    upcoming: "upcoming",
  };

  const endpoint = categoryMap[category || ""];
  const isInvalid = !endpoint;

  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    if (isInvalid) return;

    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${endpoint}?language=ko-KR&page=${page}`,
          {
            headers: {
              Authorization: `Bearer YOUR_TOKEN`,
            },
          }
        );

        setMovies(data.results);
      } catch (err) {
        console.error(err);
        setError("영화를 불러오는데 실패했습니다 😢");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [category, page]);

  if (isInvalid) {
    return <Navigate to="/not-found" replace />;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="w-10 h-10 border-4 border-[#6f472c] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] text-red-500 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center items-center gap-4 mt-10 mb-10">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-[#6f472c] text-white rounded disabled:opacity-30"
        >
          이전
        </button>

        <span className="text-black">{page} 페이지</span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-[#6f472c] text-white rounded"
        >
          다음
        </button>
      </div>

      <ul className="m-5 grid grid-cols-5 gap-4">
        {movies.map((movie) => (
          <li
            key={movie.id}
            onClick={() => navigate(`/movies/detail/${movie.id}`)}
            className="relative group overflow-hidden rounded-lg cursor-pointer"
          >
            <img
              className="hover:blur-xs transition"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />

            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-center p-2">
              <h2 className="text-white text-sm font-bold mb-1">
                {movie.title}
              </h2>
              <p className="text-gray-200 text-xs line-clamp-3">
                {movie.overview}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;