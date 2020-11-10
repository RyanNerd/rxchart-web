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
    const [apiKey, setApiKey] = useGlobal('apiKey');
    const [activeTabKey, setActiveTabKey] = useGlobal('activeTabKey');
    const [, setDrugLogList] = useGlobal('drugLogList');
    const [errorDetails, setErrorDetails] = useGlobal('errorDetails');
    const [, setLoginFailed] = useGlobal('loginFailed');
    const [, setMedicineList] = useGlobal('medicineList');
    const [, setOtcList] = useGlobal('otcList');
    const [, setResidentList] = useGlobal('residentList');
    const [activeResident] = useGlobal('activeResident');
    const [am] = useGlobal('authManager');
    const [deleteClient, setDeleteClient] = useGlobal('deleteClient');
    const [deleteDrugLog, setDeleteDrugLog] = useGlobal('deleteDrugLog');
    const [deleteMedicine, setDeleteMedicine] = useGlobal('deleteMedicine');
    const [development] = useGlobal('development');
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
    const residentColor = development ? 'blue' : "#edf11e";
    const residentForegroundColor = development ? "#fffff0" : "black";
    const residentTitle = activeResident ?
            FullName(activeResident) + ' ' +
                activeResident.DOB_MONTH + '/' +
                activeResident.DOB_DAY + '/' +
                activeResident.DOB_YEAR
            : null;

    // *** ApiKey
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

    // *** Error
    // Observer for anytime there is an error set on the errorDetails global
    useEffect(() => {
        if (errorDetails) {
            setApiKey(null);
            setActiveTabKey('error');
        }
    }, [errorDetails, setApiKey, activeTabKey, setActiveTabKey])

    // *** Client ***
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

    // *** Medicine ***
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
     * deleteMedicne: number|null set to Id of the the MedicineRecord to be deleted
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

    // *** DrugLog ***
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

    useEffect(() => {
        if (refreshOtc) {
            mm.loadOtcList()
            .then((otcList) => {setOtcList(otcList)})
            .then(() => {setRefreshOtc(false)})
            .catch((err) => {setErrorDetails(err)})
        }
    }, [mm, refreshOtc, setErrorDetails, setOtcList, setRefreshOtc])

    // *** Login
    useEffect(() => {
        console.log('login', login);
        if (login) {
            // Send the user name and password to the web service
            am.authenticate(login.username, login.password)
            .then((response) => {
                console.log('auth response', response);
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
            {residentTitle &&
                <h4 style={{textAlign: "center"}}>
                    <span style={{background: residentColor, color: residentForegroundColor}}>
                        {residentTitle}
                    </span>
                </h4>
            }

            <div className="vl"></div>

            <div style={{marginLeft: "15px"}}>
                <LandingPage/>
            </div>
        </>
    );
}

export default App;
