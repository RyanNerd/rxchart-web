import LandingPage from "./Pages/LandingPage";
import React, {useGlobal, useEffect, useRef} from 'reactn';
import {FullName} from "../utility/common";

/**
 * Main Entry Component
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => {
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setResidentList] = useGlobal('residentList');
    const [, setMedicineList] = useGlobal('medicineList');
    const [, setDrugLogList] = useGlobal('drugLogList');
    const [deleteClient, setDeleteClient] = useGlobal('deleteClient');
    const [development] = useGlobal('development');
    const [refreshClients, setRefreshClients] = useGlobal('refreshClients');
    const [refeshMedicine, setRefreshMedicine] = useGlobal('refreshMedicine');
    const [resident] = useGlobal('activeResident');
    const [mm] = useGlobal('medicineManager');
    const [rm] = useGlobal('residentManager');
    const [updateClient, setUpdateClient] = useGlobal('updateClient');
    const [updateMedicine, setUpdateMedicine] = useGlobal('updateMedicine');
    const [activeResident] = useGlobal('activeResident');
    const residentColor = development ? 'blue' : "#edf11e";
    const residentForegroundColor = development ? "#fffff0" : "black";

    // Observer for activeResident changes
    let prevActiveResident = useRef(activeResident).current;
    useEffect(() => {
        if (prevActiveResident !== activeResident) {
            if (development) {
                console.log('activeResident', activeResident);
                console.log('prevActiveResident', prevActiveResident);
            }
            // Trigger the refresh of medicineList and drugLogList
            const clientId = activeResident && activeResident.Id ? activeResident.Id : null;
            setRefreshMedicine(clientId);
        }
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            prevActiveResident = activeResident;
        }
    }, [activeResident]);

    // Observer for when the medicineList and drugLogList should be refreshed.
    useEffect(() => {
        if (development) {
            console.log('refreshMedicine', refeshMedicine);
        }
        if (refeshMedicine) {
            mm.loadMedicineList(refeshMedicine)
            .then((meds) => {
                setMedicineList(meds).then((state) => {
                    mm.loadDrugLog(refeshMedicine)
                    .then((drugs) => setDrugLogList(drugs))
                    .catch((err) => setErrorDetails(err))
                })
                .catch((err) => setErrorDetails(err))
            })
            .catch((err) => setErrorDetails(err));
        } else {
            setMedicineList([]);
            setDrugLogList([]);
        }
        setRefreshMedicine(null);
    }, [refeshMedicine, setRefreshMedicine, setMedicineList, setDrugLogList, mm, setErrorDetails, development]);

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
    }, [updateClient, setUpdateClient, rm, setRefreshClients, setRefreshMedicine, development]);

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

    // Observer for when a Medicine record is added or updated
    useEffect(() => {
        if (development) {
            console.log('updateMedicine', updateMedicine);
        }
        if (updateMedicine) {
            mm.updateMedicine(updateMedicine)
            .then((drugRecord) => {
                const clientId = drugRecord && drugRecord.ResidentId ? drugRecord.ResidentId : null;
                setRefreshMedicine(clientId);
            })
            .then(() => setUpdateMedicine(null))
            .catch((err) => setErrorDetails(err));
        }
    }, [updateMedicine, setUpdateMedicine, mm, setErrorDetails, setRefreshMedicine, development])

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
