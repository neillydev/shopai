'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Loading from '../Loading/Loading';
import BackBtn from '../BackBtn/BackBtn';

const loaderDuration = 1000;

const ErrorPageClientComponent = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) setTimeout(() => setLoading(false), loaderDuration + 750);

        if (!loading) {
            setTimeout(() => router.push('/'), 3500);
        }
    }, [loading]);

    return (
        loading ?
          <Loading duration={loaderDuration} /> :
        <div className="flex flex-col items-center justify-center min-h-screen text-center"
            style={{
                color: '#fff',
                padding: '72px',
            }}>
            <BackBtn size={24} color='#fff' redirect='/' />
            <h1 className="text-4xl font-bold mb-5">Uh Oh!</h1>
            <h2 className="text-2xl mb-5">Something went wrong! Redirecting to home...</h2>
            <h3 className="text-lg">Need help? <span style={{ color: '#50C878', fontWeight: 600 }}>Contact support@droppy.ai</span></h3>
        </div>
    )
};

export default ErrorPageClientComponent;