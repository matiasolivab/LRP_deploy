import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_BACK_URL}/waitingroom`;

const roleMapping = {
    'NoRole': 0,
    'Amistoso': 1,
    'Negociador': 2,
    'Ladron': 3,
    'Apostador': 4,
    'Doctor': 5,
    'Gemelos': 6
};

const convertRoleToNumber = (role) => {
    return roleMapping[role];
};

export async function updateRole(roomId, roleName, playerId, token) {
    const roleId = convertRoleToNumber(roleName);
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
    await axios.post(`${baseUrl}/selectRole/${roomId}`, { roleId, playerId }, { headers });
}