import React from 'react';

import styles from './Embed.module.css';

const Embed = () => {
    return (
        <div className={`${styles.embedWrapper}`}>
            <h1 className={`${styles.embedHeader}`}>Product Analysis</h1>
            <div className={`${styles.embedBody}`}>
                <code className={`${styles.embedCode}`}>
                    <span></span>
                </code>
            </div>
            <h1 className={`${styles.embedHeader}`}>TikTok Video Script</h1>
            <div className={`${styles.embedBody}`}>
                <code className={`${styles.embedCode}`}>
                    <span></span>
                </code>
            </div>
        </div>
    )
}

export default Embed