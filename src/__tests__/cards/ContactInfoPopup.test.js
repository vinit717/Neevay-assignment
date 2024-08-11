import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactInfoPopup from '../../components/Cards/ContactInfoPopup';

const mockBusiness = {
    vendorName: 'Vendor Name',
    vendorContact: {
      email: 'vendor@example.com',
      phone: '123-456-7890',
    },
    vendorTeam: [
      {
        Name: 'Team Member One',
        Email: 'member1@example.com',
        Phone: '987-654-3210',
      },
      {
        Name: 'Team Member Two',
        Email: 'member2@example.com',
        Phone: '654-321-0987',
      },
    ],
  };
  
  const mockOnClose = jest.fn();
  
  describe('ContactInfoPopup Component', () => {
    test('renders contact info correctly', () => {
      render(<ContactInfoPopup business={mockBusiness} onClose={mockOnClose} />);
      expect(screen.getByText(/Vendor Name/i)).toBeInTheDocument();
      expect(screen.getByText(/vendor@example.com/i)).toBeInTheDocument();
      expect(screen.getByText(/123-456-7890/i)).toBeInTheDocument();
  
      expect(screen.getByText(/Team Member One/i)).toBeInTheDocument();
      expect(screen.getByText(/Team Member Two/i)).toBeInTheDocument();
    });
  
    test('calls onClose when the close button is clicked', () => {
      render(<ContactInfoPopup business={mockBusiness} onClose={mockOnClose} />);
  
      fireEvent.click(screen.getByText(/Close/i));
  
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  
    test('renders contact icon and business card correctly', () => {
      render(<ContactInfoPopup business={mockBusiness} onClose={mockOnClose} />);
  
      const contactIcon = screen.getByAltText(/contact icon/i);
      expect(contactIcon).toBeInTheDocument();
      expect(contactIcon).toHaveAttribute('src', expect.stringContaining('contact.png'));
  
      const businessCard = screen.getByAltText(/business card/i);
      expect(businessCard).toBeInTheDocument();
      expect(businessCard).toHaveAttribute('src', expect.stringContaining('businesscard.png'));
    });
  });