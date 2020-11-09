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
}

/**
 * Sign in page
 * @param {IProps} props
 * @returns {JSX.Element}
 * @constructor
 */
const LoginPage = (props: IProps): JSX.Element | null => {
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setLogin] = useGlobal('login');
    const [apiKey] = useGlobal('apiKey');
    const [activeTabKey] = useGlobal('activeTabKey');
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Fires when the Login Button is clicked
     * @param {React.MouseEvent<HTMLElement>} e
     * todo: refactor / simplify
     */
    const login = (e: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setLogin({username, password});
    }

    /**
     * Fires when the Logout Button is clicked
     * @param {React.MouseEvent<HTMLElement>} e
     * todo: move to App.tsx
     */
    const logout = (e: React.MouseEvent<HTMLElement>) => {
        e.persist();
        setGlobal(getInitialState())
            .then(() => console.log('logout successful'))
            .catch((err) => setErrorDetails(err))
        if (e.ctrlKey) {
            console.log('Testing Diagnostics');
            setErrorDetails(new Error('Testing error handler'));
        }
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
