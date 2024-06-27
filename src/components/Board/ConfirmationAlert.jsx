import './CardAlert.css';
import PropTypes from 'prop-types';

const ConfirmationAlert = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="alert-overlay">
            <div className="alert-content">
                <p>{message}</p>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

ConfirmationAlert.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired
};
export default ConfirmationAlert;