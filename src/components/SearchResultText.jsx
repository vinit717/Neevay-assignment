const SearchResultText = ({ totalResults, searchTerm }) => {
  return (
    <div>
      <p className='bg-[#E6E6E5] text-base px-8 py-4 mt-[92px]'>
        Showing 1-10 of {totalResults} results for <span className='font-bold'>“{searchTerm}”</span>
      </p>
    </div>
  );
};

export default SearchResultText;
