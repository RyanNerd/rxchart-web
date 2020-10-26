import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import getInitialState from "../../utility/getInitialState";
import React, {setGlobal, useEffect, useGlobal, useRef, useState} from 'reactn';
import Row from 'react-bootstrap/Row';
import TabContent from '../../styles/common.css';

interface IProps {
    activeTabKey: string | null
    onLogin: (loggedIn: boolean) => void
}

/**
 * Sign in page
 * @param {IProps} props
 * @returns {JSX.Element}
 * @constructor
 */
const LoginPage = (props: IProps): JSX.Element | null => {
    const [, setOtcList] = useGlobal('otcList');
    const [, setResidentList] = useGlobal('residentList');
    const [apiKey, setApiKey] = useGlobal('apiKey');
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [am] = useGlobal('authManager');
    const [mm] = useGlobal('medicineManager');
    const [password, setPassword] = useState('');
    const [providers] = useGlobal('providers');
    const [residentManager] = useGlobal('residentManager');
    const [showAlert, setShowAlert] = useState(false);
    const [username, setUsername] = useState('');
    const focusRef = useRef<HTMLInputElement>(null);
    const {
        activeTabKey,
        onLogin
    } = props;

    // Set focus to the search input when this page is selected.
    useEffect(() => {
        if (activeTabKey === 'login' && focusRef && focusRef.current) {
            focusRef.current.focus();
        }
    }, [activeTabKey]);

    // Prevent render if this tab isn't active
    if (activeTabKey !== 'login') {
        return null;
    }

    /**
     * Fires when the Login Button is clicked
     * @param {React.MouseEvent<HTMLElement>} e
     */
    const login = (e: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        // Send the user name and password to the web service
        am.authenticate(username, password)
            .then((response) => {
                if (response.success) {
                    const apiKey = response.apiKey;
                    setApiKey(apiKey).then(() => {
                        if (apiKey.length === 0) {
                            setErrorDetails(new Error('Invalid API Key'));
                        }
                        providers.setApi(apiKey);

                        // Load ALL Resident records up front and save them in the global store.
                        residentManager.loadResidentList()
                            .then((residents) => setResidentList(residents))
                            .catch((err) => setErrorDetails(err));

                        // Load ALL OTC medications
                        mm.loadOtcList()
                            .then((otcDrugs) => setOtcList(otcDrugs))
                            .catch((err) => setErrorDetails(err));

                        // Let the parent component know we are logged in successfully
                        onLogin(true);

                        // Remove alert (in the case where a previous log in attempt failed).
                        setShowAlert(false);

                        // Display the organization name that logged in
                        // This element lives in index.html so we use old fashioned JS and DOM manipulation to update
                        const organizationElement = document.getElementById("organization");
                        if (organizationElement) {
                            organizationElement.innerHTML = response.organization;
                        }
                    });
                } else {
                    // Show invalid credentials alert
                    setShowAlert(true);
                }
            })
            .catch((err) => {
                setErrorDetails(err);
            });
    }

    /**
     * Fires when the Logout Button is clicked
     * @param {React.MouseEvent<HTMLElement>} e
     */
    const logout = (e: React.MouseEvent<HTMLElement>) => {
        e.persist();
        setGlobal(getInitialState())
            .then(() => console.log('logout successful'))
            .then(() => {
                if (e.ctrlKey) {
                    console.log('Testing Diagnostics');
                    throw new Error('Standard Error -- just a test');
                }
            }).catch((err) => setErrorDetails(err))
    }

    const signIn = (
        <>
            <Form.Group as={Row}>
                <Col sm={1}>
                    <Form.Label>User Name</Form.Label>
                </Col>
                <Col sm={3}>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        ref={focusRef}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Col sm={1}>
                    <Form.Label>Password</Form.Label>
                </Col>
                <Col sm={3}>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyUp={(e: React.KeyboardEvent<HTMLElement>) => {
                            if (e.key === 'Enter') {
                                login(e);
                            }
                        }}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row}/>

            <Form.Group as={Row}>
                <Col sm={1}>
                    <Button onClick={(e) => {
                        login(e)
                    }}>
                        Login
                    </Button>
                </Col>

                <Col sm={3}>
                    <Alert
                        variant="warning"
                        show={showAlert}
                        onClose={() => setShowAlert(!showAlert)}
                        dismissible
                    >
                        <Alert.Heading>
                            <strong>Invalid Credentials</strong>
                        </Alert.Heading>
                        <p>
                            Invalid Username or Password
                        </p>
                    </Alert>
                </Col>
            </Form.Group>
        </>
    )

    const signOut = (
        <Button onClick={(e) => {
            logout(e)
        }}>
            Log Out
        </Button>
    )

    return (
        <Form className={TabContent}>
            {apiKey === null ? (signIn) : (signOut)}
        </Form>
    )
}

export default LoginPage;
