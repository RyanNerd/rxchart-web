import {useEffect, useGlobal} from "reactn";
import {IResidentManager} from "../managers/ResidentManager";

const UpdateClientOvserver = (rm: IResidentManager) => {
    const [updateClient, setUpdateClient] = useGlobal('updateClient');
    const [, setRefreshClients] = useGlobal('refreshClients');
    const [, setErrorDetails] = useGlobal('errorDetails');

    /**
     * Set to a ResidentRecord when a client is being added or updated
     * @var updateClient {ResidentRecord|null}
     */
    useEffect(() => {
        if (updateClient) {
            rm.updateResident(updateClient)
            .then((client) => {
                setRefreshClients(true);
            })
            .then(() => {
                setUpdateClient(null)
            })
            .catch((err) => setErrorDetails(err))
        }
    }, [updateClient, setUpdateClient, rm, setRefreshClients, setErrorDetails]);
}

export default UpdateClientOvserver;
