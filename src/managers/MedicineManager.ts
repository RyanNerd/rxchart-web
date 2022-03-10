import {IMedHistoryProvider} from 'providers/MedHistoryProvider';
import {DeleteResponse, IMedicineProvider} from 'providers/MedicineProvider';
import {IPillboxItemProvider} from 'providers/PillboxItemProvider';
import {IPillboxProvider} from 'providers/PillboxProvider';
import {DrugLogRecord, MedicineRecord, PillboxItemRecord, PillboxRecord} from 'types/RecordTypes';
import {asyncWrapper} from 'utility/common';

export interface IMedicineManager {
    deleteDrugLog: (drugLogId: number) => Promise<boolean>;
    deletePillboxItem: (pillboxItemId: number) => Promise<boolean>;
    loadDrugLog: (residentId: number, days?: number) => Promise<DrugLogRecord[]>;
    loadDrugLogForMedicine: (medicineId: number) => Promise<DrugLogRecord[]>;
    loadPillboxItemList: (clientId: number) => Promise<PillboxItemRecord[]>;
    loadOtcList: () => Promise<MedicineRecord[]>;
    updateDrugLog: (drugLogRecord: DrugLogRecord) => Promise<DrugLogRecord>;
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
        const [error, r] = (await asyncWrapper(medHistoryProvider.delete(drugLogId))) as [
            unknown,
            Promise<DeleteResponse>
        ];
        if (error) throw error;
        else return (await r).success;
    };

    /**
     * Delete a PillboxItem record given the Id.
     * @param {number} pillboxItemId The PK of the PillboxItem table
     */
    const _deletePillboxItem = async (pillboxItemId: number) => {
        const [error, r] = (await asyncWrapper(pillboxProvider.delete(pillboxItemId))) as [
            unknown,
            Promise<DeleteResponse>
        ];
        if (error) throw error;
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
        const [error, r] = (await asyncWrapper(medHistoryProvider.search(searchCriteria))) as [
            unknown,
            Promise<DrugLogRecord[]>
        ];
        if (error) throw error;
        else return r;
    };

    /**
     * For a given medicine PK return all MedHistory DrugLogRecords[]
     * @param {number} medicineId The PK of the Medicine table
     */
    const _loadDrugLogForMedicine = async (medicineId: number) => {
        const searchCriteria = {where: [['MedicineId', '=', medicineId]]};
        const [error, r] = (await asyncWrapper(medHistoryProvider.search(searchCriteria))) as [
            unknown,
            Promise<DrugLogRecord[]>
        ];
        if (error) throw error;
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
        const [error, r] = (await asyncWrapper(pillboxItemProvider.search(searchCriteria))) as [
            unknown,
            Promise<PillboxItemRecord[]>
        ];
        if (error) throw error;
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
        const [error, r] = (await asyncWrapper(medicineProvider.search(searchCriteria))) as [
            unknown,
            Promise<MedicineRecord[]>
        ];
        if (error) throw error;
        else return r;
    };

    /**
     * Add or update a MedHistory record
     * @param {DrugLogRecord} drugLogInfo The drug log record object
     */
    const _updateDrugLog = async (drugLogInfo: DrugLogRecord) => {
        const [error, r] = (await asyncWrapper(medHistoryProvider.update(drugLogInfo))) as [
            unknown,
            Promise<DrugLogRecord>
        ];
        if (error) throw error;
        else return r;
    };

    /**
     * Adds or updates a Pillbox record.
     * @param {PillboxRecord} pillInfo The pillbox record object
     */
    const _updatePillbox = async (pillInfo: PillboxRecord) => {
        const [error, r] = (await asyncWrapper(pillboxProvider.update(pillInfo))) as [unknown, Promise<PillboxRecord>];
        if (error) throw error;
        else return r;
    };

    /**
     * Adds or updates a PillboxItem record.
     * @param {PillboxItemRecord} pillboxItemInfo The pillboxItem record object
     */
    const _updatePillboxItem = async (pillboxItemInfo: PillboxItemRecord) => {
        const [error, r] = (await asyncWrapper(pillboxItemProvider.update(pillboxItemInfo))) as [
            unknown,
            Promise<PillboxItemRecord>
        ];
        if (error) throw error;
        else return r;
    };

    return {
        deleteDrugLog: async (drugLogId: number): Promise<boolean> => {
            return await _deleteDrugLog(drugLogId);
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
        loadPillboxItemList: async (residentId: number): Promise<PillboxItemRecord[]> => {
            return await _loadPillboxItem(residentId);
        },
        loadOtcList: async (): Promise<MedicineRecord[]> => {
            return await _loadOtcList();
        },
        updateDrugLog: async (drugLogRecord: DrugLogRecord): Promise<DrugLogRecord> => {
            return await _updateDrugLog(drugLogRecord);
        },
        updatePillbox: async (pillbox: PillboxRecord): Promise<PillboxRecord> => {
            return await _updatePillbox(pillbox);
        },
        updatePillboxItem: async (pillboxItem: PillboxItemRecord): Promise<PillboxItemRecord> => {
            return await _updatePillboxItem(pillboxItem);
        }
    };
};

export default MedicineManager;
