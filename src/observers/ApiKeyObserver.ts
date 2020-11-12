import { useEffect, useRef, useGlobal } from "reactn";
import {IProviders} from "../utility/getInitialState";

const ApiKeyObserver = (providers: IProviders) => {
    const [, setActiveTabKey] = useGlobal('activeTabKey');
    const [, setLoginFailed] = useGlobal('loginFailed');
    const [, setRefreshClients] = useGlobal('refreshClients');
    const [, setRefreshOtc] = useGlobal('refreshOtc');
    const [apiKey] = useGlobal('apiKey');
    let prevApiKey = useRef(apiKey).current;

    useEffect(() => {
        if (prevApiKey !== apiKey) {
            // Are we logging in (prevApiKey will be falsy and apiKey will have a value)?
            if (prevApiKey === null && apiKey) {
                setLoginFailed(false);
                providers.setApi(apiKey);

                // Load ALL Resident records up front and save them in the global store.
                setRefreshClients(true);

                // Load ALL OTC medications once we're logged in.
                setRefreshOtc(true);

                // Activate the Resident tab
                setActiveTabKey('resident');
            }
            return () => {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                prevApiKey = apiKey;
            }
        }
    }, [apiKey])
}

export default ApiKeyObserver;
