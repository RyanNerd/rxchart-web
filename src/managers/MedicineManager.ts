import {IMedHistoryProvider} from "providers/MedHistoryProvider";
import {IMedicineProvider} from "providers/MedicineProvider";
import {IPillboxItemProvider} from "providers/PillboxItemProvider";
import {IPillboxProvider} from "providers/PillboxProvider";
import {DrugLogRecord, MedicineRecord, PillboxItemRecord, PillboxRecord} from "types/RecordTypes";
import {asyncWrapper} from "utility/common";

export interface IMedicineManager {
    deleteDrugLog: (drugLogId: number) => Promise<boolean>
    deleteMedicine: (medicineId: number) => Promise<boolean>
    deletePillbox: (pillboxId: number) => Promise<boolean>
    deletePillboxItem: (pillboxItemId: number) => Promise<boolean>
    loadDrugLog: (residentId: number, days?: number) => Promise<DrugLogRecord[]>
    loadMedicineList: (residentId: number) => Promise<MedicineRecord[]>
    loadPillboxList: (residentId: number) => Promise<PillboxRecord[]>
    loadPillboxItemList: (clientId: number) => Promise<PillboxItemRecord[]>
    loadOtcList: () => Promise<MedicineRecord[]>
    updateDrugLog: (drugLogRecord: DrugLogRecord) => Promise<DrugLogRecord>
    updateMedicine: (medicine: MedicineRecord) => Promise<MedicineRecord>
    updatePillbox: (pillbox: PillboxRecord) => Promise<PillboxRecord>
    updatePillboxItem: (pillboxItemRecord: PillboxItemRecord) => Promise<PillboxItemRecord>
}

/**
 * Medicine Manager
 * @param {IMedicineProvider} medicineProvider
 * @param {IMedHistoryProvider} medHistoryProvider
 * @param {IPillboxProvider} pillboxProvider
 * @param {IPillboxItemProvider} pillboxItemProvider
 */
const MedicineManager = (
    medicineProvider: IMedicineProvider,
    medHistoryProvider: IMedHistoryProvider,
    pillboxProvider: IPillboxProvider,
    pillboxItemProvider: IPillboxItemProvider
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
     * Delete a Pillbox record given the Id.
     * @param {number} pillboxId
     */
    const _deletePillbox = async (pillboxId: number) => {
        const [e, r] = await asyncWrapper(pillboxProvider.delete(pillboxId));
        if (e) throw e; else return r.success;
    }

    /**
     * Delete a PillboxItem record given the Id.
     * @param {number} pillboxItemId
     */
    const _deletePillboxItem = async (pillboxItemId: number) => {
        const [e, r] = await asyncWrapper(pillboxProvider.delete(pillboxItemId));
        if (e) throw e; else return r.success;
    }

    /**
     * Returns all the MedHistory records for the given ResidentId as a promise
     * @param {number} residentId The client Id
     * @param {number} days number of days old to fetch
     */
    const _loadDrugLog = async (residentId: number, days: number | undefined) => {
        let searchCriteria;
        if (days) {
            const d = new Date();
            d.setDate(d.getDate() - days);
            searchCriteria = {
                where: [['ResidentId', '=', residentId], ['Updated', '>' , d]],
                orderBy: [['Created', 'desc']]
            };
        } else {
            searchCriteria = {
                where: [['ResidentId', '=', residentId]],
                orderBy: [['Created', 'desc']]
            };
        }

        const [e, r] = await asyncWrapper(medHistoryProvider.search(searchCriteria));
        if (e) throw e; else return r as Promise<DrugLogRecord[]>;
    }

    /**
     * Returns all the PillboxItem records for the given clientId as a promise
     * @param {number} clientId
     */
    const _loadPillboxItem = async (clientId: number) => {
        const searchCriteria = {
            where: [['ResidentId', '=', clientId]],
            orderBy: [['Created', 'desc']]
        };
        const [e, r] = await asyncWrapper(pillboxItemProvider.search(searchCriteria));
        if (e) throw e; else return r as Promise<PillboxItemRecord[]>;
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
     * Returns all the Pillbox records for the given ResidentId as a promise
     * @param {number} residentId
     */
    const _loadPillboxList = async (residentId: number) => {
        const searchCriteria = {
            where: [['ResidentId', '=', residentId]],
            orderBy: [['Name', 'asc']]
        };
        const [e, r] = await asyncWrapper(pillboxProvider.search(searchCriteria));
        if (e) throw e; else return r as Promise<PillboxRecord[]>;
    }

    /**
     * Returns all the OTC medicines as a promise
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
     */
    const _updateDrugLog = async (drugLogInfo: DrugLogRecord) => {
        const [e, r] = await asyncWrapper(medHistoryProvider.post(drugLogInfo));
        if (e) throw e; else return r as Promise<DrugLogRecord>;
    }

    /**
     * Adds or updates a Medicine record.
     * @param {MedicineRecord} drugInfo
     */
    const _updateMedicine = async (drugInfo: MedicineRecord) => {
        const [e, r] = await asyncWrapper(medicineProvider.post(drugInfo));
        if (e) throw e; else return r as Promise<MedicineRecord>;
    }

    /**
     * Adds or updates a Pillbox record.
     * @param {PillboxRecord} pillInfo
     */
    const _updatePillbox = async (pillInfo: PillboxRecord) => {
        const [e, r] = await asyncWrapper(pillboxProvider.post(pillInfo));
        if (e) throw e; else return r as Promise<PillboxRecord>;
    }

    /**
     * Adds or updates a PillboxItem record.
     * @param {PillboxItemRecord} pillboxItemInfo
     */
    const _updatePillboxItem = async (pillboxItemInfo: PillboxItemRecord) => {
        const [e, r] = await asyncWrapper(pillboxItemProvider.post(pillboxItemInfo));
        if (e) throw e; else return r as Promise<PillboxItemRecord>;
    }

    return {
        deleteDrugLog: async (drugLogId: number): Promise<boolean> => {
            return await _deleteDrugLog(drugLogId);
        },
        deleteMedicine: async (medicineId: number): Promise<boolean> => {
            return await _deleteMedicine(medicineId);
        },
        deletePillbox: async (pillboxId: number): Promise<boolean> => {
            return await _deletePillbox(pillboxId);
        },
        deletePillboxItem: async (pillboxItemId: number): Promise<boolean> => {
            return await _deletePillboxItem(pillboxItemId);
        },
        loadDrugLog: async (residentId: number, days?: number): Promise<DrugLogRecord[]> => {
            return await _loadDrugLog(residentId, days);
        },
        loadMedicineList: async (residentId: number): Promise<MedicineRecord[]> => {
            return await _loadMedicineList(residentId);
        },
        loadPillboxList: async (residentId: number): Promise<PillboxRecord[]> => {
            return await _loadPillboxList(residentId);
        },
        loadPillboxItemList: async (residentId: number): Promise<PillboxItemRecord[]> => {
            return await _loadPillboxItem(residentId);
        },
        loadOtcList: async (): Promise<MedicineRecord[]> => {
            return await _loadOtcList();
        },
        updateDrugLog: async (drugLogRecord: DrugLogRecord): Promise<DrugLogRecord> => {
            return await _updateDrugLog(drugLogRecord);
        },
        updateMedicine: async (medicine: MedicineRecord): Promise<MedicineRecord> => {
            return await _updateMedicine(medicine);
        },
        updatePillbox: async (pillbox: PillboxRecord): Promise<PillboxRecord> => {
            return await _updatePillbox(pillbox);
        },
        updatePillboxItem: async (pillboxItem: PillboxItemRecord): Promise<PillboxItemRecord> => {
            return await _updatePillboxItem(pillboxItem);
        }
    }
}

export default MedicineManager;
