import {DrugLogRecord} from "../../types/RecordTypes";
import MedHistoryProvider from "../../providers/MedHistoryProvider";
import getMedicineLog from "./getMedicineLog";

/**
 * Adds or updates the MedicineHistory table with the given drugLogInfo record
 * Returns the updated DrugLogList as Promise<DrugLogRecord[]>
 *
 * @param {MedHistoryProvider} medHistoryProvider
 * @param {DrugLogRecord} drugLogInfo
 * @param {number} residentId
 * @return {Promise<DrugLogRecord[]>}
 */
export const updateDrugLog = (
        medHistoryProvider: typeof MedHistoryProvider,
        drugLogInfo: DrugLogRecord,
        residentId: number
    ): Promise<DrugLogRecord[]> => {
    return medHistoryProvider.post(drugLogInfo)
    .then(() => {
        return getMedicineLog(medHistoryProvider, residentId)
        .then((drugLogList) => {
            return drugLogList;
        });
    })
    .then((drugLogList) => {return drugLogList})
}
