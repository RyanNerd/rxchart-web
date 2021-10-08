import {useEffect, useGlobal} from "reactn";
import {MedicineRecord, ResidentRecord} from "types/RecordTypes";
import {asyncWrapper} from "utility/common";

/**
 * Watch for changes to the global __apiKey
 * when populated it indicates a successful login and triggers
 * a refresh of the residentList and otcList globals, and sets the active tab page to the ResidentPage tab
 */
const ApiKeyObserver = () => {
    const [providers] = useGlobal('providers');
    const [, setActiveTabKey] = useGlobal('activeTabKey');
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [, setOtcList] = useGlobal('otcList');
    const [, setResidentList] = useGlobal('residentList');
    const [signIn] = useGlobal('signIn');
    const [mm] = useGlobal('medicineManager');
    const [rm] = useGlobal('residentManager');
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
                const [errLoadClients, clients] = await asyncWrapper(rm.loadResidentList());
                if (errLoadClients) await setErrorDetails(errLoadClients); else {
                    await setResidentList(clients as ResidentRecord[]);
                    const [errLoadOtc, otcMeds] = await asyncWrapper(mm.loadOtcList());
                    if (errLoadOtc) await setErrorDetails(errLoadOtc); else {
                        await setOtcList(otcMeds as MedicineRecord[]);
                        // Activate the Resident tab
                        await setActiveTabKey('resident');
                    }
                }
            }
        }

        // apiKey will be a string if user successfully signed in otherwise a null.
        if (apiKey) {
            setProviderApiKey(apiKey);
        }
    }, [apiKey, providers, setActiveTabKey, setErrorDetails, mm, rm, setOtcList, setResidentList])
}

export default ApiKeyObserver;
