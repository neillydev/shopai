'use client';
import React, { useEffect, useState } from 'react';
import BackBtn from '../BackBtn/BackBtn';
import Loading from '../Loading/Loading';

const loaderDuration = 1000;

const ConfirmClientComponent = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), loaderDuration + 750);
    }, []);

    return (
        loading ? <Loading duration={1200} /> :
            <div className="flex flex-col items-center justify-center min-h-screen text-center"
                style={{
                    color: '#fff',
                    padding: '72px',
                }}>
                <BackBtn size={24} color='#fff' redirect='/auth' />
                <h1 className="text-4xl font-bold mb-5">Almost there!</h1>
                <h2 className="text-2xl mb-5">We've sent a <span style={{ color: '#50C878', fontWeight: 600 }}>confirmation email</span> to your inbox. Please click the link in the email to <span style={{ color: '#50C878', fontWeight: 600 }}>activate</span> your account. Can't find it? Check your spam folder or request a new email.</h2>
                <h3 className="text-lg">Need help? <span style={{ color: '#50C878', fontWeight: 600 }}>Contact support@droppy.ai</span></h3>
            </div>
    )
}

export default ConfirmClientComponent