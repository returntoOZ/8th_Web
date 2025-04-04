// src/pages/movie-detail.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../component/LoadingSpinner";
import { MovieDetail, MovieCredits } from "../types/movie";
import MovieDetailCard from "../component/MovieDetailCard";

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetail>();
  const [credits, setCredits] = useState<MovieCredits>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [detailResponse, creditsResponse] = await Promise.all([
          axios.get<MovieDetail>(
            `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          ),
          axios.get<MovieCredits>(
            `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          ),
        ]);
        setMovie(detailResponse.data);
        setCredits(creditsResponse.data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-center text-red-500">
        영화 정보를 불러오는데 실패했습니다.
      </div>
    );
  }

  // movie와 credits가 null인 경우에도 안전하게 early return합니다.
  if (!movie || !credits) return null;


  const director = credits.crew.find((member) => member.job === "Director");
  const allCast = credits.cast;

  return (
    <div className="container mx-auto p-4">
      <MovieDetailCard movie={movie} />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">감독/출연</h2>
        <div className="flex flex-col gap-6">
          {director && (
            <div className="flex items-center gap-4">
              {director.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${director.profile_path}`}
                  alt={director.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                  No Image
                </div>
              )}
              <p className="text-xl font-bold">감독: {director.name}</p>
            </div>
          )}

          <div>
            <h3 className="text-xl font-bold mb-2">출연진</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-4">
              {allCast.map((castMember) => (
                <div key={castMember.id} className="text-center">
                  {castMember.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${castMember.profile_path}`}
                      alt={castMember.name}
                      className="rounded-full w-20 h-20 mx-auto object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto flex items-center justify-center">
                      No Image
                    </div>
                  )}
                  <p className="text-sm font-medium">{castMember.name}</p>
                  <p className="text-xs text-gray-500">{castMember.character}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;