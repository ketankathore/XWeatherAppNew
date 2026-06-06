# XWeatherApp - Real-time Weather Application

A modern React-based weather application that provides real-time weather information based on user-searched city names.

## Features

- 🔍 Search weather by city name
- 🌡️ Display real-time temperature
- 💧 Show humidity levels
- 💨 Display wind speed
- ☁️ Weather conditions
- 📱 Responsive design
- ⚡ Fast and smooth user experience

## Prerequisites

- Node.js (v12 or higher)
- npm or yarn
- API key from [weatherapi.com](https://www.weatherapi.com/)

## Setup Instructions

### 1. Get Your API Key

1. Visit [https://www.weatherapi.com/](https://www.weatherapi.com/)
2. Sign up for a free account
3. Go to "My Account" section
4. Copy your API key

### 2. Configure the Application

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Replace `YOUR_API_KEY_HERE` with your actual API key in the `.env` file:
   ```
   REACT_APP_API_KEY=your_actual_api_key_here
   ```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm start
```

The application will open at `http://localhost:3000`

## Usage

1. **Enter a city name** in the search input field
2. **Click the "Search" button** (or press Enter)
3. **View the weather data** displayed in a card with:
   - Temperature (°C)
   - Humidity (%)
   - Weather Condition
   - Wind Speed (km/h)

## Error Handling

- Invalid city names will trigger an alert: "Failed to fetch weather data"
- Loading state displays "Loading data…" while fetching
- Empty search will prompt you to enter a city name

## Project Structure

```
xweatherapp/
├── src/
│   ├── App.js              # Main component with weather logic
│   ├── App.css             # Application styles
│   ├── WeatherCard.js      # Weather card component
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── .env.example            # Environment variable template
└── package.json            # Dependencies
```

## API Reference

**Endpoint**: `https://api.weatherapi.com/v1/current.json`

**Parameters**:
- `key`: Your API key
- `q`: City name

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Technologies Used

- React 18
- CSS3 (Gradients, Flexbox, Grid)
- Fetch API
- WeatherAPI.com

## License

This project is open source and available under the MIT License.

## Support

For API-related issues, visit [weatherapi.com documentation](https://www.weatherapi.com/docs/)

---

**Happy coding! Enjoy using XWeatherApp! 🌤️**
