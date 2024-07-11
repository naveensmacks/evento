import Skeleton from "@/components/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-y-4 pt-28 items-center">
      <Skeleton />
      <Skeleton className="w-[400px]" />
      <Skeleton className="w-[430px]" />
    </div>
  );
}
