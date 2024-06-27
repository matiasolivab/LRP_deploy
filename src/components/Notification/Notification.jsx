import './Notification.css';

const NotificationPopup = ({ message, onClose }) => {
  return (
    <div className="notification-popup-overlay">
      <div className="notification-popup">
        <p>{message}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default NotificationPopup;
