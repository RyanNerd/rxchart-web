import {useEffect, useGlobal} from "reactn";
import {ResidentRecord} from "../types/RecordTypes";

/**
 * Watch the client global
 * when set take the action specified: load, update, or delete
 * @constructor
 */
const ClientObserver = () => {
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setResidentList] = useGlobal('residentList');
    const [activeResident, setActiveResident] = useGlobal('activeResident');
    const [client, setClient] = useGlobal('client');
    const [rm] = useGlobal('residentManager');

    useEffect(() => {
        if (client) {
            const action = client.action;
            switch (action) {
                case "load": {
                    rm.loadResidentList()
                    .then((clients) => {
                        setResidentList(clients)
                    })
                    .then(() => {
                        setClient(null)
                    })
                    .catch((err) => setErrorDetails(err))
                    break;
                }
                case "update": {
                    const clientRecord = {...client.payload as ResidentRecord};
                    rm.updateResident(clientRecord)
                    .then((clientRecord) => {
                        if (client.cb) {
                            client.cb(clientRecord);
                        }
                        setClient({action: "load", payload: null});
                    })
                    .catch((err) => setErrorDetails(err))
                    break;
                }
                case "delete": {
                    const clientId = client.payload as number;
                    rm.deleteResident(clientId)
                    .then((deleted) => {
                        if (deleted) {
                            setClient({action: 'load', payload: null});
                            if (activeResident?.Id === clientId) {
                                setActiveResident(null);
                            }
                        } else {
                            setErrorDetails(new Error('Unable to delete client. Id: ' + clientId));
                        }
                    })
                    .catch((err) => setErrorDetails(err));
                }
            }
        }
    }, [activeResident, client, rm, setActiveResident, setClient, setErrorDetails, setResidentList]);
}

export default ClientObserver;
