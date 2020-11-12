import {useEffect, useGlobal} from "reactn";
import {IMedicineManager} from "../managers/MedicineManager";

const UpdateMedicineObsrver = (mm: IMedicineManager) => {
    const [updateMedicine, setUpdateMedicine] = useGlobal('updateMedicine');
    const [, setRefreshMedicine] = useGlobal('refreshMedicine');
    const [, setErrorDetails] = useGlobal('errorDetails');

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
            .then(() => {setUpdateMedicine(null)})
            .catch((err) => setErrorDetails(err));
        }
    }, [updateMedicine, setUpdateMedicine, mm, setErrorDetails, setRefreshMedicine])
}

export default UpdateMedicineObsrver;
