/**
 * Helper function that rehydrates the medicineList global state
 *
 * @param medicineProvider
 * @param residentId
 * @returns {Q.Promise<any> | Promise<T | never> | * | undefined}
 * @constructor
 */
export default function RefreshMedicineList(medicineProvider, residentId)
{
   return medicineProvider.query(residentId, 'ResidentId')
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
        console.log(err);
        alert('something went wrong');
        return err;
    });
}