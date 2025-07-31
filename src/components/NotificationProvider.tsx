import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

/**
 * Notification context for global alerts and toasts
 */
export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  message: string;
  type: NotificationType;
}

interface NotificationContextProps {
  notify: (message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextProps>({ notify: () => {} });

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [visible, setVisible] = useState(false);

  const notify = (message: string, type: NotificationType = 'info') => {
    setNotification({ message, type });
    setVisible(true);
    setTimeout(() => setVisible(false), 3200);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {notification && (
        <div
          className={`notification-toast notification-${notification.type}`}
          style={{
            position: 'fixed',
            top: 32,
            right: 32,
            zIndex: 9999,
            minWidth: 260,
            maxWidth: 400,
            padding: '18px 32px',
            borderRadius: 14,
            background: notification.type === 'success' ? 'linear-gradient(90deg,#43e97b 0,#38f9d7 100%)' : notification.type === 'error' ? 'linear-gradient(90deg,#ff5858 0,#f09819 100%)' : notification.type === 'warning' ? 'linear-gradient(90deg,#f7971e 0,#ffd200 100%)' : 'linear-gradient(90deg,#1976d2 0,#43a7fd 100%)',
            color: '#fff',
            boxShadow: '0 8px 32px 0 rgba(25, 118, 210, 0.18)',
            fontWeight: 600,
            fontSize: 17,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0) scale(1)' : 'translateY(-40px) scale(0.98)',
            transition: 'all 0.5s cubic-bezier(.4,0,.2,1)',
            pointerEvents: 'none',
          }}
        >
          {notification.message}
        </div>
      )}
    </NotificationContext.Provider>
  );
};
