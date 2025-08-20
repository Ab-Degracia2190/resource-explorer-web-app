import React from 'react';
import PrimaryButton from '@/components/partials/buttons/Primary';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = ""
}) => {
  const getVisiblePages = (screenSize: 'mobile' | 'tablet' | 'desktop') => {
    let maxVisible: number;
    
    // Adjust max visible pages based on screen size
    switch (screenSize) {
      case 'mobile':
        maxVisible = 3;
        break;
      case 'tablet':
        maxVisible = 4;
        break;
      case 'desktop':
      default:
        maxVisible = 5;
        break;
    }
    
    // If total pages is less than or equal to maxVisible, show all pages
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Calculate the start of the sliding window
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;
    
    // Adjust if we're near the end
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }
    
    // Generate the array of visible page numbers
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  if (totalPages <= 1) return null;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex justify-center items-center gap-1 sm:gap-2">
      {/* First page button */}
      <PrimaryButton
        label="<<"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="!bg-gradient-to-r !from-blue-600 !to-blue-700 hover:!from-blue-700 hover:!to-blue-800 !py-2 !px-3 !text-xs flex items-center gap-2 disabled:!from-gray-400 disabled:!to-gray-500"
      />

      {/* Previous button */}
      <PrimaryButton
        label="<"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="!bg-gradient-to-r !from-gray-600 !to-gray-700 hover:!from-gray-700 hover:!to-gray-800 !py-2 !px-4 !text-xs flex items-center gap-2"
      />

      {/* Mobile pagination */}
      <div className="flex items-center gap-1 sm:hidden">
        {getVisiblePages('mobile').map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`cursor-pointer px-2 py-1 text-xs rounded-lg font-medium transition-all duration-200 ${
              currentPage === page
                ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Tablet pagination */}
      <div className="hidden sm:flex md:hidden items-center gap-1">
        {getVisiblePages('tablet').map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`cursor-pointer px-2 py-1 text-sm rounded-lg font-medium transition-all duration-200 ${
              currentPage === page
                ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Desktop pagination */}
      <div className="hidden md:flex items-center gap-1">
        {getVisiblePages('desktop').map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`cursor-pointer px-3 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${
              currentPage === page
                ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next button */}
      <PrimaryButton
        label=">"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="!bg-gradient-to-r !from-gray-600 !to-gray-700 hover:!from-gray-700 hover:!to-gray-800 !py-2 !px-4 !text-xs flex items-center gap-2"
      />

      {/* Last page button */}
      <PrimaryButton
        label=">>"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="!bg-gradient-to-r !from-blue-600 !to-blue-700 hover:!from-blue-700 hover:!to-blue-800 !py-2 !px-3 !text-xs flex items-center gap-2 disabled:!from-gray-400 disabled:!to-gray-500"
      />
      </div>

      {/* Page indicator for very small screens - shows current/total */}
      <div className="sm:hidden mt-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
        {currentPage} / {totalPages}
      </div>
    </div>
  );
};

export default Pagination;