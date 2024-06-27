import { useState, useEffect } from 'react';
import { numberToPosition } from '../utils/position';

const usePlayerPositions = (players) => {
  const [playersPosition, setPlayersPosition] = useState([]);

  useEffect(() => {
    const positions = players.map(player => ({
      playerId: player.playerId,
      position: numberToPosition(player.boardPosition),
      name: player.name
    }));
    setPlayersPosition(positions);
  }, [players]);

  return { playersPosition, setPlayersPosition };
};

export default usePlayerPositions;
