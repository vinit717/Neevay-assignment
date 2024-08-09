import React from 'react';
import VerifiedVendorsFilter from './Filters/VerifiedVendorsFilter';
import OfficeAddressFilter from './Filters/OfficeAddressFilter';
import MarketSectorFilter from './Filters/MarketSectorFilter';
import TurnoverFilter from './Filters/TurnoverFilter';
import LabourStrengthFilter from './Filters/LabourStrengthFilter';
import BusinessAgeFilter from './Filters/BusinessAgeFilter';
import ProjectsCompletedFilter from './Filters/ProjectsCompletedFilter';

const SearchResultFilters = ({ dispatch, filters }) => {
    return (
        <div className='w-[340px] h-[90vh] overflow-hidden'>
            <div className='flex flex-col sticky px-8 pt-[24px] h-full'
                style={{ overflowY: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                <div style={{ overflowY: 'scroll', msOverflowStyle: 'none', scrollbarWidth: 'none' }} className='space-y-8'>
                    <h3 className='text-2xl font-bold'>Filters</h3>
                    <VerifiedVendorsFilter />
                    <OfficeAddressFilter />
                    <MarketSectorFilter dispatch={dispatch} filters={filters} />
                    <TurnoverFilter dispatch={dispatch} filters={filters} />
                    <LabourStrengthFilter dispatch={dispatch} filters={filters} />
                    <BusinessAgeFilter dispatch={dispatch} filters={filters}/>
                    <ProjectsCompletedFilter dispatch={dispatch} filters={filters} />
                </div>
            </div>
        </div>
    );
};

export default SearchResultFilters;