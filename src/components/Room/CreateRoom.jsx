import './CreateRoom.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';

export function CreateRoom({ token }) {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [formValues, setFormValues] = useState({
        nameGame: '',
        userId: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nameGame } = formValues;
        const tokenDecode = jwtDecode(token);
        const requestData = {
            nameGame,
            userId: tokenDecode.sub
        }
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACK_URL}/waitingroom`,
                requestData,
                { headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ token }`
            } }
            );
            console.log('Respuesta del Servidor', response);
            navigate(`/room/${response.data.waitingRoomId}`);
        } catch (error) {
            if (error.response && error.response.data) {
                const errorMsg = error.response.data.error || 'Error al Crear Sala';
                setErrorMessage(errorMsg);
            } else {
                setErrorMessage('Error al Crear Sala');
            }
        }
    }

    return (
        <div className='cr-container'>
            <div className="cr-container-form">
                <h1 className="cr-title">Nombre de Partida</h1>
                {errorMessage && <div className="cr-error-message">{errorMessage}</div>}
                <form className= 'cr-form' onSubmit={handleSubmit}>
                    <input
                        className="cr-input"
                        type='text'
                        placeholder='Nombre de la Partida'
                        name='nameGame'
                        value={formValues.nameGame}
                        onChange={handleChange}
                    />
                    <button
                        className="cr-submit-btn"
                        type="submit">Crear Sala de Espera</button>
                </form>
            </div>
        </div>
    )
}

CreateRoom.propTypes = {
    token: PropTypes.string.isRequired,
}