'use client';
import React, { useState } from 'react';

import Clock from '@/../public/clock.svg';
import UpCarot from '@/../public/up-carot.svg';
import DownCarot from '@/../public/down-carot.svg';
import Tokens from '@/../public/tokens.svg';

import styles from './Generation.module.css';

type GenerationProps = {
    timestamp: string;
    token_cost: number;
    tuning: string[] | string;
    output: string;
};

const Generation = () => {
    const [expand, setExpand] = useState(false);

    return (
        <div className={`${styles.genWrapper}`}>
            <div className={`${styles.genHeader} ${!expand || styles.genExpand} flex`} onClick={() => setExpand(!expand)}>
                <div className={`${styles.genHeaderWrapper} flex`}>
                    <Clock />
                    <div className={`${styles.genHeaderText}`}>
                        <h3>Generation 1</h3>
                    </div>
                </div>
                <button className={`${styles.detailsBtn}`}>
                    {expand ? <UpCarot /> : <DownCarot />}
                </button>
            </div>
            {
                !expand || <div className={`${styles.genBody} flex flex-col`}>
                    <div className={`${styles.top} flex`}>
                        <div className={`${styles.cost} flex flex-col`}>
                            <h3>Token Cost</h3>
                            <div className={`${styles.costDetails} flex items-center py-1`}>
                                <Tokens /> 30
                            </div>
                        </div>
                        <div className={`${styles.tuning}`}>
                            <h3>Tuning</h3>
                        </div>
                    </div>
                    <div className={`${styles.productDesc}`}></div>
                    <div className={`${styles.output}`}></div>
                </div>
            }
        </div>
    )
}

export default Generation