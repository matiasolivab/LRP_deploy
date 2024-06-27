import './AuthForm.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import PropTyoes from 'prop-types';

export function Login({ onLogin }) {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [isValid, setIsValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleCheckboxChange = () => {
        setRememberMe(!rememberMe);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        })
        setIsValid(true); // Modificar en un Futuro
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formValues;
        const requestData = {
            mail: email,
            password
        }
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACK_URL}/auth/login`,
                requestData,
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log('Respuesta del Servidor', response);
            const token = response.data.token;
            if (rememberMe) {
                localStorage.setItem('authToken', token);
            } else {
                sessionStorage.setItem('authToken', token);
            }
            onLogin(token)
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data) {
                const errorMsg = error.response.data.error || 'Error al Iniciar Sesión';
                setErrorMessage(errorMsg);
            } else {
                setErrorMessage('Error al Iniciar Sesión');
            }
            console.log('Error al Iniciar Sesión', error?.response?.data || error);
        }
    }


    return (
        <div className="su-container">
            <div className="su-container-form">
                <h1 className="su-title">Iniciar Sesión</h1>
                {errorMessage && <div className="su-error-message">{errorMessage}</div>}
                <form className="su-form" onSubmit={handleSubmit}>
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
                    <div className="su-remember-me">
                        <input
                           type="checkbox"
                           id="remember-me"
                           checked={rememberMe}
                           onChange={handleCheckboxChange}
                           name="remember-me"
                        />
                        <label htmlFor="remember-me">Recordarme</label>
                    </div>
                    <button className="su-btn-submit" disabled={!isValid}>Iniciar Sesión</button>
                </form>
                <label className="su-label-link">
                    ¿No tienes una cuenta?
                    <br />
                    <a href="/signup" className="su-link">Registrarse</a>
                </label>
            </div>
        </div>
    )
}

Login.propTypes = {
    onLogin: PropTyoes.func.isRequired
}