import {IMedicineManager} from "../managers/MedicineManager";
import {ResidentRecord} from "../types/RecordTypes";
import {useEffect, useGlobal} from "reactn";

/**
 * Watch for changes to the deleteMedicine global. When populated it is set to Medicine.Id to be deleted.
 * @param {IMedicineManager} mm
 * @param {ResidentRecord|null} activeResident
 * @constructor
 */
const DeleteMedicineObserver = (mm: IMedicineManager, activeResident: ResidentRecord | null) => {
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setRefreshMedicine] = useGlobal('refreshMedicine');
    const [deleteMedicine, setDeleteMedicine] = useGlobal('deleteMedicine');

    useEffect(() => {
        if (deleteMedicine && activeResident) {
            mm.deleteMedicine(deleteMedicine)
            .then((deleted) => {
                if (deleted) {
                    setRefreshMedicine(activeResident?.Id);
                }
            })
            .then(() => {
                setDeleteMedicine(null)
            })
            .catch((err) => setErrorDetails(err));
        }
    }, [activeResident, deleteMedicine, mm, setDeleteMedicine, setErrorDetails, setRefreshMedicine])
}

export default DeleteMedicineObserver;
