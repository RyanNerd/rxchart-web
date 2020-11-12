import {useEffect, useGlobal} from "reactn";
import {IMedicineManager} from "../managers/MedicineManager";

const DeleteOtcMedcineObserver = (mm: IMedicineManager) => {
    const [deleteOtcMedicine, setDeleteOtcMedicine] = useGlobal('deleteOtcMedicine');
    const [, setRefreshOtc] = useGlobal('refreshOtc');
    const [, setErrorDetails] = useGlobal('errorDetails');

    /**
     * Set to Id of the the OTC MedicineRecord to be deleted
     * @var deleteOtcMedicne {number|null}
     */
    useEffect(() => {
        if(deleteOtcMedicine) {
            mm.deleteMedicine(deleteOtcMedicine)
            .then((deleted) => {
                if (deleted) {
                    setRefreshOtc(true);
                }
            })
            .then(() => {setDeleteOtcMedicine(null)})
            .catch((err) => setErrorDetails(err));
        }
    }, [deleteOtcMedicine, mm, setDeleteOtcMedicine, setErrorDetails, setRefreshOtc])
}

export default DeleteOtcMedcineObserver;
