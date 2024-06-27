import { useEffect, useRef } from 'react';
import axios from 'axios';

const cellAction = async ({ gameId, currentPlayer, token }) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACK_URL}/game/cellAction/${gameId}`,
            { playerId: currentPlayer.playerId },
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
};

export default function useCellAction({ gameId, token, currentPlayer, socket, setNotificationMessage, setIsNotificationVisible, setCanThrowDice }) {
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            if (currentPlayer && currentPlayer.boardPosition !== undefined && !([5, 15, 20, 25, 35].includes(currentPlayer.boardPosition))) {
                cellAction({ gameId, currentPlayer, token }).then((data) => {
                    const regex = /^Los gemelos pueden lanzar los dados otra vez. (.+)$/;
                    if (regex.test(data?.result?.message)) {
                        setCanThrowDice(true);
                    }

                    if (data?.result?.message) {
                        setNotificationMessage(data.result.message);
                        setIsNotificationVisible(true);
                        setTimeout(() => {
                            setIsNotificationVisible(false);
                        }, 5000);
                    }
                    socket.emit('gameAction', gameId);
                });
            }
        }
    }, [currentPlayer?.boardPosition]);
}
