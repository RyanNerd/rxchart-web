/* eslint-disable jsdoc/require-param */
import {Authenticated} from 'providers/AuthenticationProvider';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import React, {setGlobal, useEffect, useGlobal, useRef, useState} from 'reactn';
import {State} from 'reactn/default';
import {Setter} from 'reactn/types/use-global';
import 'styles/neumorphism/login.css';
import {ClientRecord, MedicineRecord} from 'types/RecordTypes';
import {asyncWrapper} from 'utility/common';
import getInitialState from 'utility/getInitialState';
import {ReactComponent as LockIcon} from '../../icons/lock.svg';
import RxIcon from '../../icons/prescription.svg';
import {ReactComponent as UserIcon} from '../../icons/user.svg';
import About from './Modals/About';

interface IProps {
    activeTabKey: string;
    setActiveTabKey: Setter<State, 'activeTabKey'>;
}

/**
 * Sign in page
 */
const LoginPage = (props: IProps): JSX.Element | null => {
    const {activeTabKey, setActiveTabKey} = props;
    const [, setClientList] = useGlobal('clientList');
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [, setOtcList] = useGlobal('otcList');
    const [am] = useGlobal('authManager');
    const [canLogin, setCanLogin] = useState(false);
    const [cm] = useGlobal('clientManager');
    const [mm] = useGlobal('medicineManager');
    const [password, setPassword] = useState('');
    const [providers] = useGlobal('providers');
    const [showAboutPage, setShowAboutPage] = useState(false);
    const [signIn, setSignIn] = useGlobal('signIn');
    const [username, setUsername] = useState('');
    const focusReference = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (activeTabKey === 'login') focusReference?.current?.focus();
    }, [focusReference, activeTabKey]);

    useEffect(() => {
        setCanLogin(!(!username || username.length === 0 || !password || password.length === 0));
    }, [password, username]);

    // Prevent render if this tab isn't active
    if (activeTabKey !== 'login') return null;

    /**
     * Perform the authentication by calling the web service to validate the username and password.
     */
    const authenticate = async () => {
        const [errorAuth, auth] = (await asyncWrapper(am.authenticate(username, password))) as [
            unknown,
            Promise<Authenticated>
        ];
        if (errorAuth) await setErrorDetails(errorAuth);
        else {
            const [errorAuthenticated, result] = (await asyncWrapper(auth)) as [unknown, Authenticated];
            if (errorAuthenticated) await setErrorDetails(errorAuthenticated);
            else {
                if (result.success && result.apiKey) {
                    const [errorSetApi] = await asyncWrapper(providers.setApi(result.apiKey));
                    if (errorSetApi) await setErrorDetails(errorSetApi);
                    else {
                        // Load ALL Resident records up front and save them in the global store.
                        const [errorLoadClients, clients] = (await asyncWrapper(cm.loadClientList())) as [
                            unknown,
                            Promise<ClientRecord[]>
                        ];
                        if (errorLoadClients) await setErrorDetails(errorLoadClients);
                        else {
                            await setClientList(await clients);
                            const [errorLoadOtc, otcMeds] = (await asyncWrapper(mm.loadOtcList())) as [
                                unknown,
                                Promise<MedicineRecord[]>
                            ];
                            if (errorLoadOtc) await setErrorDetails(errorLoadOtc);
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
            console.log('logout successful'); // eslint-disable-line no-console
        } catch (error) {
            await setErrorDetails(error);
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
                        className="ml-3 mb3"
                        onChange={(changeEvnet) => setUsername(changeEvnet.target.value)}
                        placeholder="Username"
                        ref={focusReference}
                        required
                        type="text"
                        value={username}
                    />
                </div>
                <div className="neu-field">
                    <LockIcon className="ml-4" style={{marginTop: '12px'}} />
                    <input
                        className="ml-3"
                        onChange={(changeEvent) => setPassword(changeEvent.target.value)}
                        onKeyUp={(keyboardEvent: React.KeyboardEvent<HTMLElement>) => {
                            if (keyboardEvent.key === 'Enter') authenticate();
                        }}
                        placeholder="Password"
                        type="password"
                        value={password}
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
                    className="mt-4"
                    dismissible
                    onClose={() => {
                        setSignIn({apiKey: null, success: null, organization: null});
                        focusReference?.current?.focus();
                    }}
                    show={signIn.success !== null && !signIn.success}
                    variant="warning"
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
                    onClick={(mouseEvent) => {
                        mouseEvent.persist();
                        if (mouseEvent.ctrlKey) {
                            console.log('Testing Diagnostics'); // eslint-disable-line no-console
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
