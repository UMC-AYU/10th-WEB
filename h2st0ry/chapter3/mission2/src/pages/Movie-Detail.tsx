import { useParams } from "react-router-dom";

const MovieDetailPage = () => {
  const { movieId } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold">영화 상세 페이지</h1>
      <p>ID: {movieId}</p>
    </div>
  );
};

export default MovieDetailPage;