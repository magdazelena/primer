import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@strapi/design-system';
import SeriesProductActions from '../index';
import en from '../../../translations/en.json';

// Mock the Strapi hooks
jest.mock('@strapi/strapi/admin', () => ({
  useFetchClient: () => ({
    post: jest.fn(),
    put: jest.fn(),
  }),
  unstable_useContentManagerContext: () => ({
    model: 'api::product-series.product-series',
  }),
}));

const mockDocument = {
  documentId: '123',
};

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('SeriesProductActions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render if model is not product-series', () => {
    jest.spyOn(require('@strapi/strapi/admin'), 'unstable_useContentManagerContext')
      .mockReturnValue({ model: 'other-model' });

    const { container } = renderWithTheme(
      <SeriesProductActions document={mockDocument} />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('should show error message when no documentId is provided', () => {
    renderWithTheme(<SeriesProductActions document={{}} />);
    
    expect(screen.getByText(en['product-series.actions.noDocumentId'])).toBeInTheDocument();
  });

  it('should render create and update buttons when documentId is provided', () => {
    renderWithTheme(<SeriesProductActions document={mockDocument} />);
    
    expect(screen.getByText(en['product-series.actions.createProducts'])).toBeInTheDocument();
    expect(screen.getByText(en['product-series.actions.updateProducts'])).toBeInTheDocument();
  });

  it('should handle product creation', async () => {
    const mockPost = jest.fn().mockResolvedValue({ ok: true });
    jest.spyOn(require('@strapi/strapi/admin'), 'useFetchClient')
      .mockReturnValue({ post: mockPost, put: jest.fn() });

    renderWithTheme(<SeriesProductActions document={mockDocument} />);
    
    // Open create dialog
    fireEvent.click(screen.getByText(en['product-series.actions.createProducts']));
    
    // Set product count
    const numberInput = screen.getByLabelText(en['product-series.actions.productCount']);
    fireEvent.change(numberInput, { target: { value: '5' } });
    
    // Submit form
    fireEvent.click(screen.getByText(en['product-series.actions.create']));
    
    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith(
        `/product-actions/product-series/${mockDocument.documentId}/create-products`,
        { count: 5 }
      );
    });
  });

  it('should handle product update', async () => {
    const mockPut = jest.fn().mockResolvedValue({ ok: true });
    jest.spyOn(require('@strapi/strapi/admin'), 'useFetchClient')
      .mockReturnValue({ post: jest.fn(), put: mockPut });

    renderWithTheme(<SeriesProductActions document={mockDocument} />);
    
    // Open update dialog
    fireEvent.click(screen.getByText(en['product-series.actions.updateProducts']));
    
    // Select fields to update
    const multiSelect = screen.getByPlaceholderText(en['product-series.actions.selectFields']);
    fireEvent.change(multiSelect, { target: { value: 'description,media' } });
    
    // Submit form
    fireEvent.click(screen.getByText(en['product-series.actions.update']));
    
    await waitFor(() => {
      expect(mockPut).toHaveBeenCalledWith(
        `/product-actions/product-series/${mockDocument.documentId}/update-products`,
        { fieldsToUpdate: ['description', 'media'] }
      );
    });
  });

  it('should handle API errors gracefully', async () => {
    const mockPost = jest.fn().mockRejectedValue(new Error('API Error'));
    jest.spyOn(require('@strapi/strapi/admin'), 'useFetchClient')
      .mockReturnValue({ post: mockPost, put: jest.fn() });

    renderWithTheme(<SeriesProductActions document={mockDocument} />);
    
    // Open create dialog
    fireEvent.click(screen.getByText(en['product-series.actions.createProducts']));
    
    // Submit form
    fireEvent.click(screen.getByText(en['product-series.actions.create']));
    
    await waitFor(() => {
      expect(mockPost).toHaveBeenCalled();
    });
  });
}); 