const SearchResultText = ({ totalResults = 0, searchTerm = '' }) => {
  const defaultMessage = 'Showing 1-10 of 232 results for “Plumbing”';

  const message = totalResults && searchTerm
    ? `Showing 1-10 of ${totalResults} results for “${searchTerm}”`
    : defaultMessage;

  return (
    <div>
      <p className='bg-[#E6E6E5] text-base px-8 py-4 mt-[92px]'>
        {message}
      </p>
    </div>
  );
};

export default SearchResultText;
