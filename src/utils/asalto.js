import axios from 'axios';

const asalto = async ({
        socket,
        setCardAlertMessage,
        setIsCardAlertOpen,
        token,
        gameId,
        currentPlayer
    }) => {
    try {
        console.log('player en asalto:', currentPlayer)
        const response = await axios.post(
            `${import.meta.env.VITE_BACK_URL}/game/asaltoAction/${gameId}`,
            { playerId: currentPlayer.playerId },
            {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            }
        );
        socket.emit('gameAction', gameId)
        const message = `
            Resultado del asalto:
            Boings robados ${response.data.playerState.boings_perdidos}
            Corazones quitados ${response.data.playerState.vidas_quitadas}
            Boings actuales ${response.data.playerState.newBoings}
            Corazones actuales ${response.data.playerState.newHearts}
        `;
        setCardAlertMessage(message);
        setIsCardAlertOpen(true);
        return response;
    } catch (error) {
      console.error('Error al realizar el asalto:', error);
    }
  }

const checkAndPerformAsalto = async ({
        socket,
        setCardAlertMessage,
        setIsCardAlertOpen,
        gameId,
        currentPlayer,
        token
    }) => {
    await asalto({ socket, setCardAlertMessage, setIsCardAlertOpen, gameId, currentPlayer, token });
  };

export default checkAndPerformAsalto;
