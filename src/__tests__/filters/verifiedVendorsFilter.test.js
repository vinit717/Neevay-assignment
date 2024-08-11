import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VerifiedVendorsFilter from '../../components/Filters/VerifiedVendorsFilter';
import { actionTypes } from '../../store/searchReducer';


describe('VerifiedVendorsFilter Component', () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
  });

  test('renders the verified vendors filter correctly', () => {
    render(<VerifiedVendorsFilter dispatch={dispatchMock} filters={{ verifiedStatus: false }} />);

    const checkbox = screen.getByRole('checkbox');
    const labelText = screen.getByText(/Verified Vendors Only/i);
    const imgElement = screen.getByAltText(/tick/i);

    expect(checkbox).toBeInTheDocument();
    expect(labelText).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
  });

  test('checkbox is checked when verifiedStatus is true', () => {
    render(<VerifiedVendorsFilter dispatch={dispatchMock} filters={{ verifiedStatus: true }} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('checkbox is unchecked when verifiedStatus is false', () => {
    render(<VerifiedVendorsFilter dispatch={dispatchMock} filters={{ verifiedStatus: false }} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('dispatches correct actions when checkbox is clicked', () => {
    render(<VerifiedVendorsFilter dispatch={dispatchMock} filters={{ verifiedStatus: false }} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(dispatchMock).toHaveBeenCalledWith({
      type: actionTypes.SET_FILTERS,
      payload: { verifiedStatus: true },
    });

    expect(dispatchMock).toHaveBeenCalledWith({ type: actionTypes.APPLY_FILTERS });
  });

  test('dispatches correct actions when checkbox is unchecked', () => {
    render(<VerifiedVendorsFilter dispatch={dispatchMock} filters={{ verifiedStatus: true }} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(dispatchMock).toHaveBeenCalledWith({
      type: actionTypes.SET_FILTERS,
      payload: { verifiedStatus: false },
    });

    expect(dispatchMock).toHaveBeenCalledWith({ type: actionTypes.APPLY_FILTERS });
  });
});
