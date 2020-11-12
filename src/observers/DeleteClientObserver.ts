import {IResidentManager} from "../managers/ResidentManager";
import {useEffect, useGlobal} from "reactn";

const DeleteClientObserver = (rm: IResidentManager) => {
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setRefreshClients] = useGlobal('refreshClients');
    const [deleteClient, setDeleteClient] = useGlobal('deleteClient');

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
            .then(() => {
                setDeleteClient(null)
            })
            .catch((err) => setErrorDetails(err));
        }
    }, [deleteClient, setDeleteClient, rm, setErrorDetails, setRefreshClients]);
}

export default DeleteClientObserver;
