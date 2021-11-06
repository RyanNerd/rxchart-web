import {IMedHistoryProvider} from 'providers/MedHistoryProvider';
import {DeleteResponse, IMedicineProvider} from 'providers/MedicineProvider';
import {IPillboxItemProvider} from 'providers/PillboxItemProvider';
import {IPillboxProvider} from 'providers/PillboxProvider';
import {DrugLogRecord, MedicineRecord, PillboxItemRecord, PillboxRecord} from 'types/RecordTypes';
import {asyncWrapper} from 'utility/common';

export interface IMedicineManager {
    deleteDrugLog: (drugLogId: number) => Promise<boolean>;
    deleteMedicine: (medicineId: number) => Promise<boolean>;
    deletePillbox: (pillboxId: number) => Promise<boolean>;
    deletePillboxItem: (pillboxItemId: number) => Promise<boolean>;
    loadDrugLog: (residentId: number, days?: number) => Promise<DrugLogRecord[]>;
    loadDrugLogForMedicine: (medicineId: number) => Promise<DrugLogRecord[]>;
    loadMedicineList: (residentId: number) => Promise<MedicineRecord[]>;
    loadPillboxList: (residentId: number) => Promise<PillboxRecord[]>;
    loadPillboxItemList: (clientId: number) => Promise<PillboxItemRecord[]>;
    loadOtcList: () => Promise<MedicineRecord[]>;
    logPillbox: (pillboxId: number) => Promise<DrugLogRecord[]>;
    updateDrugLog: (drugLogRecord: DrugLogRecord) => Promise<DrugLogRecord>;
    updateMedicine: (medicine: MedicineRecord) => Promise<MedicineRecord>;
    updatePillbox: (pillbox: PillboxRecord) => Promise<PillboxRecord>;
    updatePillboxItem: (pillboxItemRecord: PillboxItemRecord) => Promise<PillboxItemRecord>;
}

/**
 * Medicine Manager
 * @param {IMedicineProvider} medicineProvider The medicine provider "class" object
 * @param {IMedHistoryProvider} medHistoryProvider The medHistory provider "class" object
 * @param {IPillboxProvider} pillboxProvider The pillbox provider "class" object
 * @param {IPillboxItemProvider} pillboxItemProvider The pillboxItem provider "class" object
 */
const MedicineManager = (
    medicineProvider: IMedicineProvider,
    medHistoryProvider: IMedHistoryProvider,
    pillboxProvider: IPillboxProvider,
    pillboxItemProvider: IPillboxItemProvider
): IMedicineManager => {
    /**
     * Delete a MedHistory record given the Id.
     * @param {number} drugLogId The PK of the MedHistory table
     */
    const _deleteDrugLog = async (drugLogId: number) => {
        const [e, r] = (await asyncWrapper(medHistoryProvider.delete(drugLogId))) as [unknown, Promise<DeleteResponse>];
        if (e) throw e;
        else return (await r).success;
    };

    /**
     * Delete a Medicine record given the Id.
     * @param {number} medicineId The PK of the Medicine table
     */
    const _deleteMedicine = async (medicineId: number) => {
        const [e, r] = (await asyncWrapper(medicineProvider.delete(medicineId))) as [unknown, Promise<DeleteResponse>];
        if (e) throw e;
        else return (await r).success;
    };

    /**
     * Delete a Pillbox record given the Id.
     * @param {number} pillboxId The PK of the Pillbox table
     */
    const _deletePillbox = async (pillboxId: number) => {
        const [e, r] = (await asyncWrapper(pillboxProvider.delete(pillboxId))) as [unknown, Promise<DeleteResponse>];
        if (e) throw e;
        else return (await r).success;
    };

    /**
     * Delete a PillboxItem record given the Id.
     * @param {number} pillboxItemId The PK of the PillboxItem table
     */
    const _deletePillboxItem = async (pillboxItemId: number) => {
        const [e, r] = (await asyncWrapper(pillboxProvider.delete(pillboxItemId))) as [
            unknown,
            Promise<DeleteResponse>
        ];
        if (e) throw e;
        else return (await r).success;
    };

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
                where: [
                    ['ResidentId', '=', residentId],
                    ['Updated', '>', d]
                ],
                orderBy: [['Created', 'desc']]
            };
        } else {
            searchCriteria = {
                where: [['ResidentId', '=', residentId]],
                orderBy: [['Created', 'desc']]
            };
        }
        const [e, r] = (await asyncWrapper(medHistoryProvider.search(searchCriteria))) as [
            unknown,
            Promise<DrugLogRecord[]>
        ];
        if (e) throw e;
        else return r;
    };

    /**
     * For a given medicine PK return all MedHistory DrugLogRecords[]
     * @param {number} medicineId The PK of the Medicine table
     */
    const _loadDrugLogForMedicine = async (medicineId: number) => {
        const searchCriteria = {where: [['MedicineId', '=', medicineId]]};
        const [e, r] = (await asyncWrapper(medHistoryProvider.search(searchCriteria))) as [
            unknown,
            Promise<DrugLogRecord[]>
        ];
        if (e) throw e;
        else return r;
    };

    /**
     * Returns all the PillboxItem records for the given clientId as a promise
     * @param {number} clientId The PK of the Resident table
     */
    const _loadPillboxItem = async (clientId: number) => {
        const searchCriteria = {
            where: [['ResidentId', '=', clientId]],
            orderBy: [['Created', 'desc']]
        };
        const [e, r] = (await asyncWrapper(pillboxItemProvider.search(searchCriteria))) as [
            unknown,
            Promise<PillboxItemRecord[]>
        ];
        if (e) throw e;
        else return r;
    };

    /**
     * Returns all the Medicine records for the given clientId as a promise
     * @param {number} clientId The PK of the Resident table
     */
    const _loadMedicineList = async (clientId: number) => {
        const searchCriteria = {
            where: [['ResidentId', '=', clientId]],
            orderBy: [['Drug', 'asc']]
        };
        const [e, r] = (await asyncWrapper(medicineProvider.search(searchCriteria))) as [
            unknown,
            Promise<MedicineRecord[]>
        ];
        if (e) throw e;
        else return r;
    };

    /**
     * Returns all the Pillbox records for the given clientId as a promise
     * @param {number} clientId The PK matching the Resident table (FK)
     */
    const _loadPillboxList = async (clientId: number) => {
        const searchCriteria = {
            where: [['ResidentId', '=', clientId]],
            orderBy: [['Name', 'asc']]
        };
        const [e, r] = (await asyncWrapper(pillboxProvider.search(searchCriteria))) as [
            unknown,
            Promise<PillboxRecord[]>
        ];
        if (e) throw e;
        else return r;
    };

    /**
     * Returns all the OTC medicines as a promise
     */
    const _loadOtcList = async () => {
        const searchCriteria = {
            where: [['OTC', '=', true]],
            orderBy: [['Drug', 'asc']]
        };
        const [e, r] = (await asyncWrapper(medicineProvider.search(searchCriteria))) as [
            unknown,
            Promise<MedicineRecord[]>
        ];
        if (e) throw e;
        else return r;
    };

    /**
     * Add or update a MedHistory record
     * @param {DrugLogRecord} drugLogInfo The drug log record object
     */
    const _updateDrugLog = async (drugLogInfo: DrugLogRecord) => {
        const [e, r] = (await asyncWrapper(medHistoryProvider.post(drugLogInfo))) as [unknown, Promise<DrugLogRecord>];
        if (e) throw e;
        else return r;
    };

    /**
     * Adds or updates a Medicine record.
     * @param {MedicineRecord} medInfo The medicine record object
     */
    const _updateMedicine = async (medInfo: MedicineRecord) => {
        const [e, r] = (await asyncWrapper(medicineProvider.post(medInfo))) as [unknown, Promise<MedicineRecord>];
        if (e) throw e;
        else return r;
    };

    /**
     * Adds or updates a Pillbox record.
     * @param {PillboxRecord} pillInfo The pillbox record object
     */
    const _updatePillbox = async (pillInfo: PillboxRecord) => {
        const [e, r] = (await asyncWrapper(pillboxProvider.post(pillInfo))) as [unknown, Promise<PillboxRecord>];
        if (e) throw e;
        else return r;
    };

    /**
     * Adds or updates a PillboxItem record.
     * @param {PillboxItemRecord} pillboxItemInfo The pillboxItem record object
     */
    const _updatePillboxItem = async (pillboxItemInfo: PillboxItemRecord) => {
        const [e, r] = (await asyncWrapper(pillboxItemProvider.post(pillboxItemInfo))) as [
            unknown,
            Promise<PillboxItemRecord>
        ];
        if (e) throw e;
        else return r;
    };

    /**
     * Logs all the drugs in the given Pillbox
     * @param {number} pillboxId The PK of the Pillbox table
     */
    const _logPillbox = async (pillboxId: number) => {
        const [e, r] = (await asyncWrapper(pillboxProvider.log(pillboxId))) as [unknown, Promise<DrugLogRecord[]>];
        if (e) throw e;
        else return r;
    };

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
        loadDrugLogForMedicine: async (medicineId: number): Promise<DrugLogRecord[]> => {
            return await _loadDrugLogForMedicine(medicineId);
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
        },
        logPillbox: async (pillboxId: number): Promise<DrugLogRecord[]> => {
            return await _logPillbox(pillboxId);
        }
    };
};

export default MedicineManager;
