export const initialState = {
    vendors: [],
    filteredVendors: [],
    currentPage: 1,
    filters: {
      searchTerm: '',
      vendorType: '',
      city: '',
      services: '',
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
          filteredVendors: action.payload,
        };
      case actionTypes.SET_FILTERS:
        return {
          ...state,
          filters: {
            ...state.filters,
            ...action.payload,
          },
        };
      case actionTypes.SET_CURRENT_PAGE:
        return {
          ...state,
          currentPage: action.payload,
        };
      case actionTypes.APPLY_FILTERS:
        const { searchTerm, vendorType, services, city } = state.filters;
        const filtered = state.vendors.filter((vendor) => {
          const matchesCity =
            (!city ||
              (vendor.officeAddress?.City?.includes(city)) ||
              (vendor.serviceLocations?.Selectedcities?.includes(city)));
  
          return (
            (!vendorType || (vendor.vendorType && vendor.vendorType.includes(vendorType))) &&
            (!services || (vendor.services && vendor.services.some(service => service.includes(services)))) &&
            matchesCity &&
            (!searchTerm || (vendor.vendorName && vendor.vendorName.toLowerCase().includes(searchTerm.toLowerCase())))
          );
        });
        console.log('Filtered vendors:', filtered);
        return { ...state, filteredVendors: filtered };
      default:
        return state;
    }
  };
  
  