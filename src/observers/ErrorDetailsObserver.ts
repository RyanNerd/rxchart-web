import {useEffect, useGlobal} from "reactn";

/**
 * Watch for changes to __errorDetails global
 * When populated this is set to the details of the exception/error that occurred
 */
const ErrorDetailsObserver = () => {
    const [, setActiveResident] = useGlobal('activeResident');
    const [, setActiveTabKey] = useGlobal('activeTabKey');
    const [, setSignIn] = useGlobal('signIn');
    const [errorDetails] = useGlobal('__errorDetails');

    useEffect(() => {
        if (errorDetails) {
            setActiveTabKey('error')
            .then(()=>setSignIn({organization: null, apiKey: null, success: null}))
            .then(() =>setActiveResident(null));
        }
    }, [errorDetails, setSignIn, setActiveTabKey, setActiveResident])
}

export default ErrorDetailsObserver;
