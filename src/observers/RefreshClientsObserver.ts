import {useEffect, useGlobal} from "reactn";
import {IResidentManager} from "../managers/ResidentManager";

const RefreshClientsObserver = (rm: IResidentManager) => {
    const [refreshClients, setRefreshClients] = useGlobal('refreshClients');
    const [, setResidentList] = useGlobal('residentList');
    const [, setErrorDetails] = useGlobal('errorDetails');

    /**
     * Set to true when the client list needs to be refreshed
     * @var refreshClients {bool}
     */
    useEffect(() => {
        if (refreshClients) {
            rm.loadResidentList()
            .then((clients) => {setResidentList(clients)})
            .then(() => {setRefreshClients(false)})
            .catch((err) => setErrorDetails(err))
        }
    }, [refreshClients, setRefreshClients, setResidentList, setErrorDetails, rm]);
}

export default RefreshClientsObserver;
