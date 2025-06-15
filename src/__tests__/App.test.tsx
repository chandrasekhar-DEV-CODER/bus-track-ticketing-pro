
import { screen } from '@testing-library/react';
import { render } from '../utils/testUtils';
import App from '../App';

// Mock the lazy-loaded components
jest.mock('../pages/Index', () => {
  return function MockIndex() {
    return <div data-testid="index-page">Index Page</div>;
  };
});

describe('App', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });

  test('shows loading state initially', () => {
    render(<App />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders index page after loading', async () => {
    render(<App />);
    expect(await screen.findByTestId('index-page')).toBeInTheDocument();
  });
});
