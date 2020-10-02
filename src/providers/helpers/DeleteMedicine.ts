/**
 * Deletes a medicine record given the Id.
 * @param {typeof MedicineProvider} medicineProvider
 * @param {number | string} medicineId
 */
import MedicineProvider from "../MedicineProvider";
import {ProviderTypes} from "../../types/ProviderTypes";

const deleteMedicine = (medicineProvider: typeof MedicineProvider, medicineId: string | number) => {
    return medicineProvider.delete(medicineId)
    .then((response: ProviderTypes.Medicine.DeleteResponse) => {
        return (response.success);
    })
    .catch((err: Error) => {
        return err;
    });
}

export default deleteMedicine;
