import {DrugLogRecord, MedicineRecord} from "../types/RecordTypes";
import {IMedicineProvider} from "../providers/MedicineProvider";
import {IMedHistoryProvider} from "../providers/MedHistoryProvider";
import {asyncWrapper, promiseWrapper} from "../utility/common";

export interface IMedicineManager {
    deleteDrugLog: (drugLogId: number) => Promise<boolean>
    deleteMedicine: (medicineId: number) => Promise<boolean>
    loadDrugLog: (residentId: number) => Promise<DrugLogRecord[]>
    loadMedicineList: (residentId: number) => Promise<MedicineRecord[]>
    loadOtcList: () => Promise<MedicineRecord[]>
    updateDrugLog: (drugLogRecord: DrugLogRecord, residentId: number) => Promise<DrugLogRecord[]>
    updateMedicine: (medicine: MedicineRecord) => Promise<MedicineRecord>
}

/**
 * Medicine Manager
 * @param {IMedicineProvider} medicineProvider
 * @param {IMedHistoryProvider} medHistoryProvider
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
        const [e, r] = await asyncWrapper(medHistoryProvider.delete(drugLogId));
        if (e) throw e; else return r.success;
    }

    /**
     * Delete a Medicine record given the Id.
     * @param {number} medicineId
     */
    const _deleteMedicine = async (medicineId: number) => {
        const [e, r] = await asyncWrapper(medicineProvider.delete(medicineId));
        if (e) throw e; else return r.success;
    }

    /**
     * Returns all the MedHistory records for the given ResidentId as a promise
     * @param {number} residentId
     */
    const _loadDrugLog = async (residentId: number) => {
        const searchCriteria = {
            where: [['ResidentId', '=', residentId]],
            orderBy: [['Created', 'desc']]
        };
        const [e, r] = await asyncWrapper(medHistoryProvider.search(searchCriteria));
        if (e) throw e; else return r as Promise<DrugLogRecord[]>;
    }

    /**
     * Returns all the Medicine records for the given ResidentId as a promise
     * @param {number} residentId
     */
    const _loadMedicineList = async (residentId: number) => {
        const searchCriteria = {
            where: [['ResidentId', '=', residentId]],
            orderBy: [['Drug', 'asc']]
        };
        const [e, r] = await asyncWrapper(medicineProvider.search(searchCriteria));
        if (e) throw e; else return r as Promise<MedicineRecord[]>;
    }

    /**
     * Returns all of the OTC medicines as a promise
     */
    const _loadOtcList = async () => {
        const searchCriteria = {
            where: [['OTC', '=', true]],
            orderBy: [['Drug','asc']]
        };
        const [e, r] = await asyncWrapper(medicineProvider.search(searchCriteria));
        if (e) throw e; else return r as Promise<MedicineRecord[]>;
    }

    /**
     * Add or update a MedHistory record
     * @param {DrugLogRecord} drugLogInfo
     * @param {number} residentId
     */
    const _updateDrugLog = async (drugLogInfo: DrugLogRecord, residentId: number) => {
        return promiseWrapper(medHistoryProvider.post(drugLogInfo)).then(([err, result]) => {
            if (err) throw err;
            return promiseWrapper(_loadDrugLog(residentId)).then(([err, drugLogList]) => {
                if (err) throw err;
                return drugLogList as DrugLogRecord[];
            })
        });
    }

    /**
     * Adds or updates a Medicine record.
     * @param {MedicineRecord} drugInfo
     */
    const _updateMedicine = async (drugInfo: MedicineRecord) => {
        const [e, r] = await asyncWrapper(medicineProvider.post(drugInfo));
        if (e) throw e; else return r as Promise<MedicineRecord>;
    }

    return {
        deleteDrugLog: async (drugLogId: number): Promise<boolean> => {
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
