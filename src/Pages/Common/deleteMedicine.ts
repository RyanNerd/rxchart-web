import {IMedicineProvider} from '../../providers/MedicineProvider';
import {ProviderTypes} from '../../types/ProviderTypes';

/**
 * Deletes a medicine record given the Id.
 *
 * @param {MedicineProvider} medicineProvider
 * @param {number | string} medicineId
 * @return {Promise<boolean>}
 */
const deleteMedicine = (medicineProvider: IMedicineProvider, medicineId: string | number): Promise<boolean> => {
    return medicineProvider
        .delete(medicineId)
        .then((response: ProviderTypes.Medicine.DeleteResponse) => {
            return response.success;
        })
        .catch((err) => {
            throw err;
        });
};

export default deleteMedicine;
