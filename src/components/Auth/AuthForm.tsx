'use client';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import Loading from '@/components/Loading/Loading';
import { baseURL } from '@/app/api/config';

import GoogleSVG from '@/../public/google.svg';

import styles from './AuthForm.module.css';
import NotificationContext, { NotificationContextType } from '@/contexts/NotificationContext';
import BackBtn from '../BackBtn/BackBtn';

type AuthPageKey = 'login' | 'register' | 'default';
type AuthPageType = {
    [key in AuthPageKey]: React.ReactElement | number;
};
//"Already with us? That's great! Please sign in or recover your account if you're having trouble accessing it."
enum ErrorType {
    EMAIL_NOT_FOUND = "Please register an account.",
    EMAIL_ALREADY_EXISTS = "Email already registered.",
    INVALID_CREDENTIALS = "Invalid credentials. Please try again.",
    INVALID_EMAIL = "Please enter a valid email.",
    PASSWORD_NO_MATCH = "Passwords do not match.",
    PASSWORD_TOO_SHORT = "Password must be at least 8 characters.",
    PASSWORD_NEEDS_UPPERCASE = "Password must contain at least one uppercase letter.",
    PASSWORD_NEEDS_LOWERCASE = "Password must contain at least one lowercase letter.",
    PASSWORD_NEEDS_NUMBER = "Password must contain at least one number.",
    PASSWORD_NEEDS_SPECIAL_CHAR = "Password must contain at least one special character.",
    EMPTY_INPUT = "",
    NETWORK_ERROR = "Network error, please contact the administrators.",
}

const AuthPage = {
    'login': 2,
    'register': 1,
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
     *    take to start page
     *  if account found with email:
     *    login or require password if necessary
     * 
     */

    const router = useRouter();
    const notificationCtx = useContext<NotificationContextType>(NotificationContext);
    const [errors, setErrors] = useState<ErrorType[]>([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [authStateKey, setAuthStateKey] = useState<AuthPageKey>('default');

    const handleSubmitRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        setErrors([]);

        if (email.length === 0 || password.length === 0) {
            setErrors(prevErrors => [...prevErrors, ErrorType.EMPTY_INPUT]);
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setErrors(prevErrors => [...prevErrors, ErrorType.INVALID_EMAIL]);
        }

        if (password !== confirmPassword) {
            setErrors(prevErrors => [...prevErrors, ErrorType.PASSWORD_NO_MATCH]);
        }
        if (password.length < minLength) {
            setErrors(prevErrors => [...prevErrors, ErrorType.PASSWORD_TOO_SHORT]);
        }
        if (!hasUpperCase) {
            setErrors(prevErrors => [...prevErrors, ErrorType.PASSWORD_NEEDS_UPPERCASE]);
        }
        if (!hasLowerCase) {
            setErrors(prevErrors => [...prevErrors, ErrorType.PASSWORD_NEEDS_LOWERCASE]);
        }
        if (!hasNumbers) {
            setErrors(prevErrors => [...prevErrors, ErrorType.PASSWORD_NEEDS_NUMBER]);
        }
        if (!hasSpecialChars) {
            setErrors(prevErrors => [...prevErrors, ErrorType.PASSWORD_NEEDS_SPECIAL_CHAR]);
        }

        if (errors.length > 0) {
            notificationCtx.error(errors[0]);
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${baseURL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const error = await response.json();

                if (error.code === 'EMAIL_IN_USE') {
                    notificationCtx.error(ErrorType.EMAIL_ALREADY_EXISTS);
                    return;
                }

                notificationCtx.error(ErrorType.NETWORK_ERROR);
                throw new Error(ErrorType.NETWORK_ERROR);
            }

            if (response.status === 200) {
                const data = await response.json();
                console.log(data)
                router.push('/confirm');
            } else {
                notificationCtx.error(ErrorType.NETWORK_ERROR);
                throw new Error(ErrorType.NETWORK_ERROR);
            }
        } catch (error) {
            notificationCtx.error(ErrorType.NETWORK_ERROR);
            setErrors(prevErrors => [...prevErrors, ErrorType.NETWORK_ERROR]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors([]);
        setLoading(true);

        if (email.length === 0) {
            setErrors(prevErrors => [...prevErrors, ErrorType.EMPTY_INPUT]);
            notificationCtx.error(ErrorType.EMPTY_INPUT);
            setLoading(false);
            return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setErrors(prevErrors => [...prevErrors, ErrorType.INVALID_EMAIL]);
            notificationCtx.error(ErrorType.INVALID_EMAIL);
            setLoading(false);
            return;
        }

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: email,
                password: password,
            });

            if (!result) notificationCtx.error(ErrorType.NETWORK_ERROR);

            if (result && result.error) {
                notificationCtx.error(result.error);
            } else {
                console.log('Login successful', result);
                router.push('/dashboard');
            }
        } catch (error) {
            console.error('Login error:', error);
            notificationCtx.error(ErrorType.NETWORK_ERROR);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitAuth = async (e: React.FormEvent) => {
        e.preventDefault();

        setErrors([]);

        if (email.length === 0) {
            setErrors(prevErrors => [...prevErrors, ErrorType.EMPTY_INPUT]);
        } else if (!/\S+@\S+\.\S+/.test(email)) { // basic email format validation
            setErrors(prevErrors => [...prevErrors, ErrorType.INVALID_EMAIL]);
        }

        if (errors.length > 0) {
            notificationCtx.error(errors[0]);
            return;
        }

        setLoading(true);

        try {

            const response = await fetch(`${baseURL}/user/${email}`,
                {
                    method: 'GET',
                }
            );
            console.log(response)
            if (!response.ok) {
                const error = await response.json();

                switch (error.code) {
                    case 1:
                        notificationCtx.error(ErrorType.EMAIL_NOT_FOUND);
                        setAuthStateKey('register');
                        return;
                    case 2:
                        notificationCtx.error(ErrorType.INVALID_CREDENTIALS);
                        return;
                    default:
                }
                notificationCtx.error(ErrorType.NETWORK_ERROR);
                throw new Error(ErrorType.NETWORK_ERROR);
            }

            if (response.status === 200) {
                // user exists; redirect to login
                setAuthStateKey('login');
            } else {
                notificationCtx.error(ErrorType.NETWORK_ERROR);
                throw new Error(ErrorType.NETWORK_ERROR);
            }
        } catch (error) {
            notificationCtx.error(ErrorType.NETWORK_ERROR);
            setErrors(prevErrors => [...prevErrors, ErrorType.NETWORK_ERROR]);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
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
                <div className={`${styles.authContainer} fixed inset-0 text-white h-full overflow-y-auto`}>
                    <BackBtn size={24} color='#fff' />
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
                                or {AuthPage[authStateKey] === 1 && " register "} with
                            </span>
                            <form onSubmit={AuthPage[authStateKey] === 1 ? handleSubmitRegister : (AuthPage[authStateKey] === 2 ? handleSubmitLogin : handleSubmitAuth)} className={`${styles.inputWrapper} mt-2`}>
                                <input type='text'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='example@email.com'
                                    className={`${styles.authInput} ${errors.includes(ErrorType.EMPTY_INPUT) ? `focus:border-red-500 focus:ring focus:ring-red-500` : `focus:border-green-600 focus:ring focus:ring-green-700`} block w-full appearance-none rounded-lg border border-bluegray-800 bg-bluegray-900 bg-opacity-50 px-4 py-3 text-center text-base placeholder-bluegray-400 shadow-sm transition duration-300 focus:outline-none focus:ring-opacity-50`} />
                                {
                                    AuthPage[authStateKey] !== 0 &&
                                    <input type='password'
                                        onChange={handleChangePassword}
                                        onBlur={handleBlur}
                                        placeholder='Enter password...'
                                        className={`${styles.authInput} ${errors.includes(ErrorType.EMPTY_INPUT) ? `focus:border-red-500 focus:ring focus:ring-red-500` : `focus:border-green-600 focus:ring focus:ring-green-700`} block w-full appearance-none rounded-lg border border-bluegray-800 bg-bluegray-900 bg-opacity-50 px-4 py-3 text-center text-base placeholder-bluegray-400 shadow-sm transition duration-300 focus:outline-none focus:ring-opacity-50`} />
                                }
                                {
                                    AuthPage[authStateKey] === 1 &&
                                    <input type='password'
                                        onChange={handleConfirmPassword}
                                        onBlur={handleBlur}
                                        placeholder='Confirm password...'

                                        className={`${styles.authInput} ${errors.includes(ErrorType.EMPTY_INPUT) ? `focus:border-red-500 focus:ring focus:ring-red-500` : `focus:border-green-600 focus:ring focus:ring-green-700`} block w-full appearance-none rounded-lg border border-bluegray-800 bg-bluegray-900 bg-opacity-50 px-4 py-3 text-center text-base placeholder-bluegray-400 shadow-sm transition duration-300 focus:outline-none focus:ring-opacity-50`} />
                                }
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
            }</>
    );
};