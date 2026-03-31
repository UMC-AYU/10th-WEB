import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../types/movie";
import axios from "axios";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  console.log(movies);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get<MovieResponse>(
          "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDI2NWEzYzliM2FkMWI4ZTkyOTc4OGQ5ZTMxMTVlNiIsIm5iZiI6MTc3NDc5NTUxMi4zMjQsInN1YiI6IjY5YzkzYWY4ODExODdkMzE3Y2QzNmNlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j_CnL1ELlQMVxqI_XWPKEEpLHt8E5v1ATJUYbRt5MW4`,
            },
          },
        );

        setMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <ul className="m-5 grid grid-cols-6 gap-4">
      {movies?.map((movie) => (
        <li
          key={movie.id}
          className="relative group overflow-hidden rounded-lg"
        >
          <img
            className="hover:blur-xs transition"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-center p-2">
            <h2 className="text-white text-sm font-bold mb-1">{movie.title}</h2>
            <p className="text-gray-200 text-xs line-clamp-3">
              {movie.overview}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MoviesPage;
