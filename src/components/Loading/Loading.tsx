'use client';
import React, { useEffect, useState } from 'react';

import styles from './Loading.module.css';

type LoadingProps = {
  color?: string;
  duration: number;
};

const Loading = ({ duration, color }: LoadingProps) => {
  const loaderMsgs = [
    'Loading the future of dropshipping...',
    'Powering up the Droppy Matrix...',
    'Stabilizing cloud services...'
  ];
  const chooseMsg = () => {

    const msgIdx = Math.floor(Math.random() * loaderMsgs.length);

    return loaderMsgs[msgIdx];
  };

  const [loaderMsg, setLoaderMsg] = useState<string>('');
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setLoaderMsg(chooseMsg());

    setTimeout(() => setFadeOut(true), duration);
  }, []);

  return (
    <div className={`${styles.loaderWrapper} ${fadeOut ? styles.loaderFadeOut : ''}`}>
      <h1>Droppy<span className={`${styles.special}`}>Ai</span></h1>
      <h2>{loaderMsg}</h2>
      <span className={`${styles.loader}`}></span>
    </div>
  );
};

export default Loading;