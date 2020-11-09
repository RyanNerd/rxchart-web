import LandingPage from "./Pages/LandingPage";
import React, {useGlobal, useEffect, useRef} from 'reactn';
import {FullName} from "../utility/common";

/**
 * Main Entry Component
 * Also the single source of truth for database updates and global state management
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => {
    const [, setDrugLogList] = useGlobal('drugLogList');
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setMedicineList] = useGlobal('medicineList');
    const [, setResidentList] = useGlobal('residentList');
    const [activeResident] = useGlobal('activeResident');
    const [deleteClient, setDeleteClient] = useGlobal('deleteClient');
    const [deleteDrugLog, setDeleteDrugLog] = useGlobal('deleteDrugLog');
    const [development] = useGlobal('development');
    const [mm] = useGlobal('medicineManager');
    const [refreshMedicine, setRefreshMedicine] = useGlobal('refreshMedicine');
    const [refreshClients, setRefreshClients] = useGlobal('refreshClients');
    const [refreshDrugLog, setRefreshDrugLog] = useGlobal('refreshDrugLog');
    const [resident] = useGlobal('activeResident');
    const [rm] = useGlobal('residentManager');
    const [updateClient, setUpdateClient] = useGlobal('updateClient');
    const [updateDrugLog, setUpdateDrugLog] = useGlobal('updateDrugLog');
    const [updateMedicine, setUpdateMedicine] = useGlobal('updateMedicine');
    const residentColor = development ? 'blue' : "#edf11e";
    const residentForegroundColor = development ? "#fffff0" : "black";

    /**
     * activeResident: ResidentRecord|null - set to ResidentRecord when user selects from the ResidentPage
     */
    let prevActiveResident = useRef(activeResident).current;
    useEffect(() => {
        if (prevActiveResident !== activeResident) {
            // Trigger the refresh of medicineList and drugLogList
            const clientId = activeResident && activeResident.Id ? activeResident.Id : null;
            setRefreshMedicine(clientId);
        }
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            prevActiveResident = activeResident;
        }
    }, [activeResident]);

    /**
     * refreshMedicine: number|null -- set to residentId when Medicine and MedHistory need a refresh
     */
    useEffect(() => {
        if (refreshMedicine) {
            mm.loadMedicineList(refreshMedicine)
            .then((meds) => {setMedicineList(meds)})
            .then(() => {setRefreshDrugLog(refreshMedicine)})
            .then(() => {setRefreshMedicine(null)})
            .catch((err) => setErrorDetails(err));
        }
    }, [mm, refreshMedicine, setErrorDetails, setMedicineList, setRefreshDrugLog, setRefreshMedicine]);

    /**
     * refreshDrugLog: number|DrugLogRecord[], null -- set to residentId when Medicine and MedHistory need a refresh
     */
    useEffect(() => {
        if (refreshDrugLog) {
            if (Array.isArray(refreshDrugLog)) {
                setDrugLogList(refreshDrugLog).then((state) => {setRefreshDrugLog(null)})
            } else {
                mm.loadDrugLog(refreshDrugLog)
                .then((drugs) => {
                    setDrugLogList(drugs)
                })
                .then(() => {
                    setRefreshDrugLog(null)
                })
                .catch((err) => setErrorDetails(err))
            }
        }
    }, [mm, refreshDrugLog, setDrugLogList, setErrorDetails, setRefreshDrugLog]);

    /**
     * refreshClients: bool - Set to true when the client list needs to be refreshed
     */
    useEffect(() => {
        if (refreshClients) {
            rm.loadResidentList()
            .then((clients) => {setResidentList(clients)})
            .then(() => {setRefreshClients(false)})
            .catch((err) => setErrorDetails(err))
        }
    }, [refreshClients, setRefreshClients, setResidentList, setErrorDetails, rm]);

    /**
     * updateClient: ResidentRecord|null - Set to ResidentRecord when a client is being added or updated
     */
    useEffect(() => {
        if (updateClient) {
            rm.updateResident(updateClient).then((client) => {
                setRefreshClients(true);
            })
            .then(() => setUpdateClient(null))
            .catch((err) => setErrorDetails(err))
        }
    }, [updateClient, setUpdateClient, rm, setRefreshClients, setErrorDetails]);

    /**
     * deleteClient: number|null - Set to the resident Id of the record to delete
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

    /**
     * deleteDrugLog: number|null - set to the id of of the DrugLogRecord to delete.
     */
    useEffect(() => {
        const clientId = activeResident?.Id;
        if (deleteDrugLog && clientId) {
            mm.deleteDrugLog(deleteDrugLog)
            .then((deleted) => {
                if (deleted) {
                    setRefreshDrugLog(clientId);
                } else {
                    setErrorDetails(new Error('unable to delete drugLogRecord. Id: ' + deleteDrugLog));
                }
            })
            .then(() => {setDeleteDrugLog(null)})
            .catch((err) => setErrorDetails(err))
        }
    }, [activeResident, deleteDrugLog, mm, setDeleteDrugLog, setErrorDetails, setRefreshDrugLog])

    /**
     * updateMedicine: MedicineRecord|null - Set to MedicineRecord when a Medicine record is added or updated
     */
    useEffect(() => {
        if (updateMedicine) {
            mm.updateMedicine(updateMedicine)
            .then((drugRecord) => {
                const clientId = drugRecord && drugRecord.ResidentId ? drugRecord.ResidentId : null;
                setRefreshMedicine(clientId);
            })
            .then(() => {setUpdateMedicine(null)})
            .catch((err) => setErrorDetails(err));
        }
    }, [updateMedicine, setUpdateMedicine, mm, setErrorDetails, setRefreshMedicine])

    /**
     * updateDrugLog: drugLogRecord|null -- Set to a drugLogRecord when a MedHistory record is added or updated
     */
    useEffect(() => {
        if (updateDrugLog) {
            mm.updateDrugLog(updateDrugLog, updateDrugLog.ResidentId)
            .then((drugLogs) => {setRefreshDrugLog(drugLogs)})
            .then(() => {setUpdateDrugLog(null)})
            .catch((err) => setErrorDetails(err))
        }
    }, [mm, setErrorDetails,setRefreshDrugLog, setUpdateDrugLog, updateDrugLog])

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
