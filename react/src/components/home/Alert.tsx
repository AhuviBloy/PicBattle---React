import React, { useState, useEffect } from 'react';

// Types
export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface Alert {
  id: number;
  message: string;
  type: AlertType;
  duration: number;
}

interface AutoAlertProps {
  message: string;
  type: AlertType;
  duration: number;
  onClose?: () => void;
}

interface AlertContainerProps {
  alerts: Alert[];
  removeAlert: (id: number) => void;
}

// קומפוננט Alert הבסיסי
const AutoAlert: React.FC<AutoAlertProps> = ({ 
  message, 
  type = 'success', 
  duration = 3000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose && onClose();
      }, 300); // זמן האנימציה
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const getAlertStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      padding: '16px 20px',
      borderRadius: '8px',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontFamily: 'Rubik, sans-serif',
      fontSize: '14px',
      fontWeight: 500,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      transform: isClosing ? 'translateX(100%)' : 'translateX(0)',
      opacity: isClosing ? 0 : 1,
      transition: 'all 0.3s ease-in-out',
      position: 'relative',
      overflow: 'hidden'
    };

    const typeStyles: Record<AlertType, React.CSSProperties> = {
      success: {
        backgroundColor: '#d4edda',
        color: '#155724',
        border: '1px solid #c3e6cb'
      },
      error: {
        backgroundColor: '#f8d7da',
        color: '#721c24',
        border: '1px solid #f5c6cb'
      },
      warning: {
        backgroundColor: '#fff3cd',
        color: '#856404',
        border: '1px solid #ffeaa7'
      },
      info: {
        backgroundColor: '#d1ecf1',
        color: '#0c5460',
        border: '1px solid #bee5eb'
      }
    };

    return { ...baseStyles, ...typeStyles[type] };
  };

  const getIcon = (): string => {
    const icons: Record<AlertType, string> = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    return icons[type];
  };

  const progressBarStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '3px',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: '100%',
    transformOrigin: 'left',
    transform: isClosing ? 'scaleX(0)' : 'scaleX(1)',
    transition: `transform ${duration}ms linear`
  };

  return (
    <div style={getAlertStyles()}>
      <span style={{ fontSize: '16px' }}>{getIcon()}</span>
      <span>{message}</span>
      
      {/* פס התקדמות */}
      <div style={progressBarStyle} />
    </div>
  );
};

// קומפוננט המכיל את כל ה-Alerts
export const AlertContainer: React.FC<AlertContainerProps> = ({ alerts, removeAlert }) => {
  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 9999,
    maxWidth: '400px',
    width: '100%'
  };

  return (
    <div style={containerStyle}>
      {alerts.map(alert => (
        <AutoAlert
          key={alert.id}
          message={alert.message}
          type={alert.type}
          duration={alert.duration}
          onClose={() => removeAlert(alert.id)}
        />
      ))}
    </div>
  );
};

// Hook לניהול Alerts
export const useAlert = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const showAlert = (message: string, type: AlertType = 'success', duration: number = 3000): void => {
    const id = Date.now() + Math.random();
    const newAlert: Alert = { id, message, type, duration };
    
    setAlerts(prev => [...prev, newAlert]);
  };

  const removeAlert = (id: number): void => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return { alerts, showAlert, removeAlert };
};

// דוגמה לשימוש בקומפוננט
const AlertDemo: React.FC = () => {
  const { alerts, showAlert, removeAlert } = useAlert();

  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontFamily: 'Rubik',
    margin: '5px'
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Rubik, sans-serif' }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>דוגמה ל-Alert אוטומטי</h2>
      
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <button
          onClick={() => showAlert('פעולה בוצעה בהצלחה!', 'success', 3000)}
          style={{ ...buttonStyle, backgroundColor: '#28a745', color: 'white' }}
        >
          הצלחה
        </button>
        
        <button
          onClick={() => showAlert('שגיאה! משהו השתבש', 'error', 4000)}
          style={{ ...buttonStyle, backgroundColor: '#dc3545', color: 'white' }}
        >
          שגיאה
        </button>
        
        <button
          onClick={() => showAlert('אזהרה! בדוק את הפרטים', 'warning', 3500)}
          style={{ ...buttonStyle, backgroundColor: '#ffc107', color: '#333' }}
        >
          אזהרה
        </button>
        
        <button
          onClick={() => showAlert('מידע חשוב לידיעתך', 'info', 3000)}
          style={{ ...buttonStyle, backgroundColor: '#17a2b8', color: 'white' }}
        >
          מידע
        </button>
      </div>

      {/* מכיל את ה-Alerts */}
      <AlertContainer alerts={alerts} removeAlert={removeAlert} />
    </div>
  );
};

export default AlertDemo;