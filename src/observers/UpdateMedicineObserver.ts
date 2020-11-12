import {IMedicineManager} from "../managers/MedicineManager";
import {useEffect, useGlobal} from "reactn";

const UpdateMedicineObserver = (mm: IMedicineManager) => {
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setRefreshMedicine] = useGlobal('refreshMedicine');
    const [updateMedicine, setUpdateMedicine] = useGlobal('updateMedicine');

    /**
     * Set to a MedicineRecord when a Medicine record is added or updated
     * @var updateMedicine {MedicineRecord|null}
     */
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
