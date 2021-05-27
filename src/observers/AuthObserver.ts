import {setGlobal, useEffect, useGlobal} from "reactn";
import getInitialState from "../utility/getInitialState";

/**
 * Watch for changes to the login global
 * When populated it contains the username and password to use to attempt to login
 */
const AuthObserver = () => {
    const [, setSignIn] = useGlobal('signIn');
    const [, setErrorDetails] = useGlobal('__errorDetails');
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
                    return response;
                })
                .then((signInResponse) => {
                    return setSignIn(signInResponse);
                })
                .catch((err)=>setErrorDetails(err))
                .finally(()=>setAuth(null))
            }

            // Handle logout
            if (action === 'logout') {
                setGlobal(getInitialState())
                .then(() => console.log('logout successful'))
                .catch((err) => {setErrorDetails(err)})
                .finally(()=>setAuth(null))
            }
        }
    }, [am, auth, setAuth, setErrorDetails, setSignIn])
}

export default AuthObserver;
