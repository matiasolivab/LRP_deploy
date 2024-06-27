import {useEffect} from 'react';
import updateBoingsOnCornerPass from '../utils/updateBoingsOnCornerPass';

const useUpdateBoingsOnCornerPass = ({currentPlayer, diceValues, gameId, token}) => {
    useEffect(() => {
        const fetchBoingsData = async () => {
            if (diceValues) {
                try {
                    const boingsData = await updateBoingsOnCornerPass({currentPlayer, diceValues, gameId, token});
                    //console.log('boingsData:', boingsData.finalBoings, currentPlayer.boardPosition, diceValues);
                } catch (error) {
                    console.error('Error updating boings on corner pass:', error);
                }
            }
        };

        fetchBoingsData();
    }, [diceValues]);
};

export default useUpdateBoingsOnCornerPass;