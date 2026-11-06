import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import ArtisanListPage from './pages/ArtisanListPage.jsx';
import ArtisanDetailPage from './pages/ArtisanDetailPage.jsx';
import LegalPage from './pages/LegalPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/artisans" element={<ArtisanListPage />} />
        <Route path="/artisan/:id" element={<ArtisanDetailPage />} />
        <Route path="/mentions-legales" element={<LegalPage title="Mentions légales" />} />
        <Route path="/donnees-personnelles" element={<LegalPage title="Données personnelles" />} />
        <Route path="/accessibilite" element={<LegalPage title="Accessibilité" />} />
        <Route path="/cookies" element={<LegalPage title="Cookies" />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Route>
    </Routes>
  );
}
