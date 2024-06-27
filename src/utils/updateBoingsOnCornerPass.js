import axios from 'axios';

const updateBoingsOnCornerPass = async ({currentPlayer, diceValues, gameId, token}) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACK_URL}/game/cornerBoings/${gameId}`,
            {
                playerId: currentPlayer.playerId,
                diceValues: diceValues
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        //console.log('response.data.result:', response.data);
        return response.data.playerState.result;
    }
    catch (error) {
        console.error(error);
    }
}

export default updateBoingsOnCornerPass;