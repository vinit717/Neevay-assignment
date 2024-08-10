const SearchResultBadges = ({ badges, onRemoveBadge }) => {
    console.log("bagessssss+++", badges);
    console.log("onremovebadges", onRemoveBadge)
    return (
      <div className='space-x-4 mt-8'>
        {badges.map((badge) => (
          <span
            key={badge}
            id={`badge-dismiss-${badge}`}
            className="inline-flex items-center px-2 py-1 text-sm font-medium text-black bg-[#E0E0D3]"
          >
            {badge}
            <button
              type="button"
              className="inline-flex items-center p-1 ms-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900"
              onClick={() => onRemoveBadge(badge)}
              aria-label="Remove"
            >
              <svg
                className="w-2 h-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">close</span>
            </button>
          </span>
        ))}
      </div>
    );
  };
  
  export default SearchResultBadges;
  