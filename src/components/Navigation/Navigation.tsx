import React from 'react';

import styles from './Navigation.module.css';

const Navigation = () => {
    return (
        <section className={`${styles.navSection}`}>
            <div className={`${styles.navWrapper} flex space-between`}>
                <ul className={`${styles.navListLeft} flex`}>
                    <li className={`${styles.navItem}`}>
                        <h3>Watch Demo</h3>
                    </li>
                    <li className={`${styles.navItem}`}>
                        <h3>How It Works</h3>
                    </li>
                    <li className={`${styles.navItem}`}>
                        <h3>Dashboard</h3>
                    </li>
                </ul>
                <ul className={`${styles.navListRight}`}>
                    <button className={`${styles.getStartedBtn}`}></button>
                </ul>
            </div>
        </section>
    )
}

export default Navigation