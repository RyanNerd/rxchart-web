import {useEffect, useGlobal, useRef} from "reactn";
import {IProviders} from "../utility/getInitialState";

/**
 * Watch for changes to the global __apiKey
 * when populated it indicates a successful login and triggers
 * a refresh of the residentList and otcList globals, and sets the active tab page to the ResidentPage tab
 * @param {IProviders} providers
 */
const ApiKeyObserver = (providers: IProviders) => {
    const [, setActiveTabKey] = useGlobal('activeTabKey');
    const [, setClient] = useGlobal('__client');
    const [, setLoginFailed] = useGlobal('loginFailed');
    const [, setOtcMedicine] = useGlobal('__otcMedicine');
    const [apiKey] = useGlobal('__apiKey');
    let prevApiKey = useRef(apiKey).current;

    useEffect(() => {
        if (prevApiKey !== apiKey) {
            // Are we logging in (prevApiKey will be null and apiKey will have a value)?
            if (prevApiKey === null && apiKey) {
                setLoginFailed(false);
                providers.setApi(apiKey)
                .then(() => {
                    // Load ALL Resident records up front and save them in the global store.
                    setClient({action: "load", payload: null});

                    // Load ALL OTC medications once we're logged in.
                    setOtcMedicine({action: "load", payload: null});

                    // Activate the Resident tab
                    setActiveTabKey('resident');
                })
            }
            return () => {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                prevApiKey = apiKey;
            }
        }
    }, [apiKey])
}

export default ApiKeyObserver;
