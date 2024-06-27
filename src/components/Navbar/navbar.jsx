import './navbar.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export function Navbar({ isLoggedIn, onLogout, isAdmin }) {
  return (
    <div className="nb-navbar">
        <Link to="/" className="nb-logo-text">Survive</Link>
        <div className="nb-block-menu">
            <Link to="/" className="nb-menu-items">Inicio</Link>
            <Link to="/instructions" className="nb-menu-items">Instrucciones</Link>
            <Link to="/about" className="nb-menu-items">Nosotros</Link>
            {isAdmin && (
              <Link to="/admin/users" className="nb-menu-items">Admin Info</Link>
            )}
            {isLoggedIn ? (
              <Link  to="/" className="nb-menu-items" onClick={onLogout}>Cerrar Sesión</Link> 
            ) : (
              <Link to="/login" className="nb-menu-items">Iniciar Sesión</Link>
            )}
            <Link to="/play" className="nb-menu-play">Jugar</Link>
        </div>
    </div>
  );
}

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired
};
