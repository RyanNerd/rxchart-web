import {IMedicineManager} from "../managers/MedicineManager";
import {useEffect, useGlobal} from "reactn";

const DeleteOtcMedcineObserver = (mm: IMedicineManager) => {
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setRefreshOtc] = useGlobal('refreshOtc');
    const [deleteOtcMedicine, setDeleteOtcMedicine] = useGlobal('deleteOtcMedicine');

    /**
     * Set to Id of the the OTC MedicineRecord to be deleted
     * @var deleteOtcMedicne {number|null}
     */
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
