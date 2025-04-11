import '@testing-library/jest-dom'
import React, {act} from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StatusManager from '../StatusManager';
import { useFetchClient } from '@strapi/strapi/admin';

// Mock the useFetchClient hook
jest.mock('@strapi/strapi/admin', () => ({
  useFetchClient: jest.fn(),
}));

describe('StatusManager', () => {
  const mockFetchClient = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
  };

  const mockStatuses = [
    { id: 1, documentId: '1', name: 'Active', published: true },
    { id: 2, documentId: '2', name: 'Pending', published: false },
  ];

  beforeEach(() => {
    useFetchClient.mockReturnValue(mockFetchClient);
    mockFetchClient.get.mockResolvedValue({ data: mockStatuses });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component and fetches statuses', async () => {
    await React.act(async () => {
      render(<StatusManager />);
    });

    expect(screen.getByText('Status Manager')).toBeInTheDocument();

    await waitFor(() => {
      expect(mockFetchClient.get).toHaveBeenCalledWith('/status-manager/statuses');
    });

    await waitFor(() => {
      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByText('Pending')).toBeInTheDocument();
    });
  });

  it('adds a new status', async () => {
    const newStatus = 'New Status';
    mockFetchClient.post.mockResolvedValue({ data: { id: 3, name: newStatus, published: false } });

    await React.act(async () => {
      render(<StatusManager />);
    });

    await waitFor(() => {
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText('Enter a status...');
    await React.act(async () => {
      await userEvent.type(input, newStatus);
      fireEvent.click(screen.getByText('Add Status'));
    });

    await waitFor(() => {
      expect(mockFetchClient.post).toHaveBeenCalledWith('/status-manager/statuses', {
        name: newStatus,
        published: false,
      });
    });
  });

  it('validates input for non-Latin characters', async () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation();

    await React.act(async () => {
      render(<StatusManager />);
    });

    await waitFor(() => {
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText('Enter a status...');
    await React.act(async () => {
      await userEvent.type(input, 'Статус');
      fireEvent.click(screen.getByText('Add Status'));
    });

    expect(alertSpy).toHaveBeenCalledWith('Only Latin characters allowed!');
    expect(mockFetchClient.post).not.toHaveBeenCalled();
  });

  it('toggles status publication', async () => {
    mockFetchClient.put.mockResolvedValue({ data: { ...mockStatuses[0], published: false } });

    await React.act(async () => {
      render(<StatusManager />);
    });

    await waitFor(() => {
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    const publishButton = screen.getByText('Published');
    await React.act(async () => {
      fireEvent.click(publishButton);
    });

    await waitFor(() => {
      expect(mockFetchClient.put).toHaveBeenCalledWith('/status-manager/statuses/1', {
        published: false,
      });
    });
  });

  it('opens delete dialog and deletes status', async () => {
    mockFetchClient.patch.mockResolvedValue({ data: { message: 'Status deleted successfully' } });
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation();

    await React.act(async () => {
      render(<StatusManager />);
    });

    await waitFor(() => {
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByText('Delete');
    await React.act(async () => {
      fireEvent.click(deleteButtons[0]);
    });

    await waitFor(() => {
      expect(screen.getAllByText('Choose a replacement status before deleting:').length).toBe(2);
    });

    const selectOptions = screen.getAllByText('Pending');
    await React.act(async () => {
      fireEvent.click(selectOptions[0]);
    });

    const confirmButton = screen.getAllByText('Yes, delete');
    await React.act(async () => {
      fireEvent.click(confirmButton[1]);
    });

    expect(alertSpy).toHaveBeenCalledWith("Select a replacement status!");
  });
});
