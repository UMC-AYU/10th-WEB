import type { Movie } from "../types/movie";

interface MovieCardprops {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardprops) => {
  return (
    <div>
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={`${movie.title}의 이미지`}
      />
    </div>
  );
};

export default MovieCard;
