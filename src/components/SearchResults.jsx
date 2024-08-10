import React, { useReducer, useEffect } from 'react';
import SearchResultNavbar from './SearchResultNavbar';
import SearchResultCards from './SearchResultCards';
import SearchResultFilters from './SearchResultFilters';
import SearchResultText from './SearchResultText';
import SearchResultPagination from './SearchResultPagination';
import SearchResultFooter from './SearchResultFooter';
import { initialState, reducer, actionTypes } from '../store/searchReducer';
import vendorData from '../vendorData.json';

const SearchResults = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: actionTypes.SET_VENDORS, payload: vendorData });
    }, []);

    const handleSearchChange = (filters) => {
        const filteredVendors = vendorData.filter((vendor) =>
            vendor.vendorName.toLowerCase().includes(filters.services.toLowerCase())
        );
        dispatch({ type: actionTypes.SET_SEARCHED_VENDORS, payload: filteredVendors });
    };

    const handlePageChange = (pageNumber) => {
        dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: pageNumber });
    };

    const handleRemoveBadge = (badge) => {
        dispatch({ type: actionTypes.REMOVE_BADGE, payload: { badge } });
    };

    useEffect(() => {
        dispatch({ type: actionTypes.APPLY_FILTERS });
    }, [state.filters, state.searchedVendors]);

    const currentPage = state.currentPage;
    const cardsPerPage = 5;
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = state.filteredVendors.slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(state.filteredVendors.length / cardsPerPage);

    return (
        <div
            className='max-w-[1280px] mx-auto flex flex-col justify-center hide-scrollbar'
            style={{ overflowY: 'scroll', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
            <style>
                {`
                  .hide-scrollbar {
                    -ms-overflow-style: none; /* Internet Explorer 10+ */
                    scrollbar-width: none; /* Firefox */
                  }
                  .hide-scrollbar::-webkit-scrollbar {
                    display: none; /* Safari and Chrome */
                  }
                `}
            </style>
            <SearchResultNavbar onSearchChange={handleSearchChange} />
            <SearchResultText 
                totalResults={state.filteredVendors.length} 
                searchTerm={state.filters.services} 
            />
            <div className='flex justify-between bg-gray-100'>
                <div className='my-8 h-screen overflow-y-auto hide-scrollbar'>
                <SearchResultFilters 
                  dispatch={dispatch} 
                  filters={state.filters} 
                />

                </div>
                <div className='mt-8 h-screen overflow-y-auto hide-scrollbar'>
                    <SearchResultCards  cards={currentCards} 
                        badges={state.badges} 
                        onRemoveBadge={handleRemoveBadge}  />
                </div>
            </div>
            <div className='bg-gray-100 pb-8 pr-8'>
                <SearchResultPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
            <SearchResultFooter />
        </div>
    );
};

export default SearchResults;
