# WTWR (What to Wear?)

A responsive React application that provides clothing recommendations based on current weather conditions and user location.

## About the Project

WTWR helps users decide what to wear by combining real-time weather data with their personal wardrobe. The application fetches weather information based on the user's geolocation, processes the data, and recommends appropriate clothing items from their digital closet.

## Features

- **Geolocation-based Weather**: Automatically detects user location for accurate weather data
- **Dynamic Clothing Recommendations**: Suggests appropriate clothing based on current temperature
- **Personal Wardrobe Management**: Add, view, and delete clothing items
- **Temperature Unit Toggle**: Switch between Fahrenheit and Celsius
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Confirmation Modals**: Safe deletion with user confirmation
- **Weather-based Filtering**: Displays relevant clothing for hot, warm, or cold weather

## Technologies Used

- **Frontend**: React.js, React Router, CSS3
- **Backend**: JSON Server (for development)
- **APIs**: OpenWeatherMap API
- **Build Tool**: Vite
- **State Management**: React Hooks (useState, useEffect, useContext)
- **Responsive Design**: CSS Grid, Flexbox, Media Queries

## Project Structure

```
src/
├── components/          # React components
│   ├── App/            # Main application component
│   ├── Header/         # Navigation and user info
│   ├── Main/           # Weather display and clothing recommendations
│   ├── Profile/        # User profile and clothes management
│   ├── ItemCard/       # Individual clothing item display
│   ├── ItemModal/      # Clothing item details modal
│   ├── ConfirmationModal/ # Delete confirmation
│   └── ...
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── utils/              # API calls and utilities
└── assets/             # Images and icons
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/fauxfox17/se_project_react.git
cd se_project_react
```

2. Install dependencies:
```bash
npm install
```

3. Start the JSON Server (for backend):
```bash
json-server --watch db.json --port 3001
```

4. Start the development server:
```bash
npm run dev
```


## API Configuration

### Weather API
The app uses OpenWeatherMap API. You'll need to:

1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your API key
3. Add it to your constants file:

```javascript
// src/utils/constants.js
export const APIkey = "your-openweathermap-api-key";
```

### Local Database
The app uses JSON Server for development. The database structure:

```json
{
  "items": [
    {
      "id": 1,
      "name": "Hoodie",
      "weather": "cold",
      "imageUrl": "https://example.com/hoodie.png"
    }
  ]
}
```

## Usage

1. **Allow Location Access**: Grant permission for geolocation to get accurate weather
2. **View Weather**: See current temperature and location
3. **Browse Recommendations**: View clothing suggestions based on weather
4. **Manage Wardrobe**: Add new items or delete existing ones
5. **Switch Units**: Toggle between °F and °C
6. **Profile Management**: View and organize your clothing collection

## Weather Categories

- **Hot** (≥86°F / 30°C): Shorts, t-shirts, light clothing
- **Warm** (66-85°F / 19-29°C): Light sweaters, jeans, moderate clothing  
- **Cold** (<66°F / <19°C): Hoodies, coats, warm clothing


## Links

- [Figma Design](https://www.figma.com/file/DTojSwldenF9UPKQZd6RRb/Sprint-10%3A-WTWR)
- [Project Video] ()
- [API Documentation](https://openweathermap.org/api)


## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Design inspiration from Practicum by Yandex
- Icons and images from various sources

---

**Author**: [Steven Bolin]  
**Contact**: [SABolin1@me.com]  
**GitHub**: [@fauxfox17](https://github.com/fauxfox17)