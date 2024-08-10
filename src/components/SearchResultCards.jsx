import React from 'react';
import ContactInfoPopup from './Cards/ContactInfoPopup';
import BusinessCard from './Cards/BusinessCard';
import SearchResultBadges from './SearchResultBadges';

const SearchResultCards = ({ cards, badges, onRemoveBadge }) => {
  const [selectedBusiness, setSelectedBusiness] = React.useState(null);

  const handleViewContact = (business) => {
    setSelectedBusiness(business);
  };

  const handleClosePopup = () => {
    setSelectedBusiness(null);
  };

  return (
    <div>
      <SearchResultBadges badges={badges} onRemoveBadge={onRemoveBadge} />
      <div className="min-h-screen flex flex-col items-center pr-8">
        <div className="w-full max-w-6xl">
          {cards.length > 0 ? (
            cards.map((business) => (
              <BusinessCard key={business.vendorId} business={business} onViewContact={handleViewContact} />
            ))
          ) : (
            <div className="text-center text-gray-500 mt-10 lg:w-[867px] md:w-[664px] md:h-[284px] lg:h-[299px]">
              No results found
            </div>
          )}
        </div>
      </div>
      {selectedBusiness && (
        <ContactInfoPopup business={selectedBusiness} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default SearchResultCards;
