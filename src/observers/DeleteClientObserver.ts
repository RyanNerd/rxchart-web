import {useEffect, useGlobal} from "reactn";
import {IResidentManager} from "../managers/ResidentManager";

const DeleteClientObserver = (rm: IResidentManager) => {
    const [deleteClient, setDeleteClient] = useGlobal('deleteClient');
    const [, setRefreshClients] = useGlobal('refreshClients');
    const [, setErrorDetails] = useGlobal('errorDetails');

    /**
     * Set to the Resident.Id of the record to delete
     * @var deleteClient {}number|null}
     */
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
            .then(() => {setDeleteClient(null)})
            .catch((err) => setErrorDetails(err));
        }
    }, [deleteClient, setDeleteClient, rm, setErrorDetails, setRefreshClients]);
}

export default DeleteClientObserver;
