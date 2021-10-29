import {useEffect, useGlobal} from 'reactn';

/**
 * Watch for changes to __errorDetails global
 * When populated this is set to the details of the exception/error that occurred
 */
const ErrorDetailsObserver = () => {
    const [, setActiveClient] = useGlobal('activeClient');
    const [, setActiveTabKey] = useGlobal('activeTabKey');
    const [, setSignIn] = useGlobal('signIn');
    const [errorDetails] = useGlobal('__errorDetails');

    useEffect(() => {
        if (errorDetails) {
            setActiveTabKey('error')
                .then(() => setSignIn({organization: null, apiKey: null, success: null}))
                .then(() => setActiveClient(null));
        }
    }, [errorDetails, setSignIn, setActiveTabKey, setActiveClient]);
};

export default ErrorDetailsObserver;
