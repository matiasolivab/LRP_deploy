import './CardAlert.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

const HospitalAlert = ({ isOpen, onClose, token, currentPlayerId, gameId, hospital, setHospitalAlertMessage, socket }) => {
  const [amount, setAmount] = useState('');  // Estado para guardar la cantidad introducida

  const handleHospital = async (amount) => {
    try {
      const result = await hospital({ token, gameId, socket, currentPlayerId, amount });
      setHospitalAlertMessage(result);
      onClose();  // Cierra el modal después de realizar la acción
    } catch (error) {
      let errorMessage = "Error al realizar la acción.";
      if (error.response && error.response.status === 400) {
        errorMessage = "Ingrese un monto posible para la acción.";  // Mensaje específico para errores de monto
      }
      setHospitalAlertMessage(errorMessage);
      onClose();  // Cierra el modal después de mostrar el mensaje de error
    }
  };

  if (!isOpen) return null;

  return (
    <div className="alert-overlay">
      <div className="alert-content">
        <h3>Hospital</h3> {/* Título o encabezado del modal */}
        <p>Cada corazón cuesta 150 Boings, ingresa cuantos corazones quieres comprar:</p>
        <p>Si no quiere comprar, ponga la cantidad de 0 corazones</p>

        <label htmlFor="amount2">Cantidad:</label> {/* Etiqueta para el input de cantidad */}
        <input
          id="amount2"
          placeholder="Ingrese cantidad"
          value={amount}
          onChange={(e) => {
            const validNumber = e.target.value.replace(/[^0-9]/g, '');
            if (/^\d*$/.test(validNumber)) {
              setAmount(validNumber);
            }
          }}
        />

        <button onClick={() => handleHospital(parseInt(amount, 10) || 0)}>Aplicar Hospital</button>
      </div>
    </div>
  );
};

HospitalAlert.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  token: PropTypes.string,
  currentPlayerId: PropTypes.number,
  gameId: PropTypes.string,
  hospital: PropTypes.func,
  setHospitalAlertMessage: PropTypes.func,
  socket: PropTypes.object,
};

export default HospitalAlert;