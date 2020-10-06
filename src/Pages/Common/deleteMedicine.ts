import MedicineProvider from "../../providers/MedicineProvider";
import {ProviderTypes} from "../../types/ProviderTypes";

/**
 * Deletes a medicine record given the Id.
 *
 * @param {MedicineProvider} medicineProvider
 * @param {number | string} medicineId
 */
const deleteMedicine = (medicineProvider: typeof MedicineProvider, medicineId: string | number): Promise<boolean> => {
    return medicineProvider.delete(medicineId)
    .then((response: ProviderTypes.Medicine.DeleteResponse) => {
        return (response.success);
    })
    .catch((err) => {
        return err;
    });
}

export default deleteMedicine;
