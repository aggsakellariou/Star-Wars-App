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

## Environment Setup

This project does not require any environment variables to run. It connects to the public [SWAPI](https://swapi.dev/) service and includes a built-in fallback mechanism to a mirror ([swapi-api.hbtn.io](https://swapi-api.hbtn.io/)) in case the primary server is down.

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **Package Manager**: [pnpm](https://pnpm.io/) is recommended for faster installations and disk efficiency.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/aggsakellariou/Star-Wars-App.git
   cd swapi-app
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

### Running the Application

#### Development Mode
Start the development server with Hot Module Replacement (HMR):
```bash
pnpm dev
```
The application will be available at `http://localhost:5173`.

#### Production Build
To create an optimized production build:
```bash
pnpm build
```
The output will be in the `dist` directory.

#### Preview Production Build
To preview the production build locally:
```bash
pnpm preview
```

## Testing

The project uses [Vitest](https://vitest.dev/) for unit and integration testing.

### Run Tests
Execute the full test suite once:
```bash
pnpm test
```

### Watch Mode
Run tests and re-run on file changes:
```bash
pnpm vitest
```

### UI Mode
Launch the Vitest UI for a more interactive testing experience:
```bash
pnpm test:ui
```

### Coverage Reports
Generate a code coverage report:
```bash
pnpm coverage
```

## Project Structure

- `src/components`: UI components organized by feature (films, people, layout, etc.).
- `src/constants`: Configuration and static data.
- `src/hooks`: Custom React hooks for data fetching and state management (Zustand).
- `src/lib`: Core logic including API integration and shared utilities.
- `src/pages`: Main application views and page components.
- `src/test`: Global testing configuration and test setup.
