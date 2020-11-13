import {IResidentManager} from "../managers/ResidentManager";
import {useEffect, useGlobal} from "reactn";

/**
 * Watch for changes to the updateClient global
 * when populated it is set to the ResidentRecord to be added or updated
 * @param {IResidentManager} rm
 * @constructor
 */
const UpdateClientOvserver = (rm: IResidentManager) => {
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setRefreshClients] = useGlobal('refreshClients');
    const [updateClient, setUpdateClient] = useGlobal('updateClient');

    useEffect(() => {
        if (updateClient) {
            rm.updateResident(updateClient)
            .then(() => {
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
