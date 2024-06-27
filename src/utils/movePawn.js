import axios from 'axios';

const movePawn = async ({
  setDiceValues,
  playersPosition,
  turnPlayer,
  setPlayersPosition,
  currentPlayer,
  gameId,
  token,
  socket,
  setboardPositions,
}) => {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    let result = dice1 + dice2;
    setDiceValues({dice1: dice1, dice2: dice2});
    const prevPosition = playersPosition.find(player => player.playerId === turnPlayer);
    let newX = prevPosition.position.x;
    let newY = prevPosition.position.y;
    if (newX === 0 && newY + dice1 < 10) {
      newY += dice1;
    } else if (newX === 0 && newY + dice1 >= 10) {
      const sobra = newY + dice1 - 10;
      newX += sobra;
      newY = 10;
    } else if (newY === 10 && newX + dice1 < 10) {
      newX += dice1;
    } else if (newY === 10 && newX + dice1 >= 10) {
      const sobra = newX + dice1 - 10;
      newY -= sobra;
      newX = 10;
    } else if (newX === 10 && newY - dice1 > 0) {
      newY -= dice1;
    } else if (newX === 10 && newY - dice1 <= 0) {
      const sobra = newY - dice1;
      newX += sobra;
      newY = 0;
    } else if (newY === 0 && newX - dice1 > 0) {
      newX -= dice1;
    } else if (newY === 0 && newX - dice1 <= 0) {
      const sobra = dice1 - newX;
      newY += sobra;
      newX = 0;
    }
    if (newX === 0 && newY + dice2 < 10) {
      newY += dice2;
    } else if (newX === 0 && newY + dice2 >= 10) {
      const sobra = newY + dice2 - 10;
      newX += sobra;
      newY = 10;
    } else if (newY === 10 && newX + dice2 < 10) {
      newX += dice2;
    } else if (newY === 10 && newX + dice2 >= 10) {
      const sobra = newX + dice2 - 10;
      newY -= sobra;
      newX = 10;
    } else if (newX === 10 && newY - dice2 > 0) {
      newY -= dice2;
    } else if (newX === 10 && newY - dice2 <= 0) {
      const sobra = newY - dice2;
      newX += sobra;
      newY = 0;
    } else if (newY === 0 && newX - dice2 > 0) {
      newX -= dice2;
    } else if (newY === 0 && newX - dice2 <= 0) {
      const sobra = dice2 - newX;
      newY += sobra;
      newX = 0;
    }
    setPlayersPosition(prevState => prevState.map(player => {
      if (player.playerId === turnPlayer) {
        return { ...player, position: { x: newX, y: newY } };
      }
      return player;
    }));

    try { 
      const respuesta = await axios.post(
        `${import.meta.env.VITE_BACK_URL}/game/movePlayer/${gameId}`,
        { playerId: currentPlayer.playerId,
          roll: result
         },
        { headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
          } 
        }
      );
      socket.emit('gameAction', gameId);

    // Acceder a los datos obtenidos en la respuesta

      setboardPositions(prevState => prevState.map(player => {
        if (player.playerId === turnPlayer) {
          return { ...player, boardposition: respuesta.data.playerState.newBoardPosition };
        }
        return player;
      }
      ));

      

    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de estado diferente de 2xx
        console.error('Error en la respuesta del servidor:', error.response.data);
        console.error('Código de estado:', error.response.status);
      } else if (error.request) {
        // La solicitud fue hecha pero no hubo respuesta
        console.error('No hubo respuesta del servidor:', error.request);
      } else {
        // Algo sucedió al configurar la solicitud que desencadenó un error
        console.error('Error al configurar la solicitud:', error.message);
      }
    }
};

export default movePawn;