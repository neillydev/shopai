'use client';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import Loading from '@/components/Loading/Loading';
import { baseURL } from '@/app/api/config';

import GoogleSVG from '@/../public/google.svg';

import styles from './AuthForm.module.css';

type AuthPageKey = 'login' | 'register' | 'default';
type AuthPageType = {
    [key in AuthPageKey]: React.ReactElement | number;
};

enum ErrorType {
    INVALID_EMAIL = "Please enter a valid email",
    EMPTY_INPUT = "",
    NETWORK_ERROR = "Network error, please contact the administrators.",
}

const AuthPage = {
    'login': <></>,
    'register': <></>,
    'default': 0
};

const loaderDuration = 700;

export const AuthForm = () => {

    /**
     * Login with google?:
     *  if no account found with google account:
     *    take to signup page
     *  if account found with google account:
     *    login or require password if necessary
     * Login with email?:
     *  if no account found with email:
     *    take to signup page
     *  if account found with email:
     *    login or require password if necessary
     * 
     */

    const router = useRouter();
    const [errors, setErrors] = useState<ErrorType[]>([]);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [authStateKey, setAuthStateKey] = useState<AuthPageKey>('default');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setErrors([]);

        if (email.length === 0) {
            setErrors(prevErrors => [...prevErrors, ErrorType.EMPTY_INPUT]);
        } else if (!/\S+@\S+\.\S+/.test(email)) { // basic email format validation
            setErrors(prevErrors => [...prevErrors, ErrorType.INVALID_EMAIL]);
        }

        if (errors.length > 0) return;


        setLoading(true);

        try {
            const response = await fetch(`${baseURL}/api/auth`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                }
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }


            const data = await response.json();
            if (data) {
                if (data.exists) {
                    AuthPage.login = <></>;
                    setAuthStateKey('login');
                } else {
                    setAuthStateKey('register');
                }
            }
        } catch (error) {
            setErrors(prevErrors => [...prevErrors, ErrorType.NETWORK_ERROR]);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleBlur = () => {
        setErrors([]);
    };

    useEffect(() => {
        setTimeout(() => setLoading(false), loaderDuration + 750);
    }, []);

    return (
        <>
            {loading ?
                <Loading duration={loaderDuration} /> :
                (authStateKey !== 'default' ?
                    AuthPage[authStateKey]
                    :
                    <div className={`${styles.authContainer} fixed inset-0 text-white h-full overflow-y-auto`}>
                        <div className={styles.outerContainer}>
                            <a href="/" className={`${styles.droppy}`}>Droppy<span className={`${styles.special}`}>Ai</span></a>
                            <div className={`${styles.authWrapper} flex flex-col items-center`}>
                                <span className={`${styles.authHeader} text-center`}>
                                    Sign in with
                                </span>
                                <div className={`${styles.easyAuthWrapper} w-1/2 flex mt-4`}>
                                    <button className={`${styles.googleAuth} ${styles.authModule} ${styles.authBtn} w-full mt-4 items-center justify-center`}>
                                        <GoogleSVG className='inline' />
                                    </button>
                                </div>
                                <span className={`${styles.authSubheader} relative mt-8 text-center`}>
                                    or with
                                </span>
                                <form onSubmit={handleSubmit} className={`${styles.inputWrapper} mt-8`}>
                                    <input type='text'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='example@email.com'
                                        className={`${styles.authInput} ${errors.includes(ErrorType.EMPTY_INPUT) ? `focus:border-red-500 focus:ring focus:ring-red-500` : `focus:border-green-600 focus:ring focus:ring-green-700`} block w-full appearance-none rounded-lg border border-bluegray-800 bg-bluegray-900 bg-opacity-50 px-4 py-3 text-center text-base placeholder-bluegray-400 shadow-sm transition duration-300 focus:outline-none focus:ring-opacity-50`} />
                                    {errors.map((error, index) => (
                                        <h1 key={index} className={`${styles.inputError} text-red-500 relative mt-4 text-center`}>
                                            {error}
                                        </h1>
                                    ))}
                                    <button type='submit' className={`${styles.authModule} ${styles.authBtn} w-full mt-8`}>
                                        Continue
                                        <div className={`${styles.authModuleBorder}`} />
                                    </button>
                                </form>
                            </div>
                            <footer className="px-6 py-16">
                                <div className="mx-auto flex max-w-6xl flex-col items-center space-y-5 text-center">
                                    <span className={`text-sm ${styles.authPageFooter}`}>
                                        DroppyAI., LLC. All rights reserved.
                                    </span>
                                </div>
                            </footer>
                        </div>
                    </div>
                )}</>
    );
};