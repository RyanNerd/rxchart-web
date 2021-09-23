import {Container} from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import React, {useEffect, useGlobal, useRef, useState} from 'reactn';
import {ReactComponent as LockIcon} from '../../icons/lock.svg';
import RxIcon from '../../icons/prescription.svg';
import {ReactComponent as UserIcon} from '../../icons/user.svg';
import '../../styles/neumorphism.css';
import About from "./Modals/About";

/**
 *  Sign in page
 * @returns {JSX.Element}
 */
const LoginPage = (): JSX.Element | null => {
    const [, setAuth] = useGlobal('__auth');
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [activeTabKey] = useGlobal('activeTabKey');
    const [canLogin, setCanLogin] = useState(false);
    const [password, setPassword] = useState('');
    const [showAboutPage, setShowAboutPage] = useState(false);
    const [signIn, setSignIn] = useGlobal('signIn');
    const [username, setUsername] = useState('');
    const focusRef = useRef<HTMLInputElement>(null);

    // Set focus to the search input when this page is selected.
    useEffect(() => {
        if (activeTabKey === 'login' && focusRef && focusRef.current) {
            focusRef.current.focus();
        }
    }, [activeTabKey, focusRef]);

    useEffect(() => {
        if ((!username || username.length === 0) || (!password || password.length === 0)) {
            setCanLogin(false);
        } else {
            setCanLogin(true);
        }
    }, [password, username]);

    // Prevent render if this tab isn't active
    if (activeTabKey !== 'login') {
        return null;
    }

    const authenticate = () => {
        setAuth({action: 'login', payload: {username, password}});
    }

    const signOn = (
        <Container className="neu-main">
            <div className="neu-content">
                <img alt="logo" src={RxIcon} onClick={() => setShowAboutPage(true)}/>
                <div className="text">℞Chart</div>
                <div className="neu-field">
                    <UserIcon
                        className="ml-4"
                        style={{marginTop: "12px"}}
                    />
                    <input
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
                    <LockIcon className="ml-4" style={{marginTop: "12px"}}/>
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
                    onClick={(e) => {
                        e.preventDefault();
                        authenticate();
                    }}
                >
                    Login
                </button>

                <Alert
                    variant="warning"
                    show={signIn.success !== null && !signIn.success}
                    onClose={() => {
                        setSignIn({apiKey: null, success: null, organization: null});
                    }}
                    className="mt-4"
                    dismissible
                >
                    <Alert.Heading>
                        <strong>Invalid Credentials</strong>
                    </Alert.Heading>
                    <p>
                        Invalid Username or Password
                    </p>
                </Alert>
            </div>
        </Container>
    )

    const logOff = (
        <Container className="neu-main">
            <div className="neu-content">
                <img alt="logo" src={RxIcon} onClick={() => setShowAboutPage(true)}/>
                <div className="text">℞Chart</div>

                <button
                    className="neu-button"
                    onClick={(e) => {
                        e.persist();
                        if (e.ctrlKey) {
                            console.log('Testing Diagnostics');
                            setErrorDetails(new Error('Testing error handler'));
                        } else {
                            setAuth({action: 'logout', payload: null});
                        }
                    }}
                >
                    Log Out
                </button>
            </div>
        </Container>
    )

    return (
        <>
            {signIn.apiKey === null || signIn.apiKey.length === 0 ? (signOn) : (logOff)}

            <About
                show={showAboutPage}
                onHide={() => setShowAboutPage(false)}
            />
        </>
    )
}

export default LoginPage;
