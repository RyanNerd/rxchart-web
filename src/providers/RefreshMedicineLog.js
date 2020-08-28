export default function RefreshMedicineLog(medHistoryProvider, columnName, id)
{
    const searchCriteria =
        {
            where: [
                {column: columnName, comparison: '=', value: id}
            ],

            order_by: [
                {column: 'Updated', direction: 'desc'}
            ]
        };

    return medHistoryProvider.search(searchCriteria)
    .then((response) => {
        console.log('MedHistory Response', response);
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
