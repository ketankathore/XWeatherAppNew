import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock the fetch API
global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

describe('UI State Tests', () => {
  // Test 1: Display Loading State During Data Fetch
  test('displays loading state during data fetch', async () => {
    const user = userEvent.setup();

    // Mock fetch to delay resolution so we can see the loading state
    fetch.mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: async () => ({
                  location: {
                    name: 'London',
                    country: 'United Kingdom'
                  },
                  current: {
                    temp_c: 15,
                    humidity: 65,
                    condition: { text: 'Partly cloudy' },
                    wind_kph: 10
                  }
                })
              }),
            100
          )
        )
    );

    render(<App />);

    const cityInput = screen.getByLabelText('City search input');
    const searchBtn = screen.getByRole('button', { name: /search/i });

    await user.type(cityInput, 'London');
    await user.click(searchBtn);

    // Check if loading message is displayed
    const loadingMessage = screen.getByText('Loading data…');
    expect(loadingMessage).toBeInTheDocument();
  });

  // Test 2: Display Weather Data After Fetch
  test('displays weather data after fetch', async () => {
    const user = userEvent.setup();

    const mockWeatherData = {
      location: {
        name: 'London',
        country: 'United Kingdom'
      },
      current: {
        temp_c: 15,
        humidity: 65,
        condition: { text: 'Partly cloudy' },
        wind_kph: 10
      }
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherData
    });

    render(<App />);

    const cityInput = screen.getByLabelText('City search input');
    const searchBtn = screen.getByRole('button', { name: /search/i });

    await user.type(cityInput, 'London');
    await user.click(searchBtn);

    // Wait for the weather data to be displayed
    await waitFor(() => {
      expect(screen.getByText(/London, United Kingdom/i)).toBeInTheDocument();
    });

    // Verify all weather details are displayed
    expect(screen.getByText(/15°C/)).toBeInTheDocument();
    expect(screen.getByText(/65%/)).toBeInTheDocument();
    expect(screen.getByText(/Partly cloudy/i)).toBeInTheDocument();
    expect(screen.getByText(/10 km\/h/)).toBeInTheDocument();
  });
});
