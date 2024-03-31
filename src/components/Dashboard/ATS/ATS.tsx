"use client";
import React, { useContext, useEffect, useState } from 'react';
import { getSession, signOut, useSession } from 'next-auth/react';

import Loading from './Loading/Loading';
import NotificationContext from '../../../contexts/NotificationContext';
import { NotificationContextType } from '../../../contexts/NotificationContext';

import Generate from '@/../public/generate.svg';
import Rocket from '@/../public/rocket.svg';
import Tokens from '@/../public/tokens.svg';
import InfinitySVG from '@/../public/infinity.svg';
import Gear from '@/../public/gear.svg';
import TikTok from '@/../public/tiktok.svg';
import Back from '@/../public/back.svg';

import styles from './ATS.module.css';
import Spinner from '../../Spinner/Spinner';
import Generation from '../../Generation/Generation';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Embed from '@/components/Embed/Embed';

const loaderDuration = 1000;

type Generation = {
    timestamp: string;
    token_cost: number;
    tuning: string[] | string;
    output: string;
};

enum ErrorType {
    INVALID_EMAIL = "Please enter a valid email",
    EMPTY_INPUT = "",
    NETWORK_ERROR = "Network error, please contact the administrators.",
}

type ATS_ADMIN = {
    email: string;
}

const ATS = () => {
    const ATS_ADMINS = [
        {
            email: "neillydev@gmail.com",
        }
    ];

    const [isATSAdmin, setIsATSAdmin] = useState(false);
    const [email, setEmail] = useState<string | null>(null);

    const [loading, setLoading] = useState(true);
    const [dashboardLoading, setDashboardLoading] = useState(true);

    /* Notification Context */
    const notificationCtx = useContext<NotificationContextType>(NotificationContext);
    const component_not_found = "This feature is currently under development.";

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

    const searchATSAdmins = (str: string) => {
        return ATS_ADMINS.find(user => user.email === str);
    };

    const handleError = (error: string) => {
        notificationCtx.error(error);
    };

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        window.location.href = '/auth';
    };

    useEffect(() => {

        if (typeof window !== "undefined") {
            setEmail(localStorage.getItem("email"));
        }

        if (email) {
            if (searchATSAdmins(email)) {
                setIsATSAdmin(true);
            }
            else {
                redirect('/auth?callbackUrl=/ats');
            }
        }


        setTimeout(() => setLoading(false), loaderDuration + 750);

    }, [email]);

    return (
        loading ?
            <Loading duration={1200} /> :
            <div className={`${styles.mainContainer}`}>
                <div className={`${styles.mainWrapper}`}>
                    <div className={`${styles.sidePanel}`}>
                        <div className={`${styles.navWrapper}`}>
                            <div className={`${styles.navWrap}`}>
                                <a href="/" onClick={(e) => e.stopPropagation()} className={`${styles.droppy}`}>Automated <span className={`${styles.special}`}>TikTok</span> Shop</a>
                                <ul className={`${styles.navList}`}>
                                    <li className={`${styles.navItem} ${styles.navItemSelected}`}>
                                        <TikTok />
                                        ATS Dashboard
                                    </li>
                                </ul>
                            </div>
                            <Link className={`${styles.atsBtnWrapper}`} hidden={!isATSAdmin} href="/dashboard">
                                <button className={`${styles.atsBtn} ${styles.atsBtnGlow}`}>
                                    <Back />
                                    Droppy<span className={`${styles.droppySpecial}`}>Ai</span>
                                </button>
                            </Link>
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
                            <button className={`${styles.logoutBtn} ${styles.btnModule} py-2 whitespace-nowrap my-2 w-full`} onClick={handleSignOut}>
                                Log Out
                                <div className={`${styles.btnModuleBorder}`} />
                            </button>
                        </div>
                    </div>
                    <div className={`${styles.rightPanelWrapper}`}>
                        <div className={`${styles.moduleContainer}`}>
                            <div className={`${styles.moduleWrapper}`}>
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
                            {/* <div className={`${styles.moduleWrapper}`}>
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
                            </div> */}
                            <div className={`${styles.moduleWrapper}`} 
                            style={{
                                width: '100%'
                            }}>
                                <div className={`${styles.genModuleBody}`}>
                                    <div className={`${styles.genWrapper}`}>
                                        <div className={`${generating ? styles.genBodySpinner : ''} ${styles.genHeader}`}>
                                            {generating ? <Spinner /> : ""}
                                        </div>
                                        <div className={`${styles.genBody} flex flex-col items-center`}>
                                            {
                                                generating ? "" :
                                                    generations.length > 0 ? <Embed /> : <h3 className={`${styles.genEmpty}`}>
                                                        Generated content will appear here
                                                    </h3>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
    )
};

export default ATS;