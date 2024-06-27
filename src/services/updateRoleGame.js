import axios from "axios";

const baseUrl = `${import.meta.env.VITE_BACK_URL}/game/changeRole`;

const roleMapping = {
    Amistoso: 1,
    Negociador: 2,
    Ladron: 3,
    Apostador: 4,
    Doctor: 5,
    Gemelos: 6,
    };

const convertRoleToNumber = (role) => {
    return roleMapping[role];
}

export async function updateRoleGame(gameId, roleName, playerId, token) {
    const roleId = convertRoleToNumber(roleName);
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
    await axios.post(`${baseUrl}/${gameId}`, { playerId , roleId }, { headers });
}
export default updateRoleGame;