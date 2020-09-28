/**
 * Deletes a medicine record given the Id.
 * @param {typeof MedicineProvider} medicineProvider
 * @param {number | string} medicineId
 */
import MedicineProvider from "../MedicineProvider";

const deleteMedicine = (medicineProvider: typeof MedicineProvider, medicineId: string | number) => {
    return medicineProvider.delete(medicineId)
    .then((response: {success: boolean}) => {
        return (response.success);
    })
    .catch((err: ErrorEvent) => {
        return err;
    });
}

export default deleteMedicine;
