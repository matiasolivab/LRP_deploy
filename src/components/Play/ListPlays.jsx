import '../../components/Room/JoinRoom.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Card({ id, name, players, type }) {
    const navigate = useNavigate();

    const handleCardClick = async () => {
        if (type === 'Room') navigate(`/room/${id}`);
        if (type === 'Game') navigate(`/board/${id}`)
    }

    return (
        <div className="jr-room-card" onClick={handleCardClick}>
            <div className="jr-column">
                <h3>{`${type} ${id}`}</h3>
            </div>
            <div className="jr-column">
                <p>{name}</p>
            </div>
            <div className="jr-column">
                <p>{players} jugadores</p>
            </div>
        </div>
    )
}

export function ListPlays({ token }) {
    const [rooms, setRooms] = useState([]);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('No hay Salas Disponibles');

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const requestData = {
                    userId: jwtDecode(token).sub
                }
                const response = await axios.post(
                    `${import.meta.env.VITE_BACK_URL}/waitingroom/all`,
                    requestData,
                    { headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${ token }`
                    }}
                );
                if (response.data && response.data.waitingRooms) {
                    setRooms(response.data.waitingRooms);
                } else {
                    setRooms([]);
                    setErrorMessage('No se encontraron salas.');
                }
                setLoading(false);
            } catch (error) {
                if (error.response && error.response.data) {
                    const errorMsg = error.response.data.error || 'Error al Cargar Salas';
                    setErrorMessage(errorMsg);
                } else {
                    setErrorMessage('Error al Cargar Salas');
                }
                setLoading(false);
            }
        }
        fetchRooms();
    }, [token]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const requestData = {
                    userId: jwtDecode(token).sub
                }
                const response = await axios.post(
                    `${import.meta.env.VITE_BACK_URL}/game/all`,
                    requestData,
                    { headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${ token }`
                    }}
                );
                if (response.data && response.data.games) {
                    setGames(response.data.games);
                } else {
                    setGames([]);
                    setErrorMessage('No se encontraron juegos.');
                }
                setLoading(false);
            } catch (error) {
                if (error.response && error.response.data) {
                    const errorMsg = error.response.data.error || 'Error al Cargar Juegos';
                    setErrorMessage(errorMsg);
                } else {
                    setErrorMessage('Error al Cargar Juegos');
                }
                setLoading(false);
            }
        }
        fetchGames();
    }, [token]);

    const availableRooms = rooms.filter(room => room.user_in_room);

    useEffect(() => {
        if (availableRooms.length === 0) {
            setErrorMessage('No hay salas disponibles');
        } else {
            setErrorMessage('');
        }
    }, [availableRooms]);

    if (loading) {
        return (
            <div className='ap-spinner-container'>
                <div className='ap-spinner'></div>
            </div>
        )
    }

    return (
        <div className="jr-join-container">
            <h1> Seleccione una Sala</h1>
            <div className="jr-rooms-header">
                <div className="jr-column-header">Sala</div>
                <div className="jr-column-header">Nombre</div>
                <div className="jr-column-header">Jugadores</div>
            </div>
            <div className="jr-rooms-container">
                {errorMessage && <p className='jr-error'>{errorMessage}</p>}
                {rooms.length === 0 ? (
                    <p className='jr-error'>No hay salas disponibles</p>
                ) : (
                    availableRooms.map(room => (
                        <Card
                            key={room.roomId}
                            id={room.roomId}
                            name={room.name}
                            players={room.players_count}
                            token={token}
                            type={'Room'}
                            setErrorMessage={setErrorMessage}
                        />
                    ))
                )}
            </div>

            <h1> Seleccione un Juego</h1>
            <div className="jr-rooms-header">
                <div className="jr-column-header">Juego</div>
                <div className="jr-column-header">Nombre</div>
                <div className="jr-column-header">Jugadores</div>
            </div>
            <div className="jr-rooms-container">
                {errorMessage && <p className='jr-error'>{errorMessage}</p>}
                {games.length === 0 ? (
                    <p className='jr-error'>No hay juegos disponibles</p>
                ) : (
                    games.map(game => (
                        <Card
                            key={game.gameId}
                            id={game.gameId}
                            name={game.name}
                            players={game.players_count}
                            token={token}
                            type={'Game'}
                            setErrorMessage={setErrorMessage}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

ListPlays.propTypes = {
    token: PropTypes.string.isRequired,
};

Card.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    players: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};