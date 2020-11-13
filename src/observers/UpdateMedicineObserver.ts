import {IMedicineManager} from "../managers/MedicineManager";
import {useEffect, useGlobal} from "reactn";

/**
 * Watch for changes to the updteMedicine global
 * when populated is the MedicineRecord to add or update
 * @param {IMedicineManager} mm
 * @constructor
 */
const UpdateMedicineObserver = (mm: IMedicineManager) => {
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setRefreshMedicine] = useGlobal('refreshMedicine');
    const [updateMedicine, setUpdateMedicine] = useGlobal('updateMedicine');

    useEffect(() => {
        if (updateMedicine) {
            mm.updateMedicine(updateMedicine)
            .then((drugRecord) => {
                const clientId = drugRecord && drugRecord.ResidentId ? drugRecord.ResidentId : null;
                setRefreshMedicine(clientId);
            })
            .then(() => {
                setUpdateMedicine(null)
            })
            .catch((err) => setErrorDetails(err));
        }
    }, [updateMedicine, setUpdateMedicine, mm, setErrorDetails, setRefreshMedicine])
}

export default UpdateMedicineObserver;
