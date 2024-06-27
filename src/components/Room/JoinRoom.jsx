import './JoinRoom.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { socket } from '../../services/socket';

function RoomCard({ roomId, name, players, token, setErrorMessage}) {
    const [isJoining, setIsJoining] = useState(false);
    const navigate = useNavigate();

    const handleCardClick = async () => {
        if (isJoining) return;
        setIsJoining(true);

        try {
            const requestData = {
                userId: jwtDecode(token).sub,
            }
            await axios.post(
                `${import.meta.env.VITE_BACK_URL}/waitingroom/join/${roomId}`,
                requestData,
                { headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ token }`
                }}
            );

            if (!socket.connected) {
                socket.connect();
                console.log('Socket Connected');
            }

            socket.once('connect', () => {
                console.log('Socket Connected, joining room: ', roomId);
                socket.emit('joinRoom', roomId);
                navigate(`/room/${roomId}`);
            });

            socket.once('connect_error', (err) => {
                console.error('Socket Connection Error:', err.message);
            });

        } catch (error) {
            setIsJoining(false);
            if (error.response && error.response.data) {
                const errorMsg = error.response.data.error.message || 'Error al Unirse a la Sala';
                setErrorMessage(errorMsg);
            } else {
                setErrorMessage('Error al Unirse a la Sala');
            }
        }
    }

    useEffect(() => {
        return () => {
            socket.off('joinRoom');
            if (socket.connected) {
                socket.disconnect();
                console.log('Socket Disconnected');
            }
        };
        }, []);

    return (
        <div className="jr-room-card" onClick={handleCardClick}>
            <div className="jr-column">
                <h3>Sala {roomId}</h3>
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

export function JoinRoom({ token }) {
    const [rooms, setRooms] = useState([]);
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

    const availableRooms = rooms.filter(room => !room.user_in_room);

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
                        <RoomCard
                            key={room.roomId}
                            roomId={room.roomId}
                            name={room.name}
                            players={room.players_count}
                            token={token}
                            setErrorMessage={setErrorMessage}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

JoinRoom.propTypes = {
    token: PropTypes.string.isRequired,
};

RoomCard.propTypes = {
    roomId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    players: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    setErrorMessage: PropTypes.func.isRequired,
};