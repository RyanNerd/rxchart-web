import {IMedicineManager} from "../managers/MedicineManager";
import {useEffect, useGlobal} from "reactn";

/**
 * Watch for changes to the deleteOtcMedicine global.
 * When populated it is set to the Medicine.Id to be deleted.
 * @param {IMedicineManager} mm
 * @constructor
 */
const DeleteOtcMedcineObserver = (mm: IMedicineManager) => {
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setRefreshOtc] = useGlobal('refreshOtc');
    const [deleteOtcMedicine, setDeleteOtcMedicine] = useGlobal('deleteOtcMedicine');

    useEffect(() => {
        if (deleteOtcMedicine) {
            mm.deleteMedicine(deleteOtcMedicine)
            .then((deleted) => {
                if (deleted) {
                    setRefreshOtc(true);
                }
            })
            .then(() => {
                setDeleteOtcMedicine(null)
            })
            .catch((err) => setErrorDetails(err));
        }
    }, [deleteOtcMedicine, mm, setDeleteOtcMedicine, setErrorDetails, setRefreshOtc])
}

export default DeleteOtcMedcineObserver;
