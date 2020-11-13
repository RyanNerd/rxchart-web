import {IMedicineManager} from "../managers/MedicineManager";
import {useEffect, useGlobal} from "reactn";

/**
 * Watch for changes to the updateOtcMedicine global
 * when populated is set to the MedicineRecord to be added or updated
 * @param {IMedicineManager} mm
 * @constructor
 */
const UpdateOtcMedicineObserver = (mm: IMedicineManager) => {
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setRefreshOtc] = useGlobal('refreshOtc');
    const [updateOtcMedicine, setUpdateOtcMedicine] = useGlobal('updateOtcMedicine');

    useEffect(() => {
        if (updateOtcMedicine) {
            mm.updateMedicine(updateOtcMedicine)
            .then(() => {
                setRefreshOtc(true);
            })
            .then(() => {
                setUpdateOtcMedicine(null)
            })
            .catch((err) => setErrorDetails(err));
        }
    }, [mm, setErrorDetails, setRefreshOtc, setUpdateOtcMedicine, updateOtcMedicine])
}

export default UpdateOtcMedicineObserver;
