// MarketSectorFilter.js
import React, { useState } from 'react';
import { actionTypes } from '../../store/searchReducer';


const allMarketSectors = [
    'HealthCare', 'Industrial', 'Infrastructure', 'Residential', 'Commercial', 'Hospitals', 'Hotel', 'Data Centers'
];

const MarketSectorFilter = ({ dispatch, filters }) => {
    const [selectedCities, setSelectedCities] = useState(filters.city ? [filters.city] : []);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showAll, setShowAll] = useState(false);

    const handleMarketSectorDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleCheckboxChange = (city) => {
        let updatedCities = selectedCities.includes(city)
            ? selectedCities.filter(c => c !== city)
            : [...selectedCities, city];
        setSelectedCities(updatedCities);

        dispatch({
            type: actionTypes.SET_FILTERS,
            payload: { city: updatedCities.join(', ') },
        });
    };

    const MarketSectorToShow = showAll ? allMarketSectors : allMarketSectors.slice(0, 4);

    return (
        <div>
            <button onClick={handleMarketSectorDropdown} className='w-full flex items-center justify-between text-base text-[#2F2F1C] font-semibold'>
                Market Sector
                <img src="https://storagereponeevaydevcdn.blob.core.windows.net/business/dropdown_arrow.svg" alt="v"
                    className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>

            {isDropdownOpen && (
                <div>
                    <div style={{ maxHeight: '200px', overflowY: 'scroll' }} className='p-2'>
                        {MarketSectorToShow.map(sector => (
                            <div className='flex items-center mb-2' key={sector}>
                                <input
                                    type="checkbox"
                                    checked={selectedCities.includes(sector)}
                                    onChange={() => handleCheckboxChange(sector)}
                                    className='w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 rounded-sm focus:ring-1 focus:ring-blue-500'
                                />
                                <label className='ms-2 text-sm font-medium text-gray-900'>
                                    {sector}
                                </label>
                            </div>
                        ))}
                    </div>
                    <button
                        className='text-blue-600 text-left text-sm pl-2'
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? 'View Less' : 'View All...'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default MarketSectorFilter;