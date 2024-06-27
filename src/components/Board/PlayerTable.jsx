import PropTypes from 'prop-types';
import Player from '../Player/Player';
import './PlayerTable.css';
const PlayerTable = ({ players, turnPlayer }) => {
  return (
    <div className="pt-players">
      {players.map((player, index) => (
        <Player
        key={index}
        playerName={player.name}
        playerRole={player.role.name}
        boings={player.boings}
        hearts={player.hearts}
        turn={player.playerId === turnPlayer}
    />
      ))}
    </div>

  )
};

export default PlayerTable;

PlayerTable.propTypes = {
  players: PropTypes.array.isRequired,
  turnPlayer: PropTypes.number
}