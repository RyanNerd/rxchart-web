import {IMedHistoryProvider} from 'providers/MedHistoryProvider';
import {DeleteResponse, IMedicineProvider} from 'providers/MedicineProvider';
import {DrugLogRecord, MedicineRecord} from 'types/RecordTypes';
import {asyncWrapper} from 'utility/common';

export interface IMedicineManager {
    deleteDrugLog: (drugLogId: number) => Promise<boolean>;
    loadDrugLog: (residentId: number, days?: number) => Promise<DrugLogRecord[]>;
    loadDrugLogForMedicine: (medicineId: number) => Promise<DrugLogRecord[]>;
    loadOtcList: () => Promise<MedicineRecord[]>;
    updateDrugLog: (drugLogRecord: DrugLogRecord) => Promise<DrugLogRecord>;
}

/**
 * Medicine Manager
 * @param {IMedicineProvider} medicineProvider The medicine provider "class" object
 * @param {IMedHistoryProvider} medHistoryProvider The medHistory provider "class" object
 */
const MedicineManager = (
    medicineProvider: IMedicineProvider,
    medHistoryProvider: IMedHistoryProvider
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
     * Returns all the OTC medicines as a promise
     * @todo Remove this
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

    return {
        deleteDrugLog: async (drugLogId: number): Promise<boolean> => {
            return await _deleteDrugLog(drugLogId);
        },
        loadDrugLog: async (residentId: number, days?: number): Promise<DrugLogRecord[]> => {
            return await _loadDrugLog(residentId, days);
        },
        loadDrugLogForMedicine: async (medicineId: number): Promise<DrugLogRecord[]> => {
            return await _loadDrugLogForMedicine(medicineId);
        },
        loadOtcList: async (): Promise<MedicineRecord[]> => {
            return await _loadOtcList();
        },
        updateDrugLog: async (drugLogRecord: DrugLogRecord): Promise<DrugLogRecord> => {
            return await _updateDrugLog(drugLogRecord);
        }
    };
};

export default MedicineManager;
