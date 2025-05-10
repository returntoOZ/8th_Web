// src/pages/HomePage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";

const HomePage = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError
  } = useGetInfiniteLpList(5, search, PAGINATION_ORDER.desc);

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const handleCardClick = (id: string) => {
    if (!accessToken) {
      if (window.confirm("로그인이 필요한 서비스입니다.\n로그인하시겠습니까?")) {
        navigate("/login");
      }
    } else {
      navigate(`/lp/${id}`);
    }
  };

  if (isError) return <div className="mt-20">Error...</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
        placeholder="검색어를 입력하세요"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isPending && <LpCardSkeletonList count={20} />}

        {lps?.pages
          .map((page) => page.data.data)
          .flat()
          .map((lp) => (
            <div
              key={lp.id}
              className="cursor-pointer"
              onClick={() => handleCardClick(lp.id)}
            >
              <LpCard lp={lp} />
            </div>
          ))}

        {isFetching && <LpCardSkeletonList count={20} />}
      </div>

      <div ref={ref} className="h-2" />
    </div>
  );
};

export default HomePage;