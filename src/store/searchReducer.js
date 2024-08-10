export const initialState = {
  vendors: [],
  searchedVendors: [],
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
  badges: [],
};

export const actionTypes = {
  SET_VENDORS: 'SET_VENDORS',
  SET_FILTERS: 'SET_FILTERS',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  APPLY_FILTERS: 'APPLY_FILTERS',
  ADD_BADGE: 'ADD_BADGE',
  REMOVE_BADGE: 'REMOVE_BADGE',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_VENDORS:
      return {
        ...state,
        vendors: action.payload,
        searchedVendors: action.payload,  
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
    case actionTypes.SET_SEARCHED_VENDORS:
      return {
        ...state,
        searchedVendors: action.payload,
        filteredVendors: action.payload
      };
    case actionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
      case actionTypes.APPLY_FILTERS:
        const {
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
      
        const isDefaultTurnoverRange = turnoverRange[0] === 0 && turnoverRange[1] === 100;
        const filtered = state.searchedVendors.filter((vendor) => {
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
      
              return vendorMin <= filterMax && vendorMax >= filterMin;
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
      
          const matchesServices = () => {
              if (!services) return true;
              return vendor.services.some(service => service.toLowerCase().includes(services.toLowerCase()));
          };
      
          return (
              (!vendorType || vendor.vendorType.includes(vendorType)) &&
              matchesServices() &&
              matchesCity &&
              (!verifiedStatus || vendor.verifiedStatus === verifiedStatus) &&
              matchesMarketSector() &&
              matchesLaborStrength() &&
              matchesBusinessAge() &&
              matchesMinProjectsCompleted() &&
              matchesTurnover
          );
        });
      
        const appliedFilters = Object.entries(state.filters)
          .filter(([key, value]) => {
            if (key === 'turnoverRange' && isDefaultTurnoverRange) return false;
            return value && key !== 'searchTerm' && key !== 'vendorType' && key !== 'city' && key !== 'services';
          })
          .map(([key]) => key);
      
        return {
          ...state,
          filteredVendors: filtered,
          badges: appliedFilters,
        };
      // case actionTypes.ADD_BADGE:
      //   const newBadge = action.payload.badge;
      //   if (!state.badges.includes(newBadge)) {
      //     console.log('Adding badge:', newBadge);
      //     return {
      //       ...state,
      //       badges: [...state.badges, newBadge],
      //     };
      //   }
      //   return state;
  

    case actionTypes.REMOVE_BADGE:
      const { badge } = action.payload;
      const newFilters = { ...state.filters };

      switch (badge) {
        case 'Verified Vendor':
          newFilters.verifiedStatus = false;
          break;
        case 'Turnover':
          newFilters.turnoverRange = [0, 100];
          break;
        default:
          newFilters[badge] = '';
          break;
      }

      const updatedBadges = state.badges.filter(b => b !== badge);

      return {
        ...state,
        filters: newFilters,
        badges: updatedBadges,
      };

    default:
      return state;
  }
};

