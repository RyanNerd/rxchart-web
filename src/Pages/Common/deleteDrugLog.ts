import MedHistoryProvider from "../../providers/MedHistoryProvider";
import {ProviderTypes} from "../../types/ProviderTypes";

/**
 * Deletes a MedHistory record given the primary key
 *
 * @param {MedHistoryProvider} medHistoryProvider
 * @param {number} drugLogId
 */
const deleteDrugLog = (medHistoryProvider: typeof MedHistoryProvider, drugLogId: number): Promise<ProviderTypes.DeleteResponse> => {
    return medHistoryProvider.delete(drugLogId)
    .then((deleted) => {
        return deleted;
    })
}

export default deleteDrugLog;
