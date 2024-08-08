export const initialState = {
    vendors: [],
    filteredVendors: [],
    currentPage: 1,
    filters: {
      searchTerm: '',
      vendorType: '',
      city: '',
      verifiedStatus: false
    }
  };
  
  export const actionTypes = {
    SET_VENDORS: 'SET_VENDORS',
    SET_FILTERS: 'SET_FILTERS',
    SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
    APPLY_FILTERS: 'APPLY_FILTERS'
  };
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case actionTypes.SET_VENDORS:
        return {
          ...state,
          vendors: action.payload,
          filteredVendors: action.payload
        };
      case actionTypes.SET_FILTERS:
        return {
          ...state,
          filters: {
            ...state.filters,
            ...action.payload
          }
        };
      case actionTypes.SET_CURRENT_PAGE:
        return {
          ...state,
          currentPage: action.payload
        };
      case actionTypes.APPLY_FILTERS:
        const filteredVendors = state.vendors
          .filter(vendor => vendor.services.some(service => service.toLowerCase().includes(state.filters.searchTerm.toLowerCase())))
          .filter(vendor => !state.filters.verifiedStatus || vendor.verifiedStatus)
          .filter(vendor => !state.filters.city || vendor.officeAddress.City === state.filters.city);
  
        return {
          ...state,
          filteredVendors
        };
      default:
        return state;
    }
  };
  