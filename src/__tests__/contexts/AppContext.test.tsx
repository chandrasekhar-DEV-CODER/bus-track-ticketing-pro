
import { renderHook, act } from '@testing-library/react';
import { AppProvider, useApp } from '../../contexts/AppContext';
import { createMockUser, createMockCollege } from '../../utils/testUtils';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AppProvider>{children}</AppProvider>
);

describe('useApp', () => {
  test('provides initial state', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    
    expect(result.current.state.user).toBeNull();
    expect(result.current.state.college).toBeNull();
    expect(result.current.state.bookingData.passengers).toBe(1);
  });

  test('login sets user and saves to localStorage', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    const mockUser = createMockUser();

    act(() => {
      result.current.login(mockUser);
    });

    expect(result.current.state.user).toEqual(mockUser);
    expect(localStorage.getItem('smartbus-user')).toBe(JSON.stringify(mockUser));
  });

  test('logout clears user data', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    const mockUser = createMockUser();

    // Login first
    act(() => {
      result.current.login(mockUser);
    });

    // Then logout
    act(() => {
      result.current.logout();
    });

    expect(result.current.state.user).toBeNull();
    expect(localStorage.getItem('smartbus-user')).toBeNull();
  });

  test('updateBooking updates booking data', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    act(() => {
      result.current.updateBooking({ passengers: 3, promoCode: 'STUDENT10' });
    });

    expect(result.current.state.bookingData.passengers).toBe(3);
    expect(result.current.state.bookingData.promoCode).toBe('STUDENT10');
  });
});
