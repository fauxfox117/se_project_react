# WTWR (What to Wear?)

A full-stack React application with JWT authentication that provides clothing recommendations based on current weather conditions and user location. Users can register, manage their personal wardrobe, like items, and receive weather-based clothing suggestions.

## About the Project

WTWR helps users decide what to wear by combining real-time weather data with their personal wardrobe. The application features user authentication, a MongoDB-backed Express API, and a responsive React frontend. Users can sign up, sign in, manage their profile, add clothing items, like other users' items, and get personalized recommendations based on current weather conditions.

## Features

### Authentication & User Management
- **User Registration**: Sign up with name, avatar URL, email, and password
- **User Login**: Sign in with email and password (JWT token-based)
- **Session Persistence**: Automatic login on return visits using stored tokens
- **Protected Routes**: Profile page accessible only to authenticated users
- **Profile Editing**: Update name and avatar URL
- **Sign Out**: Clear session and return to home page

### Clothing & Weather
- **Geolocation-based Weather**: Automatically detects user location for accurate weather data
- **Dynamic Clothing Recommendations**: Suggests appropriate clothing based on current temperature
- **Personal Wardrobe Management**: Add, view, and delete your own clothing items
- **Like System**: Like and unlike clothing items from other users
- **Owner-based Controls**: Delete button only visible for your own items
- **Temperature Unit Toggle**: Switch between Fahrenheit and Celsius
- **Weather-based Filtering**: Displays relevant clothing for hot, warm, or cold weather

### UI/UX
- **Responsive Design**: Optimized for desktop
- **Confirmation Modals**: Safe deletion with user confirmation
- **Avatar Placeholders**: Shows first letter of name when no avatar provided
- **Conditional UI**: Auth buttons, add clothes button, and user info shown based on login status

## Technologies Used

- **Frontend**: React.js (Vite), React Router, CSS3
- **Backend**: Express.js, MongoDB, Mongoose
- **Authentication**: JWT tokens, bcrypt password hashing
- **APIs**: OpenWeatherMap API
- **Build Tool**: Vite
- **State Management**: React Context API (CurrentUserContext, CurrentTempUnitContext)
- **Custom Hooks**: useForm for form state management
- **Responsive Design**: CSS Grid, Flexbox, Media Queries

## Project Structure

```
src/
├── components/          # React components
│   ├── App/            # Main application component with auth logic
│   ├── Header/         # Navigation, auth buttons, and user info
│   ├── Main/           # Weather display and clothing recommendations
│   ├── Profile/        # User profile and personal clothes management
│   ├── ItemCard/       # Individual clothing item with like button
│   ├── ItemModal/      # Clothing item details with owner-based delete
│   ├── AddItemModal/   # Add new clothing item form
│   ├── SignUpModal/    # User registration form
│   ├── SignInModal/    # User login form
│   ├── EditProfileModal/ # Edit user profile form
│   ├── ConfirmationModal/ # Delete confirmation
│   ├── ProtectedRoute/ # Route wrapper for authentication
│   ├── Sidebar/        # Profile sidebar with user info and actions
│   ├── ClothesSection/ # Display user's clothing items
│   └── ...
├── contexts/           # React contexts (CurrentUserContext, CurrentTempUnitContext)
├── hooks/              # Custom React hooks (useForm)
├── utils/              # API calls and utilities
│   ├── auth.js        # Authentication API calls (signup, signin, getCurrentUser, updateUserData)
│   ├── api.js         # Clothing items API calls (CRUD operations, likes)
│   ├── weatherApi.js  # Weather data API calls
│   ├── constants.js   # API keys and configuration
│   └── errors.js      # Error handling utilities
└── assets/            # Images and icons
```

## Backend Integration

This React app connects to an Express.js backend with MongoDB database:

- **Backend Repository**: [se_project_express](https://github.com/fauxfox117/se_project_express)
- **API Base URL**: `http://localhost:3001`
- **Database**: MongoDB (`wtwr_db`)
- **Authentication**: JWT tokens with 7-day expiration
- **Security**: bcrypt password hashing (10 rounds)

### API Endpoints

#### Authentication
- `POST /signup` - Register new user (name, avatar, email, password)
- `POST /signin` - Login user (returns JWT token)
- `GET /users/me` - Get current user data (requires Authorization header)
- `PATCH /users/me` - Update user profile (name, avatar)

#### Clothing Items
- `GET /items` - Get all clothing items
- `POST /items` - Create new clothing item (requires auth)
- `DELETE /items/:id` - Delete clothing item (owner only)
- `PUT /items/:id/likes` - Like a clothing item (requires auth)
- `DELETE /items/:id/likes` - Unlike a clothing item (requires auth)

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB installed and running
- Backend server running ([se_project_express](https://github.com/fauxfox117/se_project_express))

### Frontend Installation

1. Clone the repository:

```bash
git clone https://github.com/fauxfox17/se_project_react.git
cd se_project_react
```

2. Install dependencies:

```bash
npm install
```

3. Configure API key in `src/utils/constants.js`:

```javascript
export const APIkey = "your-openweathermap-api-key";
export const baseUrl = "http://localhost:3001"; // Backend URL
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
export const baseUrl = "http://localhost:3001";
```

## Authentication Flow

1. **Sign Up**: User registers with name, avatar URL, email, and password
   - Password hashed with bcrypt on backend
   - User automatically logged in after registration
   - JWT token stored in localStorage

2. **Sign In**: User logs in with email and password
   - Backend validates credentials and returns JWT token
   - Token stored in localStorage
   - User data fetched and stored in CurrentUserContext

3. **Session Persistence**: On app load
   - Check for token in localStorage
   - If token exists, validate with `GET /users/me`
   - Auto-login user if token valid
   - Clear token if invalid or expired

4. **Protected Operations**: All authorized requests
   - Include `Authorization: Bearer <token>` header
   - Backend validates token and extracts user ID
   - Operations restricted to authenticated users

5. **Sign Out**: User logs out
   - Token removed from localStorage
   - User state cleared
   - Redirect to home page

## Security Features

- **Password Hashing**: bcrypt with 10 salt rounds
- **JWT Tokens**: 7-day expiration
- **Protected Routes**: `/profile` requires authentication
- **Owner Verification**: Users can only delete their own items
- **Authorization Headers**: Bearer token authentication for protected endpoints

## Usage

### For Unauthenticated Users
1. **Allow Location Access**: Grant permission for geolocation to get accurate weather
2. **View Weather**: See current temperature and location
3. **Browse All Items**: View all clothing items from all users
4. **Sign Up/Sign In**: Create account or login to access full features

### For Authenticated Users
1. **Profile Management**: 
   - View your personal wardrobe on `/profile` page
   - Edit your name and avatar URL
   - Sign out when done

2. **Wardrobe Management**:
   - Add new clothing items with name, image URL, and weather type
   - Delete your own items (delete button only shows on your items)
   - View your items filtered on profile page

3. **Social Features**:
   - Like clothing items from other users
   - Unlike items you previously liked
   - See like counts on all items

4. **Weather Features**:
   - Switch temperature units between °F and °C
   - Get personalized recommendations based on current weather

## Weather Categories

- **Hot** (≥86°F / 30°C): Shorts, t-shirts, light clothing
- **Warm** (66-85°F / 19-29°C): Light sweaters, jeans, moderate clothing
- **Cold** (<66°F / <19°C): Hoodies, coats, warm clothing

## Links

- [Figma Design](https://www.figma.com/file/DTojSwldenF9UPKQZd6RRb/Sprint-10%3A-WTWR)
- [Project Video](https://drive.google.com/file/d/1LSGBDcNurMH8fK1v_-OLMJ74ZA-7pHJF/view?usp=sharing)
- [API Documentation](https://openweathermap.org/api)
- [Backend Repository](https://github.com/fauxfox117/se_project_express)

## Development Notes

### Key Components

- **App.jsx**: Root component managing authentication state, user data, and all handler functions
- **CurrentUserContext**: Shares current user data across all components
- **ProtectedRoute**: HOC that redirects to home if user not authenticated
- **useForm Hook**: Custom hook for managing form inputs with validation

### State Management

- Authentication state (`isLoggedIn`, `currentUser`, `isLoading`) managed in App.jsx
- User context provided at app root via CurrentUserContext.Provider
- Token stored in localStorage for session persistence
- Temperature unit managed via CurrentTempUnitContext

### Future Enhancements

- Email verification for new users
- Password reset functionality
- User profile images upload (currently URL only)
- Comments on clothing items
- Outfit combinations and recommendations
- Mobile responsive design
- Social features (follow users, shared wardrobes)

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons and images from various sources

---

**Author**: [Steven Bolin]  
**Contact**: [SABolin1@me.com]  
**GitHub**: [@fauxfox17](https://github.com/fauxfox17)
