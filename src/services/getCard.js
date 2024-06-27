import axios from "axios";

const getCard = async ({
    gameId,
    currentPlayer,
    token,
}) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACK_URL}/game/getCard/${gameId}`,
        { playerId: currentPlayer.playerId },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      )
      if (response.data.result.card === 'Cambio de casilla') {
        const displayData = {
          card: response.data.result.card,
          type: response.data.result.function,
          otherData: response.data.result.newPositions,
        };
        return displayData;
      }
      if (response.data.result.card === 'Cambio de rol aleatorio') {
        const displayData = {
          card: response.data.result.card,
          type: response.data.result.function,
          otherData: {
            newRole: response.data.result.newRoleName,
            newSkill: response.data.result.newRoleSkill,
          }
        };
        return displayData;
      }
      if (response.data.result.card === 'Cambio de rol a elección') {
        const displayData = {
          card: response.data.result.card,
          type: response.data.result.function,
          otherData: response.data.result.action,
        };
        return displayData;
      }
      if (response.data.result.card === 'Fortuna') {
        const displayData = {
          card: response.data.result.card,
          type: response.data.result.function,
          otherData: {
            investments: response.data.result.investments,
            profit: response.data.result.profit,
            boings: response.data.result.boings,
          },
        };
        return displayData;
      }
      if (response.data.result.card === 'Esperanza') {
        const displayData = {
          card: response.data.result.card,
          type: response.data.result.function,
          otherData: {
            luck: response.data.result.luck,
            hearts: response.data.result.hearts,
          },
        };
        return displayData;
      }
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

export default getCard;