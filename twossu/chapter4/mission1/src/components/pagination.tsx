import React from "react";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ page, setPage }: PaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-6 mt-5">
      <button
        className="bg-amber-200 px-6 py-3 rounded-lg shadow-md hover:bg-amber-100 transition-all duration-200 disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed"
        disabled={page === 1}
        onClick={() => setPage((prev) => prev - 1)}
      >
        {`<`}
      </button>
      <span>{page} 페이지</span>
      <button
        className="bg-amber-200 px-6 py-3 rounded-lg shadow-md hover:bg-amber-100 transition-all duration-200 cursor-pointer"
        onClick={() => setPage((prev) => prev + 1)}
      >
        {`>`}
      </button>
    </div>
  );
};

export default Pagination;
