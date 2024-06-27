import './CardAlert.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

const CardAlert = ({ isOpen, message, onClose, cardTypes, updateRole, token, currentPlayerId, gameId}) => {
  const roles = ['Amistoso', 'Negociador', 'Ladron', 'Apostador', 'Doctor', 'Gemelos'];
  const [selectedRole, setSelectedRole] = useState(roles[0]);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleRoleSubmit = async () => {
    try {
      await updateRole(gameId, selectedRole, currentPlayerId, token);
      onClose();  // Cierra el pop-up después de actualizar el rol
    } catch (error) {
      console.error('Error al actualizar el rol:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="alert-overlay">
      <div className="alert-content">
        <p>{message}</p>
        {cardTypes === 'Cambio de rol a elección' && (
          <>
            <select value={selectedRole} onChange={handleRoleChange}>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <button onClick={handleRoleSubmit}>Confirmar Rol</button>
          </>
        )}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

CardAlert.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.node,
  cardTypes: PropTypes.object,
  updateRole: PropTypes.func,
  currentPlayerId: PropTypes.number,
  gameId: PropTypes.string,
  token: PropTypes.string,
};

export default CardAlert;
