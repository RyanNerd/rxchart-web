import {setGlobal, useEffect, useGlobal} from "reactn";
import getInitialState from "../utility/getInitialState";

/**
 * Watch for changes to the login global
 * When populated it contains the username and password to use to attempt to login
 */
const AuthObserver = () => {
    const [, setApiKey] = useGlobal('__apiKey');
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [, setLoginFailed] = useGlobal('loginFailed');
    const [am] = useGlobal('authManager');
    const [auth, setAuth] = useGlobal('__auth');

    useEffect(() => {
        if (auth) {
            const action = auth.action;

            // Handle login
            if (action === 'login') {
                const username = auth.payload?.username as string;
                const password = auth.payload?.password as string;
                // Send the user name and password to the web service
                am.authenticate(username, password)
                .then((response) => {
                    if (response.success) {
                        setApiKey(response.apiKey);
                        // Display the organization name that logged in
                        // This element lives in index.html so we use old fashioned JS and DOM manipulation to update
                        const organizationElement = document.getElementById("organization");
                        if (organizationElement) {
                            organizationElement.innerHTML = response.organization;
                        }
                    } else {
                        setLoginFailed(true);
                    }
                })
                .then(() => {
                    setAuth(null)
                })
                .catch((err) => {
                    setErrorDetails(err)
                })
            }

            // Handle logout
            if (action === 'logout') {
                setGlobal(getInitialState())
                .then(() => console.log('logout successful'))
                .catch((err) => setErrorDetails(err))
                setAuth(null);
            }
        }
    }, [am, auth, setApiKey, setAuth, setErrorDetails, setLoginFailed])
}

export default AuthObserver;
