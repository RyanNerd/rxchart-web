import React, {setGlobal, useGlobal, useState, useRef, useEffect} from 'reactn';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import TabContent from '../styles/tab_content.css';
import ResidentProvider from '../providers/ResidentProvider';
import MedicineProvider from '../providers/MedicineProvider';
import {initialState} from "../utility/InitialState";
import MedHistoryProvider from "../providers/MedHistoryProvider";
import Frak from "../providers/Frak";
import RefreshOtcList from "../providers/helpers/RefreshOtcList";
import PropTypes from 'prop-types';

/**
 * Sign in page
 *
 * @returns {*}
 * @constructor
 */
const LoginPage = (props) => {
    const [ userName, setUserName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ showAlert, setShowAlert ] = useState(false);

    const [ apiKey, setApiKey ] = useGlobal('apiKey');
    const [ baseUrl ] = useGlobal('baseUrl');
    const [ residentList, setResidentList ] = useGlobal('residentList');
    const [ , setOtcList ] = useGlobal('otcList');
    const [ , setProviders ] = useGlobal('providers');

    const focusRef = useRef(null);
    const key = props.activeTabKey | null;
    const onError = props.onError;

    useEffect(() => props.updateFocusRef(focusRef), [props, key]);

    /**
     * Fires when the Login Button is clicked
     */
    const login = (e) => {
        e.preventDefault();
        const frak = new Frak();

        // Send the user name and password to the web service
        frak.post(baseUrl + 'authenticate', {username: userName, password: password}, {mode: "cors"})
        .then((json) => {
            // Success?
            if (json.success) {
                // Set the global API key returned from the web service.
                const apiKey = json.data.apiKey;
                setApiKey(apiKey).then(() =>
                {
                    // Use global state for Dependency Injection for providers.
                    const rxFrak = {frak: frak, apiKey: apiKey, baseUrl: baseUrl};
                    const providers = {
                        residentProvider: ResidentProvider.init(rxFrak),
                        medicineProvider: MedicineProvider.init(rxFrak),
                        medHistoryProvider: MedHistoryProvider.init(rxFrak),
                    }

                    setProviders(providers);

                    // Load ALL Resident records up front and save them in the global store.
                    if (residentList === null) {
                        const searchCriteria =
                            {
                                order_by: [
                                    {column: "LastName", direction: "asc"},
                                    {column: "FirstName", direction: "asc"}
                                ]
                            };
                        providers.residentProvider.search(searchCriteria)
                            .then((data) => setResidentList(data))
                            .catch((err) => onError(err));
                    }

                    // Load ALL OTC medications
                    RefreshOtcList(providers.medicineProvider)
                        .then((data) => {setOtcList(data)})
                        .catch((err) => setOtcList(null));

                    // Let the parent component know we are logged in successfully
                    props.onLogin(true);

                    // Remove alert (in the case where a previous log in attempt failed).
                    setShowAlert(false);

                    // Display the organization name that logged in
                    const organization = json.data.organization || null;
                    if (organization) {
                        // Since this element lives in index.html we use old fashioned JS and DOM manipulation to update
                        document.getElementById("organization").innerHTML = json.data.organization;
                    }
                });
            } else {
                // Show invalid credentials alert
                setShowAlert(true);
            }
        })
        .catch((err) => {
            onError(err);
        });
    }

    /**
     * Fires when the Logout Button is clicked
     */
    const logout = (e) => {
        e.preventDefault();

        setGlobal(initialState)
        .then(()=> console.log('logout successful'))
        .catch((err) => onError(err))
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

LoginPage.propTypes = {
    activeTabKey: PropTypes.string,
    onError: PropTypes.func.isRequired,
    updateFocusRef: PropTypes.func.isRequired
}

export default LoginPage;
