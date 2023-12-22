"use client";
import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';

import styles from './Main.module.css';

const loaderDuration = 1200;

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardLoading, setDashboardLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), loaderDuration + 750);
  }, []);
  
  return (
    loading ?
      <Loading duration={1200} /> :
      <div className={`${styles.mainContainer}`}>
        <div className={`${styles.mainWrapper}`}>
          <div className={`${styles.leftPanel}`}>
            <a href="/" className={`${styles.droppy}`}>Droppy<span className={`${styles.special}`}>Ai</span></a>
          </div>
          <div className={`${styles.rightPanel}`}>

          </div>
        </div>
      </div>
  )
}

export default Main;