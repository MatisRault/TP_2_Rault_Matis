import './Navbar.css';

const Navbar = ({ count }) => (
  <nav className="navbar">
    <span className="navbar__title">Gestion des utilisateurs</span>
    <span className="navbar__badge">{count} utilisateur{count !== 1 ? 's' : ''}</span>
  </nav>
);

export default Navbar;
