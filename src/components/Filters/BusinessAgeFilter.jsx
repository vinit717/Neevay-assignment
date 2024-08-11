import React, { useState } from 'react';
import { actionTypes } from '../../store/searchReducer';

const BusinessAgeFilter = ({ dispatch, filters }) => {
    const [businessAge, setBusinessAge] = useState(false);
    const [selectedRange, setSelectedRange] = useState(filters.businessAge || '');

    const handleBusinessAgeDropdown = () => {
        setBusinessAge(!businessAge);
    };

    const handleRangeSelection = (range) => {
        setSelectedRange(range);
        dispatch({
            type: actionTypes.SET_FILTERS,
            payload: { businessAge: range },
        });
    };

    const ranges = ['0-20', '20-40', '40+'];

    return (
        <div>
            <button 
                onClick={handleBusinessAgeDropdown} 
                className='w-full flex items-center justify-between text-base text-[#2F2F1C] font-semibold'
            >
                Business Age
                <img 
                    src="https://storagereponeevaydevcdn.blob.core.windows.net/business/dropdown_arrow.svg" 
                    alt="v"
                    className={`transition-transform duration-300 ${businessAge ? 'rotate-180' : 'rotate-0'}`} 
                />
            </button>

            {businessAge && (
                <div className="flex flex-col mt-2 p-2">
                    {ranges.map((range, index) => (
                        <div className="flex items-center mb-2" key={index}>
                            <input
                                id={`business-age-${index + 1}`}
                                type="radio"
                                value={range}
                                name="business-age-radio"
                                checked={selectedRange === range}
                                onChange={() => handleRangeSelection(range)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-1"
                            />
                            <label htmlFor={`business-age-${index + 1}`} className="ms-2 text-sm font-medium text-gray-900">
                                {range === '40+' ? '40+ Years' : `${range} Years`}
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BusinessAgeFilter;