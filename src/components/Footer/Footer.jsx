import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { useLocation } from 'react-router-dom';

export function Footer() {
    const location = useLocation();
    const isBoardPath = location.pathname.startsWith('/board/');
    const footerStyle = isBoardPath ? { position: 'relative' } : {};
    return (
        <footer className="ft-footer" style={footerStyle}>
            <div className="ft-footer-content">
                <p>© 2024 Survive | Todos los derechos reservados.</p>
                <a href="https://github.com/IIC2513/LRP_frontend.git">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
            </div>
        </footer>
    )
}