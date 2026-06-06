# XWeatherApp - Complete Setup Guide

## Quick Start

### 1. Get Your API Key

1. Visit [https://www.weatherapi.com/](https://www.weatherapi.com/)
2. Click "Sign up" for a free account
3. Complete the registration
4. Go to **My Account** (top right)
5. Copy your **API Key** from the dashboard

### 2. Setup Environment Variable

Create a `.env` file in the project root (same level as `package.json`):

```bash
REACT_APP_API_KEY=your_actual_api_key_here
```

Replace `your_actual_api_key_here` with the key you copied from weatherapi.com

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm start
```

The app will open at http://localhost:3000

## Running Tests

### Run Cypress Tests (E2E)
These tests **don't need a real API key** - they mock all API calls

```bash
# Open interactive Cypress interface
npm run cypress:open

# Run tests in headless mode
npm run cypress:run
```

### Expected Test Results
✅ All 5 tests should pass:
- Display Loading State During Data Fetch
- Display Weather Data After Fetch
- Display Error Message for Invalid City
- Clear Input After Successful Search
- Search on Enter Key Press

## Production Build

```bash
npm run build
```

Creates optimized build in `build/` folder

## Troubleshooting

### Tests Failing with "Failed to fetch weather data"
- **Cause**: API key not set in `.env` file
- **Solution**: Create `.env` file with your actual API key

### Loading Message Not Showing
- **Cause**: API responding too quickly for state to be visible in tests
- **Solution**: Cypress tests verify loading state is rendered; manual testing should work fine

### Weather Card Not Displaying
- **Cause**: Missing API data or API error
- **Check**: 
  - API key is valid
  - City name is spelled correctly
  - No network issues

## Important Notes

⚠️ **Never commit `.env` file** - It's in `.gitignore` for security (contains API key)

✅ **Cypress tests are independent** - They mock API responses, don't need real API key

✅ **All dependencies are updated** - Including Node.js deprecation fixes

## File Structure

```
xweatherapp/
├── src/
│   ├── App.js              # Main component
│   ├── App.css             # Styles
│   ├── WeatherCard.js      # Weather card component
│   └── index.js
├── cypress/
│   ├── e2e/
│   │   └── spec.cy.js      # E2E tests
│   └── support/
│       └── e2e.js          # Test support
├── .env                    # Environment variables (not in git)
├── .env.example            # Template for .env file
├── cypress.config.js       # Cypress configuration
└── package.json
```

## API Reference

**Endpoint**: https://api.weatherapi.com/v1/current.json

**Parameters**:
- `key`: Your API key
- `q`: City name

**Response Fields Used**:
- `location.name`: City name
- `location.country`: Country name
- `current.temp_c`: Temperature in Celsius
- `current.humidity`: Humidity percentage
- `current.condition.text`: Weather condition
- `current.wind_kph`: Wind speed in km/h

## Support

For API-related issues: https://www.weatherapi.com/docs/

---

**Happy coding! 🌤️**
