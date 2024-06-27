import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_BACK_URL}/waitingroom`;

export async function startGame(roomId, token) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    const response = await axios.post(`${baseUrl}/start`, { roomId }, { headers });
    console.log('Response from startGame', response.data)
    return response.data;
}