import MedHistoryProvider from "../MedHistoryProvider";

const RefreshMedicineLog = (medHistoryProvider: typeof MedHistoryProvider, id: number | string) => {
    const searchCriteria =
        {
            where: [
                {column: 'ResidentId', comparison: '=', value: id}
            ],

            order_by: [
                {column: 'Updated', direction: 'desc'}
            ]
        };

    return medHistoryProvider.search(searchCriteria);
}

export default RefreshMedicineLog;

