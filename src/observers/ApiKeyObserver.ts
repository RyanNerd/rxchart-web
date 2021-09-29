import {Authenticated} from "providers/AuthenticationProvider";
import {useEffect, useGlobal} from "reactn";
import {MedicineRecord} from "types/RecordTypes";
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
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [, setOtcList] = useGlobal('otcList');
    const [mm] = useGlobal('medicineManager');

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
                    const [err, r] = await asyncWrapper(mm.loadOtcList());
                    if (err) await setErrorDetails(err); else {
                        await setOtcList(r as MedicineRecord[]);
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
    }, [apiKey, providers, setActiveTabKey, setClient, setErrorDetails, mm, setOtcList])
}

export default ApiKeyObserver;
