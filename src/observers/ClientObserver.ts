import {useEffect, useGlobal} from "reactn";
import {ResidentRecord} from "types/RecordTypes";

/**
 * Watch the __client global
 * when set take the action specified: load, update, or delete
 */
const ClientObserver = () => {
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [, setResidentList] = useGlobal('residentList');
    const [activeResident, setActiveResident] = useGlobal('activeResident');
    const [client, setClient] = useGlobal('__client');
    const [rm] = useGlobal('residentManager');

    useEffect(() => {
        if (client) {
            const action = client.action;
            switch (action) {
                case "load": {
                    rm.loadResidentList()
                    .then((clients) => {
                        return setResidentList(clients);
                    })
                    .catch((err) => setErrorDetails(err))
                    .finally(() => {
                        return setClient(null);
                    })
                    break;
                }

                case "update": {
                    const clientRecord = {...client.payload as ResidentRecord};
                    rm.updateResident(clientRecord)
                    .then((updatedClient) => {
                        // Refresh the residentList
                        setClient({action: "load", payload: null})
                        .then(() => {
                            if (client.cb) {
                                client.cb(updatedClient);
                            }
                        })
                    })
                    .catch((err) => setErrorDetails(err))
                    .finally(() => setClient(null))
                    break;
                }

                case "delete": {
                    const clientId = client.payload as number;
                    rm.deleteResident(clientId)
                    .then((deleted) => {
                        if (deleted) {
                            return setClient({action: 'load', payload: null});
                        } else {
                            setErrorDetails(new Error('Unable to delete client. Id: ' + clientId));
                        }
                    })
                    .then(() => {
                        if (activeResident?.Id === clientId) {
                            setActiveResident(null);
                        }
                    })
                    .catch((err) => setErrorDetails(err))
                    .finally(() => setClient(null))
                    break;
                }
            }
        }
    }, [activeResident, client, rm, setActiveResident, setClient, setErrorDetails, setResidentList]);
}

export default ClientObserver;
