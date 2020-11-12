import {useEffect, useGlobal} from "reactn";
import {IMedicineManager} from "../managers/MedicineManager";

const UpdateOtcMedicineObserver = (mm: IMedicineManager) => {
    const [updateOtcMedicine, setUpdateOtcMedicine] = useGlobal('updateOtcMedicine');
    const [,setRefreshOtc] = useGlobal('refreshOtc');
    const [, setErrorDetails] = useGlobal('errorDetails');


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
            .then(() => {setUpdateOtcMedicine(null)})
            .catch((err) => setErrorDetails(err));
        }
    }, [mm, setErrorDetails, setRefreshOtc, setUpdateOtcMedicine, updateOtcMedicine])
}

export default UpdateOtcMedicineObserver;
