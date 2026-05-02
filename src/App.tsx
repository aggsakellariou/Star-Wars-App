import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { useTheme } from "next-themes";
import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/Home";
import PeoplePage from "@/pages/PeoplePage";
import FilmPage from "@/pages/FilmPage";
import CharacterDetailPage from "@/pages/CharacterDetailPage";
import FilmDetailPage from "@/pages/FilmDetailPage";
import FavoritesPage from "@/pages/FavoritesPage";

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
    </Router>
  );
}

export default App;
