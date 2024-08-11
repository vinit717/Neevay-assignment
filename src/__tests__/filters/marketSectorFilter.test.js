import React from 'react';
import { render, screen } from '@testing-library/react';
import MarketSectorFilter from '../../components/Filters/MarketSectorFilter';


describe('MarketSectorFilter Component', () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
  });

  test('renders dropdown button and initially hides options', () => {
    render(<MarketSectorFilter dispatch={dispatchMock} filters={{}} />);

    const dropdownButton = screen.getByText(/Market Sector/i);
    expect(dropdownButton).toBeInTheDocument();

    const checkboxOption = screen.queryByLabelText(/Healthcare/i);
    expect(checkboxOption).not.toBeInTheDocument();
  });
});
