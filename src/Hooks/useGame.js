import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const useGame = ({ gameId, socket }) => {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [turnPlayer, setTurnPlayer] = useState(null);
  const [turnOrder, setTurnOrder] = useState([]);
  const [token, setToken] = useState('');
  const [propertiesInfo, setPropertieInfo] = useState('');

  const updateGameState = useCallback(async () => {
    const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (authToken) setToken(authToken);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACK_URL}/game/${gameId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        }
      );

      const response2 = await axios.get(
        `${import.meta.env.VITE_BACK_URL}/game/${gameId}/board`,
        {
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
            },
        }
        );

      const playerData = response.data.players.find(player => player.userId === Number(jwtDecode(authToken).sub));
      setCurrentPlayer(playerData);
      setPlayers(response.data.players);
      setTurnOrder(response.data.playOrder);
      setTurnPlayer(response.data.currentTurn);
      setPropertieInfo(response2.data.squares);
    } catch (error) {
      console.error('Error al obtener los datos del juego:', error);
    }
  }, [gameId]);

  useEffect(() => {
    updateGameState();
    socket.emit('joinGame', gameId);
    socket.on('updateGame', updateGameState);

    return () => {
      socket.off('updateGame', updateGameState);
    };
  }, [updateGameState, gameId, socket]);

  const firstRoll = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACK_URL}/game/${gameId}/TurnOrder/rollDices`,
        { playerId: currentPlayer.playerId },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      socket.emit('gameAction', gameId)
      updateGameState();
    } catch (error) {
      console.error('Error al lanzar dados para decidir turno:', error);
    }
  };

  return { players, currentPlayer, turnPlayer, setTurnPlayer, turnOrder, token, firstRoll, updateGameState, propertiesInfo };
};

export default useGame;
