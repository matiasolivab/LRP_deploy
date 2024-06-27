import axios from 'axios';

const FinishTurn = async ({ setCount, setDiceValues, gameId, currentPlayer, token, updateGameState, socket }) => {
    try {
        setCount(0);
        await axios.post(
        `${import.meta.env.VITE_BACK_URL}/game/nextTurn/${gameId}`,
        { playerId: currentPlayer.playerId },
        {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            }
        }
        );

        setDiceValues(null);
        updateGameState();
        socket.emit('gameAction', gameId)
    } catch (error) {
        console.error('Error al terminar turno:', error);
    }
}

export default FinishTurn;