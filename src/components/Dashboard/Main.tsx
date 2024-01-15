"use client";
import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';

import Generate from '@/../public/generate.svg';
import Rocket from '@/../public/rocket.svg';
import Tokens from '@/../public/tokens.svg';
import InfinitySVG from '@/../public/infinity.svg';
import Gear from '@/../public/gear.svg';

import styles from './Main.module.css';
import Spinner from '../Spinner/Spinner';
import Generation from '../Generation/Generation';

const loaderDuration = 120;

type Generation = {
  timestamp: string;
  token_cost: number;
  tuning: string[] | string;
  output: string;
};

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardLoading, setDashboardLoading] = useState(true);

  /* Product Generation State */
  const [productDesc, setProductDesc] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [generating, setGenerating] = useState(false);
  const [currentGeneration, setCurrentGeneration] = useState<Generation | null>(null);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [togglePrevGenerations, setTogglePrevGenerations] = useState(false);
  const [expand, setExpand] = useState(-1);

  /* Token State */
  const [developerMode, setDeveloperMode] = useState(false);
  const [tokens, setTokens] = useState(1000);

  useEffect(() => {
    setTimeout(() => setLoading(false), loaderDuration + 750);
  }, []);

  return (
    loading ?
      <Loading duration={1200} /> :
      <div className={`${styles.mainContainer}`}>
        <div className={`${styles.mainWrapper}`}>
          <div className={`${styles.sidePanel}`}>
            <div className={`${styles.navWrapper}`}>
              <a href="/" onClick={(e) => e.stopPropagation()} className={`${styles.droppy}`}>Droppy<span className={`${styles.special}`}>Ai</span></a>
              <ul className={`${styles.navList}`}>
                <li className={`${styles.navItem} ${styles.navItemSelected}`}>
                  <Generate />
                  Generator
                </li>
                <li className={`${styles.navItem} ${styles.navItemUnselected}`}>
                  <Gear />
                  Settings
                </li>
              </ul>
            </div>

            <div className={`${styles.profileModule}`}>
              <div className={`${styles.profileModuleHeader} flex`}>
                <div className={`${styles.profileImg}`}>
                  {/** Placeholder SVG */}
                </div>
                <div className={`${styles.profileHeaderWrapper} flex flex-col px-2`}>
                  <h2 className={`${styles.profileHeader}`}>Vernon Neilly</h2>
                  <h2 className={`${styles.profileSubheader}`}>neillydev@gmail.com</h2>
                  <div className={`${styles.tokenWrapper} flex`}>
                    <Tokens />
                    <div className={`${styles.tokenHeader}`}>{developerMode ? <InfinitySVG /> : tokens}</div>
                  </div>
                </div>
              </div>
              <button className={`${styles.logoutBtn} ${styles.btnModule} py-2 whitespace-nowrap my-2 w-full`} onClick={() => { }}>
                Log Out
                <div className={`${styles.btnModuleBorder}`} />
              </button>
            </div>
          </div>
          <div className={`${styles.rightPanelWrapper}`}>
            <div className={`${styles.moduleWrapper}`}>
              <h2 className={`${styles.moduleHeader}`}>
                Product Generation
              </h2>
              <div className={`${styles.moduleBody}`}>
                <h3>Product Description</h3>
                <textarea
                  className={`${styles.moduleInput}`}
                  onChange={(e) => setProductDesc(e.currentTarget.value)} />
                <h3>Additional Details</h3>
                <textarea
                  className={`${styles.moduleInput}`}
                  onChange={(e) => setProductDetails(e.currentTarget.value)} />
                <button className={`${styles.moduleBtn} ${productDesc.length > 0 ? styles.moduleBtnActive : styles.moduleBtnDisabled}`}><span className={`${styles.moduleBtnWrapper}`}><Generate /> Generate </span><span className={`${styles.tokenSmall}`}>0</span></button>
              </div>
            </div>
            <div className={`${styles.moduleWrapper}`}>
              <h2 className={`${styles.moduleHeader}`}>
                Tuning
              </h2>
              <div className={`${styles.tuningModuleBody}`}>
                <div className={`${styles.tuningWrapper}`}>
                  <div className={`${styles.tuningHeader}`}>
                    <div className={`${styles.leftPanel}`}>
                      <div className={`${styles.tuningIcon}`}>
                        <Rocket />
                      </div>
                    </div>
                    <div className={`${styles.rightPanel}`}>
                      <div className={`${styles.tuningTitle}`}>
                        Marketing
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.tuningBody}`}>
                    <div className={`${styles.tuningItem}`}>
                      <div className={`${styles.tiLeftPanel}`}>
                        <input type="checkbox" className={`${styles.checkbox}`} />
                      </div>
                      <div className={`${styles.tiRightPanel}`}>
                        <h2>x1</h2>
                        <h3>Marketing Angles</h3>
                      </div>
                    </div>
                    <div className={`${styles.tuningItem}`}>
                      <div className={`${styles.tiLeftPanel}`}>
                        <input type="checkbox" className={`${styles.checkbox}`} />
                      </div>
                      <div className={`${styles.tiRightPanel}`}>
                        <h2>x1</h2>
                        <h3>Hooks</h3>
                      </div>
                    </div>
                    <div className={`${styles.tuningItem}`}>
                      <div className={`${styles.tiLeftPanel}`}>
                        <input type="checkbox" className={`${styles.checkbox}`} />
                      </div>
                      <div className={`${styles.tiRightPanel}`}>
                        <h2>x1</h2>
                        <h3>Upsells</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles.moduleWrapper}`}>
              <h2 className={`${styles.moduleHeader}`}>
                Generations
              </h2>
              <div className={`${styles.genModuleBody}`}>
                <div className={`${styles.genWrapper}`}>
                  <div className={`${generating ? styles.genBodySpinner : ''} ${styles.genHeader}`}>
                    {generating ? <Spinner /> : ""}
                  </div>
                  <div className={`${styles.genBody} flex flex-col`}>
                    {
                      generating ? "" :
                        generations.length > 0 ? "" : <h3 className={`${styles.genEmpty}`}>
                          Your generated products will appear here
                        </h3>
                    }
                    <button className={`${styles.viewPrevBtn}`} onClick={() => setTogglePrevGenerations(!togglePrevGenerations)}>{togglePrevGenerations ? "Hide" : "View"} Previous Generations</button>
                  </div>
                </div>
                {!togglePrevGenerations || <div className={`${styles.prevGenWrapper}`}>
                  <Generation id={0} expand={expand} setExpand={setExpand} />
                  <Generation id={1} expand={expand} setExpand={setExpand} />
                  <Generation id={2} expand={expand} setExpand={setExpand} />
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div >
  )
}

export default Main;