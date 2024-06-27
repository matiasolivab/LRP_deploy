import './Play.css';
import { Link } from 'react-router-dom';

export function Play() {
    return (
        <div className="py-main-container">
            <h1 className="py-title">¿Qué deseas hacer?</h1>
            <div className="py-container">
                <Link to="/room" className='py-card'>
                    <img src='/img/play/crear_partida.png' alt='Crear Partida' />
                </Link>
                <Link to="/room/join" className='py-card'>
                    <img src='/img/play/unirme_partida.png' alt='Unirme a Partida' />
                </Link>
                <Link to="/room/list" className='py-card'>
                    <img src='/img/play/continuar_partida.png' alt='Continuar Partida' />
                </Link>
            </div>
        </div>
    )
}
