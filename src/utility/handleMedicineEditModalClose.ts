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
export const handleMedicineEditModalClose = (
        drugInfo: {Id: number | null, Notes: string | null},
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

        medicineProvider.post(drugData)
        .then((drugRecord: object) => {
            refreshList(medicineProvider)
                .then((data: Array<object>) => {setDrugList(data)})
                .catch((err: Error) => setDrugList(null));
        })
        .catch((err: Error) => onError(err));
    }
}
