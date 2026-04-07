import { useCallback, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import type {
  CastMember,
  CreditsResponse,
  CrewMember,
  MovieDetail,
} from "../types/movie-detail";
import useCustomFetch from "../hooks/useCustomFetch";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const TMDB_BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

type MovieDetailData = {
  movie: MovieDetail | null;
  credits: CreditsResponse | null;
};

const initialMovieDetailData: MovieDetailData = {
  movie: null,
  credits: null,
};

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const fetchMovieDetail = useCallback(async () => {
    const token = import.meta.env.VITE_TMDB_TOKEN;

    if (!token) {
      throw new Error("TMDB 토큰이 없어요. .env.local 파일을 확인해 주세요.");
    }

    if (!movieId) {
      throw new Error("영화 정보를 찾을 수 없어요.");
    }

    const [detailResponse, creditsResponse] = await Promise.all([
      axios.get<MovieDetail>(
        `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
        },
      ),
      axios.get<CreditsResponse>(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
        },
      ),
    ]);

    return {
      movie: detailResponse.data,
      credits: creditsResponse.data,
    };
  }, [movieId]);

  const {
    data: { movie, credits },
    isLoading,
    error,
  } = useCustomFetch<MovieDetailData>({
    fetchData: fetchMovieDetail,
    deps: [movieId],
    initialData: initialMovieDetailData,
  });

  const director = useMemo(() => {
    return credits?.crew.find((member) => member.job === "Director") ?? null;
  }, [credits]);

  const visiblePeople = useMemo(() => {
    const cast = credits?.cast.slice(0, 12) ?? [];
    const crew =
      credits?.crew
        .filter((member) =>
          ["Director", "Writer", "Screenplay", "Producer"].includes(member.job),
        )
        .slice(0, 6) ?? [];

    const uniqueCrew = crew.filter(
      (member, index, self) =>
        self.findIndex(
          (item) => item.id === member.id && item.job === member.job,
        ) === index,
    );

    return [...cast, ...uniqueCrew];
  }, [credits]);

  if (isLoading) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-lime-200 border-t-lime-500" />
        <p className="mt-6 text-sm font-medium text-zinc-500">
          영화 상세 정보를 불러오는 중이에요...
        </p>
      </section>
    );
  }

  if (error || !movie) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-rose-500">
          {error || "영화 정보를 찾지 못했어요."}
        </div>
      </section>
    );
  }

  const people = visiblePeople as Array<CastMember | CrewMember>;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/movies/popular"
        className="mb-6 inline-flex rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-300 hover:text-zinc-900"
      >
        목록으로 돌아가기
      </Link>

      <article className="overflow-hidden rounded-[2rem] bg-black text-white shadow-2xl">
        <div className="relative">
          {movie.backdrop_path ? (
            <img
              src={`${TMDB_BACKDROP_BASE_URL}${movie.backdrop_path}`}
              alt={movie.title}
              className="h-[28rem] w-full object-cover opacity-40"
            />
          ) : (
            <div className="h-[28rem] w-full bg-zinc-900" />
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/25" />

          <div className="absolute inset-0 grid gap-8 p-6 sm:p-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-end">
            <div className="hidden overflow-hidden rounded-[1.5rem] bg-zinc-900 shadow-xl lg:block">
              {movie.poster_path ? (
                <img
                  src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex aspect-2/3 items-center justify-center text-sm text-zinc-400">
                  포스터가 없어요
                </div>
              )}
            </div>

            <div className="max-w-3xl self-center lg:self-end">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-300">
                Movie Detail
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                {movie.title}
              </h1>

              <div className="mt-5 flex flex-wrap gap-4 text-sm text-zinc-200">
                <span>평균 {movie.vote_average.toFixed(1)}</span>
                <span>{movie.release_date.slice(0, 4)}</span>
                <span>{movie.runtime}분</span>
                {director ? <span>감독 {director.name}</span> : null}
              </div>

              <p className="mt-4 text-sm font-semibold text-zinc-100">
                {movie.genres.map((genre) => genre.name).join(" · ")}
              </p>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-200 sm:text-base">
                {movie.overview || "줄거리 정보가 아직 없어요."}
              </p>
            </div>
          </div>
        </div>
      </article>

      <section className="mt-10">
        <h2 className="text-3xl font-bold text-zinc-900">감독/출연</h2>

        <ul className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {people.map((person) => {
            const subtitle =
              "character" in person ? person.character : person.job;

            return (
              <li
                key={`${person.id}-${subtitle}`}
                className="rounded-3xl bg-white p-4 text-center shadow-md"
              >
                <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-zinc-200 bg-zinc-100">
                  {person.profile_path ? (
                    <img
                      src={`${TMDB_IMAGE_BASE_URL}${person.profile_path}`}
                      alt={person.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-zinc-400">
                      이미지 없음
                    </div>
                  )}
                </div>
                <h3 className="mt-4 line-clamp-2 text-sm font-semibold text-zinc-900">
                  {person.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs text-zinc-500">
                  {subtitle}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
};

export default MovieDetailPage;
