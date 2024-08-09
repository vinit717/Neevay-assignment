// OfficeAddressFilter.js
import React from 'react';

const OfficeAddressFilter = () => {
    return (
        <div className='flex justify-between items-center'>
            <div className='flex items-center'>
                <p className="ms-2 text-sm w-fit font-medium text-black">Search by Office Address Only</p>
            </div>
            <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="mr-[2px] relative w-11 h-6 bg-[#ACACAC] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
        </div>
    );
};

export default OfficeAddressFilter;