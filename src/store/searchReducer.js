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
            ? vendor.officeAddress?.City === city
            : (!city ||
                vendor.officeAddress?.City === city ||
                vendor.serviceLocations?.Selectedcities.includes(city));
  
          const matchesTurnover = vendor.turnover
            ? parseInt(vendor.turnover.replace(/\D/g, '')) >= turnoverRange[0] &&
              parseInt(vendor.turnover.replace(/\D/g, '')) <= turnoverRange[1]
            : true;
            
          const matchesLaborStrength = () => {
            if (!laborStrength) return true;
            if (laborStrength === '100+') return parseInt(vendor.laborStrength.split('-')[1]) >= 100;
            
            const [filterMin, filterMax] = laborStrength.split('-').map(Number);
            const [vendorMin, vendorMax] = vendor.laborStrength.split('-').map(Number);
            
            return (vendorMin <= filterMax && vendorMax >= filterMin);
          };
  
          const matchesBusinessAge = () => {
            if (!businessAge) return true;
            const [filterMin, filterMax] = businessAge.split('-').map(num => parseInt(num.trim()));
            const vendorAge = parseInt(vendor.businessAge.split('-')[1]);
            
            if (businessAge.includes('+')) {
              return vendorAge >= filterMin;
            }
            return vendorAge >= filterMin && vendorAge <= filterMax;
          };
  
          const matchesMinProjectsCompleted = () => {
            if (!minProjectsCompleted) return true;
            return vendor.projectsCompleted >= minProjectsCompleted;
          };
  
          const matchesMarketSector = () => {
            if (!marketSector) return true;
            const sectors = marketSector.split(', ').map(s => s.toUpperCase());
            return sectors.some(sector => vendor.marketSector.includes(sector));
          };
  
          return (
            (!vendorType || vendor.vendorType.includes(vendorType)) &&
            (!services || vendor.services.some(service => service.includes(services))) &&
            matchesCity &&
            (!searchTerm || vendor.vendorName.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (!verifiedStatus || vendor.verifiedStatus === verifiedStatus) &&
            matchesMarketSector() &&
            matchesLaborStrength() &&
            matchesBusinessAge() &&
            matchesMinProjectsCompleted() &&
            matchesTurnover
          );
        });
  
        console.log('Filtered vendors:', filtered);
        return { ...state, filteredVendors: filtered };
  
      default:
        return state;
    }
  };
  
  
  
  