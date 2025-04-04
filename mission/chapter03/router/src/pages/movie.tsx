import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "../types/movie";

import axios from 'axios'
import MovieCard from "../component/MovieCard";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../component/LoadingSpinner";

const MoviesPage = () => {
  const params = useParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  // 1. 로딩 상태
  const [isPending, setIsPending] = useState(false);
  // 2. 에러 상태
  const [isError, setIsError] = useState(false);
  // 3. 페이지
  const [page, setPage] = useState(1);

  // 인기 영화 : popular
  // 개봉 예정 영화 : upcoming
  // 평점 높은 영화 : top_rated
  // 상영 중 영화 : now_playing

  useEffect(() => {
    const fetchMovies = async (): Promise<void> => {
      setIsPending(true);
      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${params.type}?language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        setMovies(data.results);
      }
      catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovies();
  }, [params.type, page]);

  // 문제 상황 : useParams에 따른 영화 리스트 렌더링을 하기 위해 의존성 배열에 movies를 넣었음
  // 하지만 로딩스피너와 함께 영화 페이지를 구현하는 과정에서 영화 페이지와 로딩 스피너가 무한으로 반복되는 문제를 찾았음

  // 원인 파악 : 맨처음에는 setMovies가 호출됨에 따라 페이지가 리렌더링이 되어야하기 때문에 movies를 의존성 배열에 넣어야한다고 생각했음

  // 문제 해결 : 그러나 useEffect가 실행되는 상황을 제대로 살펴보면,
  // 1. 컴포넌트가 렌더링될 때, useEffect가 실행되어 axios를 호출
  // 2. axios 호출 완료되면 setMovies를 통해 movies 상태가 update
  // 3. movies(상태)가 update됐기 때문에 리렌더링됌!
  // 4. 의존성 배열에 movies가 포함되어 있기 때문에 useEffect 재실행!
  // 5. 3,4번 과정이 무한 반복 

  // 따라서, 의존성 배열의 값을 params.type으로 변동해야 원하는 결과 값을 나타낼 수 있음!

  // 만약 의존성 배열이 없다면, 첫 렌더링과 더불어 매 렌더링마다 실행됌!
  // 의존성 배열이 빈 배열이라면 첫 렌더링 시에만 작동!
  // async await 설명 : https://velog.io/@tosspayments/%EC%98%88%EC%A0%9C%EB%A1%9C-%EC%9D%B4%ED%95%B4%ED%95%98%EB%8A%94-awaitasync-%EB%AC%B8%EB%B2%95

  if (isError) {
    return (
      <div>
        <span className='text-red-500 text-2xl'>
          에러가 발생했습니다.
        </span>
      </div>
    )
  }
  return (
    <>
      <div className='flex items-center justify-center gap-6 mt-5'>
        <button
          className='bg-purple-400 text-white px-6 py-3 rounded-lg shadow-md
          hover:bg-gray-300 transition-all duration-200 disabled:bg-gray-300
          cursor-pointer disabled:cursor-not-allowed'
          disabled={page === 1}
          onClick={() => setPage(prev => prev - 1)}>
          {`<`}
        </button>
        <span>{page} 페이지</span>
        <button
          className='bg-purple-400 text-white px-6 py-3 rounded-lg shadow-md
          hover:bg-gray-300 transition-all duration-200 disabled:bg-gray-300
          cursor-pointer disabled:cursor-not-allowed'
          onClick={() => setPage(prev => prev + 1)}>
          {`>`}
        </button>
      </div>

      {isPending && (
        <div className='flex items-center justify-center h-dvh'>
          <LoadingSpinner />
        </div>
      )}

      {!isPending &&
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies && movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      }
    </>

  )
}

export default MoviesPage