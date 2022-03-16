import {IMedHistoryProvider} from 'providers/MedHistoryProvider';
import {IMedicineProvider} from 'providers/MedicineProvider';
import {DrugLogRecord} from 'types/RecordTypes';
import {asyncWrapper} from 'utility/common';

export interface IMedicineManager {
    loadDrugLog: (residentId: number, days?: number) => Promise<DrugLogRecord[]>;
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

    return {
        loadDrugLog: async (residentId: number, days?: number): Promise<DrugLogRecord[]> => {
            return await _loadDrugLog(residentId, days);
        }
    };
};

export default MedicineManager;
