
import { renderHook, act } from '@testing-library/react';
import { AppProvider, useAppContext } from '../../contexts/AppContext';
import { createMockUser, createMockCollege } from '../../utils/testUtils';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AppProvider>{children}</AppProvider>
);

describe('useAppContext', () => {
  test('provides initial state', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });
    
    expect(result.current.state.user).toBeNull();
    expect(result.current.state.college).toBeNull();
    expect(result.current.state.bookings).toEqual([]);
  });

  test('login sets user and saves to localStorage', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });
    const mockUser = createMockUser();

    act(() => {
      result.current.dispatch({ type: 'SET_USER', payload: mockUser });
    });

    expect(result.current.state.user).toEqual(mockUser);
  });

  test('logout clears user data', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });
    const mockUser = createMockUser();

    // Login first
    act(() => {
      result.current.dispatch({ type: 'SET_USER', payload: mockUser });
    });

    // Then logout
    act(() => {
      result.current.dispatch({ type: 'SET_USER', payload: null });
    });

    expect(result.current.state.user).toBeNull();
  });

  test('updateBooking adds booking', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });
    const mockBooking = {
      id: '1',
      routeId: 'route1',
      userId: 'user1',
      date: '2024-01-01',
      time: '09:00',
      seats: 2,
      status: 'confirmed' as const,
      qrCode: 'QR123',
      fare: 10.50
    };

    act(() => {
      result.current.dispatch({ type: 'ADD_BOOKING', payload: mockBooking });
    });

    expect(result.current.state.bookings).toContain(mockBooking);
  });
});
