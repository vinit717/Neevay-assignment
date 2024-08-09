export const initialState = {
  vendors: [],
  filteredVendors: [],
  currentPage: 1,
  filters: {
    searchTerm: '',
    vendorType: '',
    city: '',
    services: '',
    verifiedStatus: false,
    marketSector: '',
    turnoverRange: [0, 100],
    laborStrength: '',
    businessAge: '',
    minProjectsCompleted: 0,
    searchByOfficeAddressOnly: false,
  },
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
        const {
          searchTerm,
          vendorType,
          services,
          city,
          verifiedStatus,
          marketSector,
          turnoverRange,
          laborStrength,
          businessAge,
          minProjectsCompleted,
          searchByOfficeAddressOnly,
        } = state.filters;
  
        const filtered = state.vendors.filter((vendor) => {
          const matchesCity = searchByOfficeAddressOnly
            ? vendor.officeAddress?.City?.includes(city)
            : (!city ||
                vendor.officeAddress?.City?.includes(city) ||
                vendor.serviceLocations?.Selectedcities?.includes(city));
  
          const matchesTurnover = vendor.turnover
            ? parseInt(vendor.turnover.replace(/\D/g, '')) >= turnoverRange[0] &&
              parseInt(vendor.turnover.replace(/\D/g, '')) <= turnoverRange[1]
            : true;
  
          return (
            (!vendorType || vendor.vendorType.includes(vendorType)) &&
            (!services || vendor.services.some(service => service.includes(services))) &&
            matchesCity &&
            (!searchTerm || vendor.vendorName.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (!verifiedStatus || vendor.verifiedStatus === verifiedStatus) &&
            (!marketSector || vendor.marketSector.includes(marketSector)) &&
            (!laborStrength || vendor.laborStrength.includes(laborStrength)) &&
            (!businessAge || vendor.businessAge.includes(businessAge)) &&
            (!minProjectsCompleted || vendor.projectsCompleted >= minProjectsCompleted) &&
            matchesTurnover
          );
        });
  
        console.log('Filtered vendors:', filtered);
        return { ...state, filteredVendors: filtered };
  
      default:
        return state;
    }
  };
  
  
  