'use client';

import React from 'react';
import styles from './StartComponent.module.css';

import Check from '@/../public/check.svg';
import X from '@/../public/circle-x.svg';
import Tokens from '@/../public/tokens.svg';

const StartComponent = () => {
  return (
    <div className={`${styles.startContainer} flex flex-col`}>
      <div className={`${styles.startHeaderContainer}`}>
        <div className={`${styles.startHeader}`}>Get Started.</div>
        <div className={`${styles.startSubheader}`}>Choose a plan to start using Droppy</div>
      </div>
      <div className={`${styles.startBody} flex`}>
        <div className={`${styles.planWrapper}`}>
          <div className={`${styles.planHeader}`}>
            Pro
          </div>
          <div className={`${styles.planPrice}`}>
            $19<span className={`${styles.term}`}>/month</span>
          </div>
          <div className={`${styles.planSubheader}`}>
            Get started with 375 tokens per month
          </div>
          <ul className={`${styles.features}`}>
            <li className={`${styles.feature}`}>
              <span>Full Access</span>
              <span className={`${styles.check}`}><Check /></span>
            </li>
            <li className={`${styles.feature} ${styles.featureNth}`}>
              <span>Tokens</span>
              <span className={`${styles.tokenWrapper}`}><Tokens />375 /mo</span>
            </li>
            <li className={`${styles.feature}`}>
              <span>Product Leads</span>
              <span className={`${styles.check}`}><X /></span>
            </li>
          </ul>
          <button className={`${styles.planPurchase}`}>
            Get Started
          </button>
        </div>
        <div className={`${styles.planWrapper}`}>
          <div className={`${styles.planHeader}`}>
            Business
          </div>
          <div className={`${styles.planPrice}`}>
            $39<span className={`${styles.term}`}>/month</span>
          </div>
          <div className={`${styles.planSubheader}`}>
            Get started with 800 tokens per month
          </div>
          <ul className={`${styles.features}`}>
            <li className={`${styles.feature}`}>
              <span>Full Access</span>
              <span className={`${styles.check}`}><Check /></span>
            </li>
            <li className={`${styles.feature} ${styles.featureNth}`}>
              <span>Tokens</span>
              <span className={`${styles.tokenWrapper}`}><Tokens />800 /mo</span>
            </li>
            <li className={`${styles.feature}`}>
              <span>Product Leads</span>
              <span className={`${styles.check}`}><Check /></span>
            </li>
          </ul>
          <button className={`${styles.planPurchase}`}>
            Get Started
          </button>
        </div>
        {/* <div className={`${styles.planWrapper}`}>
          <div className={`${styles.planHeader}`}>
            Enterprise
          </div>
          <div className={`${styles.planSubheader}`}>
            
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default StartComponent