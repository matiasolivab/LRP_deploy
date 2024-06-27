import './CardAlert.css';
import PropTypes from 'prop-types';

const BuyPropertieAlert = ({ message, onClose }) => {

  return (
    <div className="alert-overlay">
      <div className="alert-content">
        <p>{message}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

BuyPropertieAlert.propTypes = {
  onClose: PropTypes.func.isRequired,
  message: PropTypes.node.isRequired,
};

export default BuyPropertieAlert;
