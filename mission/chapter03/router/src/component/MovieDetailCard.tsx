import { MovieDetail } from "../types/movie";

interface MovieDetailCardProps {
  movie: MovieDetail;
}

export default function MovieDetailCard({ movie }: MovieDetailCardProps) {
  return (
    <div className="relative rounded-xl shadow-md overflow-hidden h-96">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
        }}
      />
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative p-4 h-full flex flex-col justify-end text-white">
        <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
        {movie.tagline && (
          <p className="italic text-gray-300 mb-2">"{movie.tagline}"</p>
        )}
        <p className="text-gray-200 mb-2 line-clamp-3">{movie.overview}</p>
        <div className="text-gray-100">
          <p>
            <span className="font-bold">개봉일:</span> {movie.release_date}
          </p>
          <p>
            <span className="font-bold">상영 시간:</span> {movie.runtime}분
          </p>
          <p>
            <span className="font-bold">평점:</span> {movie.vote_average}
          </p>
          <p>
            <span className="font-bold">장르:</span>{" "}
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}