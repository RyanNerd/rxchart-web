/* eslint-disable jsdoc/require-param */
import {Authenticated} from 'providers/AuthenticationProvider';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import React, {setGlobal, useEffect, useGlobal, useRef, useState} from 'reactn';
import {State} from 'reactn/default';
import {Setter} from 'reactn/types/use-global';
import {MedicineRecord, ResidentRecord} from 'types/RecordTypes';
import {asyncWrapper} from 'utility/common';
import getInitialState from 'utility/getInitialState';
import {ReactComponent as LockIcon} from '../../icons/lock.svg';
import RxIcon from '../../icons/prescription.svg';
import {ReactComponent as UserIcon} from '../../icons/user.svg';
import '../../styles/neumorphism.css';
import About from './Modals/About';

interface IProps {
    activeTabKey: string;
    setActiveTabKey: Setter<State, 'activeTabKey'>;
}

/**
 * Sign in page
 * @returns {JSX.Element | null}
 */
const LoginPage = (props: IProps): JSX.Element | null => {
    const {activeTabKey, setActiveTabKey} = props;

    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [, setOtcList] = useGlobal('otcList');
    const [, setResidentList] = useGlobal('residentList');
    const [am] = useGlobal('authManager');
    const [canLogin, setCanLogin] = useState(false);
    const [mm] = useGlobal('medicineManager');
    const [password, setPassword] = useState('');
    const [providers] = useGlobal('providers');
    const [rm] = useGlobal('residentManager');
    const [showAboutPage, setShowAboutPage] = useState(false);
    const [signIn, setSignIn] = useGlobal('signIn');
    const [username, setUsername] = useState('');
    const focusRef = useRef<HTMLInputElement>(null);

    // Set focus to the search input when this page is selected.
    useEffect(() => {
        if (activeTabKey === 'login') focusRef?.current?.focus();
    }, [focusRef, activeTabKey]);

    // Determine if the user is allowed to log in or not
    useEffect(() => {
        if (!username || username.length === 0 || !password || password.length === 0) {
            setCanLogin(false);
        } else {
            setCanLogin(true);
        }
    }, [password, username]);

    // Prevent render if this tab isn't active
    if (activeTabKey !== 'login') return null;

    /**
     * Perform the authentication by calling the web service to validate the username and password.
     */
    const authenticate = async () => {
        const [e, auth] = (await asyncWrapper(am.authenticate(username, password))) as [
            unknown,
            Promise<Authenticated>
        ];
        if (e) await setErrorDetails(e);
        else {
            const [eAuth, result] = (await asyncWrapper(auth)) as [unknown, Authenticated];
            if (eAuth) await setErrorDetails(eAuth);
            else {
                if (result.success && result.apiKey) {
                    const [e] = await asyncWrapper(providers.setApi(result.apiKey));
                    if (e) await setErrorDetails(e);
                    else {
                        // Load ALL Resident records up front and save them in the global store.
                        const [errLoadClients, clients] = (await asyncWrapper(rm.loadResidentList())) as [
                            unknown,
                            Promise<ResidentRecord[]>
                        ];
                        if (errLoadClients) await setErrorDetails(errLoadClients);
                        else {
                            await setResidentList(await clients);
                            const [errLoadOtc, otcMeds] = (await asyncWrapper(mm.loadOtcList())) as [
                                unknown,
                                Promise<MedicineRecord[]>
                            ];
                            if (errLoadOtc) await setErrorDetails(errLoadOtc);
                            else {
                                await setOtcList(await otcMeds);
                                await setSignIn(result);
                                await setActiveTabKey('resident');
                            }
                        }
                    }
                } else {
                    await setSignIn(result);
                }
            }
        }
    };

    /**
     * Handle when the user clicks the "Logout" button
     */
    const signOff = async () => {
        try {
            await setGlobal(getInitialState());
            console.log('logout successful');
        } catch (e) {
            await setErrorDetails(e);
        }
    };

    /**
     * The signOn component
     */
    const signOn = (
        <Container className="neu-main">
            <div className="neu-content">
                <img alt="logo" src={RxIcon} onClick={() => setShowAboutPage(true)} />
                <div className="text">℞Chart</div>
                <div className="neu-field">
                    <UserIcon className="ml-4" style={{marginTop: '12px'}} />
                    <input
                        autoFocus
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="ml-3 mb3"
                        ref={focusRef}
                        required
                    />
                </div>
                <div className="neu-field">
                    <LockIcon className="ml-4" style={{marginTop: '12px'}} />
                    <input
                        type="password"
                        placeholder="Password"
                        className="ml-3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyUp={(e: React.KeyboardEvent<HTMLElement>) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                authenticate();
                            }
                        }}
                    />
                </div>
                <button
                    className="neu-button"
                    disabled={!canLogin || (signIn.success !== null && !signIn.success)}
                    onClick={() => authenticate()}
                >
                    Login
                </button>

                <Alert
                    variant="warning"
                    show={signIn.success !== null && !signIn.success}
                    onClose={() => {
                        setSignIn({apiKey: null, success: null, organization: null});
                        focusRef?.current?.focus();
                    }}
                    className="mt-4"
                    dismissible
                >
                    <Alert.Heading>
                        <strong>Invalid Credentials</strong>
                    </Alert.Heading>
                    <p>Invalid Username or Password</p>
                </Alert>
            </div>
        </Container>
    );

    /**
     * The logOff component
     */
    const logOff = (
        <Container className="neu-main">
            <div className="neu-content">
                <img alt="logo" src={RxIcon} onClick={() => setShowAboutPage(true)} />
                <div className="text">℞Chart</div>

                <button
                    className="neu-button"
                    onClick={(e) => {
                        e.persist();
                        if (e.ctrlKey) {
                            console.log('Testing Diagnostics');
                            setErrorDetails(new Error('Testing error handler'));
                        } else {
                            signOff();
                        }
                    }}
                >
                    Logout
                </button>
            </div>
        </Container>
    );

    return (
        <>
            {signIn.apiKey === null || signIn.apiKey.length === 0 ? signOn : logOff}

            <About show={showAboutPage} onClose={() => setShowAboutPage(false)} />
        </>
    );
};

export default LoginPage;
