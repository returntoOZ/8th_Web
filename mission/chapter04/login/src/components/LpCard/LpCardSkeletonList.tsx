import LpCardSkeleton from "./LpCardSkeleton";

interface LpCardSkeletonListProps {
    count: number;
}

const LpCardSkeletonList = ({ count }: LpCardSkeletonListProps) => {
    return (
        <>
            {new Array(count).fill(0).map((_, idx) => {
                return <LpCardSkeleton key={idx} />;
            })}
        </>
    );
};

export default LpCardSkeletonList