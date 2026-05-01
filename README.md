# Star Wars App (SWAPI)

A modern React application built with TypeScript that interacts with the Star Wars API (SWAPI) to display information about characters and films, featuring a favorites system with persistent storage.

## Features

- **Dashboard**: Overview of galaxy statistics and quick access to resources.
- **Characters List**: Paginated list of Star Wars characters with debounced search functionality.
- **Films List**: Paginated list of Star Wars films with debounced search functionality.
- **Resource Details**: Comprehensive view of all properties for any character or film.
- **Favorites System**: Mark any resource as a favorite. Favorites are persisted in the browser's `localStorage`.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS 4, optimized for both desktop and mobile viewports.
- **Robust Data Fetching**: Powered by TanStack Query (React Query) for efficient caching, loading states, and error handling.

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand (for favorites)
- **Data Fetching**: TanStack Query & Axios
- **Icons**: Lucide React
- **Testing**: Vitest & React Testing Library

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aggsakellariou/Star-Wars-App.git
   cd swapi-app
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open your browser to `http://localhost:5173`

### Running Tests

To run the unit tests:
```bash
pnpm test
```

To run tests in watch mode:
```bash
pnpm vitest
```

## Project Structure

- `src/api`: SWAPI integration using Axios.
- `src/components`: Reusable UI components (Layout, ResourceCard, etc.).
- `src/pages`: Main application views (Home, ResourceList, ResourceDetail, Favorites).
- `src/store`: Zustand store for state management.
- `src/types`: TypeScript interfaces for API responses and application data.
- `src/test`: Testing configuration and setup.
