import SkeletonCard from "@/components/skeleton-card";

export default function Loading() {
  return (
    <div className="max-w-[1100px] flex flex-wrap gap-20 justify-center mx-auto px-[20px]">
      {[...Array(6)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
