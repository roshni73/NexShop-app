'use client';

import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination(props: Props) {
  const {
    currentPage,
    totalPages,
    onPageChange,
    className = ''
  } = props;

  if (totalPages <= 1) return null;

  const generatePageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    pages.push(1);
    if (currentPage > 3) {
      pages.push('...');
    }
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }
    if (currentPage < totalPages - 2) {
      pages.push('...');
    }
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const isDisabled = (direction: 'prev' | 'next') => {
    return direction === 'prev' ? currentPage === 1 : currentPage === totalPages;
  };

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <button
        onClick={handlePrevious}
        disabled={isDisabled('prev')}
        className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 transition-all duration-200 hover:border-[#00CCCC] hover:text-[#00CCCC] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-400"
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="flex items-center justify-center w-10 h-10 text-gray-400"
              >
                <MoreHorizontal size={16} />
              </span>
            );
          }

          const pageNumber = page as number;
          const isActive = currentPage === pageNumber;

          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-200 font-medium ${isActive
                  ? 'border-[#00CCCC] bg-[#00CCCC] text-white shadow-md'
                  : 'border-gray-200 text-gray-600 hover:border-[#00CCCC] hover:text-[#00CCCC]'
                }`}
              aria-label={`Page ${pageNumber}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button
        onClick={handleNext}
        disabled={isDisabled('next')}
        className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 transition-all duration-200 hover:border-[#00CCCC] hover:text-[#00CCCC] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-400"
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
      <div className="ml-4 hidden sm:flex items-center gap-2 text-sm text-gray-600">
        <span className="font-medium">{currentPage}</span>
        <span>of</span>
        <span className="font-medium">{totalPages}</span>
        <span>pages</span>
      </div>
    </div>
  );
}