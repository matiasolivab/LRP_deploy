import './CardAlert.css';
import PropTypes from 'prop-types';

const SeePropertiesAlert = ({ message, onClose, players }) => {
  return (
    <div className="alert-overlay">
      <div className="alert-content">
        {Array.isArray(message) ? (
          <table>
            <thead>
              <tr>
                <th>Posicion</th>
                <th>Nombre</th>
                <th>Propietario</th>
                <th>Defensa</th>
              </tr>
            </thead>
            {message.map((property, index) => (
                property.propertie ? (
                  <tr key={index}>
                    <td>{property.position}</td>
                    <td>{property.propertie.name}</td>
                    <td>{players.find(player => player.playerId === property.propertie.playerId)?.name}</td>
                    <td>{property.propertie.defenseId}</td>
                  </tr>
                ) : null
              ))}
          </table>
        ) : (
          <p>{message}</p>
        )}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

SeePropertiesAlert.propTypes = {
    onClose: PropTypes.func.isRequired,
    message: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.shape({
          position: PropTypes.number.isRequired,
          propertie: PropTypes.shape({
            name: PropTypes.string.isRequired,
            playerId: PropTypes.string.isRequired,
          })
        })
      )
    ]).isRequired,
    players: PropTypes.arrayOf(
      PropTypes.shape({
        playerId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  };
export default SeePropertiesAlert;
