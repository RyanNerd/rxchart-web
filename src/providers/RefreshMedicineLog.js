export default function RefreshMedicineLog(medHistoryProvider, columnName, id)
{
    return medHistoryProvider.query(id, columnName)
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
            .catch((err) => {
                return err;
            });
}