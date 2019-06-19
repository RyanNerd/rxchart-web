import React, { useGlobal } from 'reactn';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/**
 * Sign in page
 * @returns {*}
 * @constructor
 */
function LoginPage(props) {
    const [ apiKey, setApiKey ] = useGlobal('apiKey');
    const [ currentResident, setCurrentResident] = useGlobal('currentResident');
    const [ currentBarCode, setCurrentBarCode] = useGlobal('currentBarCode');

    /**
     * Fires when the Login Button is clicked
     */
    function login(e) {
        e.preventDefault();
        setApiKey('test');
        props.onLogin(true);
    }

    /**
     * Fires when the Logout Button is clicked
     */
    function logout(e) {
        e.preventDefault();
        setApiKey(null);
        setCurrentBarCode(null);
        setCurrentResident(null);
    }

    const signIn = (
        <>
            <Form.Group controlId="user.name">
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" placeholder="user-name" />
            </Form.Group>
            <Form.Group controlId="user.password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" />
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
        <Form style={{marginTop: "25px", marginLeft: "35px", marginRight: "235px"}}>
            {apiKey === null ? (signIn) : (signOut)}
        </Form>
    );
}

export default LoginPage;