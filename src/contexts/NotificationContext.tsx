'use client';
import React, { useState } from 'react';
export type NotificationContextType = {
  notification: typeof STATES | null;
  notificationText: string | null;
  success: () => void;
  error: (text: any) => void;
};
const NotificationContext: NotificationContextType | any = React.createContext({
  notification: null,
  notificationText: null,
  success: () => { },
  error: (text: string) => { },
});
export const STATES: any = {
  SUCCESS: 'success',
  ERROR: 'error',
};
const NotificationProvider = (props: any) => {
  const [notification, setNotification] = useState(null);
  const [notificationText, setNotificationText] = useState(null);
  const success = (text: any) => {
    window.scroll(0, 0);
    setNotificationText(text);
    setNotification(STATES.SUCCESS);
  };
  const error = (text: any) => {
    window.scroll(0, 0);
    setNotificationText(text);
    setNotification(STATES.ERROR);
    setTimeout(() => {
      setNotificationText(null);
      setNotification(null);
    }, 5000)
  };
  const clear = () => {
    setNotificationText(null);
    setNotification(null);
  };
  return (
    <NotificationContext.Provider
      value={{
        success, error, clear, notification, notificationText,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider };
export default NotificationContext;