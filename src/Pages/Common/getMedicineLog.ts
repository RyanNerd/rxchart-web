import MedHistoryProvider from '../../providers/MedHistoryProvider';
import {DrugLogRecord} from '../../types/RecordTypes';

/**
 * Fetch the MedHistory given the residentId
 *
 * @param {MedHistoryProvider} medHistoryProvider
 * @param {number} residentId
 * @return {Promise<DrugLogRecord[]>}
 */
const getMedicineLog = (
    medHistoryProvider: typeof MedHistoryProvider,
    residentId: number,
): Promise<DrugLogRecord[]> => {
    const searchCriteria = {
        where: [{column: 'ResidentId', comparison: '=', value: residentId}],

        order_by: [{column: 'Updated', direction: 'desc'}],
    };
    return medHistoryProvider.search(searchCriteria);
};

export default getMedicineLog;
