import MedHistoryProvider from "../MedHistoryProvider";
import {ProviderTypes} from "../../types/ProviderTypes";

const RefreshMedicineLog = (medHistoryProvider: typeof MedHistoryProvider, id: number | string): Promise<any> => {
    const searchCriteria =
        {
            where: [
                {column: 'ResidentId', comparison: '=', value: id}
            ],

            order_by: [
                {column: 'Updated', direction: 'desc'}
            ]
        };

    return medHistoryProvider.search(searchCriteria)
    .then((response: ProviderTypes.MedHistory.SearchResponse) => {
        if (response.success) {
            return response.data;
        } else {
            if (response.status === 404) {
                return null;
            }
            throw response;
        }
    })
    .catch(((err: ErrorEvent) => {
        return err;
    }));
}

export default RefreshMedicineLog;

