import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  limit: number;
  totalItems: number;
  pageCurrent: number;
  setPageCurrent: (page: number | ((page: number) => number)) => void;
}

const Pagination = ({
  limit,
  totalItems,
  pageCurrent,
  setPageCurrent,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / limit);

  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, pageCurrent - delta);
      i <= Math.min(totalPages - 1, pageCurrent + delta);
      i++
    ) {
      range.push(i);
    }

    if (pageCurrent - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (pageCurrent + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-8 text-sm">
      {/* Previous */}
      <button
        disabled={pageCurrent === 1}
        onClick={() => setPageCurrent((prev) => prev - 1)}
        className={`w-10 h-10 flex items-center justify-center rounded-full transition ${
          pageCurrent === 1
            ? "bg-white/10 text-white/30 cursor-not-allowed"
            : "bg-[#1e0d28] text-white hover:bg-purple-600"
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Page Numbers */}
      {visiblePages.map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2 text-white/50">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => setPageCurrent(Number(page))}
            className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold transition ${
              pageCurrent === page
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                : "bg-[#1e0d28] text-white hover:bg-white/10"
            }`}
          >
            {page}
          </button>
        ),
      )}

      {/* Next */}
      <button
        disabled={pageCurrent === totalPages}
        onClick={() => setPageCurrent((prev) => prev + 1)}
        className={`w-10 h-10 flex items-center justify-center rounded-full transition ${
          pageCurrent === totalPages
            ? "bg-white/10 text-white/30 cursor-not-allowed"
            : "bg-[#1e0d28] text-white hover:bg-purple-600"
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
