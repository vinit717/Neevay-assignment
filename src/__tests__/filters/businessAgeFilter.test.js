import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BusinessAgeFilter from '../../components/Filters/BusinessAgeFilter';
import { actionTypes } from '../../store/searchReducer';

describe('BusinessAgeFilter Component', () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
  });

  test('renders dropdown button and initially hides options', () => {
    render(<BusinessAgeFilter dispatch={dispatchMock} filters={{}} />);

    const dropdownButton = screen.getByText(/Business Age/i);
    expect(dropdownButton).toBeInTheDocument();

    const radioOption = screen.queryByLabelText(/0-20 Years/i);
    expect(radioOption).not.toBeInTheDocument();
  });

  test('toggles dropdown when button is clicked', () => {
    render(<BusinessAgeFilter dispatch={dispatchMock} filters={{}} />);

    const dropdownButton = screen.getByText(/Business Age/i);
    fireEvent.click(dropdownButton);

    const radioOption = screen.getByLabelText(/0-20 Years/i);
    expect(radioOption).toBeInTheDocument();

    fireEvent.click(dropdownButton);
    expect(screen.queryByLabelText(/0-20 Years/i)).not.toBeInTheDocument();
  });

  test('selecting a business age range dispatches correct action', () => {
    render(<BusinessAgeFilter dispatch={dispatchMock} filters={{}} />);

    const dropdownButton = screen.getByText(/Business Age/i);
    fireEvent.click(dropdownButton);

    const rangeOption = screen.getByLabelText(/20-40 Years/i);
    fireEvent.click(rangeOption);

    expect(dispatchMock).toHaveBeenCalledWith({
      type: actionTypes.SET_FILTERS,
      payload: { businessAge: '20-40' },
    });

    expect(rangeOption).toBeChecked();
  });

  test('should render with selected filter value', () => {
    render(<BusinessAgeFilter dispatch={dispatchMock} filters={{ businessAge: '40+' }} />);

    const dropdownButton = screen.getByText(/Business Age/i);
    fireEvent.click(dropdownButton);

    const selectedOption = screen.getByLabelText(/40\+ Years/i);
    expect(selectedOption).toBeChecked();
  });
});
