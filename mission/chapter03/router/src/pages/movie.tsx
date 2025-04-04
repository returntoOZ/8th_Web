import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "../types/movie";

import axios from 'axios'
import MovieCard from "../component/MovieCard";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  console.log(movies);

  useEffect(() => {
    const fetchMovies = async (): Promise<void> => {
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWU0OTMzYjhjNGE2ZTZmMzg2NTkyNTljYzYwNDhiMCIsIm5iZiI6MTc0MzY4MjA2NC44Miwic3ViIjoiNjdlZTdhMTAwMzU0MGNmOGU1NjJiNTdmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.xit79wYfldyYrdkHC3dzt-KFmYNWUlZ7wledp8d9Vnc`,
          },
        }
      );

      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  // 만약 의존성 배열이 없다면, 첫 렌더링과 더불어 매 렌더링마다 실행됌!
  // 의존성 배열이 빈 배열이라면 첫 렌더링 시에만 작동!
  // async await 설명 : https://velog.io/@tosspayments/%EC%98%88%EC%A0%9C%EB%A1%9C-%EC%9D%B4%ED%95%B4%ED%95%98%EB%8A%94-awaitasync-%EB%AC%B8%EB%B2%95

  return (
    <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies && movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie}/>
      ))}
    </div>
  )
}

export default MoviesPage