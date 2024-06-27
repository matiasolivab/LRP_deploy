import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_BACK_URL}/waitingroom`;

export async function quitRoom(roomId, playerId, token) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    const response = await axios.post(`${baseUrl}/leave/${roomId}`, { playerId }, { headers });
    return response.data;
}