import React, { useState, useEffect } from 'react';
import vendorData from '../vendorData.json';
import ContactInfoPopup from './Cards/ContactInfoPopup';
import BusinessCard from './Cards/BusinessCard';

const SearchResultCards = () => {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);

  const cardsPerPage = 5;

  useEffect(() => {
    setData(vendorData); // Load data from JSON
  }, []);

  const handleViewContact = (business) => {
    setSelectedBusiness(business);
  };

  const handleClosePopup = () => {
    setSelectedBusiness(null);
  };


  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <div>
      <div className="min-h-screen flex flex-col items-center pr-8">
        <div className="w-full max-w-6xl">
          {currentCards.map((business) => (
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
