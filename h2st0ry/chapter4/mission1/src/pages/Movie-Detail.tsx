import { useParams } from "react-router-dom";
import { useCustomFetch } from "../hooks/useCustomFetch";
import type { Credits, Movie, Cast } from "../types/movie";

const MovieDetailPage = () => {
  const { movieId } = useParams();

  const { data: movie, loading, error } = useCustomFetch<Movie>(
    `/movie/${movieId}?language=ko-KR`,
    [movieId]
  );

  const { data: credits } = useCustomFetch<Credits>(
    `/movie/${movieId}/credits`,
    [movieId]
  );

  if (loading) return <div className="text-center mt-20">로딩중...</div>;
  if (error)
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  if (!movie) return null;

  return (
    <div className="p-10 text-black">
      <div className="flex gap-10">
        <img
          className="w-64 rounded-lg"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        />

        <div>
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="mt-2">⭐ {movie.vote_average}</p>
          <p className="mt-4">{movie.overview}</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">출연진</h2>
        <div className="grid grid-cols-5 gap-4">
          {credits?.cast?.slice(0, 10).map((actor: Cast) => (
            <div key={actor.id} className="flex flex-col items-center text-center">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : "/no-profile.png"
                }
                className="w-20 h-20 rounded-full object-cover"
              />
              <p>{actor.name}</p>
              <p className="text-xs text-gray-400">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;