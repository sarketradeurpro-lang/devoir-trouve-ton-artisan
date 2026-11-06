import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function Layout() {
  return (
    <>
      <a className="skip-link" href="#main-content">Aller au contenu principal</a>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
