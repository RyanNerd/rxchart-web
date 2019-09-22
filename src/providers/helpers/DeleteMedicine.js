/**
 * Deletes a medicine record given the Id.
 * @param {object} medicineProvider
 * @param {number} medicineId
 */
export default function deleteMedicine(medicineProvider, medicineId)
{
    return medicineProvider.delete(medicineId)
    .then((response) => {
        return (response.success);
    })
    .catch((err) => {
        return err
    });
}