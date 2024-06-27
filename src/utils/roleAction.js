import axios from 'axios';

export const roleAction = async (gameId, playerId, token) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACK_URL}/game/roleaction/${gameId}`,
            { playerId: playerId },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ token }`
                }
            }
        );
        return response;

    } catch (error) {
        if (error.response) {
            console.error('Error en la respuesta del servidor:', error.response.data);
            console.error('Código de estado:', error.response.status);
            throw new Error(error.response.data.error.message);
        } else if (error.request) {
            console.error('No hubo respuesta del servidor:', error.request);
            throw new Error('No hubo respuesta del servidor');
        } else {
            console.error('Error al configurar la solicitud:', error.message);
            throw new Error('Error al configurar la solicitud');
        }
    }
};