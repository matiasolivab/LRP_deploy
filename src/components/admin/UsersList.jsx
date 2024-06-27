import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './UsersList.css';

export function UsersList({ token }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {

        axios.get(`${import.meta.env.VITE_BACK_URL}/user`,
        { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
            setUsers(response.data);
        });
        
    }, [token]);

    return (
        <div className="usl-container">
            <h1 className="usl-title">Lista de usuarios</h1>
            <ul className="usl">
            {users.map(user => (
                <li key={user.userId} className="usl-item">
                <div>
                    <strong>Nombre:</strong> <span>{user.userName}</span>
                </div>
                <div>
                    <strong>Correo:</strong> <span>{user.mail}</span>
                </div>
                <div>
                    <strong>Rol:</strong> <span>{user.admin ? 'Admin' : 'No Admin'}</span>
                </div>
                </li>
            ))}
            </ul>
        </div>
    )
}

UsersList.propTypes = {
    token: PropTypes.string.isRequired
}