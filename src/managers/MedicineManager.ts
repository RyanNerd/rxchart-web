import {DrugLogRecord, MedicineRecord} from "../types/RecordTypes";
import {IMedicineProvider} from "../providers/MedicineProvider";
import {IMedHistoryProvider} from "../providers/MedHistoryProvider";

export interface IMedicineManager {
    deleteDrugLog: (drugLogId: number) => Promise<DeleteResponse>
    deleteMedicine: (medicineId: number) => Promise<boolean>
    loadDrugLog: (residentId: number) => Promise<DrugLogRecord[]>
    loadMedicineList: (residentId: number) => Promise<MedicineRecord[]>
    loadOtcList: () => Promise<MedicineRecord[]>
    updateDrugLog: (drugLogRecord: DrugLogRecord, residentId: number) => Promise<DrugLogRecord[]>
    updateMedicine: (medicine: MedicineRecord) => Promise<MedicineRecord>
}

type DeleteResponse = {success: boolean}

/**
 * Medicine Manager
 * @param {IMedicineProvider} medicineProvider
 * @param {IMedHistoryProvider} medHistoryProvider
 * @constructor
 */
const MedicineMananger = (
        medicineProvider: IMedicineProvider,
        medHistoryProvider: IMedHistoryProvider
    ): IMedicineManager => {
    /**
     * Delete a MedHistory record given the Id.
     * @param {number} drugLogId
     */
    const _deleteDrugLog = async (drugLogId: number) => {
        return medHistoryProvider
            .delete(drugLogId)
            .then((deleted) => {
                return deleted;
            })
            .catch((err) => {
                throw err;
            });
    };

    /**
     * Delete a Medicine record given the Id.
     * @param {number} medicineId
     */
    const _deleteMedicine = async (medicineId: number) => {
        return medicineProvider
            .delete(medicineId)
            .then((response) => {
                return response.success;
            })
            .catch((err) => {throw err})
    };

    /**
     * Returns all the MedHistory records for the given ResidentId as a promise
     * @param {number} residentId
     */
    const _loadDrugLog = async (residentId: number) => {
        const searchCriteria = {
            where: [{column: 'ResidentId', comparison: '=', value: residentId}],
            order_by: [{column: 'Created', direction: 'desc'}],
        };
        return medHistoryProvider.search(searchCriteria)
            .catch((err) => {throw err});
    };

    /**
     * Returns all the Medicine records for the given ResidentId as a promise
     * @param {number} residentId
     */
    const _loadMedicineList = async (residentId: number) => {
        const searchCriteria = {
            where: [{column: 'ResidentId', value: residentId}],
            order_by: [{column: 'Drug', direction: 'asc'}],
        };
        return medicineProvider.search(searchCriteria)
            .catch((err) => {throw err})
    }

    /**
     * Returns all of the OTC medicines as a promise
     */
    const _loadOtcList = async () => {
        const searchCriteria = {
            where: [{column: 'OTC', value: true}],
            order_by: [{column: 'Drug', direction: 'asc'}],
        };
        return medicineProvider.search(searchCriteria)
            .catch((err) => {throw err})
    };

    /**
     * Add or update a MedHistory record
     * @param {DrugLogRecord} drugLogInfo
     * @param {number} residentId
     */
    const _updateDrugLog = async (drugLogInfo: DrugLogRecord, residentId: number) => {
        return medHistoryProvider
            .post(drugLogInfo)
            .then(() => {
                return _loadDrugLog(residentId)
                    .then((drugLogList) => {
                        return drugLogList;
                    })
                    .catch((err) => {throw err})
            })
            .then((drugLogList) => {
                return drugLogList;
            })
            .catch((err) => {throw err})
    };

    /**
     * Adds or updates a Medicine record.
     * @param {MedicineRecord} drugInfo
     */
    const _updateMedicine = async (drugInfo: MedicineRecord) => {
        const drugData = {...drugInfo};
        if (!drugData.Id) {
            drugData.Id = null;
        }
        if (drugData.Notes === '') {
            drugData.Notes = null;
        }
        if (drugInfo.Directions === '') {
            drugData.Directions = null;
        }
        try {
            return await medicineProvider
                .post(drugData);
        } catch (err) {
            throw err;
        }
    }

    return {
        deleteDrugLog: async  (drugLogId: number): Promise<DeleteResponse> => {
            return await _deleteDrugLog(drugLogId);
        },
        deleteMedicine: async (medicineId: number): Promise<boolean> => {
            return await _deleteMedicine(medicineId);
        },
        loadDrugLog: async (residentId: number): Promise<DrugLogRecord[]> => {
            return await _loadDrugLog(residentId);
        },
        loadMedicineList: async (residentId: number): Promise<MedicineRecord[]> => {
            return await _loadMedicineList(residentId);
        },
        loadOtcList: async (): Promise<MedicineRecord[]> => {
            return await _loadOtcList();
        },
        updateDrugLog: async (drugLogRecord: DrugLogRecord, residentId: number): Promise<DrugLogRecord[]> => {
            return await _updateDrugLog(drugLogRecord, residentId);
        },
        updateMedicine: async (medicine: MedicineRecord): Promise<MedicineRecord> => {
            return await _updateMedicine(medicine);
        }
    }
}

export default MedicineMananger;
