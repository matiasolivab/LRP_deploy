import { useState, useEffect } from 'react';


const useBoardPositions = (players) => {
  const [boardPositions, setboardPositions] = useState([]);

  useEffect(() => {
    const positions = players.map(player => ({
      playerId: player.playerId,
      boardposition: player.boardPosition,
      name: player.name
    }));
    setboardPositions(positions);
  }, [players]);

  return { boardPositions, setboardPositions };
};

export default useBoardPositions;
