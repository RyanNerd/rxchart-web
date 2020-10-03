import {DrugLogRecord} from "../../types/RecordTypes";
import RefreshMedicineLog from "../../providers/helpers/RefreshMedicineLog";
import MedHistoryProvider from "../../providers/MedHistoryProvider";

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
