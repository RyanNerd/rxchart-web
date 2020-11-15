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
    const [, setActiveResident] = useGlobal('activeResident');
    const [updateClient, setUpdateClient] = useGlobal('updateClient');

    useEffect(() => {
        if (updateClient) {
            console.log('updateClient', updateClient);
            rm.updateResident(updateClient)
            .then((residentRecord) => {
                setRefreshClients(true);
                // When adding a new client set that client as active
                if (!updateClient.Id) {
                    setActiveResident(residentRecord);
                }
            })
            .then(() => {
                setUpdateClient(null)
            })
            .catch((err) => setErrorDetails(err))
        }
    }, [setActiveResident, updateClient, setUpdateClient, rm, setRefreshClients, setErrorDetails]);
}

export default UpdateClientOvserver;
