import {MedicineRecord} from '../../types/RecordTypes';
import {IMedicineProvider} from '../../providers/MedicineProvider';

/**
 * Adds or updates the Medicine table with the given drugInfo record.
 *
 * @param {MedicineProvider} medicineProvider
 * @param {MedicineRecord} drugInfo
 * @return {Promise<MedicineRecord}>
 */
export const updateMedicine = (
    medicineProvider: IMedicineProvider,
    drugInfo: MedicineRecord,
): Promise<MedicineRecord> => {
    const drugData = {...drugInfo};
    if (!drugData.Id) {
        drugData.Id = null;
    }
    if (drugData.Notes === '') {
        drugData.Notes = null;
    }
    if (drugInfo.Directions === '') {
        drugData.Directions = null;
    }
    return medicineProvider
        .post(drugData)
        .then((drugRecord) => {
            return drugRecord;
        })
        .catch((err) => {
            throw err;
        });
};
