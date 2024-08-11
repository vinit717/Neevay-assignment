import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TurnoverFilter from '../../components/Filters/TurnoverFilter';
import { actionTypes } from '../../store/searchReducer';


describe.skip('TurnoverFilter Component', () => {
    let dispatchMock;
  
    beforeEach(() => {
      dispatchMock = jest.fn();
    });
  
    test('renders button and initially hides the slider', () => {
      render(<TurnoverFilter dispatch={dispatchMock} filters={{}} />);
  
      const button = screen.getByText(/Turnover/i);
      expect(button).toBeInTheDocument();
  
      const slider = screen.queryByRole('slider');
      expect(slider).not.toBeInTheDocument();
    });
  
    test('toggles slider when button is clicked', () => {
      render(<TurnoverFilter dispatch={dispatchMock} filters={{}} />);
  
      const button = screen.getByText(/Turnover/i);
      fireEvent.click(button);
  
      const slider = screen.getAllByRole('slider');
      expect(slider.length).toBe(2); 
  
      fireEvent.click(button);
      expect(screen.queryByRole('slider')).not.toBeInTheDocument();
    });
  
    test('updates slider value and dispatches correct action', () => {
      render(<TurnoverFilter dispatch={dispatchMock} filters={{}} />);
  
      const button = screen.getByText(/Turnover/i);
      fireEvent.click(button);
  
      const slider = screen.getAllByRole('slider');
      fireEvent.change(slider[0], { target: { value: '20' } }); 
      fireEvent.change(slider[1], { target: { value: '80' } }); 
  
      expect(dispatchMock).toHaveBeenCalledWith({
        type: actionTypes.SET_FILTERS,
        payload: { turnoverRange: [20, 80] },
      });
  
      expect(slider[0].value).toBe('20');
      expect(slider[1].value).toBe('80');
    });
  
    test('should render with initial filter value', () => {
      render(<TurnoverFilter dispatch={dispatchMock} filters={{ turnoverRange: [10, 90] }} />);
  
      const button = screen.getByText(/Turnover/i);
      fireEvent.click(button);
  
      const slider = screen.getAllByRole('slider');
      expect(slider[0].value).toBe('10');
      expect(slider[1].value).toBe('90');
    });
  
    test('displays the correct minimum and maximum values', () => {
      render(<TurnoverFilter dispatch={dispatchMock} filters={{ turnoverRange: [25, 75] }} />);
  
      const button = screen.getByText(/Turnover/i);
      fireEvent.click(button);
  
      const minValue = screen.getByText(/₹ 25 Lakh/i);
      const maxValue = screen.getByText(/₹ 75 Lakh/i);
  
      expect(minValue).toBeInTheDocument();
      expect(maxValue).toBeInTheDocument();
    });
  });
