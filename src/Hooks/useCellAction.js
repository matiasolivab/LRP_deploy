import { useEffect } from 'react';
import axios from 'axios';

const cellAction = async ({gameId, currentPlayer, token}) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACK_URL}/game/cellAction/${gameId}`,
            { playerId: currentPlayer.playerId},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }

}

export default function useCellAction({gameId, token, currentPlayer, socket, setNotificationMessage, setIsNotificationVisible, setCanThrowDice}) {
    useEffect(()=> {
        if (currentPlayer && currentPlayer.boardPosition !== undefined && !([5,15,20,25,35].includes(currentPlayer.boardPosition)) ) {
            cellAction({gameId, currentPlayer, token}).then((data) => {
                let pass = false;
                if (data?.result?.message === 'Los gemelos pueden lanzar los dados otra vez') {
                    setCanThrowDice(true);
                    pass = true;
                   }

                if (data?.result?.message === 'Gracias a tus grandes habilidades como doctor, has recuperado un corazón de vida') {
                    pass = true;
                }

                const regex = /^El jugador (.+) fue muy simpático y no perdió vida por caer en la propiedad$/;
                if (regex.test(data?.result?.message)) {
                    pass = true;
                }

                const regex2 = /^Pudiste robar a (.+) y obtuviste (.+) Boings$/;
                if (regex2.test(data?.result?.message)) {
                    pass = true;
                }

                const regex3 = /^Pudiste robar a (.+) y obtuviste (.+) Corazones de vida$/;
                if (regex3.test(data?.result?.message)) {
                    pass = true;
                }

                if (data?.result?.message === 'Tuviste buena suerte y evadiste el castigo de la propiedad') {
                    setCanThrowDice(true);
                    pass = true;
                   }
                
                const regex4 = /^No tuviste suerte y fuiste castigado el doble por la propiedad, perdiste (.+) corazones de vida$/;
                if (regex4.test(data?.result?.message)) {
                    pass = true;
                }

                
            
                if (pass) {
                    setNotificationMessage(data.result.message);
                    setIsNotificationVisible(true);
                    setTimeout(() => {
                        setIsNotificationVisible(false);
                    }, 5000);
                }   
                console.log('data:', data?.result?.message);

            });

            
        }
    },[currentPlayer?.boardPosition])
}