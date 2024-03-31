import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import NotificationContext, { NotificationContextType } from '@/contexts/NotificationContext';
import BackBtn from '@/components/BackBtn/BackBtn';

import { baseURL } from '@/app/api/config';
import Loading from '@/components/Loading/Loading';
import ErrorPageClientComponent from '@/components/404/404';
import { set } from '../actions/cookies';

enum ErrorType {
    CONFIRM_ERROR = "Error confirming user, please contact support@droppy.ai",
    NETWORK_ERROR = "Network error, please contact support@droppy.ai",
}

const loaderDuration = 1000;

const setRegistrationSuccessCookie = async (): Promise<any> => {
    return set('registrationSuccess', 'false');
};

const ConfirmPage = () => {
    const [loading, setLoading] = useState(true);
    const notificationCtx = useContext<NotificationContextType>(NotificationContext);
    const router = useRouter();
    const { token } = router.query;
    const [confirmationStatus, setConfirmationStatus] = useState('');

    const handleConfirmEmail = async (token: string | string[]) => {
        try {
            const response = await fetch(`${baseURL}/confirm/${token}`);

            if (!response.ok) {
                const error = await response.json();
                console.error(error);
                notificationCtx.error(ErrorType.CONFIRM_ERROR);
                throw new Error(ErrorType.CONFIRM_ERROR);
            }

            if (response.status === 200) {
                setConfirmationStatus('success');
            } else {
                notificationCtx.error(ErrorType.CONFIRM_ERROR);
                throw new Error(ErrorType.CONFIRM_ERROR);
            }

        } catch (error) {
            console.error('Error confirming email:', error);
            setConfirmationStatus('error');
            notificationCtx.error(ErrorType.CONFIRM_ERROR);
            throw new Error(ErrorType.CONFIRM_ERROR);
        }
    };

    useEffect(() => {
        setTimeout(() => setLoading(false), loaderDuration + 750);
        const registrationSuccess = localStorage.getItem('registrationSuccess');
        if (!registrationSuccess) {
            router.replace('/404');
            return;
        }

        if (token) {
            handleConfirmEmail(token);
        }

        if (confirmationStatus === 'success') {
            setTimeout(() => router.push('/auth'), 3500);
        }
    }, [token]);
    return (
        loading ?
            <Loading duration={loaderDuration} /> :
            <div className="flex flex-col items-center justify-center min-h-screen text-center"
                style={{
                    color: '#fff',
                    padding: '72px',
                }}>
                <BackBtn size={24} color='#fff' redirect='/auth' />
                {confirmationStatus === 'success' ?
                    <>
                        <h1 className="text-4xl font-bold mb-5">Welcome to Droppy!</h1>
                        <h2 className="text-2xl mb-5">Your email <span style={{ color: '#50C878', fontWeight: 600 }}>{ }</span> has been confirmed. Redirecting to login...</h2>
                        <h3 className="text-lg">Need help? <span style={{ color: '#50C878', fontWeight: 600 }}>Contact support@droppy.ai</span></h3>
                    </>
                    : <ErrorPageClientComponent />}
            </div>
    )
};

export default ConfirmPage;
