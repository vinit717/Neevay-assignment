import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OfficeAddressFilter from '../../components/Filters/OfficeAddressFilter';
import { actionTypes } from '../../store/searchReducer';

describe('OfficeAddressFilter Component', () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
  });

  test('renders the Office Address filter with the correct label', () => {
    render(<OfficeAddressFilter dispatch={dispatchMock} filters={{ searchByOfficeAddressOnly: false }} />);

    const labelElement = screen.getByText(/Search by Office Address Only/i);
    expect(labelElement).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  test('checkbox is checked when searchByOfficeAddressOnly filter is true', () => {
    render(<OfficeAddressFilter dispatch={dispatchMock} filters={{ searchByOfficeAddressOnly: true }} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('dispatches correct actions when checkbox is toggled on', () => {
    render(<OfficeAddressFilter dispatch={dispatchMock} filters={{ searchByOfficeAddressOnly: false }} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(dispatchMock).toHaveBeenCalledWith({
      type: actionTypes.SET_FILTERS,
      payload: { searchByOfficeAddressOnly: true },
    });

    expect(dispatchMock).toHaveBeenCalledWith({
      type: actionTypes.APPLY_FILTERS,
    });
  });

  test('dispatches correct actions when checkbox is toggled off', () => {
    render(<OfficeAddressFilter dispatch={dispatchMock} filters={{ searchByOfficeAddressOnly: true }} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(dispatchMock).toHaveBeenCalledWith({
      type: actionTypes.SET_FILTERS,
      payload: { searchByOfficeAddressOnly: false },
    });

    expect(dispatchMock).toHaveBeenCalledWith({
      type: actionTypes.APPLY_FILTERS,
    });
  });

  test('renders the info icon correctly', () => {
    render(<OfficeAddressFilter dispatch={dispatchMock} filters={{ searchByOfficeAddressOnly: false }} />);

    const infoIcon = screen.getByText('?');
    expect(infoIcon).toBeInTheDocument();
    expect(infoIcon).toHaveClass('bg-[#4E4E4E]');
  });
});
