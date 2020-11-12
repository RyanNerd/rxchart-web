import {useEffect, useGlobal} from "reactn";
import {IAuthManager} from "../managers/AuthManager";

const LoginObserver = (am: IAuthManager) => {
    const [login, setLogin] = useGlobal('login');
    const [, setApiKey] = useGlobal('apiKey');
    const [, setLoginFailed] = useGlobal('loginFailed');
    const [, setErrorDetails] = useGlobal('errorDetails');

    /**
     * Set to {username, password} when a user is attempting to log in.
     * @var login {{username: string, password: string}|null}
     */
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
            .then(() => {setLogin(null)})
            .catch((err) => {setErrorDetails(err)})
        }
    }, [login, am, setApiKey, setErrorDetails, setLogin, setLoginFailed])
}

export default LoginObserver;
