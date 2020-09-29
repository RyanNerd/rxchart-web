/**
 * Helper function when the MedicineEditModal is closed.
 *
 * @param {object} drugInfo
 * @param {function} medicineProvider
 * @param {Promise} refreshList
 * @param {function} setDrugList
 * @param {function} onError
 * @returns {void}
 */
import {MedicineRecord} from "../types/RecordTypes";

export const handleMedicineEditModalClose = (
        drugInfo: MedicineRecord | null,
        medicineProvider: {post: Function},
        refreshList: Function,
        setDrugList: Function,
        onError: Function
    ): void => {
    if (drugInfo) {
        const drugData = {...drugInfo};

        if (!drugData.Id) {
            drugData.Id = null;
        }

        if (drugData.Notes === '') {
            drugData.Notes = null;
        }

        if (drugData.Directions === '') {
            drugData.Directions = null;
        }

        medicineProvider.post(drugData)
        .then(() => {
            refreshList(medicineProvider)
            .then((data: MedicineRecord[]) => {setDrugList(data)})
            .catch((err: Error) => {
                console.log('handleMedicineEditClose error', err)
                setDrugList(null);
            });
        })
        .catch((err: Error) => onError(err));
    }
}
