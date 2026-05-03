import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { useTheme } from "next-themes";
import { Layout } from "@/components/layout/Layout";
import { DetailSkeleton } from "@/components/ui/custom/Skeletons";

const Home = lazy(() => import("@/pages/Home"));
const PeoplePage = lazy(() => import("@/pages/PeoplePage"));
const FilmPage = lazy(() => import("@/pages/FilmPage"));
const CharacterDetailPage = lazy(() => import("@/pages/CharacterDetailPage"));
const FilmDetailPage = lazy(() => import("@/pages/FilmDetailPage"));
const FavoritesPage = lazy(() => import("@/pages/FavoritesPage"));

const PageLoader = () => (
  <div className="px-4">
    <DetailSkeleton />
  </div>
);

function App() {
  const { theme } = useTheme();

  return (
    <Router>
      <Toaster 
        position="top-right" 
        richColors 
        closeButton 
        theme={theme as "light" | "dark" | "system"} 
      />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="characters" element={<PeoplePage />} />
            <Route path="films" element={<FilmPage />} />
            <Route path="characters/:id" element={<CharacterDetailPage />} />
            <Route path="films/:id" element={<FilmDetailPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            {/* Catch-all redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
