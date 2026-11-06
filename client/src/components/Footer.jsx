import { Link } from 'react-router-dom';
import { legalPages } from '../data/categories.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <h2>Informations légales</h2>
          <ul className="footer-links">
            {legalPages.map((page) => <li key={page.path}><Link to={page.path}>{page.label}</Link></li>)}
          </ul>
        </div>
        <address>
          <h2>Antenne de Lyon</h2>
          101 cours Charlemagne<br />
          CS 20033<br />
          69269 LYON CEDEX 02<br />
          France<br />
          <a href="tel:+33426734000">+33 (0)4 26 73 40 00</a>
        </address>
      </div>
    </footer>
  );
}
