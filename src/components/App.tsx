import LandingPage from "./Pages/LandingPage";
import React, {useGlobal, useEffect} from 'reactn';
import {FullName} from "../utility/common";

/**
 * Main Entry Component
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => {
    const [development] = useGlobal('development');
    const [resident] = useGlobal('activeResident');
    const [rm] = useGlobal('residentManager');
    const [deleteClient, setDeleteClient] = useGlobal('deleteClient');
    const [refreshClients, setRefreshClients] = useGlobal('refreshClients');
    const [updateClient, setUpdateClient] = useGlobal('updateClient');
    const residentColor = development ? 'blue' : "#edf11e";
    const residentForegroundColor = development ? "#fffff0" : "black";
    const [, setResidentList] = useGlobal('residentList');
    const [, setErrorDetails] = useGlobal('errorDetails');

    // Observer for when the client list should be refreshed
    useEffect(() => {
        if (development) {
            console.log('refreshClients', refreshClients)
        }
        if (refreshClients) {
            rm.loadResidentList()
            .then((clients) => setResidentList(clients))
            .catch((err) => setErrorDetails(err));
            setRefreshClients(false);
        }
    }, [refreshClients, setRefreshClients, setResidentList, setErrorDetails, rm, development]);

    // Observer for when a client is updated or added
    useEffect(() => {
        if (development) {
            console.log('updateClient', updateClient);
        }
        if (updateClient) {
            rm.updateResident(updateClient).then((client) => {
                setRefreshClients(true);
                setUpdateClient(null);
            })
        }
    }, [updateClient, setUpdateClient, rm, setRefreshClients, development]);

    // Observer for when a client is to be deleted
    useEffect(() => {
        if (development) {
            console.log('deleteClient', deleteClient);
        }
        if (deleteClient) {
            rm.deleteResident(deleteClient)
            .then((deleted) => {
                if (deleted) {
                    setRefreshClients(true);
                } else {
                    setErrorDetails(new Error('Unable to delete client. Id: ' + deleteClient));
                }
            })
            .then(() => setDeleteClient(null))
            .catch((err) => setErrorDetails(err));
        }
    }, [deleteClient, setDeleteClient, rm, setErrorDetails, setRefreshClients, development]);

    return (
        <>
            {resident ?
                <h4 style={{textAlign: "center"}}>
                    <span style={{background: residentColor, color: residentForegroundColor}}>
                        {FullName(resident)} {resident.DOB_MONTH}/{resident.DOB_DAY}/{resident.DOB_YEAR}
                    </span>
                </h4> : null
            }

            <div className="vl"></div>

            <div style={{marginLeft: "15px"}}>
                <LandingPage/>
            </div>
        </>
    );
}

export default App;
