import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { useTheme } from "next-themes";
import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/Home";
import PeoplePage from "@/pages/PeoplePage";
import FilmPage from "@/pages/FilmPage";
import DetailPage from "@/pages/DetailPage";
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
          <Route path="people" element={<PeoplePage />} />
          <Route path="films" element={<FilmPage />} />
          <Route path="people/:id" element={<DetailPage type="people" />} />
          <Route path="films/:id" element={<DetailPage type="films" />} />
          <Route path="favorites" element={<FavoritesPage />} />
          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
