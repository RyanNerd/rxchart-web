export default function RefreshMedicineLog(medHistoryProvider, drugId)
{
    return medHistoryProvider.query(drugId, 'MedicineId')
            .then((response) => {
                if (response.success) {
                    return response.data;
                } else {
                    if (response.status === 404) {
                        return null;
                    } else {
                        throw response;
                    }
                }
            })
            .catch((err) => {
                return err;
            });
}