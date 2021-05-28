import {useEffect, useGlobal} from "reactn";

/**
 * Watch for changes to __errorDetails global
 * When populated this is set to the details of the exception/error that occurred
 */
const ErrorDetailsObserver = () => {
    const [, setSignIn] = useGlobal('signIn');
    const [, setActiveTabKey] = useGlobal('activeTabKey');
    const [errorDetails] = useGlobal('__errorDetails');

    useEffect(() => {
        if (errorDetails) {
            setSignIn({organization: null, apiKey: null, success: null})
            .then(() => setActiveTabKey('error'))
        }
    }, [errorDetails, setSignIn, setActiveTabKey])
}

export default ErrorDetailsObserver;
