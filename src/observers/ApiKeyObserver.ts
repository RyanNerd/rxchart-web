import {Authenticated} from "providers/AuthenticationProvider";
import {useEffect, useGlobal} from "reactn";
import {asyncWrapper} from "utility/common";
import {IProviders} from "utility/getInitialState";

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
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const apiKey = signIn.apiKey;

    useEffect(() => {
        /**
         * Sets the apiKey for all providers and upon success sets some observers to load client and OTC lists and
         * activates the Resident tab.
         * @param {string} apiKey
         */
        const setProviderApiKey = async (apiKey: string) => {
            const [e] = await asyncWrapper(providers.setApi(apiKey));
            if (e) await setErrorDetails(e); else {
                // Load ALL Resident records up front and save them in the global store.
                const [e] = await asyncWrapper(setClient({action: "load", payload: null}));
                if (e) await setErrorDetails(e); else {
                    // Load ALL OTC medications once we're logged in.
                    const [e] = await asyncWrapper(setOtcMedicine({action: "load", payload: null}));
                    if (e) await setErrorDetails(e); else {
                        // Activate the Resident tab
                        const [e] = await asyncWrapper(setActiveTabKey('resident'));
                        if (e) await setErrorDetails(e);
                    }
                }
            }
        }

        // apiKey will be a string if user successfully signed in otherwise a null.
        if (apiKey) {
            setProviderApiKey(apiKey);
        }
    }, [apiKey, providers, setActiveTabKey, setClient, setOtcMedicine, setErrorDetails])
}

export default ApiKeyObserver;
