import React from 'react';

import styles from './Navigation.module.css';

const Navigation = () => {
    return (
        <section className={`${styles.navSection}`}>
            <div className={`${styles.navWrapper} flex justify-between items-center`}>
                <ul className={`${styles.navListLeft} flex items-center justify-content`}>
                    <li className={`${styles.droppyItem} ${styles.navItem}`}>
                        <h2 className={`${styles.droppy}`}>Droppy<span className={`${styles.special}`}>Ai</span></h2>
                    </li>
                    <li className={`${styles.navItem}`}>
                        <h3>Watch Demo</h3>
                    </li>
                    <li className={`${styles.navItem}`}>
                        <h3>How It Works</h3>
                    </li>
                    <li className={`${styles.navItem}`}>
                        <a href="/dashboard">
                            <h3>Dashboard</h3>
                        </a>
                    </li>
                </ul>
                <ul className={`${styles.navListRight}`}>
                    <a href="/auth" className={`${styles.navBtn} ${styles.loginBtn}`}>Login</a>
                    <a href="/start" className={`${styles.navBtn} ${styles.getStartedBtn}`}>Get Started</a>
                </ul>
            </div>
        </section>
    )
}

export default Navigation