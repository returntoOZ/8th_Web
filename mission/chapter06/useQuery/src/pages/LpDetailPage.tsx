import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../apis/lp";
import { LpDetailDto } from "../types/lp";
import { FaEdit, FaTrash, FaHeart } from "react-icons/fa";

const LpDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { accessToken } = useAuth();

    if (!accessToken) {
        if (window.confirm("로그인이 필요한 서비스입니다. 로그인을 해주세요!")) {
            navigate("/login");
        }
        return null;
    }

    const {
        data: lp,
        isLoading,
        isError,
    } = useQuery<LpDetailDto>({
        queryKey: ["lpDetail", id],
        queryFn: () => getLpDetail(Number(id)),
        enabled: !!id,
    });

    if (isLoading) {
        return <div className="mt-20 text-center">Loading...</div>;
    }
    if (isError || !lp) {
        return <div className="mt-20 text-center">조회된 LP가 없습니다.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-4">{lp.title}</h1>
            {lp.thumbnail && (
                <div className="flex justify-center mb-8">
                    <div className="relative w-64 h-64">
                        {/* LP 판 */}
                        <img
                            src={lp.thumbnail}
                            alt={lp.title}
                            className="w-full h-full object-cover rounded-full shadow-lg animate-spin [animation-duration:20s] [animation-timing-function:linear]"
                        />
                        {/* 레코드 중앙 라벨(구멍) */}
                        <div className="absolute inset-0 flex justify-center items-center">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                        </div>
                    </div>
                </div>
            )}
            <p className="prose mb-6">{lp.content}</p>
            <div className="mb-4">
                {lp.tags.map((tag) => (
                    <span
                        key={tag.id}
                        className="inline-block px-2 py-1 mr-2 mb-2 bg-gray-200 dark:bg-gray-700 rounded text-sm"
                    >
                        #{tag.name}
                    </span>
                ))}
            </div>
            <div className="text-sm text-gray-500 mb-6">
                작성자: {lp.author.name} · 좋아요 {lp.likes.length} ·{" "}
                {new Date(lp.createdAt).toLocaleDateString("ko-KR")}
            </div>
            <div className="flex space-x-4">
                <button className="flex items-center px-4 py-2 border rounded hover:bg-gray-100">
                    <FaEdit className="mr-2" /> 수정
                </button>
                <button className="flex items-center px-4 py-2 border rounded hover:bg-gray-100">
                    <FaTrash className="mr-2" /> 삭제
                </button>
                <button className="flex items-center px-4 py-2 border rounded hover:bg-gray-100">
                    <FaHeart className="mr-2" /> 좋아요
                </button>
            </div>
        </div>
    );
};

export default LpDetailPage;