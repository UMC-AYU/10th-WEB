import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { Movie } from "../types/movie";
import LoadingSpinner from "../components/loading-spinner";

const MovieDetailPage = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const { movieId } = useParams<{ movieId: string }>();
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setIsPending(true);
      try {
        const { data } = await axios.get<Movie>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          },
        );
        setMovie(data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  return (
    <>
      {isPending || !movie ? (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="p-10 flex gap-10 max-w-5xl mx-auto">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-xl shadow-lg w-1/3 object-cover"
          />
          <div>
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            <p className="text-xl mb-4">평균 {movie.vote_average.toFixed(1)}</p>
            <p className="text-lg">{movie.overview}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetailPage;
