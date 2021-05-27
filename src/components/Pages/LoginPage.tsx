import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import React, {useEffect, useGlobal, useRef, useState} from 'reactn';
import TabContent from '../../styles/common.css';
import '../../styles/neumorphism.css';
import {Container} from 'react-bootstrap';
import {ReactComponent as UserIcon} from '../../icons/user.svg';
import {ReactComponent as LockIcon} from '../../icons/lock.svg';
import RxIcon from '../../icons/prescription.svg';
import About from "./Modals/About";

/**
 *  Sign in page
 * @returns {JSX.Element}
 */
const LoginPage = (): JSX.Element | null => {
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [, setAuth] = useGlobal('__auth');
    const [activeTabKey] = useGlobal('activeTabKey');
    const [apiKey] = useGlobal('__apiKey');
    const [canLogin, setCanLogin] = useState(false);
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useGlobal('loginFailed');
    const [username, setUsername] = useState('');
    const [showAboutPage, setShowAboutPage] = useState(false);
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

    // // The Rx image is established in index.html (outside of the React framework)
    // // So we add a native click eventListener via useEffect() and remove the listener when the app closes.
    // useEffect(() => {
    //     /**
    //      * Show the About modal
    //      */
    //     const handleImageClick = () => {
    //         setShowAboutPage(true);
    //     }
    //
    //     if (rxchartImage === null) {
    //         setRxchartImage(document.getElementById("rxchart-img"));
    //     } else {
    //         rxchartImage.addEventListener('click', handleImageClick, false);
    //     }
    //
    //     return (() => {
    //         rxchartImage?.removeEventListener('click', handleImageClick, false);
    //     })
    // }, [rxchartImage]);

    // Prevent render if this tab isn't active
    if (activeTabKey !== 'login') {
        return null;
    }

    const signIn = (
        <Container className="neu-main">
        <div className="neu-content">
            <img alt="logo" src={RxIcon} onClick={()=>setShowAboutPage(true)}/>
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
                            setAuth({action: 'login', payload: {username, password}});
                        }
                    }}
                />
            </div>
            <button
                className="neu-button"
                disabled={!canLogin || showAlert}
                onClick={(e) => {
                    e.preventDefault();
                    setAuth({action: 'login', payload: {username, password}});
                }}
            >
                Login
            </button>

            <Alert
                variant="warning"
                show={showAlert}
                onClose={() => setShowAlert(!showAlert)}
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
        <Container
            className="neu-main"
        >
            <div className="neu-content">
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
        <Form className={TabContent}>
            {apiKey === null ? (signIn) : (logOff)}

            <About
                show={showAboutPage}
                onHide={()=>setShowAboutPage(false)}
            />
        </Form>
    )
}

export default LoginPage;
