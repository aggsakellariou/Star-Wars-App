import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/Home";
import ListPage from "@/pages/ListPage";
import DetailPage from "@/pages/DetailPage";
import FavoritesPage from "@/pages/FavoritesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="people" element={<ListPage type="people" />} />
          <Route path="films" element={<ListPage type="films" />} />
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
