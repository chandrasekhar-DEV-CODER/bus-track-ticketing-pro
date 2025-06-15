
import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../utils/testUtils';
import ProfilePage from '../../pages/ProfilePage';

// Mock the components to avoid complex rendering
jest.mock('../../components/Navbar', () => {
  return function MockNavbar() {
    return <nav data-testid="navbar">Navbar</nav>;
  };
});

jest.mock('../../components/Footer', () => {
  return function MockFooter() {
    return <footer data-testid="footer">Footer</footer>;
  };
});

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('ProfilePage', () => {
  test('renders without crashing', () => {
    render(<ProfilePage />);
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('renders profile header with default user data', () => {
    render(<ProfilePage />);
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
    expect(screen.getByText('sarah.johnson@university.edu')).toBeInTheDocument();
    expect(screen.getByText('Tech University')).toBeInTheDocument();
  });

  test('renders tab navigation', () => {
    render(<ProfilePage />);
    expect(screen.getByText('My Trips')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Preferences')).toBeInTheDocument();
  });

  test('switches tabs correctly', () => {
    render(<ProfilePage />);
    
    // Click on Settings tab
    fireEvent.click(screen.getByText('Settings'));
    expect(screen.getByText('Appearance')).toBeInTheDocument();
    
    // Click on Preferences tab
    fireEvent.click(screen.getByText('Preferences'));
    expect(screen.getByText('Default Routes')).toBeInTheDocument();
  });

  test('displays trips panel by default', () => {
    render(<ProfilePage />);
    expect(screen.getByText('My Trips (3)')).toBeInTheDocument();
  });
});
