import axios from 'axios';

const buyDefense = async ({
    currentPlayer,
    gameId,
    token,
    defense,
    
    }) => {
    try {
        const responde = await axios.post(
        `${import.meta.env.VITE_BACK_URL}/game/buydefense/${gameId}`,
        { playerId: currentPlayer.playerId,
            defenseId: defense
         },
        { headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
            }
        }
        );
        return responde;
        
        
    } catch (error) {
        if (error.response) {
            // El servidor respondió con un código de estado diferente de 2xx
            console.error('Error en la respuesta del servidor:', error.response.data);
            console.error('Código de estado:', error.response.status);
            throw new Error(error.response.data.error.message);
        } else if (error.request) {
            // La solicitud fue hecha pero no hubo respuesta
            console.error('No hubo respuesta del servidor:', error.request);
            throw new Error('No hubo respuesta del servidor');
        } else {
            // Algo sucedió al configurar la solicitud que desencadenó un error
            console.error('Error al configurar la solicitud:', error.message);
            throw new Error('Error al configurar la solicitud');
        }
    }
}
export default buyDefense;