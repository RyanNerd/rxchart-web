import React, {setGlobal, useGlobal, useState} from 'reactn';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TabContent from './../../styles/tab_content.css';

/**
 * Sign in page
 * @returns {*}
 * @constructor
 */
function LoginPage(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');


    const [ apiKey, setApiKey ] = useGlobal('apiKey');
    const [ frak ] = useGlobal('frak');
    const [ baseUrl ] = useGlobal('baseUrl');

    /**
     * Fires when the Login Button is clicked
     */
    function login(e) {
        e.preventDefault();

        frak.post(baseUrl + 'authenticate', {username: userName, password: password}, {mode: "cors"})
        .then((json) => {
            if (json.success) {
                setApiKey(json.data.apiKey).then(() => props.onLogin(true));
            } else {
                alert('Invalid login credentials')
            }
        })
        .catch((err) => {
            console.error(err);
            alert('something went wrong');
        });
    }

    /**
     * Fires when the Logout Button is clicked
     */
    function logout(e) {
        e.preventDefault();

        setGlobal({currentBarCode: null, currentResident: null, apiKey: null});
    }

    const signIn = (
        <>
            <Form.Group controlId="user.name">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="user-name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="user.password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Button onClick={(e) => {login(e)}}>
                Login
            </Button>
        </>
    );

    const signOut = (
        <Button onClick={(e) => {logout(e)}}>
            Log Out
        </Button>
    );

    return (
        <Form className={TabContent}>
            {apiKey === null ? (signIn) : (signOut)}
        </Form>
    );
}

export default LoginPage;