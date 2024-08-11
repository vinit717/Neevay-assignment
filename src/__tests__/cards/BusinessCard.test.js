import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BusinessCard from '../../components/Cards/BusinessCard';

const mockBusiness = {
  vendorName: 'Test Vendor',
  vendorDescription: 'This is a test vendor description. It has more than 150 characters to test the see more and see less functionality.',
  verifiedStatus: true,
  services: ['Service1', 'Service2'],
  turnover: '10M',
  laborStrength: '200',
  businessAge: '10 years',
  projectsCompleted: '50',
};

const mockOnViewContact = jest.fn();

describe('BusinessCard Component', () => {
  test('renders BusinessCard with truncated description', () => {
    render(<BusinessCard business={mockBusiness} onViewContact={mockOnViewContact} />);

    expect(screen.getByText('Test Vendor')).toBeInTheDocument();
    expect(screen.getByText(/This is a test vendor description\./)).toBeInTheDocument();
    expect(screen.getByText('See More')).toBeInTheDocument();
  });

  test('expands and collapses description on button click', () => {
    render(<BusinessCard business={mockBusiness} onViewContact={mockOnViewContact} />);

    const toggleButton = screen.getByText('See More');
    fireEvent.click(toggleButton);

    expect(screen.getByText('See Less')).toBeInTheDocument();
    expect(screen.getByText(/This is a test vendor description. It has more than 150 characters to test the see more and see less functionality\./)).toBeInTheDocument();

    fireEvent.click(screen.getByText('See Less'));
    expect(screen.getByText('See More')).toBeInTheDocument();
  });

  test('calls onViewContact when View Contact button is clicked', () => {
    render(<BusinessCard business={mockBusiness} onViewContact={mockOnViewContact} />);

    const viewContactButton = screen.getByText('View Contact');
    fireEvent.click(viewContactButton);

    expect(mockOnViewContact).toHaveBeenCalledWith(mockBusiness);
  });
});