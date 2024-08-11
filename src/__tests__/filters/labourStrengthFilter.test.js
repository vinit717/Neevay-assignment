import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LabourStrengthFilter from '../../components/Filters/LabourStrengthFilter';
import { actionTypes } from '../../store/searchReducer';


describe('LabourStrengthFilter Component', () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
  });

  test('renders dropdown button and initially hides options', () => {
    render(<LabourStrengthFilter dispatch={dispatchMock} filters={{}} />);

    const dropdownButton = screen.getByText(/Labour Strength/i);
    expect(dropdownButton).toBeInTheDocument();

    const radioOption = screen.queryByLabelText(/0-20/i);
    expect(radioOption).not.toBeInTheDocument();
  });

  test('toggles dropdown when button is clicked', () => {
    render(<LabourStrengthFilter dispatch={dispatchMock} filters={{}} />);

    const dropdownButton = screen.getByText(/Labour Strength/i);
    fireEvent.click(dropdownButton);

    const radioOption = screen.getByLabelText(/0-20/i);
    expect(radioOption).toBeInTheDocument();

    fireEvent.click(dropdownButton);
    expect(screen.queryByLabelText(/0-20/i)).not.toBeInTheDocument();
  });

  test('selecting a labour strength range dispatches correct action', () => {
    render(<LabourStrengthFilter dispatch={dispatchMock} filters={{}} />);

    const dropdownButton = screen.getByText(/Labour Strength/i);
    fireEvent.click(dropdownButton);

    const rangeOption = screen.getByLabelText(/20-40/i);
    fireEvent.click(rangeOption);

    expect(dispatchMock).toHaveBeenCalledWith({
      type: actionTypes.SET_FILTERS,
      payload: { laborStrength: '20-40' },
    });

    expect(rangeOption).toBeChecked();
  });

  test('should render with selected filter value', () => {
    render(<LabourStrengthFilter dispatch={dispatchMock} filters={{ laborStrength: '60-80' }} />);

    const dropdownButton = screen.getByText(/Labour Strength/i);
    fireEvent.click(dropdownButton);

    const selectedOption = screen.getByLabelText(/60-80/i);
    expect(selectedOption).toBeChecked();
  });
});
