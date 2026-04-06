import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";

const MovieDetailPage = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState<any>(null);
  const [credits, setCredits] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!movieId) return;

      setLoading(true);
      setError(null);

      try {
        const movieRes = await api.get(`/movie/${movieId}?language=ko-KR`);

        const creditRes = await api.get(`/movie/${movieId}/credits`);

        setMovie(movieRes.data);
        setCredits(creditRes.data);
      } catch (err) {
        setError("상세 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [movieId]);

  if (loading) return <div className="text-center mt-20">로딩중...</div>;
  if (error)
    return <div className="text-center mt-20 text-red-500">{error}</div>;

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
          {credits?.cast?.slice(0, 10).map((actor: any) => (
            <div
              key={actor.id}
              className="flex flex-col items-center text-center"
            >
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
