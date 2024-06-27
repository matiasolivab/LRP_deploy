import './AuthForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function SignUp() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [isValid, setIsValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const validateForm = (values) => {
        const { name, email, password, confirmPassword } = values;
        if (!name || !email || !password || !confirmPassword) {
            setErrorMessage('Todos los campos son obligatorios');
            setIsValid(false);
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden');
            setIsValid(false);
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErrorMessage('El correo electrónico no es válido');
            setIsValid(false);
            return;
        }

        setErrorMessage('');
        setIsValid(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        })
        validateForm({
            ...formValues,
            [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = formValues;
        const requestData = {
            userName: name,
            mail: email,
            password,
            admin: false,
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACK_URL}/auth/signup`, requestData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Respuesta del Servidor', response);
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data) {
                const errorMsg = error.response.data.error || 'Error al Registrarse';
                setErrorMessage(errorMsg);
            } else {
                setErrorMessage('Error al Registrarse');
            }
            console.error('Error al Registrarse', error?.response?.data || error);
        }
    }

    return (
        <div className="su-container">
            <div className="su-container-form">
                <h1 className="su-title">Registrarse</h1>
                {errorMessage && <div className="su-error-message">{errorMessage}</div>}
                <form className="su-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        className="su-input"
                        value={formValues.name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo"
                        className="su-input"
                        value={formValues.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        className="su-input"
                        value={formValues.password}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirmar Contraseña"
                        className="su-input"
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                    />
                    <button className="su-btn-submit" disabled={!isValid}>Registrarse</button>
                </form>
                <label className="su-label-link">
                    ¿Ya tienes una cuenta?
                    <br />
                    <a href="/login" className="su-link">Inicia Sesión</a>
                </label>
            </div>
        </div>
    )
}