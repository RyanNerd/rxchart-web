import {IResidentManager} from "../managers/ResidentManager";
import {useEffect, useGlobal} from "reactn";

/**
 * Watch the refreshClients global
 * when set to true reloads the residentList global
 * @param {IResidentManager} rm
 * @constructor
 */
const RefreshClientsObserver = (rm: IResidentManager) => {
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setResidentList] = useGlobal('residentList');
    const [refreshClients, setRefreshClients] = useGlobal('refreshClients');

    useEffect(() => {
        if (refreshClients) {
            rm.loadResidentList()
            .then((clients) => {
                setResidentList(clients)
            })
            .then(() => {
                setRefreshClients(false)
            })
            .catch((err) => setErrorDetails(err))
        }
    }, [refreshClients, setRefreshClients, setResidentList, setErrorDetails, rm]);
}

export default RefreshClientsObserver;
