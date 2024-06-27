import './Room.css'
import PropTypes from 'prop-types';
import Player from '../Player/Player';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useRoom } from '../../Hooks/useRoom';
import { startGame } from '../../services/startGame';
import { updateRole } from '../../services/updateRole';
import { quitRoom } from '../../services/quitRoom';
import { useSocket } from '../../Hooks/useSocket';

export function Room({ token }) {
    const navigate = useNavigate();
    const { roomId } = useParams();
    const socket = useSocket();
    const {
        players,
        roomName,
        currentPlayer,
        errorMessage,
        setErrorMessage,
        setPlayers } = useRoom({ roomId, token, socket });
    
    const onRoleChange = async (index, newRole) => {
        try {
            await updateRole(roomId, newRole, currentPlayer, token)
            const updatePlayers = [...players];
            updatePlayers[index].roleName =  newRole;

            updatePlayers.sort((a, b) => {
                if (a.playerId === null) return 1;
                if (b.playerId === null) return -1;

                return a.playerId - b.playerId;
            });

            setPlayers(updatePlayers);
            socket.emit('updateRole', roomId);
        } catch (error){
            setErrorMessage(error);
            return;
        }
    }

    const handleStartGame = async () => {
        try {
            const data = await startGame(roomId, token);
            console.log('Data from startGame', data);
            socket.emit('startGame', roomId, data.gameId);
            navigate(`/board/${data.gameId}`);
        } catch (error) {
            setErrorMessage(error.response.data.error.message);
        }
    }

    const handleQuitRoom = async () => {
        try {
            await quitRoom(roomId, currentPlayer, token);
            socket.emit('leaveRoom', roomId);
            navigate('/play');
        } catch (error) {
            setErrorMessage(error.response.data.error.message);
        }
    }

    useEffect(() => {
        socket.on('gameStarted', (data) => {
            navigate(`/board/${data.gameId}`);
        });
    }, [socket, navigate]);

    return (
        <div className="rm-container">
            <div className="rm-container-room">
                <h1 className="rm-title">{ roomName }</h1>
                {errorMessage && <p className="rm-error">{errorMessage}</p>}
                <div className="rm-players">
                    {players.map((player, index) => (
                        <Player
                            key={index}
                            playerName={player.name}
                            playerRole={player.roleName}
                        />
                    ))}
                </div>
                <div className="rm-btns-section">
                    <button className='rm-btn' onClick={handleStartGame}>Iniciar Partida</button>
                    <button className='rm-btn' onClick={handleQuitRoom}>Salir de la Partida</button>
                    {players.map((player, index) => (
                        player.playerId === currentPlayer && (
                        <select
                            key={index}
                            className='rm-select'
                            value={player.roleName}
                            onChange={(e) => onRoleChange(index, e.target.value)}
                        >
                            <option value="NoRole" disabled>Selecciona un Rol</option>
                            <option value="Amistoso">Rol: Amistoso</option>
                            <option value="Negociador">Rol: Negociador</option>
                            <option value="Ladron">Rol: Ladrón</option>
                            <option value="Apostador">Rol: Apostador</option>
                            <option value="Doctor">Rol: Doctor</option>
                            <option value="Gemelos">Rol: Gemelos</option>
                        </select>
                        )
                    ))}
                </div>
            </div>
        </div>
    )
}

Room.propTypes = {
    token: PropTypes.string.isRequired,
}
