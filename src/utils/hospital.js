import axios from "axios";

const hospital = async ({
    token,
    gameId,
    socket,
    currentPlayerId,
    amount
    }) => {
    try {
        const response = await axios.post(
        `${import.meta.env.VITE_BACK_URL}/game/hospitalAction/${gameId}`,
        { playerId: currentPlayerId,
        cantidad: amount,
        },
        {
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
        }
        );
        const message = `
                Resultado del hospital:
                Tu nueva cantidad de boings es: ${response.data.playerState.newBoings}
                Tu nueva cantidad de corazones es: ${response.data.playerState.newHearts}
            `;
        socket.emit("gameAction", gameId);
        return message;
    } catch (error) {
        console.error("Error al realizar el hospital:", error);
    }
    }

export {hospital};