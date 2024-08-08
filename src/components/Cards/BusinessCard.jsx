import React, { useState } from 'react';

const BusinessCard = ({ business, onViewContact }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedDescription = business.vendorDescription.slice(0, 150);

  return (
    <div style={{ boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.15)', overflowY: 'scroll', msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="overflow-y-auto lg:w-[867px] md:w-[664px] md:h-[284px] lg:h-[299px] bg-white md:p-[28px] lg:px-[35px] lg:pt-[35px] lg:pb-[15px] rounded-sm my-6">
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <img src="https://storagereponeevaydevcdn.blob.core.windows.net/business/no_business_img.svg" alt="Vendor" className="lg:h-[140px] lg:w-[140px] md:w-[107px] md:h-[107px] object-cover" />
          <div>
            <h3 className="text-xl font-bold text-[#212112]">{business.vendorName}</h3>
            <div className="flex items-center pb-2 md:pt-[6px] md:pb-[12px]">
              {business.verifiedStatus && (
                <>
                  <img src="https://storagereponeevaydevcdn.blob.core.windows.net/business/blue_tick.svg" alt="blue tick" />
                  <span className="text-sm font-medium text-gray-600 pl-[3px]">Verified vendor</span>
                </>
              )}
            </div>
            <p className="text-sm font-bold text-gray-500 pb-2">{business.services.join(', ')}</p>
            <div className="bg-[#F5F4F5] md:w-[360px] lg:w-[479px] grid grid-cols-2 gap-4 md:p-[10px] lg:p-[19px]">
              <div className="flex items-center space-x-2">
                <img src="https://storagereponeevaydevcdn.blob.core.windows.net/business/rupees.svg" alt="Rs." />
                <span className="text-gray-700 md:text-xs lg:text-sm">Turnover :</span>
                <span className="font-bold md:text-xs lg:text-sm">{business.turnover}</span>
              </div>
              <div className="flex items-center justify-end space-x-2">
                <img src="https://storagereponeevaydevcdn.blob.core.windows.net/business/labour_strength.svg" alt="labour" />
                <span className="text-gray-700 md:text-xs lg:text-sm">Labor Strength :</span>
                <span className="font-bold md:text-xs lg:text-sm">{business.laborStrength}</span>
              </div>
              <div className="flex items-center space-x-2">
                <img src="https://storagereponeevaydevcdn.blob.core.windows.net/business/business_age.svg" alt="age" />
                <span className="text-gray-700 md:text-xs lg:text-sm">Business Age :</span>
                <span className="font-bold md:text-xs lg:text-sm">{business.businessAge}</span>
              </div>
              <div className="flex items-center justify-end space-x-2">
                <img src="https://storagereponeevaydevcdn.blob.core.windows.net/business/projects_completed.svg" alt="proj." />
                <span className="text-gray-700 md:text-xs lg:text-sm">Projects Completed :</span>
                <span className="font-bold md:text-xs lg:text-sm">{business.projectsCompleted}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button className="mx-4 text-base font-bold text-[#4E4E4E] underline">View Profile</button>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div className="text-sm w-[620px] text-gray-500 mt-[15px]">
          {isExpanded ? business.vendorDescription : truncatedDescription}
          <button onClick={handleToggle} className="text-blue-500 underline ml-1">
            {isExpanded ? "See Less" : "See More"}
          </button>
        </div>
        <button
          onClick={() => onViewContact(business)}
          className="lg:w-[125px] lg:h-[44px] md:w-[129px] md:h-[44px] flex justify-center items-center text-white text-sm bg-[#2D2D24] rounded-sm"
        >
          View Contact
        </button>
      </div>
    </div>
  );
};

export default BusinessCard;
