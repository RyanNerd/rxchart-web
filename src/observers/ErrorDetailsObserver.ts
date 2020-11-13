import {useEffect, useGlobal} from "reactn";

/**
 * Watch for changes to errorDetails
 * When populated this is set to the details of the exception/error that occured
 * @constructor
 */
const ErrorDetailsObserver = () => {
    const [, setApiKey] = useGlobal('apiKey');
    const [, setActiveTabKey] = useGlobal('activeTabKey');
    const [errorDetails] = useGlobal('errorDetails');

    useEffect(() => {
        if (errorDetails) {
            setApiKey(null);
            setActiveTabKey('error');
        }
    }, [errorDetails, setApiKey, setActiveTabKey])
}

export default ErrorDetailsObserver;
