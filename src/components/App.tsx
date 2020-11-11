import LandingPage from "./Pages/LandingPage";
import React, {useGlobal, useEffect, useRef} from 'reactn';
import {clientFullName, clientDOB} from "../utility/common";

/**
 * Main Entry Component
 * Also the single source of truth for database updates and global state management
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => {
    const [, setDrugLogList] = useGlobal('drugLogList');
    const [, setLoginFailed] = useGlobal('loginFailed');
    const [, setMedicineList] = useGlobal('medicineList');
    const [, setOtcList] = useGlobal('otcList');
    const [, setResidentList] = useGlobal('residentList');
    const [activeResident] = useGlobal('activeResident');
    const [activeTabKey, setActiveTabKey] = useGlobal('activeTabKey');
    const [am] = useGlobal('authManager');
    const [apiKey, setApiKey] = useGlobal('apiKey');
    const [deleteClient, setDeleteClient] = useGlobal('deleteClient');
    const [deleteDrugLog, setDeleteDrugLog] = useGlobal('deleteDrugLog');
    const [deleteMedicine, setDeleteMedicine] = useGlobal('deleteMedicine');
    const [deleteOtcMedicine, setDeleteOtcMedicine] = useGlobal('deleteOtcMedicine');
    const [development] = useGlobal('development');
    const [errorDetails, setErrorDetails] = useGlobal('errorDetails');
    const [login, setLogin] = useGlobal('login');
    const [mm] = useGlobal('medicineManager');
    const [providers] = useGlobal('providers');
    const [refreshClients, setRefreshClients] = useGlobal('refreshClients');
    const [refreshDrugLog, setRefreshDrugLog] = useGlobal('refreshDrugLog');
    const [refreshMedicine, setRefreshMedicine] = useGlobal('refreshMedicine');
    const [refreshOtc, setRefreshOtc] = useGlobal('refreshOtc');
    const [rm] = useGlobal('residentManager');
    const [updateClient, setUpdateClient] = useGlobal('updateClient');
    const [updateDrugLog, setUpdateDrugLog] = useGlobal('updateDrugLog');
    const [updateMedicine, setUpdateMedicine] = useGlobal('updateMedicine');
    const [updateOtcMedicine, setUpdateOtcMedicine] = useGlobal('updateOtcMedicine');
    const residentColor = development ? 'blue' : "#edf11e";
    const residentForegroundColor = development ? "#fffff0" : "black";

    /**
     * Observer of the apiKey changes for when a user successfully logs in
     * @var apiKey {string | null}
     */
    let prevApiKey = useRef(apiKey).current;
    useEffect(() => {
        if (prevApiKey !== apiKey) {
            // Are we logging in (prevApiKey will be falsy and apiKey will have a value)?
            if (prevApiKey === null && apiKey) {
                setLoginFailed(false);
                providers.setApi(apiKey);

                // Load ALL Resident records up front and save them in the global store.
                setRefreshClients(true);

                // Load ALL OTC medications once we're logged in.
                setRefreshOtc(true);

                // Activate the Resident tab
                setActiveTabKey('resident');
            }
            return () => {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                prevApiKey = apiKey;
            }
        }
    }, [apiKey])

    /**
     * Observer for anytime there is an error set on the errorDetails global
     * @var errorDetails {any}
     */
    useEffect(() => {
        if (errorDetails) {
            setApiKey(null);
            setActiveTabKey('error');
        }
    }, [errorDetails, setApiKey, activeTabKey, setActiveTabKey])

    /**
     * Observer for activeResident that fires when a user selects a resident to be active
     * @var activeResident {ResidentRecord | null}
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
     * Set to true when the client list needs to be refreshed
     * @var refreshClients {bool}
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
     * Set to a ResidentRecord when a client is being added or updated
     * @var updateClient {ResidentRecord|null}
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
            .then(() => {setDeleteClient(null)})
            .catch((err) => setErrorDetails(err));
        }
    }, [deleteClient, setDeleteClient, rm, setErrorDetails, setRefreshClients]);

    /**
     * Set to Resident.Id when the medicineList needs a refresh
     * @var refreshMedicine {number|null}
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
     * Set to a MedicineRecord when a Medicine record is added or updated
     * @var updateMedicine {MedicineRecord|null}
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
     * Set to a MedicineRecord when an OTC record is added or updated
     * @var updateOtcMedicine {MedicineRecord|null}
     */
    useEffect(() => {
        if (updateOtcMedicine) {
            mm.updateMedicine(updateOtcMedicine)
            .then((drugRecord) => {
                setRefreshOtc(true);
            })
            .then(() => {setUpdateOtcMedicine(null)})
            .catch((err) => setErrorDetails(err));
        }
    }, [mm, setErrorDetails, setRefreshOtc, setUpdateOtcMedicine, updateOtcMedicine])

    /**
     * Set to Id of the the MedicineRecord to be deleted
     * @var deleteMedicne {number|null}
     */
    useEffect(() => {
        if(deleteMedicine && activeResident) {
            mm.deleteMedicine(deleteMedicine)
            .then((deleted) => {
                if (deleted) {
                    setRefreshMedicine(activeResident?.Id);
                }
            })
            .then(() => {setDeleteMedicine(null)})
            .catch((err) => setErrorDetails(err));
        }
    }, [activeResident, deleteMedicine, mm, setDeleteMedicine, setErrorDetails, setRefreshMedicine])

    /**
     * Set to Id of the the OTC MedicineRecord to be deleted
     * @var deleteOtcMedicne {number|null}
     */
    useEffect(() => {
        if(deleteOtcMedicine) {
            mm.deleteMedicine(deleteOtcMedicine)
            .then((deleted) => {
                if (deleted) {
                    setRefreshOtc(true);
                }
            })
            .then(() => {setDeleteOtcMedicine(null)})
            .catch((err) => setErrorDetails(err));
        }
    }, [deleteOtcMedicine, mm, setDeleteOtcMedicine, setErrorDetails, setRefreshOtc])

    /**
     * Set to residentId or DrugLogRercord[] when drugLogList needs a refresh
     * @var refreshDrugLog {number|DrugLogRecord[]|null}
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
     * Set to the MedHistoy.Id for the DrugLogRecord to delete.
     * @var deleteDrugLog {number|null}
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
     * Set to a drugLogRecord when a MedHistory record is added or updated
     * @var updateDrugLog {drugLogRecord|null}
     */
    useEffect(() => {
        if (updateDrugLog) {
            mm.updateDrugLog(updateDrugLog, updateDrugLog.ResidentId)
            .then((drugLogs) => {setRefreshDrugLog(drugLogs)})
            .then(() => {setUpdateDrugLog(null)})
            .catch((err) => setErrorDetails(err))
        }
    }, [mm, setErrorDetails,setRefreshDrugLog, setUpdateDrugLog, updateDrugLog])

    /**
     * Set to true when the the otcList needs to be rehydrated.
     * @var refreshOtc {boolean}
     */
    useEffect(() => {
        if (refreshOtc) {
            mm.loadOtcList()
            .then((otcList) => {setOtcList(otcList)})
            .then(() => {setRefreshOtc(false)})
            .catch((err) => {setErrorDetails(err)})
        }
    }, [mm, refreshOtc, setErrorDetails, setOtcList, setRefreshOtc])

    /**
     * Set to {username, password} when a user is attempting to log in.
     * @var login {{username: string, password: string}|null}
     */
    useEffect(() => {
        if (login) {
            // Send the user name and password to the web service
            am.authenticate(login.username, login.password)
            .then((response) => {
                if (response.success) {
                    setApiKey(response.apiKey);

                    // Display the organization name that logged in
                    // This element lives in index.html so we use old fashioned JS and DOM manipulation to update
                    const organizationElement = document.getElementById("organization");
                    if (organizationElement) {
                        organizationElement.innerHTML = response.organization;
                    }
                } else {
                    setLoginFailed(true);
                }
            })
            .then(() => {setLogin(null)})
            .catch((err) => {setErrorDetails(err)})
        }
    }, [login, am, setApiKey, setErrorDetails, setLogin, setLoginFailed])

    return (
        <>
            {activeResident &&
                <h4 style={{textAlign: "center"}}>
                    <span style={{background: residentColor, color: residentForegroundColor}}>
                        {clientFullName(activeResident) + ' ' + clientDOB(activeResident)}
                    </span>
                </h4>
            }

            <div style={{marginLeft: "15px"}}>
                <LandingPage/>
            </div>
        </>
    );
}

export default App;
