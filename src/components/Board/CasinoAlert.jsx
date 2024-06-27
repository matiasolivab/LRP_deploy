import './CardAlert.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

const CasinoAlert = ({ isOpen, onClose, token, currentPlayerId, gameId, casino, setCasinoAlertMessage, socket}) => {
  const [amount, setAmount] = useState('');  // Estado para guardar la cantidad introducida
  const [rewardType, setRewardType] = useState('Boings');  // Estado para guardar el tipo de recompensa seleccionada

  const handleCasino = async (type, amount) => {
    try {
      const result = await casino({ token, gameId, socket, currentPlayerId, type, amount });
      setCasinoAlertMessage(result);
      onClose();  // Cierra el modal después de realizar el asalto
    } catch (error) {
      let errorMessage = "Error al realizar el asalto.";
      if (error.response && error.response.status === 400) {
        errorMessage = "Ingrese un monto posible para el asalto.";  // Mensaje específico para errores de monto
      }
      setCasinoAlertMessage(errorMessage);
      onClose();  // Cierra el modal después de mostrar el mensaje de error
    }
  };

  if (!isOpen) return null;

  return (
    <div className="alert-overlay">
      <div className="alert-content">
        <h3>Participa en el Casino</h3> {/* Título o encabezado del modal */}
        <p>Introduce la cantidad que deseas apostar y selecciona el tipo de premio:</p>
        <p>Si no quiere apostar, ponga la cantidad de 0 Boings o corazones</p>

        <label htmlFor="amount">Cantidad:</label> {/* Etiqueta para el input de cantidad */}
        <input
          id="amount"
          type="text"
          placeholder="Ingrese cantidad"
          value={amount}
          onChange={(e) => {
            const validNumber = e.target.value.replace(/[^0-9]/g, '');
            if (/^\d*$/.test(validNumber)) {
              setAmount(validNumber);
            }
          }}
        />

        <label htmlFor="rewardType">Tipo de Premio:</label> {/* Etiqueta para el select de tipo de premio */}
        <select id="rewardType" value={rewardType} onChange={(e) => setRewardType(e.target.value)}>
          <option value="Boings">Boings</option>
          <option value="Corazones">Corazones</option>
        </select>

        <button onClick={() => handleCasino(rewardType, parseInt(amount, 10) || 0)}>Aplicar Casino</button>
      </div>
    </div>
  );
};

CasinoAlert.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  currentPlayerId: PropTypes.number,
  gameId: PropTypes.string,
  token: PropTypes.string,
  casino: PropTypes.func,
  setCasinoAlertMessage: PropTypes.func.isRequired,
  socket: PropTypes.object.isRequired, // Add socket prop validation
};

export default CasinoAlert;
