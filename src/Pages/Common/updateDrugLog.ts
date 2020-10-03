import {DrugLogRecord} from "../../types/RecordTypes";
import RefreshMedicineLog from "../../providers/helpers/RefreshMedicineLog";
import MedHistoryProvider from "../../providers/MedHistoryProvider";

/**
 * Adds or updates the MedicineHistory table with the given drugLogInfo record
 * Returns the updated DrugLogList as Promise<DrugLogRecord[]>
 *
 * @param {MedHistoryProvider} medHistoryProvider
 * @param {DrugLogRecord} drugLogInfo
 * @param {number} residentId
 * @return {}Promise<DrugLogRecord[]>}
 */
export const updateDrugLog = (medHistoryProvider: typeof MedHistoryProvider, drugLogInfo: DrugLogRecord, residentId: number) => {
    return medHistoryProvider.post(drugLogInfo)
    .then(() => {
        return RefreshMedicineLog(medHistoryProvider, residentId)
        .then((drugLogList) => {
            return drugLogList;
        });
    })
    .then((drugLogList) => {return drugLogList})
}
