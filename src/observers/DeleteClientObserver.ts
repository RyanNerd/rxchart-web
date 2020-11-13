import {IResidentManager} from "../managers/ResidentManager";
import {useEffect, useGlobal} from "reactn";

/**
 * Watch for changes to the global deleteClient
 * which when populated is the Resident.Id to delete
 * @param {IResidentManager} rm
 * @constructor
 */
const DeleteClientObserver = (rm: IResidentManager) => {
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setRefreshClients] = useGlobal('refreshClients');
    const [deleteClient, setDeleteClient] = useGlobal('deleteClient');

    useEffect(() => {
        if (deleteClient) {
            rm.deleteResident(deleteClient)
            .then((deleted) => {
                if (deleted) {
                    setRefreshClients(true);
                } else {
                    setErrorDetails(new Error('Unable to delete client. Id: ' + deleteClient));
                }
            })
            .then(() => {
                setDeleteClient(null)
            })
            .catch((err) => setErrorDetails(err));
        }
    }, [deleteClient, setDeleteClient, rm, setErrorDetails, setRefreshClients]);
}

export default DeleteClientObserver;
