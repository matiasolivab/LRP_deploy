import { useEffect } from 'react';
import { socket } from '../services/socket.js';

export function useSocket() {
    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
            console.log('Socket Connected');
        }

        return () => {
            socket.disconnect();
            console.log('Socket Disconnected');
        }
    }, []);

    return socket;
}
