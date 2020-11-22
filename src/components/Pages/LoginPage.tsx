import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import React, {useEffect, useGlobal, useRef, useState} from 'reactn';
import Row from 'react-bootstrap/Row';
import TabContent from '../../styles/common.css';

/**
 * Sign in page
 * @returns {JSX.Element}
 * @constructor
 */
const LoginPage = (): JSX.Element | null => {
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setAuth] = useGlobal('auth');
    const [activeTabKey] = useGlobal('activeTabKey');
    const [apiKey] = useGlobal('apiKey');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useGlobal('loginFailed');
    const [username, setUsername] = useState('');
    const focusRef = useRef<HTMLInputElement>(null);

    // Set focus to the search input when this page is selected.
    useEffect(() => {
        if (activeTabKey === 'login' && focusRef && focusRef.current) {
            focusRef.current.focus();
        }
    }, [activeTabKey, focusRef]);

    // Prevent render if this tab isn't active
    if (activeTabKey !== 'login') {
        return null;
    } else {
        window.scrollTo({top: 0, behavior: 'smooth'});
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
                                e.preventDefault();
                                setAuth({action: 'login', payload: {username, password}});
                            }
                        }}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row}/>

            <Form.Group as={Row}>
                <Col sm={1}>
                    <Button onClick={(e) => {
                        e.preventDefault();
                        setAuth({action: 'login', payload: {username, password}});
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

    const logOff = (
        <Button onClick={(e) => {
            e.persist();
            if (e.ctrlKey) {
                console.log('Testing Diagnostics');
                setErrorDetails(new Error('Testing error handler'));
            } else {
                setAuth({action: 'logout', payload: null});
            }
        }}>
            Log Out
        </Button>
    )

    return (
        <Form className={TabContent}>
            {apiKey === null ? (signIn) : (logOff)}
        </Form>
    )
}

export default LoginPage;
