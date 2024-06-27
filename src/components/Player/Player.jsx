import './Player.css'
import PropTypes from 'prop-types';

export default function Player({ playerName, playerRole, boings, hearts, turn }) {
    const playerURL = `/img/role/${playerRole}.webp`
    return (
        <div className="rm-player-room">
            <img
              src={playerURL}
              alt="Role"
              className='rm-img-role'
              style={{
                border: turn ? '6px solid green' : '2px solid #000'
              }} />
            <p
              style={
                {
                  color: turn ? 'green' : 'black',
                  fontWeight: turn ? 'bold' : 'normal'
                }
              
              }>
                { playerName }
                </p>
            {boings !== undefined && hearts !== undefined && (
                <div className="rm-player-info">
                    <img src='/img/items/boings.png' className='rm-img-boings' alt='boings'/><span>{boings}</span>
                    <img src='/img/items/hearts.png' className='rm-img-hearts'alt='hearts'/><span>{hearts}</span>
                </div>
            )}
        </div>
    )
}

Player.propTypes = {
    playerName: PropTypes.string.isRequired,
    playerRole: PropTypes.string.isRequired,
    turn: PropTypes.bool,
    boings: PropTypes.number,
    hearts: PropTypes.number
}