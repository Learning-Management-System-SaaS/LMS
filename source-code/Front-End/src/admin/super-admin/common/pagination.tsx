import React, { Dispatch, SetStateAction } from "react";
import { number } from "yup";

interface PaginationProps {
  startIndex: number;
  endIndex: number;
  totalResults: number;
  currentPage: number;
  setCurrentPage:Dispatch<SetStateAction<number>>
  pageSize: number;
  totalPages:number
}

const Pagination = ({
  startIndex,
  endIndex,
  totalResults,
  currentPage,
  totalPages,
  pageSize,
  setCurrentPage
}: PaginationProps) => {
    const noPages = totalResults/pageSize
    const pagesArray:number[] = []
    for(let i = 0;i<noPages;i++){
        pagesArray.push(i+1)
    }
  return (
    <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 bg-white rounded-b-lg">
      <span className="text-sm text-gray-600">
        Showing {Math.min(startIndex + 1, totalResults)} to {endIndex} of{" "}
        {totalResults} results
      </span>
      <div className="join grid grid-cols-2">
        <button
          className="join-item btn btn-outline"
          onClick={() => setCurrentPage((prev) => Math.min(prev - 1, pageSize)) }
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        {pagesArray.map(page=>(
            <div className={`btn shadow-none ${currentPage===page?'bg-sky-800 text-white':'bg-white text-black'} `}
                onClick={()=>setCurrentPage(page)}
            >
                {page}
            </div>
        ))}
       
        <button
          className="join-item btn btn-outline"
          disabled={totalPages === 1||currentPage===pagesArray.length}
          onClick={() =>setCurrentPage((prev) => Math.min(prev + 1, pageSize))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
