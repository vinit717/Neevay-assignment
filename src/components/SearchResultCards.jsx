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
          {cards.map((business) => (
            <BusinessCard key={business.vendorId} business={business} onViewContact={handleViewContact} />
          ))}
        </div>
      </div>
      {selectedBusiness && (
        <ContactInfoPopup business={selectedBusiness} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default SearchResultCards;
