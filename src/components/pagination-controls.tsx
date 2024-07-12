import { cn } from "@/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";

type PaginationControlsProps = {
  previousPath: string;
  nextPath: string;
};

const btnStyles =
  "flex items-center gap-x-2 bg-white/5 rounded-md opacity-75 px-5 py-3 hover:opacity-100 transition text-xs";
export default function PaginationControls({
  previousPath,
  nextPath,
}: PaginationControlsProps) {
  // const [currentPage, setCurrentPage] = useState(page);
  return (
    <section className="flex relative w-full">
      {previousPath && (
        <Link href={previousPath} className={cn(btnStyles, "mr-auto")}>
          <ArrowLeftIcon />
          Previous
        </Link>
      )}
      {nextPath && (
        <Link href={nextPath} className={cn(btnStyles, "ml-auto")}>
          Next
          <ArrowRightIcon />
        </Link>
      )}
    </section>
  );
}
