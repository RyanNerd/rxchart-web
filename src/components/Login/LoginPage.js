import React, {addCallback, setGlobal, useGlobal, useState} from 'reactn';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import TabContent from './../../styles/tab_content.css';
import ResidentProvider from './../../providers/ResidentProvider';
import MedicineProvider from './../../providers/MedicineProvider';
import {initialState} from "../../InitialState";

/**
 * Sign in page
 * @returns {*}
 * @constructor
 */
function LoginPage(props) {
    const [ userName, setUserName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ showAlert, setShowAlert ] = useState(false);

    const [ apiKey, setApiKey ] = useGlobal('apiKey');
    const [ frak ] = useGlobal('frak');
    const [ baseUrl ] = useGlobal('baseUrl');
    const [ residentList, setResidentList ] = useGlobal('residentList');
    const [ providers , setProviders ] = useGlobal('providers');
    // eslint-disable-next-line
    const [ medicineList, setMedicineList ] = useGlobal('medicineList');
    // eslint-disable-next-line
    const [ activeDrug, setActiveDrug ] = useGlobal('activeDrug');

    let removeCallback;
    let activeResidentId = null;

    /**
     * Fires when the Login Button is clicked
     */
    function login(e) {
        e.preventDefault();

        frak.post(baseUrl + 'authenticate', {username: userName, password: password}, {mode: "cors"})
        .then((json) => {
            if (json.success) {
                setApiKey(json.data.apiKey).then(() => {
                    // Use global state for Dependency Injection for providers.
                    providers.residentProvider = new ResidentProvider(baseUrl, json.data.apiKey);
                    providers.medicineProvider = new MedicineProvider(baseUrl, json.data.apiKey);
                    setProviders(providers);

                    // Load ALL Resident records up front and save them in the global store.
                    if (residentList === null) {
                        providers.residentProvider.query('*').then((data) => setResidentList(data));
                    }

                    // Let the parent component know we are logged in successfully
                    props.onLogin(true);

                    // Remove alert
                    setShowAlert(false);

                    // Capture global state changes
                    removeCallback = addCallback(global =>
                    {
                        // // Update the medicineList global when the current resident changes
                        // if (global.activeResident && global.activeResident.Id && global.activeResident.Id !== activeResidentId) {
                        //     activeResidentId = global.activeResident.Id;
                        //     providers.medicineProvider.query(activeResidentId, 'ResidentId')
                        //     .then((response) =>
                        //     {
                        //         if (response.success) {
                        //             return {medicineList: response.data};
                        //         } else {
                        //             throw response;
                        //         }
                        //     })
                        //     .catch((err) => {
                        //         console.log(err);
                        //         alert('something went wrong');
                        //     });
                        // }
                    });
                });
            } else {
                // Show invalid credentials alert
                setShowAlert(true);
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

        // Remove the global callback function
        if (removeCallback) {
            removeCallback();
        }
        activeResidentId = null;

        setGlobal(initialState)
        .then(()=> console.log('logout successful'))
        .catch((err) => console.error('logout error', err));
    }

    function refreshMedicineList(residentId) {
        providers.medicineProvider.query(residentId, 'ResidentId')
        .then((response) =>
        {
            if (response.success) {
                setMedicineList(response.data).then(() => console.log('refeshMedicineList', response.data));
            } else {
                throw response;
            }
        })
        .catch((err) => {
            console.log(err);
            alert('something went wrong');
        });
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
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
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
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row}/>

            <Form.Group as={Row}>
                <Col sm={1}>
                    <Button onClick={(e) => {login(e)}}>
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