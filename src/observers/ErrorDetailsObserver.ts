import {useEffect, useGlobal} from "reactn";

const ErrorDetailsObserver = () => {
    const [, setApiKey] = useGlobal('apiKey');
    const [activeTabKey, setActiveTabKey] = useGlobal('activeTabKey');
    const [errorDetails] = useGlobal('errorDetails');

    /**
     * Observer for anytime there is an error set on the errorDetails global
     * @var errorDetails {any}
     */
    useEffect(() => {
        if (errorDetails) {
            setApiKey(null);
            setActiveTabKey('error');
        }
    }, [errorDetails, setApiKey, activeTabKey, setActiveTabKey])
}

export default ErrorDetailsObserver;
