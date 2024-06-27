import {useEffect} from 'react';
import updateBoingsOnCornerPass from '../utils/updateBoingsOnCornerPass';

const useUpdateBoingsOnCornerPass = ({currentPlayer, diceValues, gameId, token}) => {
    useEffect(() => {
        const fetchBoingsData = async () => {
            if (diceValues) {
                try {
                    await updateBoingsOnCornerPass({currentPlayer, diceValues, gameId, token});
                } catch (error) {
                    console.error('Error updating boings on corner pass:', error);
                }
            }
        };

        fetchBoingsData();
    }, [diceValues]);
};

export default useUpdateBoingsOnCornerPass;