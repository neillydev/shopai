'use client'; 
import React from 'react';
import { useContext } from 'react';
import NotificationContext, { STATES } from './NotificationContext';
import {NotificationContextType} from './NotificationContext';
import styles from './Notification.module.css';

const NotificationBar = () => {
    const notificationCtx = useContext<NotificationContextType>(NotificationContext);

    return (
        notificationCtx.notification !== null && (
            <div className={`${!notificationCtx.notification ? styles.animateClose : styles.animateOpen} ${styles.notification}`}>
                <p> {notificationCtx.notificationText} </p>
            </div>
        )
    );
};

export default NotificationBar;
