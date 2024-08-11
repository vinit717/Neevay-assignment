import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectsCompletedFilter from '../../components/Filters/ProjectsCompletedFilter';
import { actionTypes } from '../../store/searchReducer';


describe('ProjectsCompletedFilter Component', () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
  });

  test('renders button and initially hides the slider', () => {
    render(<ProjectsCompletedFilter dispatch={dispatchMock} filters={{}} />);

    const button = screen.getByText(/Min. Projects Completed/i);
    expect(button).toBeInTheDocument();

    const slider = screen.queryByRole('slider');
    expect(slider).not.toBeInTheDocument();
  });

  test('toggles slider when button is clicked', () => {
    render(<ProjectsCompletedFilter dispatch={dispatchMock} filters={{}} />);

    const button = screen.getByText(/Min. Projects Completed/i);
    fireEvent.click(button);

    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByRole('slider')).not.toBeInTheDocument();
  });

  test('updates slider value and dispatches correct action', () => {
    render(<ProjectsCompletedFilter dispatch={dispatchMock} filters={{}} />);

    const button = screen.getByText(/Min. Projects Completed/i);
    fireEvent.click(button);

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '75' } });

    expect(dispatchMock).toHaveBeenCalledWith({
      type: actionTypes.SET_FILTERS,
      payload: { minProjectsCompleted: 75 },
    });

    expect(slider.value).toBe('75');
  });

  test('should render with initial filter value', () => {
    render(<ProjectsCompletedFilter dispatch={dispatchMock} filters={{ minProjectsCompleted: 30 }} />);

    const button = screen.getByText(/Min. Projects Completed/i);
    fireEvent.click(button);

    const slider = screen.getByRole('slider');
    expect(slider.value).toBe('30');
  });
});
