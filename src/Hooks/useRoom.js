// hooks/useRoom.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export function useRoom({ roomId, token, socket }) {
    const [players, setPlayers] = useState([]);
    const [roomName, setRoomName] = useState('');
    const [currentPlayer, setCurrentPlayer] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `${import.meta.env.VITE_BACK_URL}/waitingroom/${roomId}`;
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                };
                const response = await axios.get(url, { headers });
                const myPlayer = response.data.waitingRoomPlayers.find(
                    player => player.userId === Number(jwtDecode(token).sub)
                );

                const fetchedPlayers = response.data.waitingRoomPlayers.map(player => ({
                    name: player.name,
                    roleName: player.role && player.role.name ? player.role.name : 'NoRole',
                    playerId: player.playerId
                }));

                while (fetchedPlayers.length < 4) {
                    fetchedPlayers.push({
                        name: 'Espacio Libre',
                        roleName: 'NoRole',
                        playerId: null
                    });
                }
                
                fetchedPlayers.sort((a, b) => {
                    if (a.playerId === null) return 1;
                    if (b.playerId === null) return -1;

                    return a.playerId - b.playerId;
                });

                setCurrentPlayer(myPlayer.playerId);
                setPlayers(fetchedPlayers);
                setRoomName(response.data.waitingRoomName);

            } catch (error) {
                console.error('Error al Obtener Jugadores', error);
                setErrorMessage('Error al Obtener Jugadores');
                throw error;
            }
        };
        
        fetchData();
        socket.emit('joinRoom', roomId);
        socket.on('updateRoom', () => {
            fetchData();
        })

    }, [roomId, token, socket]);

    return { players, roomName, currentPlayer, errorMessage, setErrorMessage, setPlayers };
}
