import {IAuthManager} from "../managers/AuthManager";
import {useEffect, useGlobal} from "reactn";

/**
 * Watch for changes to the login global
 * When populated it contains the username and password to use to attempt to login
 * @param {IAuthManager} am
 * @constructor
 */
const LoginObserver = (am: IAuthManager) => {
    const [, setApiKey] = useGlobal('apiKey');
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setLoginFailed] = useGlobal('loginFailed');
    const [login, setLogin] = useGlobal('login');

    useEffect(() => {
        if (login) {
            // Send the user name and password to the web service
            am.authenticate(login.username, login.password)
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
                setLogin(null)
            })
            .catch((err) => {
                setErrorDetails(err)
            })
        }
    }, [login, am, setApiKey, setErrorDetails, setLogin, setLoginFailed])
}

export default LoginObserver;
