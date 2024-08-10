import React from 'react';
import { actionTypes } from '../../store/searchReducer';

const OfficeAddressFilter = ({ dispatch, filters }) => {
    const handleChange = (event) => {
        dispatch({
            type: actionTypes.SET_FILTERS,
            payload: { searchByOfficeAddressOnly: event.target.checked },
        });
        dispatch({ type: actionTypes.APPLY_FILTERS });
    };

    return (
        <div className='flex justify-between items-center'>
            <div className='flex items-center'>
            <p className="ms-2 w-fit  text-sm font-medium text-black flex items-center">
  Search by Office Address Only 
  <span 
    className="bg-[#4E4E4E]  text-[10px]  text-[#CCCCCC] w-[12px] h-[12px] rounded-full flex items-center justify-center font-bold ms-1 relative top-0.5 cursor-pointer"
  >
    ?
  </span>
</p>

            </div>
            <label className="inline-flex items-center cursor-pointer">
                <input 
                    type="checkbox" 
                    checked={filters.searchByOfficeAddressOnly} 
                    onChange={handleChange}
                    className="sr-only peer" 
                />
                <div className="mr-[2px] relative w-11 h-6 bg-[#ACACAC] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
        </div>
    );
};

export default OfficeAddressFilter;
