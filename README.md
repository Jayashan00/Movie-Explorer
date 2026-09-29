# Movie Explorer – MOVIEX

A modern React movie discovery application built for the Movie Explorer internship assignment. It uses the TMDb API for real-time movie data and Material UI for responsive UI.

## Features
- Local username/password demo login with protected routes
- Trending movies from TMDb
- Popular, top-rated and upcoming movie collections
- Movie search with infinite scrolling
- Genre, year and minimum-rating filters
- Movie details with overview, genres, rating, runtime and release date
- Top cast and YouTube trailer when available
- Favorites/watchlist stored in localStorage
- Last searched movie stored in localStorage
- Light/dark theme stored in localStorage
- Axios API integration
- React Context API state management
- Responsive Material UI design
- Friendly loading, empty and API-error states
- React Router navigation

## Setup
1. Install Node.js LTS.
2. Run `npm install`.
3. Create `.env` in the project root.
4. Add:
   `REACT_APP_TMDB_API_KEY=YOUR_TMDB_API_KEY`
5. Run `npm start`.
6. Build for production with `npm run build`.

## TMDb API
Create a TMDb API key from the TMDb developer portal and put it in `.env`. The frontend uses the following endpoints: trending, popular, top rated, upcoming, search, genre list, and movie details with credits/videos.

## Project structure
- `src/context` – global app state, authentication, favorites, theme and persistence
- `src/services` – Axios/TMDb API service
- `src/components/movie` – reusable movie cards and grids
- `src/components/header` – responsive navigation/search
- `src/pages` – Home, Search, Login, Favorites and Movie Details

## Deployment
For Vercel or Netlify, add `REACT_APP_TMDB_API_KEY` as an environment variable in the deployment settings, then deploy the repository. Do not commit your real `.env` file.

## Assignment checklist
Mandatory requirements and the listed bonus features are implemented in this version. The login is intentionally a local demo authentication layer because the assignment does not require a backend authentication service.

## Credits
Movie data and images: TMDb. This product uses the TMDb API but is not endorsed or certified by TMDb.
