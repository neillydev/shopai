import React from 'react';

import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={`${styles.heroSection} flex space-between`}>
      <div className={`${styles.heroLeft}`}>
        <h1 className={`${styles.heroHeader}`}>With Droppy, every product is a <span className={`${styles.special}`}>winning</span> product<span className={`${styles.special}`}>.</span></h1>
        <h2 className={`${styles.heroSubHeader}`}>Our unique AI solution streamlines the process of testing products and creatives, enabling you to devote more energy to growing your business rather than getting bogged down in the details of testing.</h2>
      </div>
      <div className={`${styles.heroRight}`}>
      </div>
    </section>
  )
}

export default Hero