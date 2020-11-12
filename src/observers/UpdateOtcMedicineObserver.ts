import {IMedicineManager} from "../managers/MedicineManager";
import {useEffect, useGlobal} from "reactn";

const UpdateOtcMedicineObserver = (mm: IMedicineManager) => {
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setRefreshOtc] = useGlobal('refreshOtc');
    const [updateOtcMedicine, setUpdateOtcMedicine] = useGlobal('updateOtcMedicine');


    /**
     * Set to a MedicineRecord when an OTC record is added or updated
     * @var updateOtcMedicine {MedicineRecord|null}
     */
    useEffect(() => {
        if (updateOtcMedicine) {
            mm.updateMedicine(updateOtcMedicine)
            .then((drugRecord) => {
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
