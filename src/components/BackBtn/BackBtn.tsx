import React from 'react';
import Link from 'next/link';

import styles from './BackBtn.module.css';

interface BackBtnProps {
    size: number; // Size of the SVG icon
    color?: string;
    redirect?: string;
}

const BackBtn: React.FC<BackBtnProps> = ({ size, color, redirect }) => {
    return (
        <Link href={ redirect || "/" } passHref>
        <button
            style={{
                position: 'absolute',
                top: 20, 
                left: 20, 
                zIndex: 1000,
                backgroundColor: 'transparent', 
                border: 'none', 
                cursor: 'pointer', 
            }}
            aria-label="Go back"
        >
            <svg
                className={`${styles.backBtn}`}
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <svg xmlns="http://www.w3.org/2000/svg" style={ color ? {stroke:color} : {}} className="icon icon-tabler icon-tabler-arrow-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l14 0" />
                    <path d="M5 12l6 6" />
                    <path d="M5 12l6 -6" />
                </svg>
            </svg>
        </button>
        </Link>
    );
};

export default BackBtn;
