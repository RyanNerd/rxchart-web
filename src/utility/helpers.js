/**
 * Helper function when the MedicineEditModal is closed.
 *
 * @param {object} drugInfo
 * @param {function} medicineProvider
 * @param {Promise} refreshList
 * @param {function} setDrugList
 * @param {function} onError
 */
export const handleMedicineEditModalClose = (drugInfo, medicineProvider, refreshList, setDrugList, onError) => {
    if (drugInfo) {
        const drugData = {...drugInfo};

        if (!drugData.Id) {
            drugData.Id = null;
        }

        if (drugData.Notes === '') {
            drugData.Notes = null;
        }

        medicineProvider.post(drugData)
        .then((drugRecord) => {
            refreshList(medicineProvider)
                .then((data) => {setDrugList(data)})
                .catch((err) => setDrugList(null));
        })
        .catch((err) => onError(err));
    }
}
