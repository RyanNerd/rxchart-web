import {IResidentManager} from "../managers/ResidentManager";
import {useEffect, useGlobal} from "reactn";

const UpdateClientOvserver = (rm: IResidentManager) => {
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setRefreshClients] = useGlobal('refreshClients');
    const [updateClient, setUpdateClient] = useGlobal('updateClient');

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
