import React from 'react';

const SearchResultPagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  return (
    <div className='flex justify-end items-center space-x-4'>
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img src="https://storagereponeevaydevcdn.blob.core.windows.net/business/dropdown_arrow.svg" alt="Previous" className='rotate-90' />
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageClick(index + 1)}
          className={`border ${currentPage === index + 1 ? 'bg-black text-white' : 'border-black text-black'} px-3 py-1`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <img src="https://storagereponeevaydevcdn.blob.core.windows.net/business/dropdown_arrow.svg" alt="Next" style={{ transform: 'rotate(270deg)' }} />
      </button>
    </div>
  );
};

export default SearchResultPagination;
