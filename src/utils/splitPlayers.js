const splitPlayers = (players) => {
    const playersOrder = players.sort((a, b) => a.playerId - b.playerId);
    const leftPlayers = playersOrder.slice(0, 2);
    const rightPlayers = playersOrder.slice(2);
    return { leftPlayers, rightPlayers };
  };
export default splitPlayers;