import {useEffect, useGlobal, useRef} from "reactn";
import {IProviders} from "../utility/getInitialState";
import {Authenticated} from "../providers/AuthenticationProvider";

/**
 * Watch for changes to the global __apiKey
 * when populated it indicates a successful login and triggers
 * a refresh of the residentList and otcList globals, and sets the active tab page to the ResidentPage tab
 * @param {IProviders} providers
 * @param {Authenticated} signIn
 */
const ApiKeyObserver = (providers: IProviders, signIn: Authenticated) => {
    const [, setActiveTabKey] = useGlobal('activeTabKey');
    const [, setClient] = useGlobal('__client');
    const [, setOtcMedicine] = useGlobal('__otcMedicine');
    const apiKey = signIn.apiKey;
    let prevApiKey = useRef(apiKey).current;

    useEffect(() => {
        if (prevApiKey !== apiKey) {
            // Are we logging in (prevApiKey will be null and apiKey will have a value)?
            if (prevApiKey === null && apiKey) {
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
