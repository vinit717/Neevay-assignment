import React, { useState } from 'react';
import { actionTypes } from '../../store/searchReducer';

const LabourStrengthFilter = ({ dispatch, filters }) => {
    const [labour, setLabour] = useState(false);
    const [selectedRange, setSelectedRange] = useState(filters.laborStrength || '');

    const handleLabourDropdown = () => {
        setLabour(!labour);
    };

    const handleRangeSelection = (range) => {
        setSelectedRange(range);
        dispatch({
            type: actionTypes.SET_FILTERS,
            payload: { laborStrength: range },
        });
    };

    const ranges = ['0-20', '20-40', '40-60', '60-80', '80-100', '100+'];

    return (
        <div>
            <button
                onClick={handleLabourDropdown}
                className="w-full flex items-center justify-between text-[#2F2F1C] text-base font-semibold"
            >
                Labour Strength
                <img
                    src="https://storagereponeevaydevcdn.blob.core.windows.net/business/dropdown_arrow.svg"
                    alt="Dropdown"
                    className={`transition-transform duration-300 ${labour ? 'rotate-180' : 'rotate-0'}`}
                />
            </button>
            {labour && (
                <div className="flex flex-col mt-2 p-2 max-h-60 overflow-y-auto bg-gray-100">
                    {ranges.map((range, index) => (
                        <div className="flex items-center mb-2" key={index}>
                            <input
                                id={`labour-radio-${index + 1}`}
                                type="radio"
                                value={range}
                                name="labour-radio"
                                checked={selectedRange === range}
                                onChange={() => handleRangeSelection(range)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-1"
                            />
                            <label htmlFor={`labour-radio-${index + 1}`} className="ms-2 text-sm font-medium text-gray-900">
                                {range}
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LabourStrengthFilter;