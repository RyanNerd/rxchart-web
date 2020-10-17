import {ResidentRecord} from "../types/RecordTypes";
import {ProviderTypes} from "../types/ProviderTypes";
import getMedicineList from "../Pages/Common/getMedicineList";
import getMedicineLog from "../Pages/Common/getMedicineLog";
import {State} from "reactn/default";
import Callback from "reactn/types/callback";

export interface IResidentManagerReturn {
    deleteResident: (resident: ResidentRecord) => void
    setErrorHandler: (e: (e: any) => void) => void
    setGlobals: (g: IGlobals) => void
    setResident: (residentRecord: ResidentRecord) => Promise<void>
    loadResidentList: () => Promise<void>
    addOrUpdateResident: (r: ResidentRecord) => Promise<void>
}

type TSetResidentList = (newValue: State["residentList"], callback?: Callback<State>) => Promise<State>
type TSetMedicineList = (newValue: State["medicineList"], callback?: Callback<State>) => Promise<State>
type TSetDrugLogList = (newValue: State["drugLogList"], callback?: Callback<State>) => Promise<State>
type TSetActiveResident = (newValue: State["activeResident"], callback?: Callback<State>) => Promise<State>

export interface IGlobals {
    setResidentList: TSetResidentList
    setMedicineList: TSetMedicineList
    setDrugLogList: TSetDrugLogList
    setActiveResident: TSetActiveResident
}

/**
 * ResidentManager handles business logic primarily for the ResidentPage
 * @param {ProviderTypes.Providers} providers
 * @constructor
 */
const ResidentManager = (providers: ProviderTypes.Providers): IResidentManagerReturn => {
    /**
     * @private
     * @property
     */
    let _resident = undefined as ResidentRecord | undefined;

    /**
     * @private
     * @property
     * @param {any} e
     */
    let _onError = (e: any) => {
        return e
    };

    const residentProvider = providers.residentProvider;
    const medicineProvider = providers.medicineProvider;
    const medHistoryProvider = providers.medHistoryProvider;

    /**
     * Inserts or updates a Resident record.
     * @param {ResidentRecord} residentRecord
     */
    const _addOrUpdateResident = async (residentRecord: ResidentRecord) => {
        const residentData = {...residentRecord};
        if (!residentData.Id) {
            residentData.Id = null;
        }
        const searchExisting = {
            where: [
                {column: "FirstName", value: residentData.FirstName},
                {column: "LastName", value: residentData.LastName},
                {column: "DOB_YEAR", value: residentData.DOB_YEAR},
                {column: "DOB_MONTH", value: residentData.DOB_MONTH},
                {column: "DOB_DAY", value: residentData.DOB_DAY}
            ],
            limit: 1,
            only_trashed: true
        };

        // Check if the added resident exists but is trashed.
        return await residentProvider.search(searchExisting)
            .then((result) => {
                const trashedResidentId = (result.length === 1) ? result[0].Id : null;
                // Do we have a trashed resident? Reactivate them, otherwise add as a new resident.
                if (trashedResidentId) {
                    return _reactivateResident(trashedResidentId)
                        .then((restoredResident: ResidentRecord) => _setResident(restoredResident))
                        .catch((err) => _throwError(err));
                } else {
                    // Add / update the new resident
                    return residentProvider.post(residentData)
                        .then((resident) => _setResident(resident))
                        .catch((err) => _throwError(err));
                }
            })
            .then(() => _loadResidentList())
            .catch((err) => _throwError(err));
    }

    /**
     * Deletes a Resident record
     * @param {ResidentRecord} residentToDelete
     */
    const _deleteResident = (residentToDelete: ResidentRecord): void => {
        const setActiveResident = _setActiveResident as TSetActiveResident;
        if (residentToDelete.Id) {
            residentProvider.delete(residentToDelete.Id)
                .then((response) => {
                    if (response.success) {
                        // If the activeResident is the resident that is being deleted then mark it as no longer active.
                        if (_getResidentId() === residentToDelete.Id) {
                            setActiveResident(null);
                        }
                        _loadResidentList();
                    } else {
                        throw(response);
                    }
                })
                .catch((err) => _throwError(err));
        }
    }

    /**
     * Gets all the residents from the Resident table and sets the residentList global
     */
    const _loadResidentList = () => {
        const setResidentList = _setResidentList as TSetResidentList;
        return _getResidentList()
            .then((residents) => setResidentList(residents))
            .then(() => {
                return;
            })
            .catch((err) => _throwError(err));
    }

    let _setResidentList = undefined as TSetResidentList | undefined;
    let _setMedicineList = undefined as TSetMedicineList | undefined;
    let _setDrugLogList = undefined as TSetDrugLogList | undefined;
    let _setActiveResident = undefined as TSetActiveResident | undefined;

    /**
     * Initializes all the global setter funtions
     * @param {IGlobals} g
     */
    const _setGlobals = (g: IGlobals) => {
        _setResidentList = g.setResidentList;
        _setMedicineList = g.setMedicineList;
        _setDrugLogList = g.setDrugLogList;
        _setActiveResident = g.setActiveResident;
    }

    /**
     * Sets the activeResident and if the resident has changed since the previous resident then the logs are refreshed
     * @param {ResidentRecord} residentRecord
     */
    const _setResident = async (residentRecord: ResidentRecord | undefined) => {
        const setActiveResident = _setActiveResident as TSetActiveResident;
        const prevResidentId = _resident?.Id;
        _resident = (residentRecord) ? {...residentRecord} : undefined;
        setActiveResident(_resident || null);

        // If the previous residentId and the new residentId don't match then refresh the logs
        if (_getResidentId() !== prevResidentId) {
            return await _refreshLogs();
        }
    }

    /**
     * Error handler call back
     * @param {any} e
     */
    const _throwError = (e: any) => {
        if (_onError) {
            _onError(e);
        }
        throw e;
    }

    /**
     * Helper function that gets ALL residents from the Resident table in LastName, FirstName order
     */
    const _getResidentList = async () => {
        const searchCriteria = {
            order_by: [
                {column: 'LastName', direction: 'asc'},
                {column: 'FirstName', direction: 'asc'},
            ],
        };
        return await residentProvider.search(searchCriteria)
            .then((residents) => {
                return residents;
            })
            .catch((e) => _throwError(e));
    }

    /**
     * Refresh the medicineList and medicineLog
     */
    const _refreshLogs = async () => {
        const residentId = _getResidentId();
        const setDrugLogList = _setDrugLogList as TSetDrugLogList;
        const setMedicineList = _setMedicineList as TSetMedicineList;

        if (residentId) {
            return await getMedicineList(medicineProvider, residentId)
                .then((hydratedMedicineList) => {
                    setMedicineList(hydratedMedicineList);
                    if (hydratedMedicineList && hydratedMedicineList.length > 0) {
                        getMedicineLog(medHistoryProvider, residentId)
                            .then((data) => setDrugLogList(data))
                    } else {
                        setDrugLogList([]);
                    }
                })
        } else {
            setMedicineList([]);
            setDrugLogList([]);
        }
    }

    /**
     * Reactivate a trashed resident given the primary key
     * @param {number} id
     * @returns {Promise<ResidentRecord>}
     */
    const _reactivateResident = (id: number): Promise<ResidentRecord> => {
        return residentProvider.restore(id)
            .then((reactivatedResident) => {
                return reactivatedResident;
            })
            .catch((err) => {
                throw err;
            })
    }


    const _getResidentId = () => {
        return (_resident) ? _resident.Id : undefined;
    }

    return {
        addOrUpdateResident: (residentRecord: ResidentRecord) => {
            return _addOrUpdateResident(residentRecord);
        },

        deleteResident: (resident: ResidentRecord) => {
            _deleteResident(resident);
        },

        loadResidentList: async (): Promise<void> => {
            return _loadResidentList();
        },

        setErrorHandler: (errorHandler: (e: any) => void) => {
            _onError = errorHandler;
        },

        setGlobals: (g: IGlobals) => {
            _setGlobals(g);
        },

        setResident: (residentRecord: ResidentRecord | undefined) => {
            return _setResident(residentRecord);
        }
    }
}

export default ResidentManager;
