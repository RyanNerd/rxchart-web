import {IResidentManager} from "../managers/ResidentManager";
import {useEffect, useGlobal} from "reactn";

const RefreshClientsObserver = (rm: IResidentManager) => {
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setResidentList] = useGlobal('residentList');
    const [refreshClients, setRefreshClients] = useGlobal('refreshClients');

    /**
     * Set to true when the client list needs to be refreshed
     * @var refreshClients {bool}
     */
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
