import { initialState, reducer, actionTypes } from '../store/searchReducer';

describe('Store Reducer', () => {

  test('should set vendors correctly', () => {
    const vendors = [{ vendorName: 'Vendor 1' }, { vendorName: 'Vendor 2' }];
    const action = { type: actionTypes.SET_VENDORS, payload: vendors };
    const newState = reducer(initialState, action);
    
    expect(newState.vendors).toEqual(vendors);
    expect(newState.searchedVendors).toEqual(vendors);
    expect(newState.filteredVendors).toEqual(vendors);
  });

  test('should set filters correctly', () => {
    const filters = { vendorType: 'Type1', city: 'City1' };
    const action = { type: actionTypes.SET_FILTERS, payload: filters };
    const newState = reducer(initialState, action);

    expect(newState.filters.vendorType).toBe('Type1');
    expect(newState.filters.city).toBe('City1');
  });

  test('should set searchedVendors correctly', () => {
    const searchedVendors = [{ vendorName: 'Searched Vendor 1' }];
    const action = { type: actionTypes.SET_SEARCHED_VENDORS, payload: searchedVendors };
    const newState = reducer(initialState, action);
    
    expect(newState.searchedVendors).toEqual(searchedVendors);
    expect(newState.filteredVendors).toEqual(searchedVendors);
  });

  test('should set current page correctly', () => {
    const action = { type: actionTypes.SET_CURRENT_PAGE, payload: 2 };
    const newState = reducer(initialState, action);
    
    expect(newState.currentPage).toBe(2);
  });

});