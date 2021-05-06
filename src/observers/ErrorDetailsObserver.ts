import {useEffect, useGlobal} from "reactn";

/**
 * Watch for changes to __errorDetails global
 * When populated this is set to the details of the exception/error that occurred
 */
const ErrorDetailsObserver = () => {
    const [, setApiKey] = useGlobal('__apiKey');
    const [, setActiveTabKey] = useGlobal('activeTabKey');
    const [errorDetails] = useGlobal('__errorDetails');

    useEffect(() => {
        if (errorDetails) {
            setApiKey(null);
            setActiveTabKey('error');
        }
    }, [errorDetails, setApiKey, setActiveTabKey])
}

export default ErrorDetailsObserver;
