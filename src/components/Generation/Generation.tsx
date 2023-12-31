'use client';
import React, { useState } from 'react';

import Clock from '@/../public/clock.svg';
import UpCarot from '@/../public/up-carot.svg';
import DownCarot from '@/../public/down-carot.svg';
import Tokens from '@/../public/tokens.svg';
import Rocket from '@/../public/rocket.svg';

import styles from './Generation.module.css';

type GenerationProps = {
    id: number;
    timestamp?: string;
    token_cost?: number;
    tuning?: string[] | string;
    output?: string;
    expand: number;
    setExpand: React.Dispatch<React.SetStateAction<number>>;
};

const Generation = ({id, expand, setExpand}: GenerationProps) => {

    return (
        <div className={`${styles.genWrapper}`}>
            <div className={`${styles.genHeader} ${!(expand === id) || styles.genExpand} flex`} onClick={() => id === expand ? setExpand(-1) : setExpand(id)}>
                <div className={`${styles.genHeaderWrapper} flex`}>
                    <Clock />
                    <div className={`${styles.genHeaderText}`}>
                        <h3>Generation 1</h3>
                    </div>
                </div>
                <button className={`${styles.detailsBtn}`}>
                    {expand === id ? <UpCarot /> : <DownCarot />}
                </button>
            </div>
            {
                !(expand === id) || <div className={`${styles.genBody} flex flex-col`}>
                    <div className={`${styles.top} flex`}>
                        <div className={`${styles.cost} flex flex-col`}>
                            <h3>Token Cost</h3>
                            <div className={`${styles.costDetails} flex items-center py-1`}>
                                <Tokens /> 30
                            </div>
                        </div>
                        <div className={`${styles.tuning}`}>
                            <h3>Tuning</h3>
                            <div className={`${styles.tuningDetails} flex items-center py-1`}>
                                <Rocket /> Marketing Angles
                            </div>
                            <div className={`${styles.tuningDetails} flex items-center py-1`}>
                                <Rocket /> Hooks
                            </div>
                            <div className={`${styles.tuningDetails} flex items-center py-1`}>
                                <Rocket /> Upsells
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.productDesc}`}>
                        <h3>Product Description</h3>
                        <textarea className={`${styles.readOnly}`} readOnly value={"a vacuum cleaner for your pets like dogs and cats"} />
                        <h4>Additional Details</h4>
                        <textarea className={`${styles.readOnly}`} readOnly value={"Marketable to pet owners"} />
                    </div>
                    <div className={`${styles.output}`}>
                        <h3>Output</h3>
                        <textarea className={`${styles.readOnly} ${styles.readOnlyOutput}`} readOnly value={"a vacuum cleaner for your pets like dogs and cats"} />
                    </div>
                </div>
            }
        </div>
    )
}

export default Generation