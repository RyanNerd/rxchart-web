export default function RefreshMedicineLog(medHistoryProvider, id)
{
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
    .then((response) => {
        if (response.success) {
            return response.data;
        } else {
            if (response.status === 404) {
                return null;
            }
            throw response;
        }
    })
    .catch(((err) => {
        return err;
    }));
}
