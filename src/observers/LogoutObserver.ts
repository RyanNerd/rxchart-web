import getInitialState from "../utility/getInitialState";
import {setGlobal, useEffect, useGlobal} from 'reactn';

/**
 * Watch the logout global
 * when set to true the global state is initialized back to the default effectively logging the user out.
 * @constructor
 */
const LogoutObserver = () => {
    const [logout, setLogout] = useGlobal('logout');
    const [, setErrorDetails] = useGlobal('errorDetails');

    useEffect(() => {
        console.log('logout', logout);
        if (logout) {
            setGlobal(getInitialState())
            .then(() => console.log('logout successful'))
            .catch((err) => setErrorDetails(err))
            setLogout(false);
        }
    }, [logout, setErrorDetails, setLogout])
}

export default LogoutObserver;
