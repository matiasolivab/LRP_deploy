import axios from "axios";

const casino = async ({
    token,
    gameId,
    socket,
    currentPlayerId,
    type,
    amount
    }) => {
    try {
        const response = await axios.post(
        `${import.meta.env.VITE_BACK_URL}/game/casinoAction/${gameId}`,
        { playerId: currentPlayerId,
        amount: amount,
        type: type
        },
        {
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
        }
        );
        const message = `
                Resultado del casino:
                ${response.data.playerState.resultado}
                Tu nueva cantidad de boings es: ${response.data.playerState.Boings}
                Tu nueva cantidad de corazones es: ${response.data.playerState.Hearts}
            `;
        socket.emit("gameAction", gameId);
        return message;
    } catch (error) {
        console.error("Error al realizar el casino:", error);
    }
    };

export {casino};

    